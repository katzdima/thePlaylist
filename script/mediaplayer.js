 //play icon on the play list
$(".playlists").on("click",".playIcon",()=>{
    $("#mediaPlayer").slideDown("slow");
    var id=0;
    id=$(this).parent().attr("id");
    console.log(id);

});



//close and stop button on the media player
$("#mediaPlayer").on("click",".closeMediaPlayer",()=>{
    $("#mediaPlayer").slideUp("slow");
});