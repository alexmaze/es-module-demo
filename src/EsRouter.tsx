import * as React from "react"
import { Route as RRoute } from "react-router-dom"

export function Route(props: any) {
  return <RRoute {...props} path={getPath(props.path)} />
}

function getPath(path: string) {
  return ENV_PREFIX + path
}
