import React from "react"
import { graphql } from "gatsby"
import { get } from "lodash"
// import "./BlogPost.scss"
import Layout from "../layouts"
import ArticlePreviewList from "../components/ArticlePreviewList";
import { ArticlePreviewProps } from "../components/ArticlePreview";
import Pagination from "../components/Pagination";


export interface BlogPostListTemplateProps {
  data: {
    sortedPosts: {
      edges: Array<{ post: ArticlePreviewProps }>
    }
  };
  pageContext: {
    currentPage: number;
    numPages: number
  }
}

const BlogPostListTemplate: React.SFC<BlogPostListTemplateProps> = (props) => {
  const {
    data: {
      sortedPosts: {
        edges: posts
      }
    },
    pageContext: {
      currentPage,
      numPages
    }
  } = props;

  const path = get(props, "pageResources.page.path", "")
  const articles = posts.map(({ post }) => (post))

  return (
    <Layout seo={{
      path,
    }}>

      <ArticlePreviewList articles={articles} />
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent:"center"
        
      }}>
        <Pagination rootPath="/blog" currentPage={currentPage} numPages={numPages} />
      </div>
    </Layout>
  )

}

export default BlogPostListTemplate

export const query = graphql`
  query BlogPostListQuery($skip: Int!, $limit:Int!) {
    sortedPosts: allContentfulBlogPost(
        sort: {fields: publishDate, order: DESC},
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
