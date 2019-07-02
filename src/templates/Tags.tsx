import React from "react"
import { graphql, Link } from "gatsby"
import { get, kebabCase } from "lodash"
import Layout from "../layouts"
import "./Tags.scss"

export interface BlogTagsPageProps {
    pageContext:{
        tags:{[key:string]:number}
    }
}

const BlogTagsPage: React.SFC<BlogTagsPageProps> = (props) => {
    const {
        pageContext:{
            tags={}
        }={}
    } = props;

    const path = get(props, "pageResources.page.path", "")
    const tagCount = Object.keys(tags).map(tag=>({tag,count:tags[tag]}));
    return (
        <Layout seo={{
            path,
            description: `List of article tags`,
            title: "The Real McQuays Blog"
        }}>
            <section className="tags">
                {tagCount.map(({tag,count}) => (
                    <Link key={tag} to={`/blog/tags/${kebabCase(tag)}`} >{tag}<span>({count})</span></Link>
                ))}
            </section>
        </Layout>
    )
}

export default BlogTagsPage