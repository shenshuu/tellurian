import { useEffect } from "react"
import { Article } from "./Article"
import '../styles/ArticlesContainer.css';

export const ArticlesContainer = ({ articles }) => {
    return articles && (
        <>
            <div id="articles-container">
                <div id="articles-container-title">
                    <h1>Top stories in US</h1>
                </div>
                {articles.map(article => (
                    <Article key={article.articleId} article={article}/>
                ))}
            </div>
        </>
    )
}