$(document).ready(function () {

    // array to hold the category
    var topics = ["Turtle", "Puppy", "Anime", "Magic the gathering"];
    //calls the renderfunction to add the topics as a button to the buttonview
    renderButtons();

    function renderButtons() {

        $('#buttonView').empty();
        //cycle through the the topic array and create the button 
        for(var i =0; i<topics.length;i++){
             var topicBtn = $('<button>')
                .addClass('topicBtn btn btn-primary')
                .attr('data-name', topics[i])
                .html(topics[i]);

            $('#buttonView').append(topicBtn);
        }
    }

    //add the user text to the topic array and render the buttons again
    $('#addGIF').on('click', function() {
        var textInput = $('#inputBox').val();
        if (textInput != "") {
            topics.push(textInput);
            renderButtons();
        }
        $('#inputBox').val("");
        return false;
    })

    //when a topic is clicked call the displayGif function
    $(document).on('click', '.topicBtn', displayGIF);

    //display the image still
    function displayGIF() {
        var search = $(this).data('name');

        //call ajax to get the json object
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

                //for each loop
                $.each(response.data, function (index, value) {
                    var gifDiv = $('<div>');

                    //create rating display
                    var ratingDiv = $('<p>')
                        .text("Rating: " + response.data[index].rating);
                    
                    //add rating to gifDiv
                    ratingDiv.appendTo(gifDiv);

                    //create the img with multiple attr for still and animate
                    var displayImage = $('<img>')
                        .addClass('image')
                        //on click listener
                        .on('click', gifState)
                        .attr('src', response.data[index].images.fixed_height_still.url)
                        .attr('data-animate', response.data[index].images.fixed_height.url)
                        .attr('data-state', "still")
                        .attr('data-still', response.data[index].images.fixed_height_still.url);

                    //add img to div
                    displayImage.appendTo(gifDiv);

                    //add gifDiv to the HTML results element
                    $('#results').append(gifDiv);
                })
            });
    }

    //change the state of the gif
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