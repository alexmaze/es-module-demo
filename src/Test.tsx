import * as React from "react"
import { Route } from "./EsRouter"
import "./style.less"

const AComp = (props: any) => {
  return <div>Hello route /a</div>
}
const BComp = (props: any) => {
  return <div>Hello route /b</div>
}

export class Test extends React.Component<{}, {}> {
  render() {
    const prefix = ENV_PREFIX
    console.debug(prefix)
    return (
      <div className="test-page">
        <div>Test</div>
        <Route path="/a" component={AComp} />
        <Route path="/b" component={BComp} />
      </div>
    )
  }
}
