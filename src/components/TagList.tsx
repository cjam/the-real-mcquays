import * as React from "react"
import {kebabCase} from "lodash"
import "./TagList.scss"

interface TagListProps {
    tags?: string[]
}

const TagList: React.SFC<TagListProps> = ({ tags, ...restProps }) => {

    return (
        <div className="tagList">
            {tags && (
                <div className="tagListTitle">tags</div>
            )}
            {tags && tags.map(tag=>(
                <a key={tag} href={`/blog/tags/${kebabCase(tag)}`} rel="tag" >{tag}</a>
            ))}
        </div>
    )
}

export default TagList