import * as React from "react"
import Navigation from "../components/NavigationBar"
import { rhythm } from "../utils/typography"
import { Helmet } from "react-helmet"
import SEO, { SEOProps } from "../components/SEO"
import Footer from "../components/PageFooter";
import "typeface-libre-franklin"
import "typeface-libre-baskerville"
import "typeface-montserrat"
import "./index.scss"


export interface LayoutProps {
  seo?: SEOProps
}


const Layout: React.SFC<LayoutProps> = ({
  seo = {
    article: false,
  },
  children
}) => (
    <div
      className="layout"
    >
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
      </Helmet>
      <SEO {...seo} />
      <nav>
        <Navigation currentPath={seo ? seo.path : undefined} />
      </nav>
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )

export default Layout
