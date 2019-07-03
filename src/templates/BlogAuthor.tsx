import React from "react"
import { graphql, Link } from "gatsby"
import { get, kebabCase } from "lodash"
// import "./BlogPost.scss"
import Layout from "../layouts"
import ArticlePreviewList from "../components/ArticlePreviewList";
import { ArticlePreviewProps } from "../components/ArticlePreview";
import Pagination from "../components/Pagination";
import AuthorCard, { AuthorCardProps } from "../components/AuthorCard";


export interface BlogPostAuthorTemplateProps {
  data: {
    author:AuthorCardProps;
    authoredPosts: {
      edges: Array<{ post: ArticlePreviewProps }>
    }
  };
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

  return (
    <Layout seo={{
      path,
      description: `List of articles written by '${authorName}'`,
      title: "The Real McQuays Blog"
    }}>
      {/* <h2>Articles Tagged with <span style={{ fontStyle: "italic", fontWeight: "lighter" }}>{authorName}</span></h2> */}
      <AuthorCard {...author}/>
      <Link to="/blog/authors">All Authors</Link>
      <ArticlePreviewList articles={articles} />
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Pagination rootPath={`/blog/authors/${kebabCase(authorName)}`} currentPage={currentPage} numPages={numPages} />
      </div>
    </Layout>
  )

}

export default BlogPostAuthorTemplate

export const query = graphql`
  query($authorName:String, $skip: Int!, $limit:Int!){
    author:contentfulPerson(name:{eq:$authorName}){
      ...AuthorCard
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
