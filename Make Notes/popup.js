function getDownloadFileName(pageurl){
    var i=pageurl.length-1;
    var clear = 0;
    var filename=pageurl;
    while(i>=0){
      if(filename.charAt(i) == '/')
         break;      
      i--;
    }

    filename = filename.slice(i+1);
    if(filename === "")
      filename = getDownloadFileName(pageurl.slice(0,i));

    return filename;
}

function downloadFileName(pageURL){
  if(pageURL != ""){
    var filename = getDownloadFileName(pageURL);
    $('#filename').val(filename);
  }
}


window.onload = function(){

    chrome.runtime.sendMessage({"message" : "popup_display_page"});
    
    chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
      //fill the download input field
      downloadFileName(request.pageurl);

      if(request.message === 'display_page') {
            if(request.pause == 1){
                $('#pause').removeClass('btn-secondary');
                $('#pause').addClass('btn-primary');
                $('#start').removeClass('btn-primary');
                $('#start').addClass('btn-secondary');
            }
            else{
                $('#start').removeClass('btn-secondary');
                $('#start').addClass('btn-primary');
                $('#pause').removeClass('btn-primary');
                $('#pause').addClass('btn-secondary');
          }
      }
    });


    $('#start').click(function(){
       chrome.runtime.sendMessage({"message" : "start"});
    });

    $('#pause').click(function(){
       chrome.runtime.sendMessage({"message" : "pause"});
    });

    $('#preview').click(function(){
       $('#preview').removeClass('btn-secondary');
       $('#preview').addClass('btn-primary');
       chrome.runtime.sendMessage({"message" : "preview"});
    })

    $('#reset').click(function(){
       $('#reset').removeClass('btn-danger');
       $('#reset').addClass('btn-primary');
       chrome.runtime.sendMessage({"message" : "reset"});
    });

    $('#download').click(function(){
       $('#download').removeClass('btn-success');
       $('#download').addClass('btn-primary');
       var filename = $('#filename').val();
       chrome.runtime.sendMessage({"message" : "download_file","filename":filename});
    });

}