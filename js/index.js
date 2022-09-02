// load news categories
const loadNewsCategories = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const categoriesArr = data.data.news_category;
    displayCategories(categoriesArr)
}

const displayCategories = async(categories) => {
    const categoriesContainer = document.getElementById('categories-container');

    categories.forEach(category => {
        const {category_name, category_id} = category;

        const listLink = document.createElement('li');
        listLink.innerHTML = `<a onclick="showNews('${category_id}')" class="text-decoration-none text-white link-hover">${category_name}</a>`;

        categoriesContainer.appendChild(listLink);
    });
}

const showNews = async(newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsId}`);
    const data = await res.json();
    const news = data.data;
    showCategoriesNews(news)
}

const showCategoriesNews = async(news) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ``;
    news.forEach(eachNews => {
        console.log(eachNews);
        const {thumbnail_url} = eachNews;
        const eachNewsCard = document.createElement('div');
        eachNewsCard.classList.add('card', 'mb-3', 'w-100');
        eachNewsCard.innerHTML = `
        <div class="row p-2 p-lg-4">
            <div class="col-md-4">
                <img src="${thumbnail_url}" class="img-fluid w-100 h-100" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(eachNewsCard)

    })
}

loadNewsCategories()