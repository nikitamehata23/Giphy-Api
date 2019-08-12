//global variables

//relOAD the buttons
const preloadedGifs = ["Playing", "Swimming", "Walking", "Dancing", "Fighting", "Slipping","Sleeping"];
//object holder arrays
let gifData = new Array({});

preloadedGifs.forEach(action => {
displayButton(action);
});

//random items to preload the page
let selectedItem = preloadedGifs[Math.floor(Math.random() * (preloadedGifs.length + 1))];
console.log(selectedItem);
getGifs(selectedItem, 12);


function displayButton(item){
     //add a button to the button-Holder div/column
     $("#button-Holder").append('<button type="button" class="btn btn-success btn-sm">' + item + '</button>');
}

function displayGifStills(){
    $("#gif-Section").empty();
    for( var i = 0; i < gifData.length; i++){
        var htmlText =
            '<div class="card border-success" style="max-width: 18rem;">' +
                    // '<p class="list-group-item">Rating: ' + gifData[i].rating +'</p>'
                    '<img id=' + i + '" class="card-img-top" src="' + gifData[i].fixedHeightStill +' alt="Card image cap" state="still">' +
                    '<p class="list-group-item">Rating: ' + gifData[i].rating +'</p>'
                    '<p class="card-title"> Title: ' + gifData[i].title + '</p>' +
                    // '<p class="list-group-item">Rating: ' + gifData[i].rating +'</p>'
                   
            '</div>';
    
        $("#gif-Section").append(htmlText);
    }
 }



function getGifs(item, numResults){
    //Get the search value
    let searchString = $("#searchGif").find("input").val();

    let queryText = "https://api.giphy.com/v1/gifs/search?q=" + item + "&limit=" + numResults + "&api_key=umwi8JJIuDRiB1p2JugbyJObZrmbA0eD";
    $.ajax({
        url: queryText,
        method: "GET"
    }).then(function (response){
        fillGifDataArray(response.data);
    })
}

function fillGifDataArray(rawDataArray){
    //reset the object
    gifData.length = 0;
    let newObj;
    for(var i = 0; i < rawDataArray.length; i++){
        newObj = {
            id: i,
            title: rawDataArray[i].title.toUpperCase(),
            rating: rawDataArray[i].rating.toUpperCase(),
            trendingOn: rawDataArray[i].trending_datetime,
            fixedWidth: rawDataArray[i].images.fixed_width.url,
            fixedWidthStill: rawDataArray[i].images.fixed_width_still.url,
            fixedWidthSize: parseInt(rawDataArray[i].images.fixed_width_still.width),
            fixedHeight: rawDataArray[i].images.fixed_height.url,
            fixedHeightStill: rawDataArray[i].images.fixed_height_still.url,
            fixedHeightSize: parseInt(rawDataArray[i].images.fixed_height_still.height)
        };
        gifData.push(newObj);
    }
    //Gif Displays
    displayGifStills();
}

$("#gif-Section").on("click", function (event) {
    //if we click nothing 
    if(event.target.nodeName.toUpperCase() != "IMG"){
        return;
    }
    var indx = parseInt(event.target.id);

    // attributes
    if(event.target.attributes["state"].value === "still"){
        event.target.attributes["src"].value = gifData[indx].fixedHeight;
        event.target.attributes["state"].value = "playing";
    }else{
        event.target.attributes["src"].value = gifData[indx].fixedHeightStill;
        event.target.attributes["state"].value = "still";
    }
});

$("#button-Holder").on("click", function (event){
    selectedItem = event.target.textContent;
    getGifs(selectedItem, 10);
});