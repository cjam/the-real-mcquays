import React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import styles from "./ArticlePreview.module.css"
import { MarkdownRemark } from "../declarations"
import { HeroImage } from "../types"

export interface ArticlePreviewProps {
  heroImage: HeroImage,
  title: string,
  slug: string,
  publishDate:string,
  description: {
    childMarkdownRemark: MarkdownRemark
  }
}


export default (props:ArticlePreviewProps) => (
  <div>
    <Link to={`/blog/${props.slug}`}>
    <Img alt="" sizes={props.heroImage.sizes} />
    <h3 className={styles.previewTitle}>
      <Link to={`/blog/${props.slug}`}>{props.title}</Link>
    </h3>
    </Link>
    <small>{props.publishDate}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: props.description.childMarkdownRemark.html,
      }}
    />
  </div>
)
