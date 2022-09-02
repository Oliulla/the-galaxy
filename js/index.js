// load news categories
const loadNewsCategories = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const categoriesArr = data.data.news_category;
    displayCategories(categoriesArr);
}

const displayCategories = async(categories) => {
    const categoriesContainer = document.getElementById('categories-container');

    categories.forEach(category => {
        const {category_name, category_id} = category;

        const listLink = document.createElement('li');
        listLink.innerHTML = `<a onclick="showNews('${category_id}')" class="text-decoration-none text-white link-hover">${category_name}</a>`;

        categoriesContainer.appendChild(listLink);
    })
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
        // console.log(eachNews);

        const {thumbnail_url, title, details, total_view, author, rating, _id} = eachNews;
        const {img, name, published_date} = author;

        const eachNewsCard = document.createElement('div');
        eachNewsCard.classList.add('card', 'mb-3', 'w-100');

        eachNewsCard.innerHTML = `
        <div class="row p-2 p-lg-4">
            <div class="col-md-4">
                <img src="${thumbnail_url}" class="img-fluid w-100 h-100" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text mt-3">${details.length > 250 ? details.slice(0, 350) : details}...</p>
                    <div class="h-100 w-100 d-flex align-items-center ms-2 ms-lg-3 mt-4 mt-lg-5">
                        <div class="w-25">
                            <div class="d-flex align-items-center w-100">
                                <img src="${img}" class="w-25 border-0 rounded-circle" alt="">
                                <div class="mt-lg-5 ms-2">
                                    <h6>${name ? name : 'Not Found'}</h6>
                                    <p class="d-none d-lg-block"><small>${published_date ? published_date : 'Not Found'}</small></p>
                                </div>
                            </div>
                        </div>
                        <div class="w-75">
                            <div class="d-flex justify-content-around">
                                <div class="d-inline">
                                    <i class="fa-solid fa-eye"></i>
                                    <P class="fw-semibold">${total_view ? total_view+'M' : 'Not Found'}</p>
                                </div>
                                <div class="">Ratings: ${rating.number}</div>
                                <div class="text-info">
                                    <a onclick="readMore('${_id}')" class="btn btn-outline-info text-center"><Small>Read more</small> <i class="fa-solid fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(eachNewsCard)
    })
}

const readMore = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
    const data = await res.json();
    const detailsNews = data.data[0];
    readMoreDetails(detailsNews);
}

const readMoreDetails = async(news) => {
    console.log(news)
}

loadNewsCategories()