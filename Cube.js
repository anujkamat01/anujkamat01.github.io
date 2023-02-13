class Cube{
  constructor(){
    this.type = 'cube';
    // this.position = [0.0,0.0,0.0,0.0];
    this.color = [1.0,1.0,1.0,1.0];
    // this.size = 5.0;
    // this.segments = 10;
    this.matrix = new Matrix4();
  }

  render(){
    // var len = g_shapeList.length;
    // for(var i = 0; i < len; i++) {
    // var xy = this.position;
    var rgba = this.color;
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix,false,this.matrix.elements);
    // var gs = this.size;
    // var segment = this.segments;
    // Pass the position of a point to a_Position variable
    // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    //gl.uniform1f(a_Size, gs);
    // Pass the color of a point to u_FragColor variable
    // gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // // Draw
    // var d = this.size/200.0;
    //
    // let angle_Step = 360/this.segments;
    // for(var angle = 0; angle<360; angle+=angle_Step){
    //   let centerPt = [xy[0],xy[1]];
    //   let angle1 = angle;
    //   let angle2 = angle + angle_Step;
    //   let vec1 = [Math.cos(angle1*Math.PI/180)*d, Math.sin(angle1*Math.PI/180)*d];
    //   let vec2 = [Math.cos(angle2*Math.PI/180)*d, Math.sin(angle2*Math.PI/180)*d];
    //   let pt1 = [centerPt[0]+vec1[0],centerPt[1]+vec1[1]];
    //   let pt2 = [centerPt[0]+vec2[0],centerPt[1]+vec2[1]];
    //   drawTriangle([xy[0],xy[1],pt1[0],pt1[1],pt2[0],pt2[1]]);

    //Rear of the Cube
    drawTriangle3D([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0]);
    drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0]);

    //Lighting
    // gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);

    //Left face of the Cube
    drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,-1.0, 0.0,1.0,-1.0]);
    drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,-1.0, 0.0,1.0,0.0]);

    //Right face of the cube
    gl.uniform4f(u_FragColor, rgba[0]*0.8, rgba[1]*0.8, rgba[2]*0.8, rgba[3]);
    drawTriangle3D([1.0,0.0,0.0, 1.0,0.0,-1.0, 1.0,1.0,-1.0]);
    drawTriangle3D([1.0,0.0,0.0, 1.0,1.0,-1.0, 1.0,1.0,0.0]);
    // gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    //Front face
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    drawTriangle3D([1.0,0.0,-1.0, 0.0,0.0,-1.0, 0.0,1.0,-1.0]);
    drawTriangle3D([1.0,0.0,-1.0, 0.0,1.0,-1.0, 1.0,1.0,-1.0]);

    //Top face
    drawTriangle3D([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,-1.0]);
    drawTriangle3D([0.0,1.0,0.0, 1.0,1.0,-1.0, 0.0,1.0,-1.0]);

    //Bottom face
    gl.uniform4f(u_FragColor, rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7, rgba[3]);
    drawTriangle3D([0.0,0.0,0.0, 1.0,0.0,0.0, 1.0,0.0,-1.0]);
    drawTriangle3D([0.0,0.0,0.0, 1.0,0.0,-1.0, 0.0,0.0,-1.0]);

  }
}
