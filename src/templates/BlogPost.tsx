import React from "react"
import { graphql } from "gatsby"
import { get } from "lodash"
import Img, { FluidObject, FixedObject } from "gatsby-image"
// import heroStyles from "../components/Hero.module.css"
import Hero from "../components/Hero"
import "./BlogPost.scss"
import Layout from "../layouts"
import CaptionLabel from "../components/CaptionLabel"
import TagList from "../components/TagList"
import CategoryList from "../components/CategoryList"
import Share from "../components/Share"
import {dateDisplay} from "../utils/datetime"
import AuthorCard from "../components/AuthorCard";

export interface BlogPostTemplateProps {
  data: {
    post: {
      title: string
      heroImage: {
        sizes?: FluidObject;
        seo: {
          src: string;
        }
      }
      description: {
        MD: {
          html: string
          plain: string
        }
      }
      body: {
        MD: {
          html: string
          timeToRead:number
        }
      }
      author:{
        name:string;
        shortBio:{
          MD:{
            html:string
          }
        };
        image:{
          fixed:FixedObject
        };
        instagram?:string;
      }
      category: string[];
      tags: string[];
      datePublished: string;
      dateModified: string;
      slug:string;
    }
  }
}


class BlogPostTemplate extends React.Component<BlogPostTemplateProps> {
  render() {
    const post = this.props.data.post
    const description = post.description.MD.html
    const plainDescription = post.description.MD.plain
    const body = post.body.MD.html
    const path = get(this.props, "pageResources.page.path", "")
    const { dateModified, datePublished } = post
    const dateModifiedDisplay = dateDisplay(dateModified)
    const datePublishedDisplay = dateDisplay(datePublished)
    return (
      <Layout seo={{
        article: true,
        description: plainDescription,
        image: post.heroImage.seo.src,
        title: post.title,
        path,
        dateModified,
        datePublished
      }}>
        <article className="blogPost">
          <header>
            <Hero
              caption={(
                <CaptionLabel style={{
                  transform: "translate(0, -50%)"
                }}>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <span>{post.author.name}</span>
                    <span>{datePublishedDisplay}</span>
                  </div>
                </CaptionLabel>
              )}
            >
              <Img alt={post.title} sizes={post.heroImage.sizes} />
            </Hero>
            <h1>{post.title}</h1>
            <div>Time To Read: <b>{post.body.MD.timeToRead} min</b></div>
            {datePublishedDisplay !== dateModifiedDisplay && <div>Updated: {dateModifiedDisplay}</div>}
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
            <CategoryList categories={post.category} />
            <TagList tags={post.tags} />
            <Share />
            <AuthorCard
              name={post.author.name}
              instagram={post.author.instagram}
              bioMarkdown={post.author.shortBio.MD.html}
              image={post.author.image.fixed}
            />
          </footer>
        </article>

      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String) {
    post:contentfulBlogPost(slug: { eq: $slug }) {
      title
      datePublished:publishDate
      dateModified:updatedAt
      category
      tags
      heroImage {
        sizes(maxWidth: 1180) {
          ...GatsbyContentfulSizes_withWebp
        }
        seo:fixed(quality: 50, toFormat: PNG, width: 400) {
          src
        }
      }
      body {
        MD:childMarkdownRemark {
          html
          timeToRead
        }
      }
      description {
        MD:childMarkdownRemark {
          html
          plain:excerpt(format: PLAIN)
        }
      }
      author {
        name
        instagram
        shortBio {
          MD:childMarkdownRemark {
            html
          }
        }
        image{
          fixed(width:100,height:100){
            ...GatsbyContentfulFixed_withWebp
          }
        }
      }
    }
  }
`
