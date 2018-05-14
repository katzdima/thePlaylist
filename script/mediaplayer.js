 //play icon on the play list
$(".playlists").on("click",".playIcon",function(){
    //initilazation
    $("#songsList").html("");
    $("#pauseIconAtPlayer").hide();
    $("#generalPlayerArea").slideDown("slow");

    //chosen play list id
    let id=parseInt($(this).parent().attr("id").substring(4));
    $('.editPlayList').parent().attr("data-id",`list${id}`);
    $('.closeMediaPlayer').parent().attr("data-id",`list${id}`);

    //cover image
    listURL=`http://localhost:8080/playlist/api/playlist.php/?type=playlist&id=${id}`;
    $.ajax({url: listURL,type: "GET", success:(results)=>{
        // console.log(results);
        $("#playerCoverImage").attr("src",results.data.image);

    }});

    //songs list
    listURL=`http://localhost:8080/playlist/api/playlist.php/?type=songs&id=${id}`;
    $.ajax({url: listURL,type: "GET", success:(results)=>{
        console.log(results.data);
        var songsList = results.data.songs;
        //creating songs list
        // for (let listItem in results.data.songs.data){
        //     $("#songsList").append(` 
        //         <li id="li${results.data.songs.data[listItem].id}">
        //             <a href="${results.data.songs.data[listItem].url}" >
        //                 ${results.data.songs.data[listItem].id}.${results.data.songs.data[listItem].name}
        //             </a>
        //         </li>
        //     `);
        // }
        creatSongList(songsList);

        //initilizing player with first song
        $("#player audio").attr("src",`${results.data.songs[0].url}`);
        $("#playIconAtPlayer").hide();
        $("#pauseIconAtPlayer").show();
        $("#player audio")[0].play();
        $("#playerCoverImage").addClass("rotate");
        let link=$("#songsList li:first-child a");
        setListLine(link);


        //managing playlist
        $("#songsList li a").on('click',function(e){
            e.preventDefault();
            resetListLine(songsList);
            
            setListLine(this);

            $("#player audio")[0].pause();
            $("#player audio")[0].src=this;
            $("#player audio")[0].play();
        });
    }});

    //play/pause player buttons
    $("#playIconAtPlayer").on("click",function(){
        $("#playIconAtPlayer").hide();
        $("#pauseIconAtPlayer").show();
        $("#player audio")[0].play();
        $("#playerCoverImage").addClass("rotate");
    });
    $("#pauseIconAtPlayer").on("click",function(){
        $("#pauseIconAtPlayer").hide();
        $("#playIconAtPlayer").show();
        $("#player audio")[0].pause();
        $("#playerCoverImage").removeClass("rotate");
    });



});





function creatSongList(data){
    for (let listItem in data){
        $("#songsList").append(` 
            <li id="li${data[listItem].id}">
                <a href="${data[listItem].url}" >
                    ${data[listItem].id}.${data[listItem].name}
                </a>
            </li>
        `);
    }
}
function resetListLine(e){
    // $("#songsList").find("li a").css("color","darkgray");
    //$(e).css("color","darkgray");
    $("#songsList").html("");
    creatSongList(e);
}
function setListLine(e){
    $(e).css("color","black");
    let eHTML=$(e).html().trim().substring(2);
    $(e).html(eHTML);
    $(e).before('<i class="fas fa-play fa-xs"></i>');
};

