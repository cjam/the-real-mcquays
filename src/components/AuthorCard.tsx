import React from "react";
import Image, { FluidObject, FixedObject } from "gatsby-image";
import "./AuthorCard.scss"



interface AuthorCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    instagram?: string
    image?: FixedObject
    bioMarkdown?: string
}

const AuthorCard: React.SFC<AuthorCardProps> = (props) => {
    const { name = "", instagram, image, bioMarkdown } = props
    return (
        <div className="author-card" >
            <figure>
                <Image fixed={image} />
            </figure>
            <div className="details">
                <h3 className="name">{name}</h3>
                {bioMarkdown && <p className="bio" dangerouslySetInnerHTML={{ __html: bioMarkdown }} />}
                
                <ul className="links">
                    <li>
                        <a href={`blog/author/${name.toLowerCase().replace(" ", "-")}`}>All Posts</a>
                    </li>
                    {instagram && <li><a className="instagram" href={`https://www.instagram.com/${instagram}`}>Instagram</a></li>}
                </ul>

            </div>
        </div>
    )
}

export default AuthorCard;
