
$(document).ready(function(){
    // $(".playlists").html("");
    var listURL="https://reqres.in/api/users";

    $.ajax({url: listURL,type: "GET", success: function(results){
        console.log(results);
        for(let page=0; page< results["total_pages"];page++){
            $.ajax({url: "https://reqres.in/api/users?page="+page,type: "GET", success: function(result){
                console.log(results["total_pages"]);
                for (let listItem in result["data"] ){
                    $(".playlists").append(`
                        <div class="note col-xm-12 col-sm-6 col-md-4 col-lg-3 ">
                            <h3 class="text-center">${result["data"][listItem]["first_name"]} ${result["data"][listItem]["last_name"]}</h3>
                            <div class="text-center albomReviewPic">
                                <div class="iconsPreviewPic">
                                    <i class="far fa-times-circle deleteIconPreviewPic"></i>
                                    <i class="fas fa-info-circle editIconPreviewPic"></i>
                                    <a href="#" class="playIcon">
                                        <i class="far fa-play-circle fa-2x"></i>
                                    </a>
                                </div>
                                <img src="${result["data"][listItem]["avatar"]}" alt="Smiley face" class="previewImg">
                            </div>
                        </div>
                    `);
                }
            }});
        }
    }});

    // var playListArr=[1,2,3,4,5,6,7,8];
    // var previewImg = 'images/smile.jpg'; 
    // for (let listItem in playListArr ){
    //     $(".playlists").append(`
    //         <div class="note col-xm-12 col-sm-6 col-md-4 col-lg-3 ">
    //             <h3 class="text-center">${listItem}</h3>
    //             <div class="text-center albomReviewPic">
    //                 <div class="iconsPreviewPic">
    //                     <i class="far fa-times-circle deleteIconPreviewPic"></i>
    //                     <i class="fas fa-info-circle editIconPreviewPic"></i>
    //                     <a href="#" class="playIcon">
    //                         <i class="far fa-play-circle fa-2x"></i>
    //                     </a>
    //                 </div>
    //                 <img src="${previewImg}" alt="Smiley face" class="previewImg">
    //             </div>
    //         </div>
    //     `);
    // }
});