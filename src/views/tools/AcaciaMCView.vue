<script setup lang="ts">
/**
 * A demo of Redstone Search page.
 *
 * @component RDSerachView
 * @description AcaciaMC Demo 页面
 * @props ???
 * @event ???
 *
 * know problems:
 * - 真的应该用url-polyfill吗？
 */

import { ref, Ref, onMounted } from "vue";

import { loadPyodide, PyodideInterface } from "pyodide";
const pyodide: Ref<PyodideInterface | null> = ref(null);
const micropip = ref(null);

type OutputFile = { ["name"]: string, ["content"]: string };
const sourceCode = ref("");
const outputs: Ref<OutputFile[]> = ref([]);
const errText = ref("");

const pyEnvSetup = async () => {
  const _pyodide = await loadPyodide();
  // 神必东西自带的micropip自己装不了还要我手动装
  await _pyodide.loadPackage("micropip-0.6.0-py3-none-any.whl");
  await _pyodide.loadPackage("packaging-24.1-py3-none-any.whl");
  const _micropip = _pyodide.pyimport("micropip");
  await _micropip.install("acaciamc");
  pyodide.value = _pyodide;
  micropip.value = _micropip;
}

const compileAcacia = async () => {
  const impl = async (sourceCode: string) => {
    const _pyodide = pyodide.value;
    if (!_pyodide) return { outs: [], err: "Pyodide not loaded" };
    // const _micropip = micropip.value;
    const srcPath = "src.aca";
    const outDirPath = "build";
    let outs: OutputFile[] = [];
    let err = "";

    // FS API Reference: https://emscripten.org/docs/api_reference/Filesystem-API.html?highlight=isfile#id2

    // 将源代码写入文件, 并清空输出文件夹
    _pyodide.FS.writeFile(srcPath, sourceCode);
    _pyodide.runPython(`
import shutil, os
shutil.rmtree("${outDirPath}", ignore_errors=True)
os.makedirs("${outDirPath}")
  `);

    // 运行 Acacia 编译器
    let errStr = "";
    _pyodide.setStderr({ batched: (text: string) => errStr += text });
    try {
      _pyodide.runPython(`
from acaciamc import cli
cli.run(cli.build_argparser().parse_args(["${srcPath}", "-o", "${outDirPath}"]))
        `);
      // 读取build文件夹下的所有文件（深层）
      outs = await _pyodide.runPythonAsync(`
import os
outs = []
os.chdir("${outDirPath}")
for root, dirs, files in os.walk("."):
  for file in files:
    with open(os.path.join(root, file), 'r') as f:
      content = f.read()
      file_path = os.path.join(root, file)
      if file_path.startswith("./"):
        file_path = file_path[2:]
      outs.append({"name": file_path, "content": content})
outs
      `).then((outs) => outs.toJs());
    } catch (e: any) {
      if (errStr) e = errStr;
      err = e;
    }
    return { outs: outs, err: err };
  }
  const {outs, err} = await impl(sourceCode.value);
  if(err) console.error(err); 
  errText.value = err.toString();
  outputs.value = outs;
};

onMounted(() =>
  Promise.all([
    pyEnvSetup(),
  ]),
);
</script>

<template>
  <div id="page">
    <h1>在线Acacia编译器 demo</h1>
    <div id="container" v-if="pyodide != null">
      <a href="https://github.com/CBerJun/AcaciaMC">{{"https://github.com/CBerJun/AcaciaMC"}} 原作者: CBerJun</a>
      <h2>源代码</h2>
      <textarea id="source-code" v-model="sourceCode" rows="15" cols="60"></textarea>
      <button @click="compileAcacia">编译</button>
      <div class="output" v-for="output in outputs">
        <h2>{{ output.name }}</h2>
        <pre>{{ output.content }}</pre>
      </div>
      <pre class="error" v-if="errText">{{ errText }}</pre>
    </div>
    <div v-else>
      <h2>正在加载...</h2>
    </div>
  </div>
</template>

<style scoped>
#page {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  color: white;
  background: #202020;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

#container a {
  color: white;
}

#source-code {
  font-size: 1.2em;
}

.output {
  width: 50%;
  min-width: 300px;
}

/* 
.output h2{
  background: black;
} */

.output pre{
  font-size: 1em;
  background: black;
  width: 100%;
  min-height: 40vh;
}

.error {
  font-size: 1em;
  background: #220000;
  color: red;
  padding: 20px;
  border: 2px solid #833;
  border-radius: 10px;
}
</style>
