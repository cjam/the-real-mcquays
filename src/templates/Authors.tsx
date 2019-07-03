import React from "react"
import { graphql, Link } from "gatsby"
import { get, kebabCase } from "lodash"
import Layout from "../layouts"
import "./Authors.scss"
import AuthorCard, { AuthorCardProps } from "../components/AuthorCard";

export interface BlogTagsPageProps {
    data: {
        authors: {
            edges: Array<{
                author: AuthorCardProps
            }>
        }
    }
    pageContext: {
        authors: { [key: string]: number }
    }
}

const BlogTagsPage: React.SFC<BlogTagsPageProps> = (props) => {
    const {
        data: {
            authors: {
                edges: authorCards
            }
        },
        pageContext: {
            authors = {}
        } = {}
    } = props;

    const path = get(props, "pageResources.page.path", "")
    const authorCount = Object.keys(authors).map(author => ({ author, count: authors[author] }));
    return (
        <Layout seo={{
            path,
            description: `List of article authors`,
            title: "The Real McQuays Blog"
        }}>
            <section className="authors">
                {authorCards.map(({ author }) => (
                    <AuthorCard key={author.name} {...author} />
                ))}
                {/* {authorCount.map(({ author, count }) => (
                    <Link key={author} to={`/blog/authors/${kebabCase(author)}`} >{author}<span>({count})</span></Link>
                ))} */}
            </section>
        </Layout>
    )
}

export default BlogTagsPage

export const query = graphql`
  query($authorNames:[String]){
    authors:allContentfulPerson(        
        sort: {fields: name, order: DESC},
        filter: {name:{in: $authorNames}}
    ){
        edges{
            author:node{
                ...AuthorCard
            }
        }
    }
  }
`