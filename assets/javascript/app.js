$(document).ready(function () {


    var topics = ["Turtle", "Puppy", "Anime", "Magic the gathering"];

    renderButtons();

    function renderButtons() {

        $('#buttonView').empty();
        for(var i =0; i<topics.length;i++){
             var topicBtn = $('<button>')
                .addClass('topicBtn btn btn-primary')
                .attr('data-name', topics[i])
                .html(topics[i]);
            $('#buttonView').append(topicBtn);
        }
    }

    $('#addGIF').on('click', function() {
        var textInput = $('#inputBox').val();
        if (textInput != "") {
            topics.push(textInput);
            renderButtons();
        }
        $('#inputBox').val("");
        return false;
    })

    $(document).on('click', '.topicBtn', displayGIF);

    function displayGIF() {
        var search = $(this).data('name');
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search",
            data: {
                limit: 10,
                api_key: "dc6zaTOxFJmzC",
                q: search
            }, method: 'GET'
        })
            .done(function (response) {
                $('#results').empty();
                $.each(response.data, function (index, value) {
                    var gifDiv = $('<div>');

                    var ratingDiv = $('<p>')
                        .text("Rating: " + response.data[index].rating);

                    ratingDiv.appendTo(gifDiv);


                    var displayImage = $('<img>')
                        .addClass('image')
                        .on('click', gifState)
                        .attr('src', response.data[index].images.fixed_height_still.url)
                        .attr('data-animate', response.data[index].images.fixed_height.url)
                        .attr('data-state', "still")
                        .attr('data-still', response.data[index].images.fixed_height_still.url);

                    displayImage.appendTo(gifDiv);

                    $('#results').append(gifDiv);
                })
            });
    }

    function gifState(){
        var state = $(this).attr('data-state');
        console.log(state);

            if(state == "still"){
                console.log("made it");
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state' , "animate");
            }else{
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state' , "still");

            }
    }
});