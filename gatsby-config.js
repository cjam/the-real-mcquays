require("dotenv").config({
  path:`.env.${process.env.NODE_ENV}`
});

const website = require('./config/website')
const contentfulConfig = require('./config/contentful')

const pathPrefix = website.pathPrefix === '/' ? '' : website.pathPrefix

module.exports = {
  pathPrefix: website.pathPrefix,
  siteMetadata: {
    siteUrl: website.url + pathPrefix, // For gatsby-plugin-sitemap
    pathPrefix,
    title: website.title,
    titleTemplate: website.titleTemplate,
    titleAlt: website.titleAlt,
    description: website.description,
    image: website.image,
    headline: website.headline,
    siteLanguage: website.siteLanguage,
    ogLanguage: website.ogLanguage,
    author: website.author,
    social: website.social,
    footer: website.footer,
    navigation: website.navigation
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images-contentful',
            options: {
              maxWidth: 700
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          website.googleAnalyticsID
        ],
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: [
            "/blog/preview**"
          ]
        }
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        setup: () => ({
          custom_namespaces:{
            'geo':'http://www.georss.org/georss/georss.xsd'
          },
          copyright:`${new Date().getFullYear()} ${website.author}`,
          title: `${website.title} RSS Feed`,
          feed_url: `${website.url}/${website.rssXmlFile}`
        }),
        feeds: [
          {

            serialize: ({ query: { site, posts } }) => {
              return posts.nodes.map(node => {
                const postUrl = `${site.siteMetadata.siteUrl}/blog/${node.slug}`
                const item = ({
                  language: website.siteLanguage,
                  title: node.title,
                  author: node.author.name,
                  description: node.body.md.html,
                  date: node.publishDate,
                  url: postUrl,
                  guid: postUrl,
                  categories: node.category
                })
                if (node.location) {
                  item.lat = node.location.lat
                  item.long = node.location.lng
                }
                return item;
              })
            },
            query: `
              {
                posts:allContentfulBlogPost(sort: {fields: publishDate, order: ASC}) {
                  nodes {
                    title
                    author{
                      name
                    }
                    location{
                      lat
                      lon
                    }
                    description {
                      md:childMarkdownRemark {
                        excerpt
                      }
                    }
                    body {
                      md:childMarkdownRemark {
                        html
                      }
                    }
                    publishDate
                    slug
                  }
                }
              }
            `,
            output: `/${website.rssXmlFile}`,
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            // match: "^/blog/",
          },
        ],
      }
    }
    , 'gatsby-plugin-sitemap'
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     name: website.title,
    //     short_name: website.titleAlt,
    //     description: website.description,
    //     start_url: pathPrefix,
    //     background_color: website.backgroundColor,
    //     theme_color: website.themeColor,
    //     display: 'standalone',
    //     icon: website.favicon,
    //   },
    // },
    // // Must be placed at the end
    // 'gatsby-plugin-offline',
    // 'gatsby-plugin-netlify',
  ],
}
