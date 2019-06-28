import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../layouts"
import { get } from "lodash"
import Img from "gatsby-image"
import ArticlePreviewList from "../components/ArticlePreviewList"
import { ArticlePreviewProps } from "../components/ArticlePreview"
import Hero from "../components/Hero"
import "./index.scss"

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    sortedPosts: {
      edges: {

      }
      pageInfo: {
        currentPage: number;
        pageCount: number;
        itemCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      }
    }
  }
}

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  public render() {
    // const posts = get(this, "props.data.allContentfulBlogPost.edges")
    // const [authorNode] = get(this, "props.data.allContentfulPerson.edges")
    // const { node: author } = authorNode;

    // const articlePreviews = posts.map(({ node: { heroImage, description, ...restProps } }: any) => ({
    //   ...restProps,
    //   image: <Img sizes={heroImage.images} />,
    //   descriptionHtml: description.childMarkdownRemark.html
    // }))
    return (
      <Layout>
        {/* <Hero
          caption={(
            <div>
              <h3 style={{margin:0}}>{author.name}</h3>
            </div>
          )}
        > */}
        {/* <Img alt={author.name} sizes={author.heroImage.sizes} />
        </Hero> */}
        {/* <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ArticlePreviewList articles={articlePreviews} />
        </div> */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <h3>Welcome to the future home of the Real McQuays Blog.</h3>
          
          <span style={{ fontSize: 120,margin:0,padding:0 }}>👷‍♀️ 👷‍♂️</span>
          <h4 style={{marginTop:5}}>Currently under construction</h4>
        </div>

      </Layout>
    )
  }
}

// export const pageQuery = graphql`
//   query HomeQuery {
//     sortedPosts: allContentfulBlogPost(sort: {fields: publishDate, order: DESC}, limit: 2) {
//       pageInfo {
//         currentPage
//         hasNextPage
//         hasPreviousPage
//         itemCount
//         pageCount
//         perPage
//       }
//       edges {
//         post: node {
//           title
//           slug
//           publishDate
//           category
//           description {
//             MD: childMarkdownRemark {
//               html
//             }
//           }
//           heroImage {
//             sizes(maxWidth: 350, maxHeight: 250, resizingBehavior: SCALE) {
//               ...GatsbyContentfulSizes_withWebp
//             }
//           }
//         }
//       }
//     }
//     # ,allContentfulPerson(filter:{ email: { eq: "the.real.mcquays@gmail.com" } }) {
//     #   edges {
//     #     node {
//     #       name
//     #       shortBio {
//     #         shortBio
//     #       }
//     #       instagram
//     #       heroImage: image {
//     #         sizes(
//     #           maxWidth: 1180
//     #           maxHeight: 480
//     #           resizingBehavior: PAD
//     #           background: "rgb:000"
//     #         ) {
//     #           ...GatsbyContentfulSizes_withWebp
//     #         }
//     #       }
//     #     }
//     #   }
//     # }
//   }`

