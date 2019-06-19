import React from "react"
import {graphql} from "gatsby"
import {get} from "lodash"
import Img from "gatsby-image"
import heroStyles from "../components/Hero.module.css"
import Layout from "../layouts"

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, "data.contentfulBlogPost")
    const siteTitle = get(this.props, "data.site.siteMetadata.title")
    // console.log("POST",post)

    return (
      <Layout>
      <div style={{ background: "#fff" }}>
        {/* <Helmet title={`${post.title} | ${siteTitle}`} /> */}
        <div className={heroStyles.hero}>
          <Img className={heroStyles.heroImage} alt={post.title} sizes={post.heroImage.sizes} />
        </div>
        <div className="wrapper">
          <h1 className="section-headline">{post.title}</h1>
          <p
            style={{
              display: "block",
            }}
          >
            {post.publishDate}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </div>
      </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        sizes(maxWidth: 1180) {
          ...GatsbyContentfulSizes_withWebp
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
