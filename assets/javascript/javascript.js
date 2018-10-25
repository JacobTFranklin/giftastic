//--------------Logic--------------//
//Create an array of strings on any topic
//Use a for loop that appends buttons for each string to the page
//Clicking a button should grab a still image from GIHPY API
    //Click function for button class
    //Use $(this) to pass info through ajax call
    //Pull down moving and still image values
    //Pull down rating
    //Set as attributes
    //Make still atrribute upon grabbing
//Click giphy will toggle still/moving attribute
    //If/else statement with attributes
//Form typing will also add button based on the input
    //Add input to string, and render buttons once inputted so that new button appears
    //This new button will have all of the above functionality

//------------Variables--------//
$(document).ready(function () {

var apiKey = "vlm1KBJFHdgbxwEHOzIHVOi1XcjjekFv"

var topics = ["goblin", "dragon", "elf", "wizard", "dwarf", "orc", "hobbit", "eagle", "wolf", "witch"]

//Function creates populated buttons for each string in the creatues array
function renderButtons(){
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++){
        var newButton = $("<button type='button' class='btn btn-info gifButton'>"+topics[i]+"</button>");
        var buttonDiv = $("#buttons");
        buttonDiv.prepend(newButton)
    }
}

//Typing and submit adds a new string to the topics array and creates a populated button for it
$("#submitButton").on("click", function(event) {
    event.preventDefault();
    var newButton = $("#gifInput").val().trim();
    topics.push(newButton);
    renderButtons();
});

//Clicking a populated button calls the giphy API and populates 10 gifs with that buttons text as a tag
$("body").on("click", ".gifButton", function(){
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=vlm1KBJFHdgbxwEHOzIHVOi1XcjjekFv&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response){
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var stillGif = $("<img>");
        var gifImg = stillGif.attr("src", results[i].images.fixed_height_still.url);
        $(gifImg).addClass("gif");
        gifImg.attr("moving", results[i].images.fixed_height.url);
        gifImg.attr("still", results[i].images.fixed_height_still.url);
        gifImg.attr("state", "still");
        gifDiv.prepend(p);
        gifDiv.prepend(stillGif);
        $("#gifsDiv").prepend(gifDiv);
        }
    })
})

//Clicking functionality causes gifs to move/pause when clicked
$("body").on("click", ".gif", function(){
    var state = $(this).attr("state");
    if(state == "still"){
        $(this).attr("src", $(this).attr("moving"));
        $(this).attr("state", "moving");
    }
    else{
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "still");
    }
})

//Renders buttons upon page load
renderButtons();

});