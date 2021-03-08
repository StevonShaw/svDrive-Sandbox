var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;
var flag=true
function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad; var d = document.createElement("div"); var brandid=gamepad.id;
  d.setAttribute("id", "controller" + gamepad.index);
  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + brandid));
  d.appendChild(t);
  var s = document.createElement("div");
  s.className = "schema";
  if(brandid.search("Xbox")!=-1){
	  var Xbox=document.createElement('img');
	  Xbox.className="xboxschema";
	  Xbox.src='xbox-360.jpg';
	  s.appendChild(Xbox);
  }
  d.appendChild(s);
  document.getElementById("start").style.display = "none";
  document.body.appendChild(d);
  rAF(updateStatus);
 
}
function defaultschema(){
	var r=confirm("Do you wanna use the default schema?");
	if(r){
		console.log("User choose to use the default schema.");
	}else{
		confirm.log("User does not choose to use the default schema.");
	}
}
function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  scangamepads();
  for (j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);
    for (var i=0; i<controller.buttons.length; i++) {
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      var touched = false;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        if ('touched' in val) {
          touched = val.touched;
        }
        val = val.value;
      }
    
	  if(i==9&&(pressed||touched)){
		document.getElementById("start").style.display = "none";
	  	document.getElementById("controller0").style.display = "block";
	  	defaultschema();	
	  }
	  
    }
	
  }
  rAF(updateStatus);
}


function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i] && (gamepads[i].index in controllers)) {
      controllers[gamepads[i].index] = gamepads[i];
    }
  }
}

if (haveEvents) {
  window.addEventListener("gamepadconnected", connecthandler);
  window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
  window.addEventListener("webkitgamepadconnected", connecthandler);
  window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
  setInterval(scangamepads, 5);
}