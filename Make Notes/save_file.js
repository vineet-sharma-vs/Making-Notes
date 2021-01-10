   function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
      var sel = window.getSelection();
      if (sel.rangeCount) {
        var container = document.createElement("div");
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
          container.appendChild(sel.getRangeAt(i).cloneContents());
        }
        html = container.innerHTML;
      }
    } else if (typeof document.selection != "undefined") {
      if (document.selection.type == "Text") {
        html = document.selection.createRange().htmlText;
      }
    }

    return html;
  }



  document.onmouseup = function(){  
   var html = getSelectionHtml();
   var txt = html;

   if(txt.replace(/\s/g,''.length) != 0)  
     chrome.runtime.sendMessage({"message" : "get_selected_text" , "selected_text" : html});    
 }