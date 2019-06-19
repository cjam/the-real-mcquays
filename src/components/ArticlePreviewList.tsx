import * as React from "react"
import ArticlePreview, { ArticlePreviewProps } from "./ArticlePreview"
import styles from "./ArticlePreviewList.module.css"

export interface ArticlePreviewListProps {
    articles: ArticlePreviewProps[]
}

export default function ArticlePreviewList({articles=[]}: ArticlePreviewListProps) {
    return (
        <ul className={styles.articleList}>
            {articles.map((article) => {
                return (
                    <li key={article.slug}>
                        <ArticlePreview {...article} />
                    </li>
                )
            })}
        </ul>
    )
}
