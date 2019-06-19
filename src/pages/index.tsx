import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../layouts"
import {get} from "lodash"
import ArticlePreviewList from "../components/ArticlePreviewList"
import { ArticlePreviewProps } from "../components/ArticlePreview"
import Hero from "../components/Hero"

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
}

// export const pageQuery = graphql`
//   query IndexQuery {
//     site {
//       siteMetadata {
//         siteName
//       }
//     }
//   }
// `

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  readonly hello = `Hello`
  public render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const posts = get(this, "props.data.allContentfulBlogPost.edges")
    const [authorNode] = get(this, "props.data.allContentfulPerson.edges")
    const {node:author} = authorNode;
    console.log(author)
    return (
      <Layout>
        <Hero name={author.name} title={author.name} heroImage={author.heroImage}/>
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ArticlePreviewList articles={posts.map(({node}:{node:ArticlePreviewProps})=>node)}/>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        siteName
      }
    },
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
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
    },
    allContentfulPerson(filter:{ email: { eq: "the.real.mcquays@gmail.com" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          instagram
          heroImage: image {
            sizes(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000"
            ) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
        }
      }
    }
  }`

