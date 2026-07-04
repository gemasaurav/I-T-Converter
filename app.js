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

// ======================================
// Splash Screen Timer
// ======================================

window.onload = function(){

    setTimeout(function(){

        splashScreen.style.display = "none";

        homeScreen.style.display = "block";

    },4000);

};

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
galleryInput.addEventListener("change", function(){

    if(this.files.length>0){

        alert("Gallery Image Selected:\n\n"+this.files[0].name);

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
