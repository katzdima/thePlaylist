var listData;
$(document).ready(()=>{
    $("#generalPlayerArea").hide();
    showAllPlaylist();
});

//all playlists display
function showAllPlaylist(){
    $(".playlists").html("");
    var listURL="http://localhost:8080/playlist/api/playlist.php/?type=playlist";

    //main list of the playlists
    $.ajax({url: listURL,type: "GET",dataType: 'json', success:(results)=>{
        listData = results.data;
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

//search in playlist
$('#search').keyup(function(){
    $(".playlists").html("");
    let searchField = $('#search').val();
    let exp = RegExp(searchField,"i");
    $.each(listData,function(key,value){
        if(value.name.search(exp)!== -1){
            $(".playlists").append(`
                <div class="note col-xm-12 col-sm-6 col-md-4 col-lg-3">
                    <h4 class="text-center curved">${value.name}</h4>
                    <div class="text-center albomReviewPic">
                        <div class="iconsPreviewPic" id="card${value.id}">
                            <i class="far fa-times-circle deleteIconPreviewPic"></i>
                            <i class="fas fa-info-circle editIconPreviewPic"></i>
                            <a class="playIcon">
                                <i class="far fa-play-circle fa-2x"></i>
                            </a>
                        </div>
                        <img src="${value.image}" alt="Play list picture" class="previewImg">
                    </div>
                </div>
            `);
            $(".curved").arctext({radius: 109});
        }
    });
});