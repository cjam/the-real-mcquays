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
import ElevationGraph from "../components/ElevationGraph"


export default class TrekPage extends React.Component {
  public render() {
    return (
      <Layout
        seo={{
          path: "/trek",
          description: "Trek Dashboard",
          title: "Trek Dashboard",
        }}
      >
        <Container>
          <center>
            <h3>Trek Dashboard</h3>
          </center>
          <ElevationGraph />
          <div className="subtle">
            <p>
              This dashboard was happily hacked together by Colter and may have some bugs as he had a trek to go on.
            If left open, the dashboard should update itself with our approximate where-abouts every minute.  🤞that it works.
            </p>
            <p>Enjoy 😊 and Namaste 🙏</p>
          </div>
        </Container>
      </Layout>
    )
  }
}

