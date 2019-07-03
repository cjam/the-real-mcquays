import React from "react"
import { graphql, Link } from "gatsby"
import { get, kebabCase } from "lodash"
import Layout from "../layouts"
import "./Categories.scss"

export interface BlogTagsPageProps {
    pageContext: {
        categories: { [key: string]: number }
    }
}

const BlogTagsPage: React.SFC<BlogTagsPageProps> = (props) => {
    const {
        pageContext: {
            categories = {}
        } = {}
    } = props;

    const path = get(props, "pageResources.page.path", "")
    const categoryCount = Object.keys(categories).map(category => ({ category, count: categories[category] }));
    return (
        <Layout seo={{
            path,
            description: `List of article categories`,
            title: "The Real McQuays Blog"
        }}>
            <section className="categories">
                {categoryCount.map(({ category, count }) => (
                    <Link key={category} to={`/blog/categories/${kebabCase(category)}`} >{category}<span>({count})</span></Link>
                ))}
            </section>
        </Layout>
    )
}

export default BlogTagsPage