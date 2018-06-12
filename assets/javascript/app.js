
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

var dummy = 0;

var search = ""

function addButtons() {

    for (i = 0; i < terms.length; i++) {
        var z = $("<button>")
        var y = $("#buttons")
        z.attr("type", "button").attr("id", terms[i].id).attr("value", terms[i]).addClass("btn btn-success").text(terms[i].term);
        y.append(z);
    }
    $("button").css("margin", "5px")
}
addButtons();

function runFunction() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Td5TAgRwWWXfi66UTYks9jrAoebbaLOa&q=" + search + "&limit=25&offset=0&rating=PG&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var a = $("#image")
        for (i = 0; i < 25; i++) {
            a.append("<img src=" + "'" + response.data[i].images.fixed_height.url + "'/>")

        }
    })
}

$("#homer").on("click",function() {
    search = terms[0].term
    runFunction();
})
  
$("#peter").on("click",function() {
    search = terms[1].term
    runFunction();
})

$("#hockey").on("click",function() {
    search = terms[2].term
    runFunction();
})

$("#sbux").on("click",function() {
    search = terms[3].term
    runFunction();
})

$("#breaking").on("click",function() {
    search = terms[4].term
    runFunction();
})
