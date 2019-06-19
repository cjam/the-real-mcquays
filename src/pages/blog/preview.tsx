import React from "react"
import Link from "gatsby-link"
// import get from "lodash/get"
// import Helmet from "react-helmet"
import styles from "./blog.module.css"
// import contentful from "contentful/dist/contentful.browser"
// import remark from "remark";
import BlogPostTemplate from "../../templates/BlogPost"
import Layout from "../../layouts"

class BlogPreview extends React.Component {
  state = {}
  componentDidMount() {
    // const params = window.location.search.substr(1).split("&")
    // .reduce((map,paramStr)=>{
    //   const parts = paramStr.split("=")
    //   map[parts[0]]=parts[1];
    //   return map
    // },{})

    // const {id:postId,...restParams} = params;
    // const contentfulConfig = {
    //   host:"preview.contentful.com",
    //   accessToken:restParams.access_token,
    //   space:restParams.space_id,
    //   environment:restParams.environment
    // }
    // const client = contentful.createClient(contentfulConfig)
    // client.getEntry(postId).then((post)=>{
    //   const {fields = {}} = post;
    //   const {
    //     title,
    //     body,
    //     slug,
    //     heroImage
    //   } = fields;
    //   const data = {
    //     contentfulBlogPost:{
    //       title,
    //       heroImage,
    //       body,
    //       slug
    //     }
    //   }
    //   console.log("Fields",fields)
    //   this.setState({data});

    // },(err)=>{
    //   console.log(err)
    // });
  }

  render() {
    // if(this.state.data == undefined){
    //   return (
    //     <div>Loading</div>
    //   )
    // }
    // const data = {
    //   ...this.props.data,
    //   ...this.state.data
    // }
    // console.log(data)

    return (
      <Layout>
        <div>
          Will Be Post Preview
        </div>
      </Layout>
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
