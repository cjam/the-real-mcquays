import React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import styles from "./ArticlePreview.module.scss"
import { MarkdownRemark } from "../declarations"
import { HeroImage } from "../types"
import {DateTime} from "luxon"
import CaptionLabel from "./CaptionLabel";

export interface ArticlePreviewProps {
  image?: React.ReactNode
  title: string
  slug: string
  publishDate: string
  descriptionHtml?: string
  category?:string[]
}


const ArticlePreview :React.SFC<ArticlePreviewProps> = (props) => {
  const {
    slug,
    title,
    image,
    publishDate,
    descriptionHtml = "",
    category
  } = props;
  return (
    <article id={slug} className={styles.postPreview}>
      <header>
        <ul>
          {category != undefined  && category.map(tag=>(
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>
      <figure>
        {image}
        <figcaption>
          <CaptionLabel>
            <time dateTime={publishDate}>{DateTime.fromISO(publishDate).toLocaleString({
              month:"long",
              day:"numeric",
              year:"numeric"
            })}</time>
          </CaptionLabel>
        </figcaption>
      </figure>
      <section>
        <h2>{title}</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: descriptionHtml,
          }}
        />
        <footer>
          <a href={slug} className={styles.action}>
            Read More
            </a>
        </footer>
      </section>
      <Link className={styles.link} to={`/blog/${slug}`} />
    </article>
  )
}

export default ArticlePreview