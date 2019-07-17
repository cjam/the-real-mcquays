import { graphql, Link } from "gatsby"
import * as React from "react"
import Layout from "../layouts"
import { get } from "lodash"
import Img, { FluidObject, GatsbyImageProps } from "gatsby-image"
import ArticlePreviewList from "../components/ArticlePreviewList"
import { ArticlePreviewProps } from "../components/ArticlePreview"
import Hero from "../components/Hero"
import "./index.scss"
import AuthorCard from "../components/AuthorCard";
import Container from "../components/Container";
import TravelMap from "../components/TravelMap";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    homePageHero: GatsbyImageProps & { description: string }
    sortedPosts: {
      edges: Array<{
        post: ArticlePreviewProps
      }>
    }
    siteAuthor: {
      name: string;
      heroImage: {
        fluid: FluidObject
      }
    }
  }
}

export default class IndexPage extends React.Component<IndexPageProps, {}> {
  public render() {
    const { data: {
      homePageHero,
      sortedPosts: {
        edges: posts = []
      },
      siteAuthor: author
    } } = this.props;
    return (
      <Layout>
        <Container>
          <figure className="index-hero">
            <Img {...homePageHero} />
            <figcaption>
              {homePageHero.description}
            </figcaption>
            <Link to={"/map"} className="phantom-full" />
          </figure>
          <h2>Recent Posts</h2>
          <ArticlePreviewList articles={posts.map(({ post }) => post)} />
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
  query{
    homePageHero:contentfulAsset(title:{eq:"Home Page Hero"}){
      fluid(maxHeight:500,maxWidth:2000,quality:70){
          ...GatsbyContentfulFluid_withWebp
      }
      description
    }
    sortedPosts:allContentfulBlogPost(sort: {fields: publishDate, order: DESC}, limit: 3) {
      edges {
        post:node {
          ...ArticlePreviewInfo
        }
      }
    }
    siteAuthor:contentfulPerson(email: {eq: "the.real.mcquays@gmail.com"}) {
      ...AuthorCard
      name
      heroImage {
        fluid(maxWidth:2000,quality:70){
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;

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

