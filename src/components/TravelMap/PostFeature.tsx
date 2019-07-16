import React from "react"
import { Marker, MarkerProps, InfoWindow, InfoWindowProps } from "react-google-maps"
import pencilSvg from "../../assets/pencil.svg";
import bookSvg from "../../assets/book-open.svg"
import textPng from "../../assets/text-icon.png"
import { Link, graphql } from "gatsby";
import Image, { FluidObject, FixedObject } from "gatsby-image";
import "./PostFeature.scss"
import { dateDisplay } from "../../utils/datetime";

const bookIcon = {
    url: bookSvg,
    anchor: { x: 25, y: 50 },
    shape: {},
    scaledSize: {
        width: 50,
        height: 50
    }
}

const pencilIcon = {
    // path: window.google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
    url: pencilSvg,
    anchor: { x: 0, y: 50 },
    shape: {},
    scaledSize: {
        width: 50,
        height: 50
    }
}

const textIcon = {
    // path: window.google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
    url: textPng,
    anchor: { x: 20, y: 40 },
    shape: {},
    scaledSize: {
        width: 40,
        height: 40
    }
}

export const postFeatureFragment = graphql`
    fragment PostFeatureFragment on ContentfulBlogPost{
        location {
        lat
        lng:lon
      }
      title
      slug
      description {
        text: childMarkdownRemark {
          excerpt(format: PLAIN, pruneLength: 100)
        }
      }
      body {
        doc: childMarkdownRemark {
          timeToRead
        }
      }
      publishDate
    #   image:heroImage {
    #     fixed(height: 75, quality: 70) {
    #         ...GatsbyContentfulFixed_withWebp
    #     }
    #   }
    }
`

export interface PostFeature {
    location: {
        lat: number
        lng: number
    }
    title: string
    slug: string
    description: {
        text: {
            excerpt: string
        }
    }
    body:{
        doc:{
            timeToRead:number
        }
    }
    publishDate:string
    // image: {
    //     fixed: FixedObject
    // }
}


export interface PostMarkerProps {
    feature: PostFeature
}

export const PostMarker: React.SFC<PostMarkerProps & MarkerProps> = ({
    feature,
    children,
    ...restProps
}) => {
    const { location } = feature;
    return (
        <Marker
            position={location}
            {...restProps}
            icon={textIcon}
        >
            {children}
        </Marker>
    )
}

export const PostInfoWindow: React.SFC<PostMarkerProps & InfoWindowProps> = (
    {
        feature: { title, slug, description = {}, body,publishDate }
        , ...restProps
    }
) => (
        <InfoWindow  {...restProps}>
            <div className="post-feature-info-content">
                <h3 className="title">{title}</h3>
                <div className="published">{dateDisplay(publishDate)}</div>
                <div className="time-to-read">Time To Read: <span>2 mins</span></div>
                {/* <figure>
                    <Image {...image} />
                </figure> */}
                <div className="excerpt">
                    {description.text.excerpt}
                </div>
                
                <Link to={`/blog/${slug}`}>Read More...</Link>
            </div>
        </InfoWindow>
    )