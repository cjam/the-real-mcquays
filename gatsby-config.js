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
    twitter: website.twitter,
    facebookSite: website.facebookSite,
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
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography.js`,
    //     omitGoogleFont: true,
    //   },
    // },
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
    }
    // ,    'gatsby-plugin-sitemap',
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
