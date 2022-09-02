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
        const {category_name} = category;
        // console.log(category_name)

        const listLink = document.createElement('li');
        listLink.classList.add('list-unstyled')
        listLink.innerHTML = `<a href="" class="text-decoration-none text-white link-hover">${category_name}</a>`;

        categoriesContainer.appendChild(listLink);
    });
}

loadNewsCategories()