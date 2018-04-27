 //http://www.disi.co.il/songs/Yam/EdenBenZaken/039.mp3
 //http://www.disi.co.il/songs/Yam/ItayHarari/020.mp3
 
 //play icon on the play list
$(".playlists").on("click",".playIcon",function(){
    $("#songsList").html("");
    $("#pauseIconAtPlayer").hide();
    $("#generalPlayerArea").slideDown("slow");

    let id=$(this).parent().attr("id").charAt(4);
    console.log(id);

    //cover image
    listURL=`http://localhost:8080/playlist/api/playlist.php/?type=playlist&id=${id}`;
    $.ajax({url: listURL,type: "GET", success:(results)=>{
        // console.log(results);
        $("#playerCoverImage").attr("src",results.data.image);

    }});

    //songs list
    listURL=`http://localhost:8080/playlist/api/playlist.php/?type=songs&id=${id}`;
    $.ajax({url: listURL,type: "GET", success:(results)=>{
        //console.log(results.data.songs.data);

        //creating songs list
        for (let listItem in results.data.songs.data){
            $("#songsList").append(` 
                <li id="li${results.data.songs.data[listItem].id}">
                    ${results.data.songs.data[listItem].id}.${results.data.songs.data[listItem].name}
                </li>
            `);
        }
        //initilizing player with first song
         $("#player audio").attr("src","http://www.disi.co.il/songs/Yam/ItayHarari/020.mp3");

    }});


});



//close and stop button on the media player
$("#generalPlayerArea").on("click",".closeMediaPlayer",()=>{
    $("#generalPlayerArea").slideUp("slow");
});