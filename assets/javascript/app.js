
var terms = [{ 
    term: "Homer Simpson",
    id: "homer"
},{ 
    term: "Peter Griffin",
    id: "peter"
},{ 
    term: "Hockey",
    id: "hockey"
},{ 
    term: "Starbucks",
    id: "sbux"
},{ 
    term: "Breaking Bad",
    id: "breaking"
}]

var dummy = "";

var search = ""

function addButtons() {

    for (i = 0; i < terms.length; i++) {
        var z = $("<button>")
        var y = $("#buttoned")
        z.attr("type", "button").attr("id", terms[i].id).attr("term", terms[i].term).addClass("btn btn-success theButtons").text(terms[i].term);
        y.append(z);
    }
    $("button").css("margin", "5px")
}
addButtons();

function runFunction() {
    
    search = $(this).attr("term");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Td5TAgRwWWXfi66UTYks9jrAoebbaLOa&q=" + search + "&limit=25&offset=0&rating=PG&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var a = $("#image")
        for (i = 0; i < response.data.length; i++) {
            a.append("<img src=" + "'" + response.data[i].images.fixed_height_still.url + "'/>" + "Rating: " + response.data[i].rating)
            a.attr("url1",response.data[i].images.fixed_height.url).attr("rating",response.data[i].rating).addClass("theImages")
        } a.removeAttr("url1")
    })
}

function runGif() {
    console.log(this)
    // dummy = $(this).attr("url1")
    // dummy1 = $(this).attr("rating")
    // $(this).html("<img src=" + "'" + dummy + "'/>" + "Rating: " + dummy1);

}
$(document).on("click",".theImages", runGif);
$("#addButton").on("click",function () {
    event.preventDefault();
    var a = $("#searchBox").val();
    var z = $("<button>")
    var y = $("#buttoned")
    z.attr("type", "button").attr("id",a).attr("term", a).addClass("btn btn-success theButtons").text(a);
    y.append(z);
    $("button").css("margin", "5px")
})

//use a handler?
$(document).on("click", ".theButtons", runFunction);

// $("#homer").on("click",function() {
//     search = terms[0].term
//     runFunction();
// })
  
// $("#peter").on("click",function() {
//     search = terms[1].term
//     runFunction();
// })

// $("#hockey").on("click",function() {
//     search = terms[2].term
//     runFunction();
// })

// $("#sbux").on("click",function() {
//     search = terms[3].term
//     runFunction();
// })

// $("#breaking").on("click",function() {
//     search = terms[4].term
//     runFunction();
// })
