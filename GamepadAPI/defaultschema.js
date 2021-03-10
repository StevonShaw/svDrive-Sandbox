
var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;
var flag=0;
var x=0;
var y=0;
function connecthandler(e) {
  addgamepad(e.gamepad);
}
function setFlag(v){
	defaultschema(v);
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
function defaultschema(v){
	
	if(v==1){
		var r=confirm("Do you wanna use the scheme "+flag+" ?"+"Y:up,A:down,X:left,Y:right");
		if(r){
			console.log("User choose to use the scheme 1.");
			flag=1;
		}else{
			console.log("User does not choose to use the scheme 1.");
			rAF(updateStatus);
		}
	}else
	if(v==2){
		var r=confirm("Do you wanna use the scheme "+flag+" ?"+"⬆:up,⬇:down,⬅:left,➡:right");
		if(r){
			console.log("User choose to use the scheme 2.");
			flag=2;
		}else{
			console.log("User does not choose to use the scheme 2.");
			rAF(updateStatus);
		}
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
	  if(flag==0){
		console.log("flag=0,user have not chose the scheme.");
		if(i==9&&(pressed||touched)){
			document.getElementById("start").style.display = "none";
			document.getElementById("controller0").style.display = "block";
		}
		if(i==8&&(pressed||touched)){
			document.getElementById("start").style.display = "block";
			document.getElementById("controller0").style.display = "none";
		}
	  }else
	  if(flag==1){
		console.log("flag=1,user choosed the default scheme.");
		if(i==9&&(pressed||touched)){
			document.getElementById("start").style.display = "none";
			document.getElementById("controller0").style.display = "block";
		}
		if(i==8&&(pressed||touched)){
			document.getElementById("start").style.display = "block";
			document.getElementById("controller0").style.display = "none";
		}
		if(i==3&&(pressed||touched)){
			y++;
		}else
		if(i==0&&(pressed||touched)){
			y--;
		}else
		if(i==1&&(pressed||touched)){
			x++;
		}else
		if(i==2&&(pressed||touched)){
			x--;
		}  
	  }else
	  if(flag==2){
		console.log("flag=2,user choosed the 1 scheme.");
		if(i==9&&(pressed||touched)){
			document.getElementById("start").style.display = "none";
			document.getElementById("controller0").style.display = "block";
		}
		if(i==8&&(pressed||touched)){
			document.getElementById("start").style.display = "block";
			document.getElementById("controller0").style.display = "none";
		}
		if(i==12&&(pressed||touched)){
			y++;
		}else
		if(i==13&&(pressed||touched)){
			y--;
		}else
		if(i==15&&(pressed||touched)){
			x++;
		}else
		if(i==14&&(pressed||touched)){
			x--;
		}  
	  }
	  
	  
    }
	ball.style.left = x*2 + "px";
	ball.style.top = y*2 + "px";
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