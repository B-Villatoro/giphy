let search;
let searchArray = ["Gandalf","Boromir","And My axe","spongebob"]
let giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=jZZO00sEpmWON3m5hRCUOUQPf596kQ21&q="+searchArray[0]+"&limit=10&offset=0&rating=PG-13&lang=en"




makeButtons = function(){
    $("#buttonbox").empty();
    for(let i= 0; i <searchArray.length; i++){
        newButton = $("<button>");
        newButton.addClass("searched");
        newButton.attr("data-name",searchArray[i])
        newButton.append(searchArray[i]);
        $("#buttonbox").append(newButton);
    }
}

$("#searchbutt").on("click",function(e){
    e.preventDefault();
    search = $("#searchIn").val().trim();
    if(searchArray.indexOf(search)==-1 && search != ""){
        searchArray.push(search);
        makeButtons();
            
    }
})
   



searchResults = function(){
    $("#dump").empty();
    $("#dump0").empty();
    searchName = $(this).attr("data-name");
    giphyUrl =`https://api.giphy.com/v1/gifs/search?api_key=jZZO00sEpmWON3m5hRCUOUQPf596kQ21&q=${searchName}&limit=10&offset=0&rating=PG-13&lang=en`
    $.ajax({
        url : giphyUrl,
        method : "GET"
    }).then(function(response){
        console.log(response);
        array = response.data;
        for(let i = 0; i < array.length; i++){
            newDiv = $("<div>");
            newImg = $("<img>");
            newWord = $("<p>");
            rating = array[i].rating;
            newImg.addClass("pic");
            newWord.append("Rating: "+rating);
            newUrl = array[i].images.fixed_width_still.url;
            newImg.attr("src",newUrl);
            newImg.attr("still",array[i].images.fixed_width_still.url);
            newImg.attr("anime",array[i].images.fixed_width.url)
            newImg.attr("state","still");
            newDiv.append(newImg)
            
            if(i>Math.floor(array.length/2)-1){
                $("#dump0").append(newDiv);
                $("#dump0").append(newWord);
                
            }
            else{
                $("#dump").append(newDiv);
                $("#dump").append(newWord); 
            }    
        }
    })
}


makeButtons();
$(document).on("click",".searched",searchResults);
$(document).on("click",".pic",function(){
    pic = $(this);
    state = pic.attr("state");
    if(state == "still"){
        pic.attr("src",pic.attr("anime"));
        pic.attr("state","animate");
        console.log("click0");
    }
    else{
        pic.attr("src",pic.attr("still"));
        pic.attr("state","still");
        console.log("click1");
    }
});
