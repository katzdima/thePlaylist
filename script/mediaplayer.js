var songsList;
var lineId=0;
//play icon on the play list
$(".playlists").on("click",".playIcon",function(){
    //initilazation
    $("#songsList").html("");
    $("#pauseIconAtPlayer").hide();
    $("#generalPlayerArea").slideDown("slow");
    $("#playerCoverImage").attr("src","images/defaultImage.jpg");
    $("#songsList li svg").hide();

    //chosen play list id
    let id=parseInt($(this).parent().attr("id").substring(4));
    $('.editPlayList').parent().attr("data-id",`list${id}`);
    $('.closeMediaPlayer').parent().attr("data-id",`list${id}`);

    //cover image
    listURL=`http://localhost:8080/playlist/api/playlist.php/?type=playlist&id=${id}`;
    $.ajax({url: listURL,type: "GET", success:(results)=>{
        $("#playerCoverImage").attr("src",results.data.image);
    }});

    //songs list
    listURL=`http://localhost:8080/playlist/api/playlist.php/?type=songs&id=${id}`;
    $.ajax({url: listURL,type: "GET", success:(results)=>{
        //creating songs list
        songsList = results.data.songs;
        creatSongList(songsList);
        $(".plays").hide();

        function creatSongList(data){
            for (let listItem in data){
                let listNum=parseInt(listItem)+1;
                $("#songsList").append(` 
                    <li id="li${listNum}">
                        <a href="${data[listItem].url}" >
                            ${listNum}.<i class="fas fa-play fa-xs plays"></i>${data[listItem].name}
                        </a>
                    </li>
                `);
            }
        }

        //initilizing player with first song
        $("#player audio").attr("src",`${results.data.songs[0].url}`);
        $("#playIconAtPlayer").hide();
        $("#pauseIconAtPlayer").show();
        $("#player audio")[0].play();
        $("#playerCoverImage").addClass("rotate");
        $("#nowPlaying").html(`Now playing: ${results.data.songs[0].name}`);
        let link=$("#songsList li:first-child a");
        setListLine(link);
        lineId=1;

        function setListLine(e){
            $(e).addClass("marked");
            $(e).find(".plays").show();
        };

        //managing playlist
        $("#songsList li a").on('click',function(e){
            e.preventDefault();
            $(".plays").hide();
            $("#songsList li a").removeClass("marked");
            setListLine(this);

            $("#player audio")[0].pause();
            $("#player audio")[0].src=this;
            $("#player audio")[0].play();

            lineId = parseInt($(this).parent().attr("id").substring(2));
            $("#nowPlaying").html(`Now playing: ${songsList[lineId-1].name}`);
        });

        //next song
        $("#player audio")[0].addEventListener('ended',function(){
            lineId++;
            if(lineId == $("#songsList li a").length+1){
                lineId = 1;
            }
            $("#player audio")[0].pause();
            $("#player audio").attr("src",`${songsList[lineId-1].url}`);
            $("#nowPlaying").html(`Now playing: ${songsList[lineId-1].name}`);
            $(".plays").hide();
            $("#songsList li a").removeClass("marked");
            setListLine($(`#songsList li:eq(${lineId-1}) a`));
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