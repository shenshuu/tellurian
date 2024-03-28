import { useEffect } from "react"
import { Article } from "./Article"
export const ArticlesContainer = ({ articles }) => {
    return articles && (
        <>
            <div id="articles-container">
                {articles.map(article => (
                    <Article key={article.articleId} article={article}/>
                ))}
            </div>
        </>
    )
}