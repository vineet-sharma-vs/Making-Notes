var modal_start  = '<div id="modalBox" style="display: block; position: fixed; z-index: 1;left: 0;top: 0;';
    modal_start += 'width: 100%;height: 100%;background-color: rgba(0,0,0,0.6);">';
    modal_start += '<div style="display: block; position: fixed; z-index: 1;left: 50%;top: 50%;width: 50%;height: 50%;';
    modal_start += 'transform: translate(-50%,-50%);background-color: white;color:white;border-radius: 10px;overflow-y:scroll;';
    modal_start += 'padding:5px 5px;border:solid 3px white;" id="modal">';
    modal_start += '<button id="closeBtn" style="background-color: #1e90ff;color: white;float:right;margin-top:5px;';
    modal_start += 'margin-right:5px;font-size: 30px;border-radius: 5px;border:none;font-weight: bold;padding:2px 6px;';
    modal_start += 'position:sticky;top:5px;z-index=1;">X</button>';
var modal_end = '</div></div>';

var modelExit = false;

var preview = config.textPreview;
var modal = document.createElement('div');
modal.innerHTML = modal_start+preview+modal_end;
document.body.appendChild(modal);

modelExit = true;

$('#closeBtn').mouseenter(function(){
  $("#closeBtn").css({"background-color":"white","color":"#1e90ff"});
  $("#closeBtn").css('cursor','pointer');
});

$('#closeBtn').mouseleave(function(){
  $("#closeBtn").css({"background-color":"#1e90ff","color":"white"});
});

document.getElementById('closeBtn').onclick = function(){
	if (modelExit){
		document.getElementById('modalBox').remove();
		modelExit = false;
	}
    
    
}

window.onclick = function(event) { 
	if(modelExit){
		document.getElementById('modalBox').remove();
		modelExit = false;
	}    
}


