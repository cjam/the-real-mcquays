import * as React from "react"
import CaptionLabel from "./CaptionLabel"
import "./PostNavigation.scss"
import { Link } from "gatsby";

interface PostLink {
    title: string;
    slug: string;
}

interface PostNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
    previousPost?: PostLink
    nextPost?: PostLink
}

const PostNavLink: React.SFC<{ label: string, post?: PostLink }> = ({ label, post }) => {
    let content: React.ReactNode = null;

    if (post != undefined) {
        content = (
            <>
                <span>{label}</span>
                <span>
                    <Link to={`blog/${post.slug}`}>{post.title}</Link>
                </span>
            </>
        )
    }

    return (
        <div className="post-nav-link">
            {content}
        </div>
    )
}

const PostNavigation: React.SFC<PostNavigationProps> = ({
    previousPost,
    nextPost,
    ...restProps
}) => {
    return (
        <nav className="post-navigation" {...restProps}>
            <PostNavLink label="Previous Article" post={previousPost} />
            <PostNavLink label="Next Article" post={nextPost} />
        </nav>
    )
}

export default PostNavigation