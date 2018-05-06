
//initilazation of the add playlist modal
$("#openModal").click(()=>{
    $("#modalSection1").show();
    $("#modalSection2").hide();
    $("#closeAndSaveModal").hide();
    $("#previousBtn").hide();
    $("#nextBtn").show();
    $("#modalLongTitle").html("Add new playlist");
});

//moving from first section of modal to second
$("#nextBtn").click(()=>{
    // saving entered data
    let listName=$("#formControlInput1").val();
    let listUrl=$("#formControlInput2").val();
    console.log(listUrl);
    var newListUrl = 'http://localhost:8080/playlist/api/playlist.php/?type=playlist';
    //$.post(URL,data,callback);
    let data =`'name':${listName},'image':${listUrl}`;
    $.post(newListUrl,data,function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });




    //initilizing second section of modal
    $("#modalSection1").hide();
    $("#modalSection2").show();
    $("#nextBtn").hide();
    $("#previousBtn").show();
    $("#closeAndSaveModal").show();
    $("#modalLongTitle").html("Add Playlist songs");
});

//returning from second section of modal to first
$("#previousBtn").click(()=>{
    $("#modalSection1").show();
    $("#modalSection2").hide();
    $("#nextBtn").show();
    $("#previousBtn").hide();
    $("#closeAndSaveModal").hide();
    $("#modalLongTitle").html("Add new playlist");
});

//when modal closed clean all data in value
$("#closeModal").click(()=>{
    //TBD

})