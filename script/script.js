// the AJAX URL http://localhost:8080/playlist/api/playlist.php/?type=playlist for all lists
//the url for all songs from first playlist http://localhost:8080/playlist/api/playlist.php/?type=songs&id=1
// the url of the first playlist is http://localhost:8080/playlist/api/playlist.php/?type=playlist&id=1
$(document).ready(()=>{
    $("#generalPlayerArea").hide();
    showAllPlaylist();
});

function showAllPlaylist(){
    $(".playlists").html("");
    var listURL="http://localhost:8080/playlist/api/playlist.php/?type=playlist";

    //main list of the playlists
    $.ajax({url: listURL,type: "GET",dataType: 'json', success:(results)=>{
        console.log(results);
        for (let listItem in results.data){
            $(".playlists").append(`
                <div class="note col-xm-12 col-sm-6 col-md-4 col-lg-3">
                    <h4 class="text-center curved">${results.data[listItem].name}</h4>
                    <div class="text-center albomReviewPic">
                        <div class="iconsPreviewPic" id="card${results.data[listItem].id}">
                            <i class="far fa-times-circle deleteIconPreviewPic"></i>
                            <i class="fas fa-info-circle editIconPreviewPic"></i>
                            <a class="playIcon">
                                <i class="far fa-play-circle fa-2x"></i>
                            </a>
                        </div>
                        <img src="${results.data[listItem].image}" alt="Play list picture" class="previewImg">
                    </div>
                </div>
            `);
            $(".curved").arctext({radius: 109});
        }
    }});
}