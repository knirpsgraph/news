import {News} from "../../server/model/mod";

function updateNews() {
    $.ajax("/getNews", {
        method: "GET",
        contentType: "application/json",
        success: (response) => {
            renderNewsFeed(response.news)
        },
        error: (response) => {
            console.log(response)
        }
    })
}

function renderNewsFeed(news: News[]) {

    const Newsfeed:JQuery = $('#newsTable');

    for (let newBlog of news) {
        let newBlogEntry: JQuery = $(`
            <div class="container mt-5 mb-5">
                <div class="row d-flex justify-content-center">
                    <div class="card text-center">
                        <div class="card-header mt-2 mb-2">
                            <h3 class="card-title">
                            ${newBlog.header}
                            </h3>
                        </div>
                        <p class="card-text mt-1 mb-1">
                            ${newBlog.text}
                        </p>
                    </div>
                    <div class="card-footer text-muted">
                       <small>Uploaded: ${newBlog.date}<br>
                       by ${newBlog.username} </small>
                    </div>
                </div>
            </div>
        `);
        Newsfeed.append(newBlogEntry)
    }
}

$(() => {
    updateNews();
})