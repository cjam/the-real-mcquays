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
    ...contentfulConfig
}