import React from "react"
import Helmet from "react-helmet"

export interface StructuredDataProps {
    siteUrl: string
    title: string
    description: string
    image: string
    defaultImage?: string
    author?: string
    siteLanguage?: string
}

export interface StructuredDataOrgWebPageProps extends StructuredDataProps {
    buildTime: string
    defaultTitle: string
    defaultDescription?: string
    headline?: string
}

export const StructuredOrgWebPage: React.SFC<StructuredDataOrgWebPageProps> = ({
    siteUrl,
    defaultTitle,
    defaultDescription,
    defaultImage,
    headline,
    siteLanguage,
    author,
    buildTime
}) => {
    // schema.org in JSONLD format
    // https://developers.google.com/search/docs/guides/intro-structured-data
    // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')
    const metaData = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        url: siteUrl,
        headline,
        inLanguage: siteLanguage,
        mainEntityOfPage: siteUrl,
        description: defaultDescription,
        name: defaultTitle,
        author: {
            "@type": "Person",
            name: author,
        },
        copyrightHolder: {
            "@type": "Person",
            name: author,
        },
        copyrightYear: new Date().getFullYear(),
        creator: {
            "@type": "Person",
            name: author,
        },
        publisher: {
            "@type": "Person",
            name: author,
        },
        datePublished: "2019-06-18T10:30:00+01:00",
        dateModified: buildTime,
        image: {
            "@type": "ImageObject",
            url: `${siteUrl}${defaultImage}`,
        },
    }
    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(metaData)}</script>
        </Helmet>
    )
}

export interface StructuredArticlePageProps extends StructuredDataProps {
    pageUrl: string
    datePublished:string
    dateModified:string
}

export const StructuredArticlePage: React.SFC<StructuredArticlePageProps> = ({
    pageUrl,
    siteUrl,
    title,
    description,
    image,
    defaultImage,
    author,
    datePublished,
    dateModified,
    siteLanguage
}) => {
    // schema.org in JSONLD format
    // https://developers.google.com/search/docs/guides/intro-structured-data
    // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')
    const metaData = {
        "@context": "http://schema.org",
        "@type": "Article",
        author: {
            "@type": "Person",
            name: author,
        },
        copyrightHolder: {
            "@type": "Person",
            name: author,
        },
        copyrightYear: new Date().getFullYear,
        creator: {
            "@type": "Person",
            name: author,
        },
        publisher: {
            "@type": "Organization",
            name: author,
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}${defaultImage}`,
            },
        },
        datePublished,
        dateModified,
        description,
        headline: title,
        inLanguage: siteLanguage,
        url: pageUrl,
        name: title,
        image: {
            "@type": "ImageObject",
            url: image,
        },
        mainEntityOfPage: pageUrl,
    }
    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(metaData)}</script>
        </Helmet>
    )
}

export interface Breadcrumb {
    url: string
    name: string
}

export interface StructuredBreadcrumbProps {
    items: Breadcrumb[]
}


export const StructuredBreadcrumbs: React.SFC<StructuredBreadcrumbProps> = ({ items = [] }) => {
    const metadata = {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        description: "Breadcrumbs list",
        name: "Breadcrumbs",
        itemListElement: items.map(({ url, name }, index) => ({
            "@type": "ListItem",
            item: {
                "@id": url,
                name
            },
            position: index
        }))
    }

    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(metadata)}</script>
        </Helmet>
    )
}

