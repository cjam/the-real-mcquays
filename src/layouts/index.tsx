import * as React from "react"
import Navigation from "../components/Navigation"
import { rhythm } from "../utils/typography"
import { Helmet } from "react-helmet"
import SEO, { SEOProps } from "../components/SEO"


export interface LayoutProps {
  seo?:SEOProps
}


const Layout: React.SFC<LayoutProps> = ({
  seo={
    article:false,
  },
  children
}) => (
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
      </Helmet>
      <SEO {...seo} />
      <nav>
        <Navigation />
      </nav>
      <main>
        {children}
      </main>
      <footer>
        
      </footer>
    </div>
  )

export default Layout
