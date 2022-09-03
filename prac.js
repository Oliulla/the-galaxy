const showNews = async() => {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/08`);
        const data = await res.json();
        const news = data.data;
    
        news.forEach(n => {
            
        })
}

showNews()