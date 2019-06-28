import React from "react"
import Link from "gatsby-link"
import Img, { FluidObject } from "gatsby-image"
import styles from "./ArticlePreview.module.scss"
import { graphql } from "gatsby"
import { MarkdownRemark } from "../declarations"
import { HeroImage } from "../types"
import { DateTime } from "luxon"
import CaptionLabel from "./CaptionLabel";




export interface ArticlePreviewProps {
  title: string;
  slug: string;
  publishDate: string;
  image: {
    sizes: FluidObject;
  }
  description: {
    MD: {
      html: string
    }
  }
  category: string[];
}


export const queryFragment = graphql`
  fragment ArticlePreviewInfo on ContentfulBlogPost{
    title
    slug
    publishDate
    category
    description {
      MD: childMarkdownRemark {
        html
      }
    }
    image:heroImage {
      sizes(maxWidth: 800, maxHeight:550, resizingBehavior: FILL) {
        ...GatsbyContentfulSizes_withWebp
        # ...GatsbyContentfulFixed_withWebp
      }
    }
  }
`

const ArticlePreview: React.SFC<ArticlePreviewProps> = (props) => {
  const {
    slug,
    title,
    image,
    publishDate,
    description: {
      MD: {
        html:descriptionHtml = ""
      } = {}
    } = {},
    category
  } = props;
  return (
    <article id={slug} className={styles.postPreview}>
      <header>
        <ul>
          {category != undefined && category.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>
      <figure>
        <Img {...image}/>
        <figcaption>
          <CaptionLabel>
            <time dateTime={publishDate}>{DateTime.fromISO(publishDate).toLocaleString({
              month: "long",
              day: "numeric",
              year: "numeric"
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