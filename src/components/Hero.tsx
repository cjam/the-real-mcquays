import React from "react"
import Img, { FluidObject } from "gatsby-image"
import { HeroImage } from "../types";
import "./Hero.scss"

export interface HeroProps {
  caption?:React.ReactNode
}

const App:React.SFC<HeroProps> = ({caption,children}) => {
  
  return (
    <figure className="hero">
      {children}
      {/* <Img className={styles.heroImage} alt={props.name} sizes={props.heroImage.sizes} /> */}
      <figcaption>
        {caption}
      </figcaption>
    </figure>
  )
}

export default App;
