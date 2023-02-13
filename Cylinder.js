class Cylinder{
  constructor(){
    this.type = 'cylinder';
    //this.position = [0.0,0.0,0.0,0.0];
    this.color = [1.0,1.0,1.0,1.0];
    this.size = 10.0;
    this.segments = 100;
    this.matrix = new Matrix4();
  }

  render(){
    // var len = g_shapeList.length;
    // for(var i = 0; i < len; i++) {
    var rgba = this.color;
    var gs = this.size;
    var segment = this.segments;
    gl.uniformMatrix4fv(u_ModelMatrix,false,this.matrix.elements);
    // Pass the position of a point to a_Position variable
    // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    //gl.uniform1f(a_Size, gs);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Draw
    var d = this.size/200.0;

    let angle_Step = 360/this.segments;
    for(var angle = 0; angle<360; angle+=angle_Step){
      let centerPt = [0.0,0.0,0.0];
      let angle1 = angle;
      let angle2 = angle + angle_Step;
      let vec1 = [Math.cos(angle1*Math.PI/180)*d, Math.sin(angle1*Math.PI/180)*d];
      let vec2 = [Math.cos(angle2*Math.PI/180)*d, Math.sin(angle2*Math.PI/180)*d];
      let pt1 = [centerPt[0]+vec1[0],centerPt[1]+vec1[1],0.0];
      let pt2 = [centerPt[0]+vec2[0],centerPt[1]+vec2[1],0.0];


      drawTriangle3D([0.0,0.0,0.0 ,pt1[0],pt1[1],0.0, pt2[0],pt2[1],0.0]);
      drawTriangle3D([0.0,0.0,-1.0 ,pt1[0],pt1[1],-1.0, pt2[0],pt2[1],-1.0]);
      drawTriangle3D([pt1[0],pt1[1],0.0, pt2[0],pt2[1],-1.0, pt1[0],pt1[1],-1.0]);
      drawTriangle3D([pt1[0],pt1[1],0.0, pt2[0],pt2[1],-1.0, pt2[0],pt2[1],0.0]);

    }
  }
}
