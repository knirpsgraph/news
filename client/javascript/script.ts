import {News} from "../../server/model/mod";
import * as $ from 'jquery';


function addNews(event) {
    const addNewsHeader: JQuery = $('#inputHeader');
    const addNewsText: JQuery = $('#inputText');
    const addNewUsername: JQuery = $('#inputUsername');

    //Read values from field

    const NewsHeader: string = addNewsHeader.val().toString().trim();
    const NewsText: string = addNewsText.val().toString().trim();
    const NewsUsername: string = addNewUsername.val().toString().trim();


    if (NewsUsername && NewsText && NewsHeader) {
        $.ajax("/news", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                header: NewsHeader,
                text: NewsText,
                username: NewsUsername
            })
        }).then(() => {
            renderMessage('Thanks ' + NewsUsername + ' for your contribution');
        }).catch((response) => {
            renderMessage(response + 'Something went wrong!:(');
        })
    } else {
        $.ajax("/news", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                header: NewsHeader,
                text: NewsText,
                username: 'Anonym'
            })
        }).then(() => {
            renderMessage('Thanks for your contribution');
        }).catch((response) => {
            renderMessage(response + 'Something went wrong!:(');
        })
    }
}