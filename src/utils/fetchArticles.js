import axios from 'axios'

const removeDuplicates = (array) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        let isDuplicate = false;
        for (let j = i + 1; j < array.length; j++) {
            if (array[i].title === array[j].title) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            result.push(array[i]);
        }
    }
    return result;
}

const normalizeGNews = (data) => {
    return data.articles.map(a => {
        return {
            title: a.title,
            imgUrl: a.image,
            pubDate: a.publishedAt,
            author: a.source.name,
            description: a.description,
            link: a.url,
        };
    })
}

const normalizeNewsApi = (data) => {
    return data.articles.map(a => {
        return {
            title: a.title,
            imgUrl: a.urlToImage,
            pubDate: a.publishedAt,
            author: a.author,
            description: a.description,
            link: a.url,
        };
    })
}


const normalizeNewsDataApi = (data) => {
    return data.results.map(a => {
        return {
            title: a.title,
            imgUrl: a.image_url,
            pubDate: a.pubDate,
            author: a.creator,
            description: a.description,
            link: a.link,
        };
    })
}


export const fetchNewsDataArticles = async (country) => {
    let url = `https://newsdata.io/api/1/news?apikey=pub_4071273a18a3dd5b7a610be551e6ace3e4942`;
    url += `&q=${country}&language=en&prioritydomain=top&category=top`;
    const response = await axios.get(url);
    return normalizeNewsDataApi(response.data);
}


export const fetchNewsApiArticles = async (country) => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=444f13e0e8cb4e1cbbefa2f98b139e98`;
    url += `&q=${country}&language=en`;
    const response = await axios.get(url);
    return normalizeNewsApi(response.data);
}


export const fetchGNewsArticles = async (country) => {
    let url = `https://gnews.io/api/v4/search?apikey=3092613eac9696ea640064af7cae7017`;
    url += `&from=2024-01-01T22:05:54Z&to=2024-05-08T22:05:54Z&lang=en&q=${country}`;
    const response = await axios.get(url);
    return normalizeGNews(response.data);
}

export const fetchAll = async (country) => {
    const newsApiPromise = fetchNewsApiArticles(country);
    const gnewsPromise = fetchGNewsArticles(country);
    const newsDataPromise = fetchNewsDataArticles(country);

    const response = await Promise.allSettled([newsApiPromise, gnewsPromise, newsDataPromise]);
    let results = [];
    response.forEach(obj => {
        if (obj.status === 'fulfilled') {
            results = removeDuplicates(results.concat(obj.value));
            console.log('successfully fetched results');
        } else {
            console.log('cannot fetch results');
        }
    })

    return results;
}