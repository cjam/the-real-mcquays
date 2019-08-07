import React from "react"
import { StaticQuery, graphql, useStaticQuery } from "gatsby"
import { DiscussionEmbed } from "disqus-react";

export interface CommentsProps {
    title: string
    slug:string
    path: string
}

const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

const Comments: React.SFC<CommentsProps> = ({
    title,
    slug,
    path,
}) => {
    const { site: {
        siteMetadata: {
            siteUrl
        }
    } } = useStaticQuery(query)

    return (
        <DiscussionEmbed
            shortname={process.env.GATSBY_DISQUS_NAME!}
            config={{
                identifier: slug,
                title,
                url: `${siteUrl}/${path}`
            }}
        />
    )
}

export default Comments