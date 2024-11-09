/// <reference types="vite/client" />

// 声明一个模块，模块的名称由 '*.vue' 指定，这通常用于处理 Vue 组件
declare module '*.vue' {
  // 导入 Vue 中的 DefineComponent 类型
  import type { DefineComponent } from 'vue'

  // 定义一个名为 compoment 的常量，它是一个 DefineComponent 类型的实例
  // 此处的参数和返回值类型为空，表示这个组件没有特定的 props 和 emits，或者作者没有提供类型定义
  const compoment: DefineComponent<{}, {}, any>

  // 将 compoment 导出为默认导出，使得可以被其他模块导入使用
  export default compoment
}