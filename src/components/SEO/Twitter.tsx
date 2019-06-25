import React from "react"
import Helmet from "react-helmet"

export interface TwitterSEOProps {
    type?: string,
    username?: string,
    title: string,
    description: string,
    image: string,
}


const TwitterSEO: React.SFC<TwitterSEOProps> = ({
    type = "summary_large_image",
    username,
    title,
    description,
    image,
}) => (
        <Helmet>
            {username && <meta name="twitter:creator" content={username} />}
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={description} />
        </Helmet>
    );

export default TwitterSEO;