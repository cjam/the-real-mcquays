import React from "react"
import Layout from "../../layouts"
import {get} from "lodash"
// import Helmet from 'react-helmet'
import {graphql} from "gatsby"
import styles from "./blog.module.css"
import ArticlePreview, { ArticlePreviewProps } from "../../components/ArticlePreview"
import ArticlePreviewList from "../../components/ArticlePreviewList"

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const posts = get(this, "props.data.allContentfulBlogPost.edges") || []
    const articles = posts.map(({node}:{node:ArticlePreviewProps})=>node)
    return (
      <Layout>
        <div className={styles.hero}>
          Blog
        </div>
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ArticlePreviewList articles={articles} />
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE){
              ...GatsbyContentfulSizes_withWebp
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
