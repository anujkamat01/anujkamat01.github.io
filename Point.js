class Point{
  constructor(){
    this.type = 'point';
    this.position = [0.0,0.0,0.0,0.0];
    this.color = [1.0,1.0,1.0,1.0];
    this.size = 5.0;
  }
  render(){
    // var len = g_shapeList.length;
    // for(var i = 0; i < len; i++) {
    var xy = this.position;
    var rgba = this.color;
    var gs = this.size;

    gl.disableVertexAttribArray(a_Position);
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([xy[0],xy[1]]), gl.DYNAMIC_DRAW);
      // Pass the position of a point to a_Position variables
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    gl.uniform1f(a_Size, gs);
      // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
