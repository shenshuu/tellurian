import '../styles/Article.css'

export const Article = () => {
    return (
        <div className="article">
            <div className="article-left">
                <h3>"Jugger Is The ONLY Sport For The End Of The World"</h3>
            </div>
            <div className="article-right">
                <img className="article-img" src="https://sm.ign.com/ign_za/video/j/jugger-is-/jugger-is-the-only-sport-for-the-end-of-the-world_dhb9.jpg"/>
                <div className="article-links">
                    <a>link</a>
                    <a>save</a>
                </div>
            </div>
        </div>
    )
}