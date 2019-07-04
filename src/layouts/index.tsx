import * as React from "react"
import Navigation from "../components/Navigation"
import { rhythm } from "../utils/typography"
import { Helmet } from "react-helmet"
import SEO, { SEOProps } from "../components/SEO"
import Footer from "../components/Footer";
import "typeface-libre-franklin"
import "typeface-libre-baskerville"
import "typeface-montserrat"
import "./index.scss"


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
      className="layout"
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
      <Footer />
    </div>
  )

export default Layout
