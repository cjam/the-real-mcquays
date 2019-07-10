import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Link from "gatsby-link"
import "./PageFooter.scss"
import {faInstagram} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export interface FooterProps {

}

interface QueryProps {
    site: {
        siteMetadata: {
            footer: {
                links: Array<{ to: string, label: string }>
            },
            author: string,
            social: {
                instagram?: string
                twitter?: string
                facebook?: string
            }
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
                social{
                    instagram
                }
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
            author = "",
            social = {}
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
                {social.instagram && (
                    <li>
                        <a href={`https://www.instagram.com/${social.instagram}`}>
                            <FontAwesomeIcon icon={faInstagram}  />
                        </a>
                    </li>
                )}
            </ul>
            <section className="copyright">
                <span className="credits">Made by us, with ❤</span>
                © {new Date().getFullYear()} {author}
            </section>
        </div>
    )
}

export default Footer