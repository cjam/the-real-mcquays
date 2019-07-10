import React from "react"
import { graphql, Link } from "gatsby"
import { get, kebabCase } from "lodash"
import Layout from "../layouts"
import "./Categories.scss"
import CaptionLabel from "../components/CaptionLabel"
import Container from "../components/Container";


export interface BlogCategoriesPageProps {
    pageContext: {
        categories: { [key: string]: number }
    }
}

const BlogCategoriesPage: React.SFC<BlogCategoriesPageProps> = (props) => {
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
            <Container>
                <h2>List of Article Categories</h2>
                <section className="categories">
                    {categoryCount.map(({ category, count }) => (
                        <Link key={category} to={`/blog/categories/${kebabCase(category)}`} >
                            <CaptionLabel>
                                {category}<span>({count})</span>
                            </CaptionLabel>
                        </Link>
                    ))}
                </section>
            </Container>
        </Layout>
    )
}

export default BlogCategoriesPage