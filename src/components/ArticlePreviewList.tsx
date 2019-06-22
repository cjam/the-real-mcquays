import * as React from "react"
import ArticlePreview, { ArticlePreviewProps } from "./ArticlePreview"
import styles from "./ArticlePreviewList.module.scss"

export interface ArticlePreviewListProps {
    articles: ArticlePreviewProps[]
}

export default function ArticlePreviewList({articles=[]}: ArticlePreviewListProps) {
    return (
        <div className={styles.articleList}>
            <ul>
                {articles.map((article) => {
                    return (
                        <li key={article.slug}>
                            <ArticlePreview {...article} />
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}
