//Wrestling themed buttons - object to create terms and button ID
var terms = [{
    term: "Stone Cold Steve Austin",
    photoId: "scsaImg"
}, {
    term: "Triple H",
    photoId: "hhhImg"
}, {
    term: "The Undertaker",
    photoId: "takerImg"
}, {
    term: "The Rock",
    photoId: "rockImg"
}, {
    term: "Chris Jericho",
    photoId: "y2jImg"
}, {
    term: "Shawn Michaels",
    photoId: "michaelsImg"
}, {
    term: "Kurt Angle",
    photoId: "angleImg"
}, {
    term: "People's Elbow",
    photoId: "elbowImg"
}]

//create an array to store used terms. call it later to check no duplicate terms are being turned into buttons
var usedTerms = [];

//forloop to add the initial wrestling-themed buttons. create classes that correspond to Bootstrap
function addButtons() {
    for (i = 0; i < terms.length; i++) {
        var z = $("<button>")
        var y = $("#buttoned")
        z.attr("type", "button").attr("id", terms[i].photoId).attr("term", terms[i].term).addClass("btn btn-success theButtons").text(terms[i].term);
        y.append(z);
        usedTerms.push(terms[i].term.toLowerCase())
    }
    $("button").css("margin", "5px")
}
addButtons();

function runFunction() {
    var search = $(this).attr("term");
    //api url. limit parameter limits search term to X amount; api_key is the key provided
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Td5TAgRwWWXfi66UTYks9jrAoebbaLOa&q=" + search + "&limit=10offset=0&rating=PG&lang=en"
    //AJAX call using API URL. then read API response to populate the different pieces including div ID, img src for the still gif, rating, and img src for the live gif
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var a = $("#image")
        for (i = 0; i < response.data.length; i++) {
            var b = $("<div>")
            b.attr("id", response.data[i].id)
            b.append("<img src=" + "'" + response.data[i].images.fixed_height_still.url + "'/>")
            b.attr("url1", response.data[i].images.fixed_height.url).attr("url2", response.data[i].images.fixed_height_still.url).attr("rating", response.data[i].rating).addClass("theImages text-warning bg-dark").append("<br> Rating: " + response.data[i].rating)
            a.append(b);
            $(".theImages").css({
                "float": "left",
                "text-align": "center"
            })
        }
    })
}


//turn on gif if off; turn off gif if on
function runGif() {
    //if the image doesn't have the 'playing' class, add it and turn on the gif
    if ($(this).hasClass("playing") === false) {
        $(this).addClass("playing")
        var dummyGif = $(this).attr("url1")
        var dummyRating = $(this).attr("rating")
        $(this).html("<img src='" + dummyGif + "'/><br>Rating: " + dummyRating)
    // if the 'playing' class exists, then it's already playing. so remove the class and turn the gif off
    } else if ($(this).hasClass("playing") === true) {
        $(this).removeClass("playing")
        var dummyGif = $(this).attr("url2")
        var dummyRating = $(this).attr("rating")
        $(this).html("<img src='" + dummyGif + "'/><br>Rating: " + dummyRating)
    }
}


function searchAddButtons() {
    event.preventDefault();
    var str = $("#searchBox").val();
    //make term lowercase
    var searchTerm = str.toLowerCase();
    //check if empty value passed--if empty don't allow button to be added    
    if (searchTerm !== "") {
        //run forloop to check if term has already been searched (including upper or lower case). if identical search, then don't add another button
        for (i = 0; i < usedTerms.length; i++) {
            if (usedTerms[i] === searchTerm) {
                var duplicate = 1;
            }
        }
        
        if (duplicate !== 1) {
            notDuplicateButton();
        }

    }
}
//create the button
function notDuplicateButton() {
    var a = $("#searchBox").val();
    var searchTerm = a.toLowerCase();
    var z = $("<button>")
    var y = $("#buttoned")
    z.attr("type", "button").attr("id", a).attr("term", a).addClass("btn btn-success theButtons").text(a);
    y.append(z);
    $("button").css("margin", "5px")
    //push to array usedTerms so it cannot be added as a button again
    usedTerms.push(searchTerm);

}
//if you click an image, run the Gif if it isn't already running or shut it off if it is
$(document).on("click", ".theImages", runGif);
//if you click with a term populating the textbox, start the process of vetting if the word has been added before
$("#addButton").on("click", searchAddButtons);
//if you click a button, make the API call located in runFunction
$(document).on("click", ".theButtons", runFunction);