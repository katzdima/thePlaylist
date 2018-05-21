//-------------------CREAT PLAYLIST----------------------------------------------------------------------------
//variable declaration
var validReturn=false;
var song = {
    name:"",
    url:""
};
var data={};
var songs = [];
var nameAndUrlValid;
var playlistId;
var isEdit;
var playlistId;
var listNameValid;
var listUrlValid;

//initilazation of the add playlist modal
$("#openModal").click(()=>{
    isEdit = false;
    validReturn=false;
    songs=[];
    $("#modalSection1").show();
    $("#modalSection2").hide();
    $("#closeAndSaveModal").hide();
    $("#previousBtn").hide();
    $("#nextBtn").show();
    $("#modalLongTitle").html("Add new playlist");
    $(".alert").hide();
    $("#playlistPreviewImg img").attr("src","images/defaultImage.jpg");

    $("#generalPlayerArea").slideUp("slow");
    $("#player audio")[0].pause();
    $("#nowPlaying").html(`Now playing: `); 
    $("#playerCoverImage").removeClass("rotate");
    $(".plays").hide();
});

//playlist cover image preview
$("#previewBtn").click(()=>{
    let listUrl=$("#formControlInput2").val();
    let regex = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g);
    if (listUrl.match(regex)) {
        $("#playlistPreviewImg img").attr("src",listUrl);
        $("#urlAlert1").hide();
    }else{
        $("#urlAlert1").show();
    }
});

//moving from first section of modal to second
$("#nextBtn").click(()=>{
    // validation of the entered data
    let nameValidation=false;
    let imageUrlValidation=false;
    let listName=$("#formControlInput1").val();
    if(listName.length<3|| listName.length>20){
        $("#nameAlert1").show();
    }else{
        $("#nameAlert1").hide();
        nameValidation=true;
    }
    let listUrl=$("#formControlInput2").val();
    let regex = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g);
    if (listUrl.match(regex)) {
        imageUrlValidation=true;
        $("#urlAlert1").hide();
    }else{
        $("#urlAlert1").show();
    }
    if(validReturn){
        if(listNameValid!==listName || listUrlValid!==listUrl){
            isEdit = true;
            validReturn=false;
        }
    }
    if(nameValidation && imageUrlValidation){
        if(!validReturn){
            if(!isEdit){
                //saving in DB new playlist withoud songs
                let newListUrl = 'http://localhost:8080/playlist/api/playlist.php/?type=playlist';
                data ={
                    name:listName,
                    image:listUrl,
                    songs:[{
                        name:'lala',
                        url:'lala link'
                    }]
                };
                $.post(newListUrl,data,function(data, status){
                    playlistId = data.data.id;
                });
            }
            else{
                //saving in DB edited playlist without songs
                data={
                    name:listName,
                    image:listUrl
                };
                let listURL = `http://localhost:8080/playlist/api/playlist.php/?type=playlist&id=${playlistId}`;
                $.ajax({url: listURL,type: "POST",data,success:(results)=>{
                }});

            }
        }
        //initilizing second section of modal
        validReturn=true;
        listNameValid=listName;
        listUrlValid=listUrl;
        $("#modalSection1").hide();
        $("#modalSection2").show();
        $("#nextBtn").hide();
        $("#previousBtn").show();
        $("#closeAndSaveModal").show();
        $("#modalLongTitle").html("Add Playlist songs");
    }
});

//returning from second section of modal to first
$("#previousBtn").click(()=>{
    $("#modalSection1").show();
    $("#modalSection2").hide();
    $("#nextBtn").show();
    $("#previousBtn").hide();
    $("#closeAndSaveModal").hide();
    $("#modalLongTitle").html("Add new playlist");
    $(".alert").hide();
});

//adding another row at section 2
$("#addRowBtn").click((e)=>{
    e.preventDefault();
    addingRowInSection2();
});
function addingRowInSection2(){
    $("#songsAddingContainer").append(`
        <div class="row">
            <div class="col-lg-8">
            <input type="text" class="form-control url" placeholder="Song URL">
            </div>
            <div class="col-lg-4">
                <input type="text" class="form-control name" placeholder="Song Name">  
            </div>
        </div>
    `);
}

