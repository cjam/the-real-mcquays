import React, { useEffect } from "react"
import useLatestPosts from "./Instagram/useLatestPosts"
// import "./Hero.scss"

export interface InstagramPostsProps extends React.HTMLAttributes<HTMLElement> {
  caption?: React.ReactNode
}

const InstagramPosts: React.SFC<InstagramPostsProps> = ({ caption, children, className = "", ...restProps }) => {
    const postIds = useLatestPosts("the.real.mcquays")
  return (
    <div>
        Instagram posts will go here.
    </div>
  )
}

export default InstagramPosts;