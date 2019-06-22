import * as React from "react"
import Navigation from "../components/Navigation"
import { rhythm } from "../utils/typography"
import {Helmet} from "react-helmet"

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
    <Helmet>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"/>
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"/> */}
    </Helmet>
    <Navigation/>
    {children}
  </div>
)

export default Layout