//adding songs to playlist
$('#closeAndSaveModal').click(()=>{
    nameAndUrlValid = true;
    $('#nameAlert2').hide();
    $('#urlAlert2').hide();
    $("#songsAddingContainer").find(".form-control").removeClass('.errorBorder');
    //name and url input validation 
    $("#songsAddingContainer").find(".row").each(function(){
        name = $(this).find('.name').val();
        url = $(this).find('.url').val();
        if(name !== 'undefined' && url !== 'undefined'){
            if(name.length<3|| name.length>20){
                $('#nameAlert2').show();
                $(this).find('.name').addClass('errorBorder');
                nameAndUrlValid = false;
            }
            let regex = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:mp3)/g);
            if (!url.match(regex)){
                $('#urlAlert2').show();
                $(this).find('.url').addClass('errorBorder');
                nameAndUrlValid = false;
            }
        }
    });
    if(nameAndUrlValid){
        $("#songsAddingContainer").find(".row").each(function(){
            name = $(this).find('.name').val();
            url = $(this).find('.url').val();
            if(name !== 'undefined' && url !== 'undefined'){
                songs.push({
                    'name':name,
                    'url':url
                });
            }
        });
        data = {
            songs: songs
        };
        let listURL=`http://localhost:8080/playlist/api/playlist.php/?type=songs&id=${playlistId}`;
        $.post(listURL,data,function(data,status){

        });
        $("#modalSection1 input").val("");
        $("#modalSection2 input").val("");
        $('#songsAddingContainer').children('.row').not('.row:first').remove();
        addingRowInSection2();
        $('#modalCenter').modal('hide');
        setTimeout(function(){showAllPlaylist();},200);
    }
});
  
//when modal closed clean all data in value
$("#closeModal").click(()=>{
    //first modal section
    $("#playlistPreviewImg img").attr("src","images/defaultImage.jpg");
    $("#modalSection1 input").val("");
    //second modal section
    $("#modalSection2 input").val("");
    $('#songsAddingContainer').children('.row').not('.row:first').remove();
    addingRowInSection2();
    setTimeout(function(){showAllPlaylist();},200);
});

//-----------------------------UPDATE PLAYLIST--------------------------------------------------------
$('.playlists').on('click','.editIconPreviewPic',function(){
    playlistId = parseInt($(this).parent().attr("id").substring(4));
    updatePlaylist(playlistId);
});

$(".editPlayList").click(function(){
    playlistId = parseInt($(this).parent().attr("data-id").substring(4));
    updatePlaylist(playlistId);
});

function updatePlaylist(playlistId){
    //initilizing the modal content
    isEdit = true;
    validReturn=false;
    songs=[];
    $('#modalCenter').modal('show');
    $("#modalSection1").show();
    $("#modalSection2").hide();
    $("#closeAndSaveModal").hide();
    $("#previousBtn").hide();
    $("#nextBtn").show();
    $("#modalLongTitle").html("Add new playlist");
    $(".alert").hide();

    $("#generalPlayerArea").slideUp("slow");
    $("#player audio")[0].pause();
    $("#nowPlaying").html(`Now playing: `); 
    $("#playerCoverImage").removeClass("rotate");
    $(".plays").hide();

    //section1 of the modal
    let listURL = `http://localhost:8080/playlist/api/playlist.php/?type=playlist&id=${playlistId}`;
    $.ajax({url: listURL,type: "GET",dataType: 'json', success:(results)=>{
        $("#formControlInput1").val(results.data.name);
        $("#playlistPreviewImg img").attr("src",results.data.image);
        $("#formControlInput2").val(results.data.image);
    }});

    //section 2 of the modal
    $('#songsAddingContainer').children('.row').not('.row:first').remove();
    listURL=`http://localhost:8080/playlist/api/playlist.php/?type=songs&id=${playlistId}`;
    $.ajax({url: listURL,type: "GET",dataType: 'json', success:(results)=>{
        for (let item in results.data.songs){
            addingRowInSection2();
            $('#songsAddingContainer .row:last-child').find('.url').val(results.data.songs[item].url);
            $('#songsAddingContainer .row:last-child').find('.name').val(results.data.songs[item].name);
        }
    }});
}

//-----------------------------DELETE PLAYLIST--------------------------------------------------------
$('.playlists').on('click','.deleteIconPreviewPic',function(){
    let id = parseInt($(this).parent().attr("id").substring(4));
    deletePlaylist(id);
});

$(".closeMediaPlayer").click(function(){
    $("#generalPlayerArea").slideUp("slow");
    $("#player audio")[0].pause();
    $("#nowPlaying").html(`Now playing: `); 
    $("#playerCoverImage").removeClass("rotate");
    $(".plays").hide();
    let id = parseInt($(this).parent().attr("data-id").substring(4));
    deletePlaylist(id);
});

function deletePlaylist (id){
    $('#modalDelete').modal('show');
    $('#YesDeleteBtn').click(()=>{
        let listURL=`http://localhost:8080/playlist/api/playlist.php/?type=playlist&id=${id}`;
        $.ajax({url: listURL,type: "DELETE", success:(results)=>{
        
        }});
        $('#modalDelete').modal('hide');
        $(".playlists").html("");
        setTimeout(function(){showAllPlaylist();},500);
    });
}