import { FluidObject } from "gatsby-image"

export interface HeroImage {
    sizes?: FluidObject
  }

export interface BlogPost{
        title: string
        slug: string
        publishDate: string
        tags?: any
        heroImage: HeroImage
}