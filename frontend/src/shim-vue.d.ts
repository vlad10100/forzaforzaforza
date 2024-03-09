// declare module '*.vue' {
//   import Vue from 'vue'
//   export default Vue
// }

declare module '*.vue' {
  import { type Component } from 'vue'
  const component: Component
  export default component
}
