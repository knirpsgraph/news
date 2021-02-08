import {News} from "../../server/model/mod";



function addNews() {
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

function renderMessage(message: string) {
    const messageWindow: JQuery = $('#res_Message');

    // Create new alert
    const newAlert: JQuery = $(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `);


    // Add message to DOM
    messageWindow.append(newAlert);



    // Auto-remove message after 5 seconds (5000ms)
    setTimeout(() => {
        newAlert.fadeOut('close');
    }, 5000);
}

$(() => {

    const addNewsForm: JQuery = $('#buttonSubmit');

    addNewsForm.on('click', addNews);
})