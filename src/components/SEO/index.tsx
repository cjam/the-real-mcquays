import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql, useStaticQuery } from "gatsby"
import FacebookSEO from "./Facebook"
import TwitterSEO from "./Twitter"
import { StructuredArticlePage, StructuredBreadcrumbs, StructuredOrgWebPage, Breadcrumb } from "./StructuredData"

// const SEO = ({ title, description, image, pathname, article }) => ()

export interface SEOProps {
    title?: string
    description?: string
    pathname?: string
    article: boolean
    image?: string
    dateModifed?:string
    datePublished?:string
}

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        defaultTitle: title
        defaultDescription: description
        defaultImage: image
        titleTemplate
        headline
        siteLanguage
        ogLanguage
        author
        twitter
        facebookSite
      }
    }
  }
`

const SEO: React.SFC<SEOProps> = ({
    title,
    description,
    pathname,
    article = false,
    image,
    dateModifed,
    datePublished
}) => {
    const { site } = useStaticQuery(query)

    const {
        buildTime,
        siteMetadata: {
            siteUrl,
            titleTemplate,
            defaultTitle,
            defaultDescription,
            defaultImage,
            headline,
            siteLanguage,
            ogLanguage,
            author,
            twitter,
            facebookSite,
        },
    } = site

    const breadcrumbs: Breadcrumb[] = [
        {
            url: siteUrl,
            name: "Homepage"
        }
    ]

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || ""}`,
    }

    // Just some defaults for seo dates
    const publishDate = datePublished || Date.now().toString()
    const modifiedDate = dateModifed || Date.now().toString()

    // If it's an article, push in a breadcrumb
    if (article) {
        breadcrumbs.push({
            url: seo.url,
            name: seo.title
        })
    }
    
    return (
        <>
            <StructuredBreadcrumbs items={breadcrumbs} />
                {!article && <StructuredOrgWebPage
                    title={seo.title}
                    description={seo.description}
                    image={seo.image}
                    siteUrl={siteUrl}
                    defaultTitle={defaultTitle}
                    defaultDescription={defaultDescription}
                    defaultImage={defaultImage}
                    headline={headline}
                    siteLanguage={siteLanguage}
                    author={author}
                    buildTime={buildTime}
                />}
            {article && <StructuredArticlePage
                    pageUrl={seo.url}
                    siteUrl={siteUrl}
                    title={seo.title}
                    description={seo.description}
                    image={seo.image}
                    defaultImage={defaultImage}
                    author={author}
                    dateModified={modifiedDate}
                    datePublished={publishDate}
                />}
            <StructuredBreadcrumbs items={breadcrumbs}/>
            <FacebookSEO
                url={seo.url}
                type={article ? "article" : "website"}
                title={seo.title}
                description={seo.description}
                image={seo.image}
                locale={ogLanguage}
                siteName={facebookSite}
            />
            <TwitterSEO
                username={twitter}
                title={seo.title}
                description={seo.description}
                image={seo.image}
            />
            <Helmet defaultTitle={defaultTitle} titleTemplate={titleTemplate}>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="image" content={seo.image} />
            </Helmet>
        </>
    )
}

export default SEO