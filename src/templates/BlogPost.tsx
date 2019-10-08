import React from "react"
import { graphql } from "gatsby"
import { get } from "lodash"
import Img, { FluidObject, FixedObject } from "gatsby-image"
import {MDXRenderer} from "gatsby-plugin-mdx";
// import heroStyles from "../components/Hero.module.css"
import Hero from "../components/Hero"
import "./BlogPost.scss"
import Layout from "../layouts"
import CaptionLabel from "../components/CaptionLabel"
import TagList from "../components/TagList"
import CategoryList from "../components/CategoryList"
import Share from "../components/Share"
import { dateDisplay } from "../utils/datetime"
import AuthorCard, { AuthorCardProps } from "../components/AuthorCard";
import PostNavigation from "../components/PostNavigation";
import Comments from "../components/Comments"

interface PostData {
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
      timeToRead: number
    }
  }
  author: AuthorCardProps;
  category: string[];
  tags: string[];
  datePublished: string;
  dateModified: string;
  slug: string;
}

interface RelatedArticle {
  slug: string
  title: string
}

export interface BlogPostTemplateProps {
  data: {
    post: PostData
  },
  pageContext: {
    nextPost: RelatedArticle;
    previousPost: RelatedArticle;
    slug: string;
  }
}


class BlogPostTemplate extends React.Component<BlogPostTemplateProps> {
  render() {
    const { nextPost, previousPost } = this.props.pageContext || {};
    const { post } = this.props.data
    const description = post.description ? post.description.MD.html : ""
    const plainDescription = post.description ? post.description.MD.plain : ""
    const body = post.body ? post.body.MD.html : ""
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
        <article className="blogPost container">
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
            <h1 className="post-title">{post.title}</h1>
            <div>Time To Read: <b>{post.body ? post.body.MD.timeToRead : "?"} min</b></div>
            {datePublishedDisplay !== dateModifiedDisplay && <div>Updated: {dateModifiedDisplay}</div>}
          </header>
          <section className="description"
            dangerouslySetInnerHTML={{
              "__html": description
            }}
          />
          <section className="body"
          // dangerouslySetInnerHTML={{
          //   "__html": body
          // }}
          >
            <MDXRenderer scope={this.props.__mdxScope}>{post.body.MDX}</MDXRenderer>
          </section>
          <footer>
            <CategoryList categories={post.category} />
            {post.tags && <TagList tags={post.tags} />}
            <Share
              title={post.title}
              path={path}
              description={post.description.MD.plain}
              image={post.heroImage.seo.src}
            />
            <div className="author">
              <AuthorCard {...post.author} />
            </div>
            <PostNavigation previousPost={previousPost} nextPost={nextPost} />
            <Comments
              slug={post.slug}
              title={post.title}
              path={path}
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
    post:contentfulBlogPost(slug: {eq: $slug}){
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
        MDX:childMdx{
          body
        }
      }
      description {
        MD:childMarkdownRemark {
          html
          plain:excerpt(format: PLAIN)
        }
      }
      author {
        ...AuthorCard
      }
    }
  }
  `
