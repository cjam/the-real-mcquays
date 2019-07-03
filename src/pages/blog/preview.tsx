import React from "react"
import Link from "gatsby-link"
import { get } from "lodash"
import styles from "./blog.module.css"
import * as contentful from "contentful"
import * as contentfulImages from "../../utils/contentful-images"
// tslint:disable-next-line:no-submodule-imports
import Remark from "remark"
import remarkHtml from "remark-html"
import BlogPostTemplate, { BlogPostTemplateProps } from "../../templates/BlogPost"
import Layout from "../../layouts"

interface BlogPreviewState {
  postData?: BlogPostTemplateProps
}

class BlogPreview extends React.Component<any, BlogPreviewState> {
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
        heroImage,
        description,
        category=[],
        tags=[],
        author: {
          fields: authorFields
        }
      } = fields

      const remarkInstance = new Remark().data("settings", {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
      }).use(remarkHtml)


      // Build the author from author fields
      const { image: authorImage, shortBio, ...authorProps } = authorFields;
      const authorImageSizes = contentfulImages.resolveFixed(authorFields.image.fields, { width: 100, height: 100 });

      const author = {
        ...authorProps,
        image: {
          fixed: {
            ...authorImageSizes
          },
        },
        shortBio: {
          MD: {
            html: remarkInstance.processSync(shortBio).toString()
          }
        }
      }

      const bodyHtml = remarkInstance.processSync(body).toString()
      const descriptionHtml = remarkInstance.processSync(description).toString()

      const imageSizes = contentfulImages.resolveResize(heroImage.fields, { maxWidth: 1200, maxHeight: 200, resizingBehavior: "scale" })
      const postData: BlogPostTemplateProps = {
        data: {
          post: {
            title,
            heroImage: {
              sizes: {
                ...imageSizes,
                sizes: "(max-width: 1180px) 100vw, 1180px",
              },
              seo: {
                src: imageSizes ? imageSizes.src : ""
              }
            },
            description: {
              MD: {
                html: descriptionHtml,
                plain: description
              }
            },
            body: {
              MD: {
                html: bodyHtml,
                timeToRead: -1
              }
            },
            category,
            tags,
            datePublished: publishDate,
            dateModified: publishDate,
            slug,
            author
          }
        }
      }

      this.setState({ postData });


    }, (err) => {
      console.log(err)
    })
  }

  render() {
    if (this.state.postData == undefined) {
      return (
        <Layout>
          <div>Loading Preview...</div>
        </Layout>
      )
    }

    return (
      <BlogPostTemplate data={this.state.postData.data} />
    )

  }
}

export default BlogPreview
