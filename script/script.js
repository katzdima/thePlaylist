// the AJAX URL http://localhost:8080/playlist/api/playlist.php/?type=playlist for all lists
//the url for all songs from first playlist http://localhost:8080/playlist/api/playlist.php/?type=songs&id=1
// the url of the first playlist is http://localhost:8080/playlist/api/playlist.php/?type=playlist&id=1
$(document).ready(()=>{
    $(".playlists").html("");
    $("#mediaPlayer").hide();
    var listURL="http://localhost:8080/playlist/api/playlist.php/?type=playlist";

    $(".playlists").on("click",".playIcon",()=>{
        console.log("play");
        $("#mediaPlayer").slideDown("slow");
        let id=$(this).parent().attr("id");
        console.log(id);
    });

    $("#mediaPlayer").on("click",".closeMediaPlayer",()=>{
        $("#mediaPlayer").slideUp("slow");
    });

    $.ajax({url: listURL,type: "GET", success:(results)=>{
        console.log(results);
        for (let listItem in results.data){
            $(".playlists").append(`
                <div class="note col-xm-12 col-sm-6 col-md-4 col-lg-3 ">
                    <h3 class="text-center">${results.data[listItem].name}</h3>
                    <div class="text-center albomReviewPic">
                        <div class="iconsPreviewPic" id="${results.data[listItem].id}">
                            <i class="far fa-times-circle deleteIconPreviewPic"></i>
                            <i class="fas fa-info-circle editIconPreviewPic"></i>
                            <a class="playIcon">
                                <i class="far fa-play-circle fa-2x"></i>
                            </a>
                        </div>
                        <img src="${results.data[listItem].image}" alt="Smiley face" class="previewImg">
                    </div>
                </div>
            `);
        }
    }});
});