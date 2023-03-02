const fetchCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => showCategories(data.data))
};

const showCategories = data => {
    const categoriesContainer = document.getElementById('show-categories');

    data.news_category.forEach(singleCategorie => {
        categoriesContainer.innerHTML += `<a href="#" onclick="fetchCategoriesId('${singleCategorie.category_id}', '${singleCategorie.category_name}')">${singleCategorie.category_name}</a>`
    })

}

const fetchCategoriesId = (id, name) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => showAllNews(data.data, name))
}

const showAllNews = (data, name) => {

    document.getElementById('news-count').innerText = data.length;
    document.getElementById('news-name').innerText = name;

    const card = document.getElementById('card');
    card.innerHTML = '';

    data.forEach(singleNews => {

        card.innerHTML += `
            <div class="card mb-3"">
                <div class=" row g-0">
                    <div class="col-md-4">
                        <img src="${singleNews.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 d-flex flex-column">
                        <div class="card-body">
                            <h5 class="card-title">${singleNews.title}</h5>
                            <p class="card-text">${singleNews.details.slice(0, 200)}...</p>
                        </div>
                        <div class="card-footer border-0 d-flex justify-content-between align-items-center">
                            <div class="d-flex gap-3">
                                <img src="${singleNews.author.img}" class="img-fluid rounded-circle" height="40" width="40">
                                <div>
                                    <p class="m-0 p-0">${singleNews.author.name}</p>
                                    <p class="m-0 p-0">${singleNews.author.published_date}</p>
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center">
                                <i class="fas fa-eye"></i>
                                <p class="m-0 p-0">${singleNews.rating.number}</p>
                            </div>
                            <div>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div>
                                <i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchDetails('${singleNews._id}')"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        `
    })
}


const fetchDetails = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data[0]))
}

const showDetails = news_data => {

    console.log(news_data)


    document.getElementById('modal-body').innerHTML = `

    <div class="card mb-3"">
    <div class=" row g-0">
        <div class="col-md-12">
            <img src="${news_data.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-12 d-flex flex-column">
            <div class="card-body">
                <h5 class="card-title">${news_data.title}</h5>
                <p class="card-text">${news_data.details}...</p>
            </div>
            <div class="card-footer border-0 d-flex justify-content-between align-items-center">
                <div class="d-flex gap-3">
                    <img src="${news_data.author.img}" class="img-fluid rounded-circle" height="40" width="40">
                    <div>
                        <p class="m-0 p-0">${news_data.author.name}</p>
                        <p class="m-0 p-0">${news_data.author.published_date}</p>
                    </div>
                </div>
                <div class="d-flex gap-2 align-items-center">
                    <i class="fas fa-eye"></i>
                    <p class="m-0 p-0">${news_data.rating.number}</p>
                </div>
                <div>
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>
        </div>
    </div>
</div>  

    `
}
