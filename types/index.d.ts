declare const require: (path: string) => any

// used for import json files (webpack support json file import)
declare module "*.json" {
  const value: any
  export default value
}

// for react hot reload
declare var module: { hot: any }

// work around to avoid compile error when using antd >= 2.12.3
declare module "rc-util/lib/Dom/addEventListener" {
  export type RcUtilEventHandler = any
}
