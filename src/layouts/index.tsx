import * as React from "react"
import Navigation from "../components/Navigation"
import { rhythm } from "../utils/typography"

const Layout: React.SFC = ({ children }) => (
  <div
    style={{
      margin: `0 auto`,
      marginBottom: rhythm(1.5),
      marginTop: rhythm(1.5),
      maxWidth: 1180,
      paddingLeft: rhythm(3 / 4),
      paddingRight: rhythm(3 / 4),
    }}
  >
    <Navigation/>
    {children}
  </div>
)

export default Layout
