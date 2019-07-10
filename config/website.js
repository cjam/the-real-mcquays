module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'The Real McQuays', // Navigation and Site Title
  titleAlt: 'The Real McQuays', // Title for JSONLD
  titleTemplate: '%s · The Real McQuays',
  description: 'The Real McQuays',
  headline: 'The Real McQuays', // Headline for schema.org JSONLD
  url: 'https://therealmcquays.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  image: '/logos/logo-1024.jpg', // Used for SEO
  ogLanguage: 'en_US', // Facebook Language

  // JSONLD / Manifest
  favicon: 'src/favicon.png', // Used for manifest favicon generation
  shortName: 'RealMcquays', // shortname for manifest. MUST be shorter than 12 characters
  author: 'The Real McQuays', // Author for schemaORGJSONLD

  googleAnalyticsID: "UA-142542893-1",

  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
  itemsPerPage: 6,              // Use for pagination routines

  navigation: {
    links: [
      { to: '/', label: "Home", exactMatch: true },
      { to: '/blog', label: "Blog" },
      // { to: '#', label: "Contact"},
    ]
  },
  footer: {
    links: [
      { to: '/blog', label: "Blog" },
      { to: '/blog/tags', label: "Tags" },
      { to: '/blog/categories', label: "Categories" },
      // { to: '#', label: "Contact"},
    ],
  },
  social: {
    twitter: '',
    facebook: '',
    instagram: 'the.real.mcquays',
    pintrest: '',
    youtube: ''
  }
}