export default function sketch(p){
    var cols, rows;
    const width = 600;
    const height = 600;
    var scl = 20;

    var flying = 0;

    var terrain; 

    function createArray(length){
        var arr = new Array(length || 0),
            i = length;

        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = createArray.apply(this, args);
        }

        return arr;
    }


    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        var w = 1200;
        var h = 600;
        cols = w / scl;
        rows = h / scl;
        p.frameRate(60);
        terrain = createArray(cols, rows);
        p.colorMode(p.HSB);
    
    }

    p.draw = () => {
        flying -= 0.07;
        let yoff = flying;
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
                terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -150, 150);
                xoff += 0.1;
            }
            yoff += 0.1;
        }
        //p.background(`rgb(${p.random(48, 50)}%, ${p.random(48, 50)}%, ${p.random(48, 50)}%)`);
        p.background('#3a0954');
        p.stroke(255, 204, 100);
        p.noFill();
        p.translate(width/2, height/2);
        p.rotateX(p.PI/4);

        p.translate(-1.5*width, -1*height, 50);
        for (let y = 0; y < rows; y++) {
            p.beginShape(p.TRIANGLE_STRIP);
            for (let x = 0; x < cols; x++) {
                p.vertex(x * scl, y * scl, terrain[x][y]);
                p.vertex(x * scl, (y+1) * scl, terrain[x][y+1]);
            }
            p.endShape();
        }
    }
}