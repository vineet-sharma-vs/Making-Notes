var html_start  = "<!DOCTYPE html>\n <html>\n <head>\n  <title>text file</title>\n  <meta charset='utf-8'>\n";
html_start += "<meta name='viewport' content='width=device-width, initial-scale=1'>\n";
html_start += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'>\n";
html_start += "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>\n";
html_start += "<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js'></script>\n";
html_start += "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js'></script></head>\n";
html_start += "<body>\n";
html_start += "<div class='list-group'>\n";

var html_end = "\n</div>\n</body>\n</html>";

var text = "";
var copy = 0;
var pause = 1;
 
function saveText(filename, text) {
  filename += '.html';

  var tempElem = document.createElement('a');
  tempElem.setAttribute('href','data:text/html;charset=utf-8,' + encodeURIComponent(text));
  tempElem.setAttribute('download', filename);
  tempElem.click();
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){

  if(request.message === 'popup_display_page') {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
      chrome.runtime.sendMessage({"message" : "display_page","pause":pause,"pageurl":tabs[0].url});
    });
  }

  if(request.message === 'reset') {
    text = "";
    pause = 1;
  }

  if(request.message === 'start') {
    copy = 1;
    pause = 0;
    alert("Lets start copy");
    var activeTab = sender.id;
    chrome.tabs.executeScript(activeTab.id,{file: 'jquery-2.1.3.min.js'});
    chrome.tabs.executeScript(activeTab.id, {file: "save_file.js"});

  }

  if(request.message === 'pause') {
    //display_page = 2;
    copy = 0;
    pause = 1;
    alert("Extension Paused");
  }

  if(request.message === 'preview') {
    var config = {textPreview: text}; 
    var activeTab = sender.id;

    chrome.tabs.executeScript(activeTab.id,{file: 'jquery-2.1.3.min.js'});
    chrome.tabs.executeScript(activeTab.id,{code: 'var config = ' + JSON.stringify(config)});
    chrome.tabs.executeScript(activeTab.id,{file: 'preview.js'});
  }

  if(request.message === 'get_selected_text') {
    if(copy == 1){
      if(!text.includes(request.selected_text))
        text += "<li class='list-group-item list-group-item-action' style='color:red;display:block;'>"+request.selected_text+"</li>";
    }
  }

  if(request.message === 'download_file') {
    
    var filetext = html_start+text+html_end;
    var filename = request.filename;
    saveText(filename, filetext);

  }

});
