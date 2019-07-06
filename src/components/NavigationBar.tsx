import React from "react"
import Link from "gatsby-link"
import "./NavigationBar.scss"
import { graphql, useStaticQuery } from "gatsby";
import classNames from "classnames"

interface NavigationBarProps {
  currentPath?: string
}

interface QueryProps {
  site: {
    siteMetadata: {
      navigation: {
        links: Array<{ to: string, label: string, exactMatch?:boolean }>
      }
    }
  }
}

export const query = graphql`
  query{
      site {
          siteMetadata {
            navigation {
                  links {
                      label
                      to
                      exactMatch
                  }
              }
          }
      }
  }
`

function isPathMatch(current: string, link: string, exact = false) {
  const currentPath = `${current}`.toLowerCase()
  const linkPath = `${link}`.toLowerCase()
  
  console.log("toMatch",linkPath,"current",currentPath,exact);
  return exact ? currentPath === linkPath : currentPath.indexOf(linkPath) >= 0

  }

const NavigationBar: React.SFC<NavigationBarProps> = ({ currentPath = "/" }) => {
  const {
    site: {
      siteMetadata: {
        navigation: {
          links = []
        }
      }
    }
  } = useStaticQuery<QueryProps>(query);
  return (
    <div className="navigation-content">
      <ul className="navigation">
        {links.map(({ to, label, exactMatch=false }) => (
          <li key={to} className={classNames({
            "navigationItem": true,
            "active": isPathMatch(currentPath,to,exactMatch)
          })}>
            <span>{label}</span>
            <Link to={to} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavigationBar;