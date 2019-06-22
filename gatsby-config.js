try {
  // Load the Contentful config from the .contentful.json
  loadedContentfulConfig = require('./.contentful')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || loadedContentfulConfig.spaceId,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || loadedContentfulConfig.accessToken,
}

let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

console.log("Active Environment",activeEnv)
if(activeEnv === 'development'){
  previewToken = loadedContentfulConfig.previewToken;
  if(previewToken != undefined){
    console.log(`Using Contentful Preview Api`)
    contentfulConfig.host = 'preview.contentful.com'
    contentfulConfig.accessToken = previewToken
  }
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteTitle: `The Real McQuays`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-typescript-css-modules`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options:{
        plugins:[
          {
            resolve:'gatsby-remark-images-contentful',
            options:{
              maxWidth:700
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
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
        omitGoogleFont: true,
      },
    }
  ],
}
