 //play icon on the play list
$(".playlists").on("click",".playIcon",()=>{
    $("#generalPlayerArea").slideDown("slow");

    var id=0;
    id=$(this).parent().attr("id");
    console.log(id);

    //cover image
    id=1;
    listURL=`http://localhost:8080/playlist/api/playlist.php/?type=playlist&id=${id}`;
    $.ajax({url: listURL,type: "GET", success:(results)=>{
        console.log(results);
        $("#playerCoverImage").attr("src",results.data.image);

    }});

    //songs list
    id=1;
    listURL=`http://localhost:8080/playlist/api/playlist.php/?type=songs&id=${id}`;
    $.ajax({url: listURL,type: "GET", success:(results)=>{
        console.log(results);
        
    }});

});



//close and stop button on the media player
$("#generalPlayerArea").on("click",".closeMediaPlayer",()=>{
    $("#generalPlayerArea").slideUp("slow");
});