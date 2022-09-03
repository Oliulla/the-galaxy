// load news categories
const loadNewsCategories = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const categories = data.data.news_category;
    displayCategories(categories);
}

const displayCategories = async(categories) => {
    const categoriesContainer = document.getElementById('categories-container');

    categories.forEach(category => {
        const {category_name, category_id} = category;
        

        const listLink = document.createElement('li');
        listLink.classList.add('my-2')
        listLink.innerHTML = `<a onclick="showNews('${category_id}', '${category_name}')" class="text-decoration-none text-white link-hover px-3">${category_name}</a>`;

        categoriesContainer.appendChild(listLink);
    })
}

const newsFoundDetail = async (news, categoryName) => {
    // console.log(news.length,categoryName)
    const foundTotalText = document.getElementById('found-total')
    
    const foundContainer = document.getElementById('found-container');
    const lenOfNews = news.length;
    lenOfNews ? foundContainer.classList.remove('d-none') : foundContainer.classList.remove('d-none');
    foundTotalText.innerText = `${lenOfNews} news found for ${categoryName}`;
}

const showNews = async(newsCategoryId, categoryName) => {
    // console.log(newsCategoryId)

    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsCategoryId}`);
    const data = await res.json();
    const news = data.data;
    showCategoriesNews(news);

    newsFoundDetail(news, categoryName)
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
                <img src="${thumbnail_url}" class="img-fluid w-100 h-100" alt="News thumbnail">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text mt-3">${details.length > 250 ? details.slice(0, 350) : details}...</p>
                    <div class="h-100 w-100 d-flex align-items-center ms-2 ms-lg-3 mt-4 mt-lg-5">
                        <div class="w-25">
                            <div class="d-flex align-items-center w-100">
                                <img src="${img}" class="w-25 border-0 rounded-circle" alt="${name} Image">
                                <div class="mt-lg-3 ms-2">
                                    <h6><small>${name ? name : 'No data founds'}</small></h6>
                                    <p class="d-none d-lg-block">
                                        <small class="text-muted">${published_date ? published_date : 'No data founds'}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-75">
                            <div class="d-flex justify-content-around">
                                <div class="d-inline">
                                    <i class="fa-solid fa-eye"></i>
                                    <P class="fw-semibold d-inline">${total_view ? total_view+'M' : 'No data founds'}</p>
                                </div>
                                <div>
                                    <P class="fw-semibold text-warning">Ratings: ${rating.number}</p>
                                </div>
                                <div class="text-info">
                                    <a onclick="readMore('${_id}')" class="btn btn-outline-info d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#readMoreModal">
                                        <Small>Read more</small><i class="fa-solid fa-arrow-right ms-2 mt-1"></i>
                                    </a>
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

    // console.log(news)

    const {title, thumbnail_url, details, total_view, rating, author} = news;
    const {img, name, published_date} = author;

    document.querySelector('.news-modal-title').innerText = `${title}`;
    const modaBody = document.getElementById('modaBody');
    modaBody.classList.add('bg-success')
    modaBody.innerHTML = `
    <img src="${thumbnail_url}" class="w-100">
    <p class="card-text mt-3 text-white">${details ?  details : 'No News Founds'}</p>
    <div class="h-100 w-100 d-flex align-items-center ms-2 ms-lg-3 mt-4 mt-lg-5">
        <div class="w-25">
            <div class="d-flex align-items-center w-100">
                <img src="${img}" class="w-25 border-0 rounded-circle" alt="${name}Image">
                <div class="mt-lg-3 ms-2 text-light">
                    <h6><small>${name ? name : 'No data founds'}</small></h6>
                    <p class="d-none d-lg-block">
                        <small>${published_date ? published_date : 'No data founds'}</small>
                    </p>
                </div>
            </div>
        </div>
        <div class="w-75">
            <div class="d-flex justify-content-around">
                <div class="text-light">
                    <h6>Total Views</h6>
                    <i class="fa-solid fa-eye"></i>
                    <P class="fw-semibold d-inline text-light">${total_view ? total_view+'M' : 'No data founds'}</p>
                </div>
                <div>
                    <P class="fw-semibold text-warning">Ratings: ${rating.number}</p>
                    <P class="fw-semibold text-warning">Badge: ${rating.badge}</p>
                </div>
            </div>
        </div>
    </div>
    `
}
showNews('08', 'All News')

loadNewsCategories()