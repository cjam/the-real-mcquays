import React from "react"
import { graphql, Link } from "gatsby"
import { get } from "lodash"
// import "./BlogPost.scss"
import Layout from "../layouts"
import ArticlePreviewList from "../components/ArticlePreviewList";
import { ArticlePreviewProps } from "../components/ArticlePreview";
import Pagination from "../components/Pagination";


export interface BlogPostTagTemplateProps {
  data: {
    taggedPosts: {
      edges: Array<{ post: ArticlePreviewProps }>
    }
  };
  pageContext: {
    tag:string,
    currentPage: number;
    numPages: number
  }
}

const BlogPostTagTemplate: React.SFC<BlogPostTagTemplateProps> = (props) => {
  const {
    data: {
      taggedPosts: {
        edges: posts
      }
    },
    pageContext: {
      currentPage,
      numPages
    }
  } = props;

  const path = get(props, "pageResources.page.path", "")
  const tag = get(props,"pageContext.tag","")
  const articles = posts.map(({ post }) => (post))

  return (
    <Layout seo={{
      path,
      description: `List of articles tagged with '${tag}'`,
      title: "The Real McQuays Blog"
    }}>
      <h2>Articles Tagged with <span style={{fontStyle:"italic",fontWeight:"lighter"}}>{tag}</span></h2>
      <Link to="/blog/tags">All tags</Link>
      <ArticlePreviewList articles={articles} />
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

      }}>
        <Pagination rootPath={`/blog/tags/${tag}`} currentPage={currentPage} numPages={numPages} />
      </div>
    </Layout>
  )

}

export default BlogPostTagTemplate

export const query = graphql`
  query($tag:String, $skip: Int!, $limit:Int!) {
    taggedPosts: allContentfulBlogPost(
        sort: {fields: publishDate, order: DESC},
        filter: {tags: {glob: $tag}},
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
