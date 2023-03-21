// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var imgOut;

var filterSet = 'a';
var filterName = 'Sepia';

var thresholdSlider;

var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];

//vertical lines
var matrixX = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
];

//horizontal lines
var matrixY = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];

/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height + 230);
    
    //extension: slider to adjust threshold filter
    thresholdSlider = createSlider(0, 255, 125);
    thresholdSlider.position(imgIn.width+20, imgIn.height+30);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    
    //rectanglt to write instructions on
    fill(217, 194, 255);
    noStroke();
    rect(0,imgIn.height,imgIn.width*2, imgIn.height+100);
    
    //instructions
    fill(147, 0, 184);
    textSize(20);
    text('Key in an alphabet to change the filter: ', 20, imgIn.height+30);
    text('a: Sepia Filter', 20, imgIn.height+55);
    text('b: Invert Filter1', 20, imgIn.height+75);
    text('c: Invert Filter2', 20, imgIn.height+95);
    text('d: Invert Filter3', 20, imgIn.height+115);
    text('e: Invert Filter4', 20, imgIn.height+135);
    text('f: Greyscale Filter', 20, imgIn.height+155);
    text('g: Threshold Filter', 20, imgIn.height+175);
    text('h: EdgeDetection Filter', 20, imgIn.height+195);
    
    
    
    
    //display slider label only if filter set is threshold filter
    if(filterSet == 'g') {
        textSize(20);
        text('Threshold Slider: ' + thresholdSlider.value(), imgIn.width+20, imgIn.height+30);
    }
    
    textSize(25);
    text('Filter: ' + filterName, imgIn.width*2-250, imgIn.height+30);
    
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
    loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
    var resultImg = createImage(imgIn.width, imgIn.height);
    
    thresholdSlider.style('display', 'none');
    
    //filter set displays based on the key user pressed
    if (filterSet == 'a') {
        filterName = 'Sepia';
        resultImg = sepiaFilter(imgIn);
        resultImg = darkCorners(resultImg);
        resultImg = radialBlurFilter(resultImg);
        resultImg = borderFilter(resultImg);
    }
    else if (filterSet == 'b') {
        filterName = 'Invert1';
        resultImg = invertFilter1(imgIn);
        resultImg = darkCorners(resultImg);
        resultImg = radialBlurFilter(resultImg);
        resultImg = borderFilter(resultImg);
    }
    else if (filterSet == 'c') {
        filterName = 'Invert2';
        resultImg = invertFilter2(imgIn);
        resultImg = darkCorners(resultImg);
        resultImg = radialBlurFilter(resultImg);
        resultImg = borderFilter(resultImg);
    }
    else if (filterSet == 'd') {
        filterName = 'Invert3';
        resultImg = invertFilter3(imgIn);
        resultImg = darkCorners(resultImg);
        resultImg = radialBlurFilter(resultImg);
        resultImg = borderFilter(resultImg);
    }
    else if (filterSet == 'e') {
        filterName = 'Invert4';
        resultImg = invertFilter4(imgIn);
        resultImg = darkCorners(resultImg);
        resultImg = radialBlurFilter(resultImg);
        resultImg = borderFilter(resultImg);
    }
    else if (filterSet == 'f') {
        filterName = 'Greyscale';
        resultImg = greyscaleFilter(imgIn);
        resultImg = darkCorners(resultImg);
        resultImg = radialBlurFilter(resultImg);
        resultImg = borderFilter(resultImg);
    }
    else if (filterSet == 'g') {
        filterName = 'Threshold';
        thresholdSlider.style('display', 'block');
        resultImg = thresholdFilter(imgIn);
        resultImg = darkCorners(resultImg);
        resultImg = radialBlurFilter(resultImg);
        resultImg = borderFilter(resultImg);
    }
    else if (filterSet == 'h') {
        filterName = 'EdgeDetection';
        resultImg = edgeDetectionFilter(imgIn);
        resultImg = darkCorners(resultImg);
        resultImg = radialBlurFilter(resultImg);
        resultImg = borderFilter(resultImg);
    }
    
    return resultImg;
}

