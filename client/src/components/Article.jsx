import '../styles/Article.css'
import { useState } from 'react'

export const Article = ({ article }) => {
    const [showDescription, setShowDescription] = useState(false)
    const handleClick = _ => {
        setShowDescription(!showDescription)
    }

    let title = '';
    for (const word of article.title.split(' ')) {
        if (title.length < 70) {
            title += word + ' '
        } else {
            title += '...'
            break
        }
    }

    return (
        <>
            <div className="article">
                <div className="article-tab" onClick={handleClick}>
                    {'>'}
                </div>
                <div className="article-left">
                    <h4>{title}</h4>
                    <p className="article-author">{article.author}</p>
                </div>
                <div className="article-right">
                    <img className="article-img" src={article.imgUrl}/>
                    <div className="article-links">
                        <a href={article.link} target="_blank">link</a>
                        <a>save</a>
                    </div>
                </div>
            </div>
            {showDescription ? 
            <p className="article-description">
                {article.description}
            </p>
            :
            null
            }
        </>
    )
}