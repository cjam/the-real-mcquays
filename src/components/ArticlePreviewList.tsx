import * as React from "react"
import ArticlePreview, { ArticlePreviewProps } from "./ArticlePreview"
import styles from "./ArticlePreviewList.module.scss"

export interface ArticlePreviewListProps {
    articles: ArticlePreviewProps[]
}

export default function ArticlePreviewList({articles=[]}: ArticlePreviewListProps) {
    return (
        <section className={styles.articleList}>
            <ul>
                {articles.map((article) => {
                    return (
                        <li key={article.slug}>
                            <ArticlePreview {...article} />
                        </li>
                    )
                })}
            </ul>
        </section>

    )
}
