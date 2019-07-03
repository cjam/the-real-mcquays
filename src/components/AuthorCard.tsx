import React from "react";
import Image, { FluidObject, FixedObject } from "gatsby-image";
import "./AuthorCard.scss"
import { graphql } from "gatsby";
import {kebabCase} from "lodash"



export interface AuthorCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    instagram?: string
    image?: {
        fixed: FixedObject
    }
    shortBio: {
        MD: {
            html: string;
        }
    }
    bioMarkdown?: string
}

export const queryFragment = graphql`
  fragment AuthorCard on ContentfulPerson{
    name
    instagram
    shortBio {
        MD:childMarkdownRemark {
        html
        }
    }
    image{
        fixed(width:120,height:120,quality:100){
        ...GatsbyContentfulFixed_withWebp
        }
    }
  }
`

const AuthorCard: React.SFC<AuthorCardProps> = (props) => {
    const {
        name = "",
        instagram,
        image,
        shortBio: {
            MD: {
                html:bioHtml = ""
            } = {}
        } = {}
    } = props
    return (
        <div className="author-card" >
            <figure>
                <Image {...image} />
            </figure>
            <div className="details">
                <h3 className="name">{name}</h3>
                {bioHtml && <p className="bio" dangerouslySetInnerHTML={{ __html: bioHtml }} />}

                <ul className="links">
                    <li>
                        <a href={`/blog/authors/${kebabCase(name.toLowerCase())}`}>All Posts</a>
                    </li>
                    {instagram && <li><a className="instagram" href={`https://www.instagram.com/${instagram}`}>Instagram</a></li>}
                </ul>

            </div>
        </div>
    )
}

export default AuthorCard;
