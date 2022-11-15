let classifier;
let label = "Just a sec\n LOADING:)";
// let label = "HappyNewYear";
let soundModel = "https://teachablemachine.withgoogle.com/models/unSGo3FCh/";
let unit, canvas;
let said=false;
let mic,show;
let r,g,b;
function preload() {
  classifier = ml5.soundClassifier(soundModel + "model.json");
  mic= loadImage("micImage.png");
  show= loadImage("show.png");
}
function setup() {
  unit = min(windowHeight, windowWidth) / 400;
  canvas = createCanvas(400 * unit, 400 * unit);
  angleMode(DEGREES);
  classifier.classify(gotResult);
  r=250;
  g=190;
  b=186;
}
function draw() {
  background(255-r,255-g,255-b);
  
  // Draw the label in the canvas
  noStroke();
  strokeWeight(10*unit);
  fill(93,181,210);
  textSize(32*unit);
  textAlign(CENTER, CENTER);
  if(said==true){
    textSize(40*unit);
    fill(r+20,g+20,b+20);
    text("Happy New Year", width / 2, 150*unit);
    textSize(30*unit);
    fill(r,g,b);
    text("2023", width / 2, 180*unit);
    textSize(15*unit);
    text("\"Don't live the same year 75 times\n and call it a life\"",200*unit,300*unit);
  }else{
  text(label, width / 2, height / 2);
    image(mic,160*unit,320*unit,80*unit,80*unit);
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  if (results[0].label == "Background Noise") {
    label = "WHAT\nWOULD YOU\nWISH TO\nYOUR\nFRIENDS?";
  } else if(results[0].confidence>0.95){
    label = results[0].label;
    said=true;
  }
}
function mousePressed(){
  said=false;
}