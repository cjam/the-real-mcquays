  
  // Overwrite the Contentful config with environment variables if they exist
  const contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    // downloadLocal:false,
  }
  
  let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
  
  if(process.env.CONTENTFUL_PREVIEW_TOKEN){
    console.log(`Using Contentful Preview Api`)
    contentfulConfig.host = 'preview.contentful.com'
    contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN
  }

  
  const { spaceId, accessToken } = contentfulConfig
  
  if (!spaceId || !accessToken) {
    throw new Error(
      'Contentful spaceId and the delivery token need to be provided.'
    )
  }
  
  

module.exports = {
    ...contentfulConfig
}