class Face{
  constructor(){
    this.type = 'face';
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
    drawTriangle3D([0.0,0.0,0.0, 0.5,0.5,0.0, 0.5,0.0,0.0]);
    drawTriangle3D([0.0,0.0,0.0, 0.0,0.5,0.0, 0.5,0.5,0.0]);

    // //Lighting
    // gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
    //
    //Right face of the Cube
    drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,-0.5, 0.0,0.5,-0.5]);
    drawTriangle3D([0.0,0.0,0.0, 0.0,0.5,-0.5, 0.0,0.5,0.0]);

    //Left face of the cube
    drawTriangle3D([0.5,0.0,0.0, 0.5,0.0,-0.5, 0.5,0.5,-0.5]);
    drawTriangle3D([0.5,0.0,0.0, 0.5,0.5,-0.5, 0.5,0.5,0.0]);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    //Front face
    drawTriangle3D([0.5,0.0,-0.5, 0.0,0.0,-0.5, 0.0,0.5,-0.5]);
    drawTriangle3D([0.5,0.0,-0.5, 0.0,0.5,-0.5, 0.5,0.5,-0.5]);

    //Top face
    drawTriangle3D([0.0,0.5,0.0, 0.5,0.5,0.0, 0.5,0.5,-0.5]);
    drawTriangle3D([0.0,0.5,0.0, 0.5,0.5,-0.5, 0.0,0.5,-0.5]);

    //Top face
    drawTriangle3D([0.0,0.0,0.0, 0.5,0.0,0.0, 0.5,0.0,-0.5]);
    drawTriangle3D([0.0,0.0,0.0, 0.5,0.0,-0.5, 0.0,0.0,-0.5]);

    //Dog Chin
    drawTriangle3D([0.0,0.0,-0.5, 0.5,0.0,-0.5, 0.25,-0.1,-0.25]);
    drawTriangle3D([0.5,0.0,-0.5, 0.5,0.0,0.0, 0.25,-0.1,-0.25]);
    drawTriangle3D([0.5,0.0,0.0, 0.0,0.0,0.0, 0.25,-0.1,-0.25]);
    drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,-0.5, 0.25,-0.1,-0.25]);

    gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
    //Left Eye
    drawTriangle3D([0.15,0.35,-0.501, 0.22,0.3,-0.501, 0.08,0.3,-0.501]);
    drawTriangle3D([0.15,0.25,-0.501, 0.22,0.3,-0.501, 0.08,0.3,-0.501]);

    gl.uniform4f(u_FragColor, 0.0, 0.0, 0.0, 1.0);
    drawTriangle3D([0.15,0.34,-0.502, 0.19,0.3,-0.502, 0.11,0.3,-0.502]);
    drawTriangle3D([0.15,0.26,-0.502, 0.19,0.3,-0.502, 0.11,0.3,-0.502]);

    //Right Eye
    gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
    drawTriangle3D([0.35,0.35,-0.501, 0.42,0.3,-0.501, 0.28,0.3,-0.501]);
    drawTriangle3D([0.35,0.25,-0.501, 0.42,0.3,-0.501, 0.28,0.3,-0.501]);

    gl.uniform4f(u_FragColor, 0.0, 0.0, 0.0, 1.0);
    drawTriangle3D([0.35,0.34,-0.502, 0.39,0.3,-0.502, 0.31,0.3,-0.502]);
    drawTriangle3D([0.35,0.26,-0.502, 0.39,0.3,-0.502, 0.31,0.3,-0.502]);

    //Nose
    drawTriangle3D([0.25,0.12,-0.501, 0.32,0.2,-0.501, 0.18,0.2,-0.501]);

    //Mouth
    drawTriangle3D([0.15,0.08,-0.501, 0.35,0.08,-0.501, 0.15,0.0,-0.501]);
    drawTriangle3D([0.35,0.0,-0.501, 0.35,0.08,-0.501, 0.15,0.0,-0.501]);
    drawTriangle3D([0.35,0.0,-0.501, 0.25,-0.04,-0.501, 0.15,0.0,-0.501]);

    //Tongue
    gl.uniform4f(u_FragColor, 0.96,0.597,0.597, 1.0);
    drawTriangle3D([0.2,0.07,-0.502, 0.3,0.07,-0.502, 0.2,-0.15,-0.502]);
    drawTriangle3D([0.3,-0.15,-0.502, 0.3,0.07,-0.502, 0.2,-0.15,-0.502]);
    drawTriangle3D([0.3,-0.15,-0.502, 0.2,-0.15,-0.502, 0.25,-0.18,-0.502]);

    //Left Ear
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    drawTriangle3D([0.0,0.5,-0.5, 0.0,0.05,0.0, 0.05,0.7,-0.25]);
    drawTriangle3D([0.1,0.5,-0.5, 0.1,0.05,0.0, 0.05,0.7,-0.25]);
    drawTriangle3D([0.0,0.05,0.0, 0.1,0.05,0.0, 0.05,0.7,-0.25]);

    gl.uniform4f(u_FragColor, 1.0,0.66,0.66, 1.0);
    drawTriangle3D([0.01,0.5,-0.4, 0.01,0.05,-0.1, 0.04,0.65,-0.25]);
    drawTriangle3D([0.09,0.5,-0.4, 0.09,0.05,-0.1, 0.04,0.65,-0.25]);
    drawTriangle3D([0.01,0.05,-0.1, 0.09,0.05,-0.1, 0.04,0.65,-0.25]);

    //Right Ear
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    drawTriangle3D([0.4,0.5,-0.5, 0.4,0.05,0.0, 0.45,0.7,-0.25]);
    drawTriangle3D([0.5,0.5,-0.5, 0.5,0.05,0.0, 0.45,0.7,-0.25]);
    drawTriangle3D([0.4,0.05,0.0, 0.5,0.05,0.0, 0.45,0.7,-0.25]);

    gl.uniform4f(u_FragColor, 1.0,0.66,0.66, 1.0);
    drawTriangle3D([0.41,0.5,-0.4, 0.41,0.05,-0.1, 0.44,0.65,-0.25]);
    drawTriangle3D([0.49,0.5,-0.4, 0.49,0.05,-0.1, 0.44,0.65,-0.25]);
    drawTriangle3D([0.41,0.05,-0.1, 0.49,0.05,-0.1, 0.44,0.65,-0.25]);

  }
}
