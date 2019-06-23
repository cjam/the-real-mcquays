import React from "react"
import { graphql } from "gatsby"
import { get } from "lodash"
import Img from "gatsby-image"
// import heroStyles from "../components/Hero.module.css"
import Hero from "../components/Hero"
import "./BlogPost.scss"
import Layout from "../layouts"
import CaptionLabel from "../components/CaptionLabel"
import TagList from "../components/TagList"
import CategoryList from "../components/CategoryList"
import Share from "../components/Share"

class BlogPostTemplate extends React.Component<any> {
  render() {
    const post = get(this.props, "data.contentfulBlogPost")
    const siteTitle = get(this.props, "data.site.siteMetadata.title")

    const description = post.description.childMarkdownRemark.html
    const body = post.body.childMarkdownRemark.html

    return (
      <Layout>
        <article className="blogPost">
          <header>
            <Hero
              caption={(
                <CaptionLabel style={{
                  transform: "translate(0, -50%)"
                }}>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <span>Author Name</span>
                    <span>February 10, 1990</span>
                  </div>
                </CaptionLabel>
              )}
            >
              <Img alt={post.title} sizes={post.heroImage.sizes} />
            </Hero>
            <h1>{post.title}</h1>
          </header>
          <section className="description"
            dangerouslySetInnerHTML={{
              "__html": description
            }}
          />
          <section className="body"
            dangerouslySetInnerHTML={{
              "__html": body
            }}
          />
          <footer>
            <CategoryList categories={[...post.category,"Other","Another"]}/>
            <TagList tags={post.tags} />
            <Share/>
          </footer>
        </article>

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
      category
      tags
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
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
{/* <div style={{ background: "#fff" }}>
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
</div> */}