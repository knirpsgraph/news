import {News} from "../../server/model/news";

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
            <div class="container mt-5 mb-5"  >
                <div class="row d-flex justify-content-center">
                    <div class="card text-center bg-transparent text-white border-0" style="width: 100%;">
                        <div class="card-header border-white mb-2">
                            <h3 class="card-title">
                            ${newBlog.header}
                            </h3>
                        </div>
                        <p class="card-text mt-4 mb-5">
                            ${newBlog.text}
                        </p>
                        <div class="card-footer text-right text-white" >
                       <small>Uploaded: ${newBlog.date}<br>
                       by ${newBlog.username} </small>
                    </div>
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