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