//sepia function
function sepiaFilter(img) {
    imgOut = createImage(img.width, img.height);

    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < imgOut.width; x++) {
        for(var y = 0; y < imgOut.height; y++) {
            
            var index = ((imgOut.width * y) + x) * 4;
            
            //get rgb colours
            var oldRed = img.pixels[index + 0];
            var oldGreen = img.pixels[index + 1];
            var oldBlue = img.pixels[index + 2];
            
            //convert to sepia
            var newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189)
            var newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168)
            var newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131)
            
            // constrain the values
            newRed = constrain(newRed, 0, 255);
            newGreen = constrain(newGreen, 0, 255);
            newBlue = constrain(newBlue, 0, 255);
            
            imgOut.pixels[index + 0] = newRed;
            imgOut.pixels[index + 1] = newGreen;
            imgOut.pixels[index + 2] = newBlue;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//darkCorners function
function darkCorners(img) {
    imgOut = createImage(img.width, img.height);

    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < imgOut.width; x++) {
        for(var y = 0; y < imgOut.height; y++) {
            
            var index = ((imgOut.width * y) + x) * 4;
            
            //get rgb colours
            var oldRed = img.pixels[index + 0];
            var oldGreen = img.pixels[index + 1];
            var oldBlue = img.pixels[index + 2];
            
            //calculate distance of each pixel
            var distance = dist(img.width/2, img.height/2, x, y);
            
            //if distance is up to 300 pixels away from the centre of the image – no adjustment
            //if distance is between 300 and 450, remap it
            //if distance is more than 450, 
            if(distance <= 300) {
                var dynLum = 1;
            }
            else if(300 < distance < 450) {
                var dynLum = map(distance, 300, 450, 1, 0.4);
            }
            else if(distance >= 450) {
                var maxDist = dist(imgIn.width/2, imgIn.height/2, 0, 0);
                var dynLum = map(distance, 450, maxDist, 0.4, 0);
                dynLum = constrain(distance, 0.4, 0);
            }
            
            imgOut.pixels[index + 0] = oldRed * dynLum;
            imgOut.pixels[index + 1] = oldGreen * dynLum;
            imgOut.pixels[index + 2] = oldBlue * dynLum;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//radialBlurFilter function
function radialBlurFilter(img) {
    var imgOut = createImage(imgIn.width, imgIn.height);
    var matrixSize = matrix.length;
    
    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < imgOut.width; x++) {
        for(var y = 0; y < imgOut.height; y++) {
            
            var index = ((imgOut.width * y) + x) * 4;
            
            //get rgb colours
            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            //distance between x, y and mouseX, mouseY
            var distance = dist(x + img.width, y, mouseX, mouseY);
            
            //remap  distance from a range 100 to 300 to a new range from 0 to 1
            distance = map(distance, 100, 300, 0, 1);
            
            //constrain the returned value from 0 to 1
            var dynBlur = constrain(distance, 0, 1);
            
            //call convolution function
            var c = convolution(x, y, matrix, matrixSize,img);
            
            imgOut.pixels[index + 0] = c[0]*dynBlur + r*(1-dynBlur);
            imgOut.pixels[index + 1] = c[1]*dynBlur + g*(1-dynBlur);
            imgOut.pixels[index + 2] = c[2]*dynBlur + b*(1-dynBlur);
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//convolution function
function convolution(x, y, matrix, matrixSize,img) {
    var totalRed = 0;
    var totalGreen = 0;
    var totalBlue = 0;
    
    var offset = floor(matrixSize/2);
    
    for(var i = 0; i < matrixSize; i++) {
        for(var j = 0; j < matrixSize; j++) {
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            
            var index = (img.width * yloc + xloc) * 4;
            
            index = constrain(index, 0, img.pixels.length -1);
            
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    
    return [totalRed, totalGreen, totalBlue];
}

//borderFilter function
function borderFilter(img) {
    //create a buffer and draw the image onto it
    var buffer = createGraphics(img.width, img.height);
    buffer.image(img, 0, 0);
    
    //draw and style the rectangle with rounded corners
    buffer.noFill();
    buffer.stroke(255);
    buffer.strokeWeight(20);
    buffer.rect(10, 10, img.width-20, img.height-20, 60);
    
    //second rectangle without rounded corners to remove triangle corners
    buffer.rect(10, 10, img.width-20, img.height-20);
    
    return buffer;
}

//extension: invertFilter1 function
function invertFilter1(img) {
    var imgOut = createImage(imgIn.width, imgIn.height);
    
    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++) {
        for(var y = 0; y < img.height; y++) {
            var index = ((img.width * y) + x) * 4;
            
            var r = 255 - img.pixels[index + 0];
            var g = 255 - img.pixels[index + 1];
            var b = 255 - img.pixels[index + 2];
            
            imgOut.pixels[index + 0] = r;
            imgOut.pixels[index + 1] = g;
            imgOut.pixels[index + 2] = b;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//extension: invertFilter2 function
function invertFilter2(img) {
    var imgOut = createImage(imgIn.width, imgIn.height);
    
    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++) {
        for(var y = 0; y < img.height; y++) {
            var index = ((img.width * y) + x) * 4;
            
            var r = 255 - img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            imgOut.pixels[index + 0] = r;
            imgOut.pixels[index + 1] = g;
            imgOut.pixels[index + 2] = b;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//extension: invertFilter3 function
function invertFilter3(img) {
    var imgOut = createImage(imgIn.width, imgIn.height);
    
    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++) {
        for(var y = 0; y < img.height; y++) {
            var index = ((img.width * y) + x) * 4;
            
            var r = img.pixels[index + 0];
            var g = 255 - img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            imgOut.pixels[index + 0] = r;
            imgOut.pixels[index + 1] = g;
            imgOut.pixels[index + 2] = b;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//extension: invertFilter4 function
function invertFilter4(img) {
    var imgOut = createImage(imgIn.width, imgIn.height);
    
    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++) {
        for(var y = 0; y < img.height; y++) {
            var index = ((img.width * y) + x) * 4;
            
            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = 255 - img.pixels[index + 2];
            
            imgOut.pixels[index + 0] = r;
            imgOut.pixels[index + 1] = g;
            imgOut.pixels[index + 2] = b;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//extension: greyscaleFilter
function greyscaleFilter(img) {
    var imgOut = createImage(imgIn.width, imgIn.height);
    
    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++) {
        for(var y = 0; y < img.height; y++) {
            var index = ((img.width * y) + x) * 4;
            
            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            //var grey = (r + g + b)/3;
            
            //luma calculation
            var grey = r * 0.299 + g * 0.587 + b * 0.114;    
            
            imgOut.pixels[index + 0] = grey;
            imgOut.pixels[index + 1] = grey;
            imgOut.pixels[index + 2] = grey;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//extension: thresholdFilter function
function thresholdFilter(img) {
    var imgOut = createImage(imgIn.width, imgIn.height);
    
    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++) {
        for(var y = 0; y < img.height; y++) {
            var index = ((img.width * y) + x) * 4;
            
            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            //var grey = (r + g + b)/3;
            
            //luma calculation
            var grey = r * 0.299 + g * 0.587 + b * 0.114;
            
            if(grey > thresholdSlider.value()) grey = 255;
            else grey = 0;
            
            imgOut.pixels[index + 0] = grey;
            imgOut.pixels[index + 1] = grey;
            imgOut.pixels[index + 2] = grey;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//extension: edgeDetectionFilter function 
function edgeDetectionFilter(img) {
    var imgOut = createImage(imgIn.width, imgIn.height);
    var matrixSize = matrixX.length;
    
    imgOut.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++) {
        for(var y = 0; y < img.height; y++) {
            var index = ((img.width * y) + x) * 4;
            
            var cX = convolution(x, y, matrixX, matrixSize,imgIn);
            cX = map(abs(cX[0]), 0,1020, 0, 255);
            
            var cY = convolution(x, y, matrixY, matrixSize,imgIn);
            cY = map(abs(cY[0]), 0,1020, 0, 255);
            
            var combo = cX + cY;
            
            imgOut.pixels[index + 0] = combo;
            imgOut.pixels[index + 1] = combo;
            imgOut.pixels[index + 2] = combo;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

//keyPressed function
function keyPressed() {
    //extension: the pressed key will be filterSet to display
    
    if(key === 'a') {
        filterSet = 'a';
    }
    else if(key === 'b') {
        filterSet = 'b';
    }
    else if (key === 'c') {
        filterSet = 'c';
    }
    else if (key === 'd') {
        filterSet = 'd';
    }
    else if (key === 'e') {
        filterSet = 'e';
    }
    else if (key === 'f') {
        filterSet = 'f';
    }
    else if (key === 'g') {
        filterSet = 'g';
    }
    else if (key === 'h') {
        filterSet = 'h';
    }
    
    //calls draw again to update the image on the left
    redraw();
}
