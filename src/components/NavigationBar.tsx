import React from "react"
import Link from "gatsby-link"
import "./NavigationBar.scss"
import { graphql, useStaticQuery } from "gatsby";
import classNames from "classnames"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "typeface-great-vibes"

interface NavigationBarProps {
  currentPath?: string
}

interface QueryProps {
  site: {
    siteMetadata: {
      navigation: {
        links: Array<{ to: string, label: string, exactMatch?: boolean }>
      },
      social: {
        instagram?: string
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
            social{
              instagram
            }
          }
      }
  }
`

function isPathMatch(current: string, link: string, exact = false) {
  const currentPath = `${current}`.toLowerCase()
  const linkPath = `${link}`.toLowerCase()

  console.log("CURRENT",currentPath,"LINK",linkPath)
  console.log(currentPath.indexOf(linkPath));
  return exact ? currentPath === linkPath : currentPath.indexOf(linkPath) >= 0

}

const NavigationBar: React.SFC<NavigationBarProps> = ({ currentPath = "/" }) => {
  const {
    site: {
      siteMetadata: {
        navigation: {
          links = []
        },
        social = {}
      }
    }
  } = useStaticQuery<QueryProps>(query);
  return (
    <div className="navigation-content">

      <span className="navigationItem brand">
        The Real McQuays
        <Link className="phantom-full" to={"/"} />
      </span>

      <div className="nav-buttons">
        <ul className="navigation">
          {links.map(({ to, label, exactMatch = false }) => (
            <li key={to} className={classNames({
              "navigationItem": true,
              "active": isPathMatch(currentPath, to, exactMatch)
            })}>
              <span>{label}</span>
              <Link className="phantom-full" to={to} />
            </li>
          ))}
        </ul>

        <span className="navigationItem instagram">
          <FontAwesomeIcon size="lg" icon={faInstagram} />
          <a className="phantom-full" href={`https://www.instagram.com/${social.instagram}`} />
        </span>
      </div>


      {/* <span className="navigationItem instagram">
        <FontAwesomeIcon size="lg" icon={faInstagram} />
        <a className="phantom-full" href={`https://www.instagram.com/${social.instagram}`} />
      </span> */}
    </div>
  )
}

export default NavigationBar;