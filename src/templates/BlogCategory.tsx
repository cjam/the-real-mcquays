import React from "react"
import { graphql, Link } from "gatsby"
import { get } from "lodash"
// import "./BlogPost.scss"
import Layout from "../layouts"
import ArticlePreviewList from "../components/ArticlePreviewList";
import { ArticlePreviewProps } from "../components/ArticlePreview";
import Pagination from "../components/Pagination";
import Container from "../components/Container";


export interface BlogPostCategoryTemplateProps {
  data: {
    categoricalPosts: {
      edges: Array<{ post: ArticlePreviewProps }>
    }
  };
  pageContext: {
    tag: string,
    currentPage: number;
    numPages: number
  }
}

const BlogPostCategoryTemplate: React.SFC<BlogPostCategoryTemplateProps> = (props) => {
  const {
    data: {
      categoricalPosts: {
        edges: posts
      }
    },
    pageContext: {
      currentPage,
      numPages
    }
  } = props;

  const path = get(props, "pageResources.page.path", "")
  const category = get(props, "pageContext.category", "")
  const articles = posts.map(({ post }) => (post))

  return (
    <Layout seo={{
      path,
      description: `List of articles within the category '${category}'`,
      title: "The Real McQuays Blog"
    }}>
      <Container>
        <h2>Articles within the <span style={{ fontStyle: "italic", fontWeight: "lighter" }}>{category}</span> Category</h2>
        <Link to="/blog/categories">All Categories</Link>
        <ArticlePreviewList articles={articles} />
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"

        }}>
          <Pagination rootPath={`/blog/categories/${category}`} currentPage={currentPage} numPages={numPages} />
        </div>
      </Container>
    </Layout>
  )

}

export default BlogPostCategoryTemplate

export const query = graphql`
  query($category:String, $skip: Int!, $limit:Int!) {
    categoricalPosts: allContentfulBlogPost(
        sort: {fields: publishDate, order: DESC},
        filter: {category: {in: [$category]}},
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
