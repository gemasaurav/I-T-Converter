// ======================================
// I-T Converter v1.0
// App Controller (Updated with Live Camera)
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
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        splashScreen.style.display = "none";
        homeScreen.style.display = "block";
    }, 4000);
});

// ======================================
// MENU
// ======================================
menuBtn.addEventListener("click", function () {
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
aboutBtn.addEventListener("click", function () {
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
exitBtn.addEventListener("click", function () {
    if (confirm("Exit I-T Converter?")) {
        document.body.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            text-align:center;
            font-family:Arial,sans-serif;
            padding:20px;
        ">
            <div>
                <h2>🙏 Thanks for Using I-T Converter</h2>
                <p>Kindly close the application.</p>
            </div>
        </div>
        `;
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
// Elements for Preview & OCR
// ======================================
const previewImage = document.getElementById("previewImage");
const ocrCanvas = document.getElementById("ocrCanvas");
const ctx = ocrCanvas.getContext("2d");
const extractBtn = document.getElementById("extractBtn");
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

// ======================================
// Show Image Preview
// ======================================
function showImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        previewImage.src = e.target.result;
        document.getElementById("previewSection").style.display = "block";
        resultSection.style.display = "none";
    };
    reader.readAsDataURL(file);
}

// ======================================
// LIVE CAMERA (getUserMedia)
// ======================================
const cameraModal = document.getElementById("cameraModal");
const cameraVideo = document.getElementById("cameraVideo");
const captureBtn = document.getElementById("captureBtn");
const closeCameraBtn = document.getElementById("closeCameraBtn");

let cameraStream = null;

async function openCamera() {
    // Prefer rear camera
    const constraints = {
        video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
        },
        audio: false
    };

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        cameraVideo.srcObject = cameraStream;
        cameraModal.style.display = "flex";
    } catch (err) {
        console.error("Primary camera failed:", err);
        // Fallback to any available camera
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            cameraVideo.srcObject = cameraStream;
            cameraModal.style.display = "flex";
        } catch (err2) {
            alert("Camera access denied or not available.\n\nPlease allow camera permission and try again.");
        }
    }
}

function closeCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    cameraVideo.srcObject = null;
    cameraModal.style.display = "none";
}

// Open live camera when user taps CAMERA button
cameraBtn.addEventListener("click", openCamera);

// Close camera
closeCameraBtn.addEventListener("click", closeCamera);

// Capture photo from live stream
captureBtn.addEventListener("click", function () {
    if (!cameraStream) return;

    const canvas = document.createElement("canvas");
    canvas.width = cameraVideo.videoWidth;
    canvas.height = cameraVideo.videoHeight;
    const tempCtx = canvas.getContext("2d");
    tempCtx.drawImage(cameraVideo, 0, 0);

    canvas.toBlob(function (blob) {
        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        showImage(file);
        closeCamera();
    }, "image/jpeg", 0.92);
});

// ======================================
// Gallery
// ======================================
galleryBtn.addEventListener("click", function () {
    galleryInput.click();
});

galleryInput.addEventListener("change", function () {
    if (this.files.length > 0) {
        showImage(this.files[0]);
    }
});

// ======================================
// PDF
// ======================================
pdfBtn.addEventListener("click", function () {
    if (typeof pdfjsLib === "undefined") {
        alert("PDF.js NOT Loaded");
        return;
    }
    pdfInput.click();
});

pdfInput.addEventListener("change", async function () {
    if (this.files.length === 0) return;

    const file = this.files[0];
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2 });

    ocrCanvas.width = viewport.width;
    ocrCanvas.height = viewport.height;

    await page.render({
        canvasContext: ctx,
        viewport: viewport
    }).promise;

    previewImage.src = ocrCanvas.toDataURL("image/png");
    document.getElementById("previewSection").style.display = "block";
    resultSection.style.display = "none";
});

// ======================================
// Browse Files
// ======================================
browseBtn.addEventListener("click", function () {
    browseInput.value = "";
    browseInput.click();
});

browseInput.addEventListener("change", function () {
    if (this.files.length === 0) return;

    const file = this.files[0];

    if (file.type.startsWith("image/")) {
        showImage(file);
    } else if (file.type === "application/pdf") {
        // Reuse PDF handler
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        pdfInput.files = dataTransfer.files;
        pdfInput.dispatchEvent(new Event("change"));
    } else {
        alert("Unsupported file type.");
    }
});

// ======================================
// OCR Extraction
// ======================================
extractBtn.addEventListener("click", async function () {
    extractBtn.innerHTML = "⏳ Preparing Image...";

    try {
        if (!previewImage.complete || previewImage.naturalWidth === 0) {
            alert("Please wait until the image finishes loading.");
            extractBtn.innerHTML = "🔍 EXTRACT TEXT";
            return;
        }

        extractBtn.innerHTML = "🔍 Reading Text...";

        ocrCanvas.width = previewImage.naturalWidth;
        ocrCanvas.height = previewImage.naturalHeight;
        ctx.drawImage(previewImage, 0, 0, ocrCanvas.width, ocrCanvas.height);

        // Optional simple preprocessing (kept from original)
        let imgData = ctx.getImageData(0, 0, ocrCanvas.width, ocrCanvas.height);
        let data = imgData.data;

        let brightness = 0;
        for (let i = 0; i < data.length; i += 4) {
            brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
        brightness = brightness / (data.length / 4);

        if (brightness > 170) {
            // Bright document / screenshot → convert to grayscale + boost
            for (let i = 0; i < data.length; i += 4) {
                let gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                gray = Math.min(255, gray * 1.25);
                data[i] = data[i + 1] = data[i + 2] = gray;
            }
            ctx.putImageData(imgData, 0, 0);
        }

        const result = await Tesseract.recognize(ocrCanvas, "eng+hin", {
            logger: m => console.log(m)
        });

        extractBtn.innerHTML = "✅ Completed";

        ocrResult.value = result.data.text;

        let confidence = Math.round(result.data.confidence || 0);
        confidenceCount.innerHTML = "OCR Confidence : " + confidence + "%";

        resultSection.style.display = "block";

        // Statistics
        charCount.innerHTML = "Characters : " + result.data.text.length;

        const words = result.data.text.trim() === ""
            ? 0
            : result.data.text.trim().split(/\s+/).length;
        wordCount.innerHTML = "Words : " + words;

        const lines = result.data.text.split("\n").length;
        lineCount.innerHTML = "Lines : " + lines;

    } catch (err) {
        extractBtn.innerHTML = "🔍 EXTRACT TEXT";
        alert("OCR Error:\n\n" + err);
        console.log(err);
    }
});

// ======================================
// COPY RESULT
// ======================================
copyResultBtn.addEventListener("click", async function () {
    await navigator.clipboard.writeText(ocrResult.value);
    alert("Copied Successfully!");
});

// ======================================
// NEW IMAGE
// ======================================
newImageBtn.addEventListener("click", function () {
    resultSection.style.display = "none";
    document.getElementById("previewSection").style.display = "none";
    ocrResult.value = "";
    extractBtn.innerHTML = "🔍 EXTRACT TEXT";
});

// ======================================
// SAVE RESULT
// ======================================
saveResultBtn.addEventListener("click", function () {
    const now = new Date();
    const fileName =
        "IT_Converter_" +
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + "_" +
        String(now.getHours()).padStart(2, "0") + "-" +
        String(now.getMinutes()).padStart(2, "0") +
        ".txt";

    const blob = new Blob([ocrResult.value], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);

    alert("File Saved Successfully!");
});

// ======================================
// SHARE RESULT
// ======================================
shareResultBtn.addEventListener("click", async function () {
    if (ocrResult.value.trim() === "") {
        alert("No text available to share!");
        return;
    }

    if (navigator.share) {
        try {
            await navigator.share({
                title: "I-T Converter",
                text: ocrResult.value
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        await navigator.clipboard.writeText(ocrResult.value);
        alert("Text copied.\n\nPaste it into WhatsApp, Email or Notes.");
    }
});
