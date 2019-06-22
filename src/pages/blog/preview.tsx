import React from "react"
import Link from "gatsby-link"
import { get } from "lodash"
import styles from "./blog.module.css"
import * as contentful from "contentful"
import * as contentfulImages from "../../utils/contentful-images"
// tslint:disable-next-line:no-submodule-imports
import Remark from "remark"
import remarkHtml from "remark-html"
import BlogPostTemplate from "../../templates/BlogPost"
import Layout from "../../layouts"

class BlogPreview extends React.Component<any, any> {
  state: any = {}
  componentDidMount() {
    // Get the query parameters from window location
    const params = window.location.search.substr(1).split("&")
      .reduce((map, paramStr) => {
        const parts = paramStr.split("=")
        map[parts[0]] = parts[1]
        return map
      }, {} as any)
    const { id: postId, ...restParams } = params

    // Create contentful config & request
    const contentfulConfig = {
      host: "preview.contentful.com",
      accessToken: restParams.access_token,
      space: restParams.space_id,
      environment: restParams.environment
    }
    const client = contentful.createClient(contentfulConfig)
    client.getEntry(postId).then((post: any) => {
      const { fields = {} } = post

      const {
        title,
        body,
        slug,
        publishDate,
        heroImage
      } = fields

      const remarkInstance = new Remark().data("settings",{
        commonmark:true,
        footnotes:true,
        pedantic:true,
        gfm:true,
      }).use(remarkHtml);

      const bodyHtml = remarkInstance.processSync(body).toString()
      console.log("BODYHTML",bodyHtml)

      const imageSizes = contentfulImages.resolveResize(heroImage.fields, { maxWidth: 350, maxHeight: 196, resizingBehavior: 'scale' })
      const data = {
        contentfulBlogPost: {
          title,
          heroImage: {
            sizes: {
              ...imageSizes
            }
          },
          body: {
            childMarkdownRemark: {
              html: bodyHtml
            }
          },
          publishDate,
          slug
        }
      }


      this.setState({ data });

    }, (err) => {
      console.log(err)
    });
  }

  render() {
    if (this.state.data == undefined) {
      return (
        <Layout>
          <div>Loading Preview...</div>
        </Layout>
      )
    }

    const data = {
      ...this.props.data,
      ...this.state.data
    }
    console.log(data)
    return (
      <BlogPostTemplate data={data} />
    )

  }
}

export default BlogPreview

// export const pageQuery = graphql`
//   query BlogIndexQuery {
//     allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
//       edges {
//         node {
//           title
//           slug
//           publishDate(formatString: "MMMM Do, YYYY")
//           tags
//           heroImage {
//             sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
//               ...GatsbyContentfulSizes_withWebp
//             }
//           }
//           description {
//             childMarkdownRemark {
//               html
//             }
//           }
//         }
//       }
//     }
//   }
// `
