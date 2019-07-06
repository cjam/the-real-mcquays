import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Link from "gatsby-link"
import "./PageFooter.scss"

export interface FooterProps {

}

interface QueryProps {
    site: {
        siteMetadata: {
            footer: {
                links: Array<{ to: string, label: string }>
            },
            author: string
        }
    }
}

export const query = graphql`
    query footerQuery{
        site {
            siteMetadata {
                footer {
                    links {
                        label
                        to
                    }
                }
                author
            }
        }
    }
`


const Footer: React.SFC<FooterProps> = (props) => {
    const { site } = useStaticQuery<QueryProps>(query)
    const {
        siteMetadata: {
            footer: {
                links = []
            } = {},
            author = ""
        } = {}
    } = site;

    return (
        <div className="page-footer">
            <ul className="links">
                {links.map(({ to, label }, i) => (
                    <li key={to}>
                        <Link to={to}>{label}</Link>
                    </li>
                ))}
            </ul>
            <section className="copyright">
                <span className="credits">Made by us, with ❤</span>
                © {new Date().getFullYear()} {author}
            </section>
        </div>
    )
}

export default Footer