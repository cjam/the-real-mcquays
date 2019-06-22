import React from "react"
import Img, { FluidObject } from "gatsby-image"
import styles from "./Hero.module.css"
import { HeroImage } from "../types";


export interface HeroProps {
  name: string,
  heroImage: HeroImage,
  title: string,
  // shortBio
}


export default (props: HeroProps) => (
  <div className={styles.hero}>
    <Img className={styles.heroImage} alt={props.name} sizes={props.heroImage.sizes} />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{props.name}</h3>
      <p className={styles.heroTitle}>{props.title}</p>
      {/* <p>{data.shortBio.shortBio}</p> */}
    </div>
  </div>
)
