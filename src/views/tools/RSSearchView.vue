<script setup lang="ts">
/**
 * A demo of Redstone Search page.
 *
 * @component RDSerachView
 * @description 红石图寻 Demo 页面
 * @props {string} text - The text to be displayed on the button.
 * @event click - Triggered when the button is clicked.
 *
 * know problems:
 * - 真的应该用url-polyfill吗？
 */

import { Ref, ref, onMounted } from "vue";

// TODO: Awaiting for globalConfig injection
// const { API_URL: api_base_str = "/api/" } = inject("globalConfig");
const apiBaseStr = "https://api.rsdaily.com/v2/";

// API URLs
const apiBaseUrl = new URL("redstonesearch/", apiBaseStr);
const apiNewQuizUrl = new URL("newquiz", apiBaseUrl);
const apiQuizImgUrl = new URL("quizimg", apiBaseUrl);
const apiQuizCheckUrl = new URL("quizcheck", apiBaseUrl);

// API endpoint functions
const apiFetchNewQuiz = async () => {
  const url = new URL(apiNewQuizUrl);
  url.searchParams.set("t", Date.now().toString());
  return (
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.id) || null
  );
};

const apiFetchQuizImage = async (quiz_id: string) => {
  const url = new URL(apiQuizImgUrl);
  url.searchParams.set("id", quiz_id);
  return fetch(url).then((res) => res.blob()) || null;
};

const apiCheckAnswer = async (quiz_id: string, ans_link: string) => {
  const url = new URL(apiQuizCheckUrl);
  url.searchParams.set("id", quiz_id);
  url.searchParams.set("ans", ans_link);
  return (
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.score) || null
  );
};

// refs
const quiz_id: Ref<string | null> = ref(null);
const quiz_img: Ref<string | null> = ref(null);
const ans_link = ref("");
const score = ref(0);

// async status
const AsyncStatus = Object.freeze({
  notInited: Symbol("notInited"),
  inProgress: Symbol("in_progress"),
  done: Symbol("done"),
  error: Symbol("error"),
});

// init a new quiz
const loadingStatus = ref(AsyncStatus.notInited);
const newQuiz = async () => {
  loadingStatus.value = AsyncStatus.inProgress;

  const res = await (async () => {
    const id = await apiFetchNewQuiz();
    if (id == null) return false;

    const img_blob = await apiFetchQuizImage(id);
    if (img_blob == null) return false;

    quiz_id.value = id;
    quiz_img.value = URL.createObjectURL(img_blob);
    return true;
  })();

  loadingStatus.value = res ? AsyncStatus.done : AsyncStatus.error;
};

// check a quiz
const checkingStatus = ref(AsyncStatus.notInited);
const check = async () => {
  if (loadingStatus.value != AsyncStatus.done || quiz_id.value === null)
    return;
  checkingStatus.value = AsyncStatus.inProgress;
  const checked_score = await apiCheckAnswer(quiz_id.value, ans_link.value);
  if (checked_score >= 0 && checked_score <= 100) {
    score.value = checked_score;
    checkingStatus.value = AsyncStatus.done;
  } else {
    checkingStatus.value = AsyncStatus.error;
  }
};

// init
onMounted(newQuiz);
</script>

<template>
  <div id="page">
    <div id="container">
      <h1>红石图寻 demo</h1>
      <p>API URL: {{ apiBaseUrl }}</p>
      <img class="quiz-img" v-if="quiz_img" :src="quiz_img" />
      <div class="bar">
        <span>{{ `相似度：${score}%` }}</span>
        <button @click="newQuiz">
          {{
            (() => {
              switch (loadingStatus) {
                case AsyncStatus.inProgress:
                  return "Loading...";
                case AsyncStatus.error:
                  return "Error";
                default:
                  return "New";
              }
            })()
          }}
        </button>
      </div>
      <div class="bar">
        <input v-bind:value="ans_link" />
        <button @click="check">
          {{
            (() => {
              switch (checkingStatus) {
                case AsyncStatus.inProgress:
                  return "Checking...";
                case AsyncStatus.error:
                  return "Error";
                default:
                  return "Check";
              }
            })()
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#page {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.quiz-img {
  width: 50vw;
}

.bar {
  width: 50vw;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 10px;
  height: 30px;
}

.bar :first-child {
  flex-grow: 1;
}

.bar button {
  background: #505050;
  border-radius: 5px;
  border: 1px solid #a0a0a0;
  color: white;
}

.bar button :hover {
  background: #404040;
  color: #f0f0f0;
}
</style>
