// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_VertGlobalRotateMatrix;
  void main() {
  gl_Position = u_VertGlobalRotateMatrix*u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE =`
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
  gl_FragColor = u_FragColor;
  }`

// Global variables
let gl;
let canvas;
let u_FragColor;
let a_Position;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_VertGlobalRotateMatrix;



//Setup the Canvas in WebGL
function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL

  gl = canvas.getContext("webgl", { preserveDrawingBuffer:true });
  gl.enable(gl.DEPTH_TEST);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

//Convert the Javascript variables to GLSL
function connectVariablesToGLSL(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  u_VertGlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_VertGlobalRotateMatrix');
  if (!u_VertGlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_VertGlobalRotateMatrix');
    return;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

// Assignment 2
let g_global_angle = 0;
let g_vert_global_angle = 0;
let g_leg2leg3Angle=0;
let g_leg1leg4Angle =0;
let g_foot2foot3Angle=0;
let g_foot1foot4Angle =0;
let g_tail_angle = 0;
let g_dog_animation = false;
let g_tail_animation = false;
let g_body_motion =0;

function addActionsforHTMLUI(){
  //Button Events
  //document.getElementById('clearcanvas').onclick = function(){g_shapeList=[]; renderAllShapes();};
  //Assignment 2
  document.getElementById('angleSlide').addEventListener('mousemove', function(){g_global_angle=this.value; renderAllShapes();});
  document.getElementById('angleSlideVert').addEventListener('mousemove', function(){g_vert_global_angle=this.value; renderAllShapes();});
  document.getElementById('leftlegs').addEventListener('mousemove', function(){g_leg1leg4Angle=this.value; renderAllShapes();});
  document.getElementById('rightlegs').addEventListener('mousemove', function(){g_foot2foot3Angle=this.value; renderAllShapes();});
  document.getElementById('tailangle').addEventListener('mousemove', function(){g_tail_angle=this.value; renderAllShapes();});
  document.getElementById('animationOn').onclick = function(){g_dog_animation = true;};
  document.getElementById('animationOff').onclick = function(){g_dog_animation = false;};
  document.getElementById('animationBoxOn').onclick = function(){g_tail_animation = true;};
  document.getElementById('animationBoxOff').onclick = function(){g_tail_animation = false;};
}


function main() {
  setupWebGL();
  connectVariablesToGLSL();
  addActionsforHTMLUI();
  // Register function (event handler) to be called on a mouse press
  // canvas.onmousedown = click;
  // canvas.onmousemove = function(ev) { if(ev.buttons==1){click(ev)}};

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);


  // Clear <canvas>
  // gl.clear(gl.COLOR_BUFFER_BIT);
  //renderAllShapes();

  requestAnimationFrame(tick);
}

var g_shapeList = [];

//Render and Draw the shapes
function renderAllShapes(){
  var startTime = performance.now();

  var globalRotMat = new Matrix4().rotate(-g_global_angle,0,1,0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false,globalRotMat.elements);
  var globalRotMatVert = new Matrix4().rotate(-g_vert_global_angle,1,0,0);
  gl.uniformMatrix4fv(u_VertGlobalRotateMatrix, false,globalRotMatVert.elements);
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //Draw Main animal body
  var body = new Cube();
  body.color = [0.738,0.601,0.476,1.0]; // Adjust color to brown
  body.matrix.setTranslate(-0.25,-0.3,-g_body_motion);
  //body.matrix.rotate(-5,1,0,0);
  //body.matrix.rotate(g_armAngle,1,0,0);
  var bodyCoordinatesMatrix1 = new Matrix4(body.matrix);
  var bodyCoordinatesMatrix2 = new Matrix4(body.matrix);
  var bodyCoordinatesMatrix3 = new Matrix4(body.matrix);
  var bodyCoordinatesMatrix4 = new Matrix4(body.matrix);
  var bodyCoordinatesMatrix5 = new Matrix4(body.matrix);
  var bodyCoordinatesMatrix6 = new Matrix4(body.matrix);
  body.matrix.scale(0.4,0.4,0.6);
  body.render();

  var face = new Face();
  face.color = [0.738,0.601,0.476,1.0];
  face.matrix = bodyCoordinatesMatrix5;
  face.matrix.translate(0,0,-0.6);
  face.matrix.scale(0.8,0.8,0.1);
  face.render();

  //Leg of Animal
  var leg1 = new Cube();
  leg1.color = [0.738,0.601,0.476,1.0];
  leg1.matrix = bodyCoordinatesMatrix1;
  leg1.matrix.translate(0.4,0.1,0);
  leg1.matrix.rotate(-10,1,0,0);
  leg1.matrix.rotate(g_leg1leg4Angle,1,0,0);
  var leg1CoordinatesMat = new Matrix4(leg1.matrix);
  leg1.matrix.scale(-0.1,-0.2,0.15);
  //leg1.matrix.translate(-0.0,0.0,0.0);
  leg1.render();

  var foot1 = new Cube();
  foot1.color = [0.738,0.601,0.476,1.0];
  foot1.matrix = leg1CoordinatesMat;
  foot1.matrix.translate(0,-0.2,0);
  foot1.matrix.rotate(10,1,0,0);
  foot1.matrix.rotate(g_foot1foot4Angle,1,0,0);
  var foot1CoordinatesMat = new Matrix4(foot1.matrix);
  foot1.matrix.scale(-0.1,-0.12,0.15);
  foot1.render();

  var paw1 = new Cube();
  paw1.color = [0.738,0.601,0.476,1.0];
  paw1.matrix = foot1CoordinatesMat;
  paw1.matrix.translate(0,-0.12,0);
  paw1.matrix.scale(-0.1,-0.05,0.2);
  paw1.render();
//////////////////////////////
  var leg2 = new Cube();
  leg2.color = [0.738,0.601,0.476,1.0];
  leg2.matrix = bodyCoordinatesMatrix2;
  leg2.matrix.translate(0.1,0.1,0);
  leg2.matrix.rotate(-10,1,0,0);
  leg2.matrix.rotate(g_leg2leg3Angle,1,0,0);
  var leg2CoordinatesMat = new Matrix4(leg2.matrix);
  leg2.matrix.scale(-0.1,-0.2,0.15);
  leg2.render();

  var foot2 = new Cube();
  foot2.color = [0.738,0.601,0.476,1.0];
  foot2.matrix = leg2CoordinatesMat;
  foot2.matrix.translate(0,-0.2,0);
  foot2.matrix.rotate(10,1,0,0);
  foot2.matrix.rotate(g_foot2foot3Angle,1,0,0);
  var foot2CoordinatesMat = new Matrix4(foot2.matrix);
  foot2.matrix.scale(-0.1,-0.12,0.15);
  foot2.render();

  var paw2 = new Cube();
  paw2.color = [0.738,0.601,0.476,1.0];
  paw2.matrix = foot2CoordinatesMat;
  paw2.matrix.translate(0,-0.12,0);
  paw2.matrix.scale(-0.1,-0.05,0.2);
  paw2.render();


  //
  var leg3 = new Cube();
  leg3.color = [0.738,0.601,0.476,1.0];
  leg3.matrix = bodyCoordinatesMatrix3;
  leg3.matrix.translate(0.1,0.1,-0.4);
  leg3.matrix.rotate(-5,1,0,0);
  leg3.matrix.rotate(g_leg2leg3Angle,1,0,0);
  var leg3CoordinatesMat = new Matrix4(leg3.matrix);
  leg3.matrix.scale(-0.1,-0.2,0.15);
  leg3.render();

  var foot3 = new Cube();
  foot3.color = [0.738,0.601,0.476,1.0];
  foot3.matrix = leg3CoordinatesMat;
  foot3.matrix.translate(0,-0.2,0);
  foot3.matrix.rotate(5,1,0,0);
  foot3.matrix.rotate(g_foot2foot3Angle,1,0,0);
  var foot3CoordinatesMat = new Matrix4(foot3.matrix);
  foot3.matrix.scale(-0.1,-0.12,0.15);
  foot3.render();

  var paw3 = new Cube();
  paw3.color = [0.738,0.601,0.476,1.0];
  paw3.matrix = foot3CoordinatesMat;
  paw3.matrix.translate(0,-0.12,0);
  paw3.matrix.scale(-0.1,-0.05,0.2);
  paw3.render();

  // //
  var leg4 = new Cube();
  leg4.color = [0.738,0.601,0.476,1.0];
  leg4.matrix = bodyCoordinatesMatrix4;
  leg4.matrix.translate(0.4,0.1,-0.4);
  leg4.matrix.rotate(-5,1,0,0);
  leg4.matrix.rotate(g_leg1leg4Angle,1,0,0);
  var leg4CoordinatesMat = new Matrix4(leg4.matrix);
  leg4.matrix.scale(-0.1,-0.2,0.15);
  leg4.render();

  var foot4 = new Cube();
  foot4.color = [0.738,0.601,0.476,1.0];
  foot4.matrix = leg4CoordinatesMat;
  foot4.matrix.translate(0,-0.2,0);
  foot4.matrix.rotate(5,1,0,0);
  foot4.matrix.rotate(g_foot1foot4Angle,1,0,0);
  var foot4CoordinatesMat = new Matrix4(foot4.matrix);
  foot4.matrix.scale(-0.1,-0.12,0.15);
  foot4.render();

  var paw4 = new Cube();
  paw4.color = [0.738,0.601,0.476,1.0];
  paw4.matrix = foot4CoordinatesMat;
  paw4.matrix.translate(0,-0.12,0);
  paw4.matrix.scale(-0.1,-0.05,0.2);
  paw4.render();

  //Tail

  var tail = new Cylinder();
  tail.color = [0.738,0.601,0.476,1.0];
  tail.matrix = bodyCoordinatesMatrix6;
  tail.matrix.translate(0.2,0.3,-0.05);
  tail.matrix.rotate(-60,1,0,0);
  tail.matrix.rotate(g_tail_angle,0,1,0);
  tail.matrix.scale(0.5,0.5,-0.25);
  tail.render();


  var duration = performance.now()-startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration)/10, "numdot");
}
var g_start_Time = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_start_Time;

