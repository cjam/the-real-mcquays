import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../layouts"
import { get } from "lodash"
import Img, { FluidObject } from "gatsby-image"
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

export default class MapPage extends React.Component<IndexPageProps, {}> {
  public render() {
    return (
      <Layout seo={{
          path:"/map",
          description:"Travel Map / Itinerary",
          title:"Travel Map",
      }}>
          <TravelMap/>
      </Layout>
    )
  }
}

