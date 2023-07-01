let folder = "fonts/";
let folderShots = "shots/";
let fontChoice;

let sourceText;
let poem;
let gloria;
let startIndex = 0;

let frameArray =[3, 5, 8, 13, 21, 34, 55];
let timeArray = [15, 30, 45, 60];

let timeChoice;
let fontLoaded;
let shotLoaded;

let shotArray = ["munch24.png",
                 "munch48.png",
                 "munch72.png",
                 "munch96.png"];

let fontArray = ["Inconsolata-Black.ttf",
                "Inconsolata-Bold.ttf",
                "Inconsolata-ExtraBold.ttf",
                "Inconsolata-ExtraLight.ttf",
                "Inconsolata-Light.ttf",
                "Inconsolata-Medium.ttf",
                "Inconsolata-Regular.ttf",
                "Inconsolata-SemiBold.ttf"];
                 

function preload() {
  shotLoaded = round(random(3));
  fontChoice = round(random(7));
  gloria = loadImage("munch.png");
  sourceText = loadStrings("gloria.txt");
  gloria = loadImage(folderShots + shotArray[shotLoaded]);
  fontLoaded = loadFont(folder + fontArray[fontChoice]);
}
//---------------------------------------------------SETUP
function setup() {
  let canvas =  createCanvas(1080, 1920);
  canvas.position(windowWidth/2-width/2, windowHeight/2-height/2)
  poem = sourceText.join(' ');
  textFont(fontLoaded);
  textStyle(NORMAL);
  timeChoice = random(timeArray);
  setInterval(reloadPage, 1000*timeChoice);
 }
//-----------------------------------------------------DRAW
function draw() {
  background(10);
  frameRate(0.1*random(frameArray));
  
  let charIndex = startIndex;
  let w = width / gloria.width;
  let h = height / gloria.height;

  gloria.loadPixels();

    for (let j = 0; j < gloria.height; j++) {
  for (let i = 0; i < gloria.width; i++) {
      const pixelIndex = (i + j * gloria.width) * 4;
      const r = gloria.pixels[pixelIndex + 0];
      const g = gloria.pixels[pixelIndex + 1];
      const b = gloria.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      
      noStroke();
    
    //-----------------------------color change
      fill(r, g, b, avg+40);
      
    //---------------------------------
    
      textSize(w*1);
      textAlign(CENTER, CENTER);
      
      text(poem.charAt(charIndex % poem.length), i * w + w * 0.5, j * h + h * 0.5);
      charIndex++;
    }
  } 
  startIndex++;
}

function mousePressed() {
   save();   
}
//----------------------------------reLoad
function reloadPage() {
  window.location.reload();
}

function keyPressed() {
  reloadPage();
}