// load news categories
const loadNewsCategories = async() => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const data = await res.json();
        const categories = data.data.news_category;
        displayCategories(categories);
    }
    catch(err) {
        this.document.body.innerHTML = `
        <h3 class="text-center mt-5">sorry, this site can't be reached</h3>
        <h5 class="text-center">Please try again...</h5>
        `
    }
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

const foundNewsQuantity = async (news, categoryName) => {
    const foundTotalText = document.getElementById('found-total');
    const foundContainer = document.getElementById('found-container');
    const lenOfNews = news.length;

    lenOfNews ? foundContainer.classList.remove('d-none') : foundContainer.classList.remove('d-none');
    lenOfNews ? foundTotalText.innerText = `${lenOfNews} news found for ${categoryName}` : foundTotalText.innerText = `No news available now for ${categoryName}`;
}

const showNews = async(newsCategoryId, categoryName) => {
    try {
        progressSpinner(true);

        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsCategoryId}`);
        const data = await res.json();
        const news = data.data;
        showCategoriesNews(news);
    
        foundNewsQuantity(news, categoryName)
    }
    catch(err) {
        console(err)
    }
}

const showCategoriesNews = async(news) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ``;

    news.sort((a, b) => (a.total_view > b.total_view) ? -1 : 1);
    news.forEach(eachNews => {
        const {thumbnail_url, title, details, total_view, author, rating, _id} = eachNews;
        const {img, name, published_date} = author;

        const eachNewsCard = document.createElement('div');
        eachNewsCard.classList.add('card', 'mb-3', 'w-100', 'text-white', 'bg-secondary');

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
                                    <h6><small>${name ? name : 'No data available'}</small></h6>
                                    <p class="d-none d-lg-block">
                                        <small class="text-light">${published_date ? published_date : 'No data available'}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-75">
                            <div class="d-flex justify-content-around">
                                <div class="d-inline">
                                    <i class="fa-solid fa-eye"></i>
                                    <P class="fw-semibold d-inline">${total_view ? total_view+'M' : 'No data available'}</p>
                                </div>
                                <div>
                                    <P class="fw-semibold text-warning">Ratings: ${rating.number ? rating.number : 'No data available'}</p>
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
    progressSpinner(false)
}

const progressSpinner = (isLoading) => {
    const spinnerContainer = document.getElementById('spinner-container');
    isLoading ? spinnerContainer.classList.remove('d-none') : spinnerContainer.classList.add('d-none');
}

const readMore = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
        const data = await res.json();
        const detailsNews = data.data[0];
        readMoreDetails(detailsNews);
    }
    catch(err) {
        console.log(err);
    }
}

const readMoreDetails = async(news) => {

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
                <img src="${img}" class="w-25 border-0 rounded-circle" alt="${name} Image">
                <div class="mt-lg-3 ms-2 text-light">
                    <h6><small>${name ? name : 'No data available'}</small></h6>
                    <p class="d-none d-lg-block">
                        <small>${published_date ? published_date : 'No data available'}</small>
                    </p>
                </div>
            </div>
        </div>
        <div class="w-75">
            <div class="d-flex justify-content-around">
                <div class="text-light">
                    <h6>Total Views</h6>
                    <i class="fa-solid fa-eye"></i>
                    <P class="fw-semibold d-inline text-light">${total_view ? total_view+'M' : 'No data available'}</p>
                </div>
                <div>
                    <P class="fw-semibold text-warning">Ratings: ${rating.number ? rating.number : 'No data available'}</p>
                    <P class="fw-semibold text-warning">Badge: ${rating.badge ? rating.badge : 'No data available'}</p>
                </div>
            </div>
        </div>
    </div>
    `
}
showNews('08', 'All News')
loadNewsCategories()