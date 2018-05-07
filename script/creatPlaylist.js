
//initilazation of the add playlist modal
$("#openModal").click(()=>{
    $("#modalSection1").show();
    $("#modalSection2").hide();
    $("#closeAndSaveModal").hide();
    $("#previousBtn").hide();
    $("#nextBtn").show();
    $("#modalLongTitle").html("Add new playlist");
    $(".alert").hide();
    $("#playlistPreviewImg img").attr("src","images/defaultImage.jpg");
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
    if(nameValidation && imageUrlValidation){
        //saving in DB new playlist withoud songs
        var newListUrl = 'http://localhost:8080/playlist/api/playlist.php/?type=playlist';
        let data ={
            name:listName,
            image:listUrl,
            songs:[{
                name:'lala',
                url:'lala link'
            }]
        };
        $.post(newListUrl,data,function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
        });
        //initilizing second section of modal
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
    $("#songsAddingContainer").append(`
        <div class="row">
            <div class="col-lg-8">
            <input type="text" class="form-control" placeholder="Song URL">
            </div>
            <div class="col-lg-4">
                <input type="text" class="form-control" placeholder="Song Name">  
            </div>
        </div>
    `);
});

//when modal closed clean all data in value
$("#closeModal").click(()=>{
    //first modal section
    $("#playlistPreviewImg img").attr("src","images/defaultImage.jpg");
    $("#modalSection1 input").val("");
    //second modal section

})