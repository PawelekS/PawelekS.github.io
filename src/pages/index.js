import React from "react"
import { Link } from "gatsby"

import Image from "../components/image"
import SEO from "../components/seo"

import { PostsEntries } from "../components/posts"
import Footer from "../components/footer"

import "./index.css"

export default () => <div className="homepage">
  <SEO title="Home" />
  <h1>Hi people</h1>
  <p>Welcome to your new Gatsby site.</p>
  <p>Now go build something great.</p>
  <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
    <Image />
  </div>
  <PostsEntries />
  <Link to="/page-2/">Go to page 2</Link> <br/>
  <Footer />
</div>