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

$(() => {
    updateNews();
})