import React from "react"
import Layout from "../../layouts"
import {get} from "lodash"
import Img from "gatsby-image"
import {graphql} from "gatsby"
import styles from "./blog.module.css"
import ArticlePreview, { ArticlePreviewProps } from "../../components/ArticlePreview"
import ArticlePreviewList from "../../components/ArticlePreviewList"

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const posts = get(this, "props.data.allContentfulBlogPost.edges") || []
    const articlePreviews = posts.map(({node:{heroImage,description,...restProps}}:any)=>({
      ...restProps,
      image:<Img sizes={heroImage.images}/>,
      descriptionHtml:description.childMarkdownRemark.html
    }))
    return (
      <Layout>
        {/* <div className={styles.hero}>
          Blog
        </div> */}
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ArticlePreviewList articles={articlePreviews} />
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
          publishDate
          category
          heroImage {
            images:sizes(maxWidth: 350, maxHeight: 250, resizingBehavior: SCALE) {
             ...GatsbyContentfulSizes_withWebp
            }
            # images:fluid(maxWidth:400,maxHeight:250){
            #   ...GatsbyContentfulFluid_withWebp
            # }
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
