function addNews(event) {
    event.preventDefault();

    const addNewsHeader: JQuery = $('#inputHeader');
    const addNewsText: JQuery = $('#inputText');
    const addNewUsername: JQuery = $('#inputUsername');

    //Read values from field

    const NewsHeader: string = addNewsHeader.val().toString().trim();
    const NewsText: string = addNewsText.val().toString().trim();
    const NewsUsername: string = addNewUsername.val().toString().trim();


    if(NewsUsername && NewsText && NewsHeader) {
        $.ajax("/news", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                header: NewsHeader,
                text: NewsText,
                username: NewsUsername,
            }),

            success: () => {
                renderMessage('Thanks ' + NewsUsername + ' for your contribution');
                setTimeout(function () {
                    location.reload()
                }, 2000);
            },
        })
    }

    else {
        $.ajax("/news", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                header: NewsHeader,
                text: NewsText,
                username: 'Anonym'
            }),
            success: () => {
                renderMessage('Thanks for your contribution');
                setTimeout(function () {
                    location.reload()
                }, 2000);
            },
            error: (response) => {
                renderMessage(response + 'Something went wrong!:(');
            }
        })
    }
}


function renderMessage(message: string) {
    const messageWindow: JQuery = $('#res_Message');

    // Create new alert
    const newAlert: JQuery = $(`
        <div class="alert alert-dark fade show" role="alert">
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

function changeArrow(event){
    const button: JQuery = $('.btn-slide-show');

    for (let i = 0; i < button.length; i++) {
        // removing class active at place i in array
        $(button[i]).removeClass('d-none');
    }
    // adding class
    $(event.currentTarget).addClass('d-none');
}

$(() => {

    const addNewsForm: JQuery = $('#buttonSubmit');
    const buttonDown: JQuery = $('.btn-slide-show');

    addNewsForm.on('click', addNews);

    for (let i = 0; i < buttonDown.length; i++) {
        $(buttonDown[i]).on('click', changeArrow)
    }
});
