// on récupère nos éléments gris
let grayBlock = document.getElementById("gray");
grayBlock = grayBlock.childNodes;
let grays = new ColorObject(grayBlock);

let blueBlock = document.getElementById("blue");
blueBlock = blueBlock.childNodes;
let blues = new ColorObject(blueBlock);

let greenBlock = document.getElementById("green");
greenBlock = greenBlock.childNodes;
let greens = new ColorObject(greenBlock);

let redBlock = document.getElementById("red");
redBlock = redBlock.childNodes;
let reds = new ColorObject(redBlock);

let pinkBlock = document.getElementById("pink");
pinkBlock = pinkBlock.childNodes;
let pinks = new ColorObject(pinkBlock);

let purpleBlock = document.getElementById("purple");
purpleBlock = purpleBlock.childNodes;
let purples = new ColorObject(purpleBlock);

let indigoBlock = document.getElementById("indigo");
indigoBlock = indigoBlock.childNodes;
let indigos = new ColorObject(indigoBlock);

let yellowBlock = document.getElementById("yellow");
yellowBlock = yellowBlock.childNodes;
let yellows = new ColorObject(yellowBlock);

let hue = document.getElementById("hue");
hue.addEventListener("change", maj);

let Saturation = document.getElementById("Saturation");
Saturation.addEventListener("change", maj);

let Lightness = document.getElementById("Lightness");
Lightness.addEventListener("change", maj);

function maj() {
    let labelHue = document.getElementById("labelHue");
    labelHue.textContent = `Hue : ${hue.value}`;
    let hueValue = parseInt(hue.value);

    let labelSaturation = document.getElementById("labelSaturation");
    labelSaturation.textContent = `Saturation : ${Saturation.value}`;
    let SaturationValue = parseInt(Saturation.value);

    let labelLightness = document.getElementById("labelLightness");
    labelLightness.textContent = `Lightness : ${Lightness.value}`;
    let LightnessValue = parseInt(Lightness.value);

    grays.resetOriginal();
    grays.modifyColors(hueValue,SaturationValue,LightnessValue);
    blues.resetOriginal();
    blues.modifyColors(hueValue,SaturationValue,LightnessValue);
    greens.resetOriginal();
    greens.modifyColors(hueValue,SaturationValue,LightnessValue);
    reds.resetOriginal();
    reds.modifyColors(hueValue,SaturationValue,LightnessValue);
    pinks.resetOriginal();
    pinks.modifyColors(hueValue,SaturationValue,LightnessValue);
    purples.resetOriginal();
    purples.modifyColors(hueValue,SaturationValue,LightnessValue);
    indigos.resetOriginal();
    indigos.modifyColors(hueValue,SaturationValue,LightnessValue);
    yellows.resetOriginal();
    yellows.modifyColors(hueValue,SaturationValue,LightnessValue);
}