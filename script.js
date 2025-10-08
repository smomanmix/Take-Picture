const cameraInput = document.getElementById('cameraInput');
const previewSection = document.getElementById('preview-section');
const preview = document.getElementById('preview');
const submitBtn = document.getElementById('submit');
let imageData = "";

cameraInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    imageData = event.target.result;
    preview.src = imageData;
    previewSection.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

submitBtn.addEventListener('click', async () => {
  if (!imageData) return alert("Please take a picture first!");
  const scriptURL = "https://script.google.com/macros/s/AKfycbzMRHqGugW01j3MzFG2z8VTrHTRKzwBfuESLfRUK8Kmj7ogs5my2hnurWJP_o6PToY5/exec"; // replace with Apps Script URL

  submitBtn.disabled = true;
  submitBtn.textContent = "Uploading...";

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify({ image: imageData }),
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    alert("✅ Uploaded Successfully! File URL: " + result.url);
    submitBtn.disabled = false;
    submitBtn.textContent = "☁️ Upload Another";
  } catch (err) {
    alert("❌ Upload Failed: " + err.message);
    submitBtn.disabled = false;
    submitBtn.textContent = "☁️ Upload";
  }
});
