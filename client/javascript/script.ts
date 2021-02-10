function addNews(event) {
    event.preventDefault();

    const addNewsHeader: JQuery = $('#inputHeader');
    const addNewsText: JQuery = $('#inputText');
    const addNewUsername: JQuery = $('#inputUsername');

    //Read values from field

    const NewsHeader: string = addNewsHeader.val().toString().trim();
    const NewsText: string = addNewsText.val().toString().trim();
    const NewsUsername: string = addNewUsername.val().toString().trim();
    let uName: string;

    if (NewsUsername.length != 0){
        uName = NewsUsername;
    } else {
        uName = 'Anonym';
    }
    if(uName && NewsText && NewsHeader) {
        $.ajax("/news", {
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                header: NewsHeader,
                text: NewsText,
                username: uName,
            }),

            success: () => {
                renderMessage('Thanks ' + uName + ' for your contribution');
                setTimeout(function () {
                    location.reload()
                }, 2000);
            },
            error: (response) => {
                renderMessage(response + 'Something went wrong!:(');
            }
        })
    } else{
        renderMessage('Please fill out the textforms!');
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

        $(button).removeClass('d-none');
        $(event.currentTarget).addClass('d-none');

}

function newLightbox(event){
    event.preventDefault();

    const box: JQuery = $('#lightbox');

    if ($(box).length > 0) {
        $(box).removeClass('d-none')
    }
    else{
        $(box).addClass('d-none')
    }
}

function closeLightbox() {
    const box: JQuery = $('#lightbox');

    $(box).hide(2)
}


    $(() => {

        $("#footer-placeholder").load("footer.html");

        const addNewsForm: JQuery = $('#buttonSubmit');
        const buttonDown: JQuery = $('.btn-slide-show');
        const lightbox: JQuery = $('.teamPic');
        const closelightbox: JQuery = $('.closeLightbox');

        addNewsForm.on('click', addNews);
        buttonDown.on('click', changeArrow);
        lightbox.on('click', newLightbox);
        closelightbox.on('click', closeLightbox);

    })