function tick(){
  g_seconds = performance.now()/1000.0 - g_start_Time;
  //console.log(g_seconds);
  updatedAnimationAngles();
  //Draw
  renderAllShapes();

  //Recursive Call
  requestAnimationFrame(tick);
}
//Store animation angles
function updatedAnimationAngles(){
  if(g_dog_animation){
    g_leg1leg4Angle=(15*Math.sin(g_seconds));

    g_leg2leg3Angle=(15*Math.sin(g_seconds + (Math.PI/2)));

    g_foot1foot4Angle=(10*Math.sin(g_seconds));

    g_foot2foot3Angle=(10*Math.sin(g_seconds + (Math.PI/2)));

    g_body_motion = (0.01*g_seconds);
  }
  if(g_tail_animation){
    g_tail_angle = (30*Math.sin(g_seconds));
  }
}

function sendTextToHTML(text, htmlID){
  var htmlElm = document.getElementById(htmlID);
  if(!htmlElm){
    console.log("Failed to get"+ htmlID+" from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}

//////////////////////



// //Get the coordinates of the click and convert to WebGL coordinate system
// function convertCoordinatesEventToGL(ev){
//   var x = ev.clientX; // x coordinate of a mouse pointer
//   var y = ev.clientY; // y coordinate of a mouse pointer
//   var rect = ev.target.getBoundingClientRect();
//
//   x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
//   y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
//   return([x,y]);
// }
//
// function click(ev) {
//   //Extract the event and return the WebGL coordinates
//   [x,y] = convertCoordinatesEventToGL(ev);
//
//   let point;
//   if (g_selectedType == POINT){
//     point = new Point();
//   }
//   else if (g_selectedType == TRIANGLE) {
//     point = new Triangle();
//   }
//   else if(g_selectedType == CIRCLE){
//     point = new Circle();
//     point.segments = g_selectedSegments;
//   }
//
//   point.position = [x,y];
//   point.color = g_selected_color.slice();
//   point.size = g_selected_size;
//
//   g_shapeList.push(point);
//
//   // Draw the shape that is supposed to be on the canvas
//   renderAllShapes();
// }
