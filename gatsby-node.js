const _ = require(`lodash`)
const path = require(`path`)
const slash = require(`slash`)
const {postsPerPage} = require('./config/website')

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions


  // The “graphql” function allows us to run arbitrary
  // queries against the local Contentful graphql schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  try {
    const result = await graphql(
      `
      {
        allContentfulBlogPost (
          sort: {fields: publishDate, order: DESC}
        ) {
          edges {
            next{
              slug
              title
            }
            previous{
              slug
              title
            }
            node {
              title
              slug
            }
          }
        }
      }
      `
    );

    const posts = result.data.allContentfulBlogPost.edges
    const blogPostTemplate = path.resolve(`./src/templates/BlogPost.tsx`)
    posts.forEach((post) => {
      createPage({
        path: `/blog/${post.node.slug}/`,
        component: slash(blogPostTemplate),
        context: {
          slug: post.node.slug,
          previousPost: post.previous,
          nextPost: post.next
        },
      })
    });


    // Create blog-list pages
    const numPages = Math.ceil(posts.length / postsPerPage)
    const blogPostListTemplate = path.resolve("./src/templates/BlogPostList.tsx")
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: slash(blogPostListTemplate),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

  } catch (error) {
    throw error
  }

  // return graphql(
  //   `
  //     {
  //       allContentfulProduct(limit: 1000) {
  //         edges {
  //           node {
  //             id
  //           }
  //         }
  //       }
  //     }
  //   `
  // )
  //   .then(result => {
  //     if (result.errors) {
  //       throw result.errors
  //     }

  //     // Create Product pages
  //     const productTemplate = path.resolve(`./src/templates/product.js`)
  //     // We want to create a detailed page for each
  //     // product node. We'll just use the Contentful id for the slug.
  //     _.each(result.data.allContentfulProduct.edges, edge => {
  //       // Gatsby uses Redux to manage its internal state.
  //       // Plugins and sites can use functions like "createPage"
  //       // to interact with Gatsby.
  //       createPage({
  //         // Each page is required to have a `path` as well
  //         // as a template component. The `context` is
  //         // optional but is often necessary so the template
  //         // can query data specific to each page.
  //         path: `/products/${edge.node.id}/`,
  //         component: slash(productTemplate),
  //         context: {
  //           id: edge.node.id,
  //         },
  //       })
  //     })
  //   })
  //   .then(() => {
  //     graphql(
  //       `
  //         {
  //           allContentfulCategory(limit: 1000) {
  //             edges {
  //               node {
  //                 id
  //               }
  //             }
  //           }
  //         }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         throw result.errors
  //       }

  //       // Create Category pages
  //       const categoryTemplate = path.resolve(`./src/templates/category.js`)
  //       // We want to create a detailed page for each
  //       // category node. We'll just use the Contentful id for the slug.
  //       _.each(result.data.allContentfulCategory.edges, edge => {
  //         // Gatsby uses Redux to manage its internal state.
  //         // Plugins and sites can use functions like "createPage"
  //         // to interact with Gatsby.
  //         createPage({
  //           // Each page is required to have a `path` as well
  //           // as a template component. The `context` is
  //           // optional but is often necessary so the template
  //           // can query data specific to each page.
  //           path: `/categories/${edge.node.id}/`,
  //           component: slash(categoryTemplate),
  //           context: {
  //             id: edge.node.id,
  //           },
  //         })
  //       })
  //     })
  //   })
}


