import React from "react"
import Helmet from "react-helmet"

export interface FacebookSEOProps {
    url: string
    locale:string
    type?: string
    title: string
    description: string
    image: string
    siteName?: string
}


const FacebookSEO: React.SFC<FacebookSEOProps> = ({
    url,
    type = "website",
    title,
    description,
    locale,
    image,
    siteName = null,
}) => (
        <Helmet>
            {siteName && <meta property="og:site_name" content={siteName} />}
            <meta property="og:locale" content={locale} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={description} />
        </Helmet>
    );

export default FacebookSEO;