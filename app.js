// ======================================
// I-T Converter v1.0
// App Controller
// ======================================

// Splash Screen

const splashScreen = document.getElementById("splashScreen");

// Home Screen

const homeScreen = document.getElementById("homeScreen");

// Buttons

const menuBtn = document.getElementById("menuBtn");

const aboutBtn = document.getElementById("aboutBtn");

const exitBtn = document.getElementById("exitBtn");
const cameraBtn = document.getElementById("cameraBtn");
const galleryBtn = document.getElementById("galleryBtn");
const pdfBtn = document.getElementById("pdfBtn");
const browseBtn = document.getElementById("browseBtn");
// ======================================
// Splash Screen Timer
// ======================================

document.addEventListener("DOMContentLoaded", function(){

    setTimeout(function(){

        splashScreen.style.display = "none";

        homeScreen.style.display = "block";

    },4000);

});

// ======================================
// MENU
// ======================================

menuBtn.addEventListener("click",function(){

    alert(

`Menu

Home

About

Privacy

Exit`

    );

});

// ======================================
// ABOUT
// ======================================

aboutBtn.addEventListener("click",function(){

    alert(

`I-T Converter

Version 1.0.0

Offline Image-to-Text Converter

Design & Developed by

100, 000 000 000`

    );

});

// ======================================
// EXIT
// ======================================

exitBtn.addEventListener("click",function(){

    if(confirm("Exit I-T Converter?")){

        window.close();

    }

});
// ======================================
// Hidden File Inputs
// ======================================

const cameraInput = document.getElementById("cameraInput");

const galleryInput = document.getElementById("galleryInput");

const pdfInput = document.getElementById("pdfInput");

const browseInput = document.getElementById("browseInput");

// ======================================
// Camera
// ======================================

cameraBtn.addEventListener("click", function(){

    cameraInput.click();

});

// ======================================
// Gallery
// ======================================

galleryBtn.addEventListener("click", function(){

    galleryInput.click();

});

// ======================================
// PDF
// ======================================

pdfBtn.addEventListener("click", function(){

    pdfInput.click();

});

// ======================================
// Browse Files
// ======================================

browseBtn.addEventListener("click", function(){

    browseInput.click();

});

// ======================================
// File Selected Events
// ======================================

// ===============================
// Preview Selected Image
// ===============================

const previewImage=document.getElementById("previewImage");
const ocrCanvas = document.getElementById("ocrCanvas");
const ctx = ocrCanvas.getContext("2d");
const extractBtn=document.getElementById("extractBtn");
const resultSection = document.getElementById("resultSection");

const ocrResult = document.getElementById("ocrResult");

const charCount = document.getElementById("charCount");

const wordCount = document.getElementById("wordCount");

const lineCount = document.getElementById("lineCount");
const confidenceCount = document.getElementById("confidenceCount");
const copyResultBtn = document.getElementById("copyResultBtn");

const saveResultBtn = document.getElementById("saveResultBtn");

const shareResultBtn = document.getElementById("shareResultBtn");

const newImageBtn = document.getElementById("newImageBtn");
function showImage(file){

    const reader=new FileReader();

    reader.onload=function(e){

        previewImage.src=e.target.result;

        document.getElementById("previewSection").style.display="block";

    }

    reader.readAsDataURL(file);

}

// Camera

cameraInput.addEventListener("change",function(){

    if(this.files.length>0){

        showImage(this.files[0]);

    }

});

// Gallery

galleryInput.addEventListener("change",function(){

    if(this.files.length>0){

        showImage(this.files[0]);

    }

});

pdfInput.addEventListener("change", function(){

    if(this.files.length>0){

        alert("PDF Selected:\n\n"+this.files[0].name);

    }

});

browseInput.addEventListener("change", function(){

    if(this.files.length>0){

        alert("File Selected:\n\n"+this.files[0].name);

    }

});
// ======================================
// OCR Extraction
// ======================================

extractBtn.addEventListener("click", async function(){

    alert("Extract Button Pressed");

    extractBtn.innerHTML = "⏳ Preparing Image...";

    try{
extractBtn.innerHTML = "🔍 Reading Text...";
    // ==========================
// Automatic Image Processing
// ==========================

ocrCanvas.width = previewImage.naturalWidth;
ocrCanvas.height = previewImage.naturalHeight;

ctx.drawImage(
    previewImage,
    0,
    0,
    ocrCanvas.width,
    ocrCanvas.height
);

let imgData = ctx.getImageData(
    0,
    0,
    ocrCanvas.width,
    ocrCanvas.height
);

let data = imgData.data;
// ==========================
// Image Brightness Analysis
// ==========================

let brightness = 0;

if(brightness > 170){

    // Bright document / screenshot

    for(let i=0;i<data.length;i+=4){

    brightness += (data[i] + data[i+1] + data[i+2]) / 3;

}

brightness = brightness / (data.length / 4);

console.log("Image Brightness:", brightness);
for(let i=0;i<data.length;i+=4){

    let gray =
    data[i]*0.299+
    data[i+1]*0.587+
    data[i+2]*0.114;

    gray = gray*1.25;

    if(gray>255) gray=255;

    data[i]=gray;
    data[i+1]=gray;
    data[i+2]=gray;

}

ctx.putImageData(imgData,0,0);
    }

else{

    // Color image

    console.log("Keeping original colors for OCR");

}
        const result = await Tesseract.recognize(
    ocrCanvas,
    "eng",
    {
        logger: m => console.log(m)
    }
);

        extractBtn.innerHTML = "✅ Completed";

ocrResult.value = result.data.text;
let confidence = Math.round(result.data.confidence);

confidenceCount.innerHTML =
"OCR Confidence : " + confidence + "%";
resultSection.style.display = "block";

// Statistics

charCount.innerHTML = "Characters : " + result.data.text.length;

const words = result.data.text.trim()===""
?0
:result.data.text.trim().split(/\s+/).length;

wordCount.innerHTML = "Words : " + words;

const lines = result.data.text.split("\n").length;

lineCount.innerHTML = "Lines : " + lines;

    }

    catch(err){

        extractBtn.innerHTML = "🔍 EXTRACT TEXT";

        alert("OCR Error:\n\n" + err);

        console.log(err);

    }

});
// ======================================
// COPY RESULT
// ======================================

copyResultBtn.addEventListener("click", async function(){

    await navigator.clipboard.writeText(ocrResult.value);

    alert("Copied Successfully!");

});

// ======================================
// NEW IMAGE
// ======================================

newImageBtn.addEventListener("click",function(){

    resultSection.style.display="none";

    document.getElementById("previewSection").style.display="none";

    ocrResult.value="";

    extractBtn.innerHTML="🔍 EXTRACT TEXT";

});
// ======================================
// SAVE RESULT
// ======================================

saveResultBtn.addEventListener("click", function(){

    const now = new Date();

    const fileName =
    "IT_Converter_" +

    now.getFullYear() + "-" +

    String(now.getMonth()+1).padStart(2,"0") + "-" +

    String(now.getDate()).padStart(2,"0") + "_" +

    String(now.getHours()).padStart(2,"0") + "-" +

    String(now.getMinutes()).padStart(2,"0") +

    ".txt";

    const blob = new Blob(
        [ocrResult.value],
        {type:"text/plain"}
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = fileName;

    link.click();

    URL.revokeObjectURL(link.href);

    alert("File Saved Successfully!");

});
