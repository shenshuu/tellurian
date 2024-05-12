import '../styles/Article.css'
import { useState } from 'react'
import { useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { deleteArticle, saveArticle } from '../utils/realtimeDB';


export const Article = ({ article, saved, savedArticles, setSavedArticles }) => {
    const [showDescription, setShowDescription] = useState(false)
    const user = useContext(UserContext);
    const [uid, setUid] = useState(undefined);

    useEffect(() => {
        setUid(user.userID)
    }, []);
    
    
    let title = '';
    for (const word of article.title.split(' ')) {
        if (title.length < 60) {
            title += word + ' '
        } else {
            title += '...'
            break
        }
    }

    const handleSave = (article, uid) => {
        saveArticle(article, uid);
        setSavedArticles(savedArticles.concat([article]));
    }

    const handleDelete = (article, uid) => {
        deleteArticle(article, uid);
        for (let i = 0; i < savedArticles.length; i++) {
            if (savedArticles[i].title === article.title) {
                setSavedArticles(savedArticles.slice(0,i).concat(savedArticles.slice(i+1)))
                break;
            }
        }
    }

    return (
        <>
            <div className="article">
                {showDescription ?
                    <div className="article-tab" onClick={() => setShowDescription(!showDescription)}>
                        &#9660;
                    </div>
                :
                    <div className="article-tab" onClick={() => setShowDescription(!showDescription)}>
                        &#9650;
                    </div>
                }
                <div className="article-left">
                    <h4>{title}</h4>
                    <p className="article-author">{article.author + ', ' + article.pubDate}</p>
                </div>
                <div className="article-right">
                    <img className="article-img" src={article.imgUrl}/>
                    <div className="article-links">
                    <a href={article.link} target="_blank" className="article-link-icon">&#x1f517;</a>
                        {saved ? 
                        <a onClick={() => handleDelete(article, uid)}>&#x1f5d1;</a>
                        :
                        <a onClick={() => handleSave(article, uid)}>&#x1F516;</a>
                        }
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