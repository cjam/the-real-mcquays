import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import { get, kebabCase } from "lodash"
import Layout from "../layouts"
import ArticlePreviewList from "../components/ArticlePreviewList";
import { ArticlePreviewProps } from "../components/ArticlePreview";
import Pagination from "../components/Pagination";
import AuthorCard, { AuthorCardProps } from "../components/AuthorCard";
import Container from "../components/Container";
import "./BlogAuthor.scss"


export interface BlogPostAuthorTemplateProps {
  data: {
    author: AuthorCardProps;
    authoredPosts: {
      edges: Array<{ post: ArticlePreviewProps }>
    }
  }
  pageContext: {
    tag: string,
    currentPage: number;
    numPages: number
  }
}

const BlogPostAuthorTemplate: React.SFC<BlogPostAuthorTemplateProps> = (props) => {
  const {
    data: {
      author,
      authoredPosts: {
        edges: posts
      }
    },
    pageContext: {
      currentPage,
      numPages
    }
  } = props;

  const path = get(props, "pageResources.page.path", "")
  const authorName = get(props, "pageContext.authorName", "")
  const articles = posts.map(({ post }) => (post))
  const { shortBio: { MD: { html: bioHtml } } } = author

  return (
    <Layout seo={{
      path,
      description: `List of articles written by '${authorName}'`,
      title: "The Real McQuays Blog"
    }}>
        <Container className="author-page">
          <header>
            <h1>{author.name}</h1>
            <div className="picture-and-bio">
              <figure>
                <Image {...author.image} />
              </figure>
              {bioHtml && <p className="bio" dangerouslySetInnerHTML={{ __html: bioHtml }} />}
            </div>
          </header>
          <h2>Articles</h2>
          <ArticlePreviewList articles={articles} />
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Pagination rootPath={`/blog/authors/${kebabCase(authorName)}`} currentPage={currentPage} numPages={numPages} />
          </div>
        </Container>
    </Layout >
  )

}

export default BlogPostAuthorTemplate

export const query = graphql`
  query($authorName:String, $skip: Int!, $limit:Int!){
    author:contentfulPerson(name:{eq:$authorName}){
      name
      instagram
      shortBio {
          MD:childMarkdownRemark {
            html
          }
      }
      image{
          fixed(width:200,height:200,quality:100){
            ...GatsbyContentfulFixed_withWebp
          }
      }
    }
    authoredPosts:allContentfulBlogPost(
        sort: {fields: publishDate, order: DESC},
        filter: {author: {name:{in: [$authorName]}}},
        limit: $limit,
        skip: $skip
    ) {
      edges {
        post: node {
          ...ArticlePreviewInfo
        }
      }
    }
  }
`
