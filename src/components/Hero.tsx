import React from "react"
import Img, { FluidObject } from "gatsby-image"
import { HeroImage } from "../types";
import "./Hero.scss"

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  caption?: React.ReactNode
}

const Hero: React.SFC<HeroProps> = ({ caption, children, className = "", ...restProps }) => {

  return (
    <figure className={`hero ${className}`} {...restProps}>
      {children}
      <figcaption>
        {caption}
      </figcaption>
    </figure>
  )
}

export default Hero;
