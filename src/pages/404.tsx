import * as React from "react"
import Layout from "../layouts"
import Container from "../components/Container"

export default () => (
  <Layout>
    <Container>
      <div style={{
        textAlign:"center",
        padding:"4em 2em"
      }}>
        <h1 style={{whiteSpace:"nowrap"}}>¯\_(ツ)_/¯</h1>
        <h5 style={{lineHeight:"1.1em"}}>Sorry, we couldn't find what you were looking for.</h5>
      </div>

    </Container>
  </Layout>
)
