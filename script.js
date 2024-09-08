const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuToggle.addEventListener('click', () => {
mobileMenu.classList.add('mobile-menu-active');
});

mobileMenuClose.addEventListener('click', () => {
mobileMenu.classList.remove('mobile-menu-active');
});

// Tutup menu mobile saat mengklik tautan
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
link.addEventListener('click', () => {
mobileMenu.classList.remove('mobile-menu-active');
});
});

// Animasi GSAP
gsap.from("#landing h1", {opacity: 0, y: -50, duration: 1, ease: "power3.out"});
gsap.from("#landing p", {opacity: 0, y: -30, duration: 1, delay: 0.3, ease: "power3.out"});
gsap.from("#landing a", {opacity: 0, y: 30, duration: 1, delay: 0.6, ease: "power3.out", stagger: 0.2});
gsap.from(".mobile-app-mockup", {opacity: 0, y: 50, duration: 1, delay: 0.9, ease: "power3.out"});

// Kode JavaScript Anda yang sudah ada...
// Scroll halus
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
document.querySelector(this.getAttribute('href')).scrollIntoView({
behavior: 'smooth'
});
});
});

        const actionSelect = document.getElementById('actionSelect');
        const uploaderSection = document.getElementById('uploaderSection');
        const convertSection = document.getElementById('convertSection');
        const ocrSection = document.getElementById('ocrSection');
        const wordToPdfSection = document.getElementById('wordToPdfSection');
        const pdfToWordSection = document.getElementById('pdfToWordSection');

        const uploadForm = document.getElementById('uploadForm');
        const fileInput = document.getElementById('fileInput');
        const imageUrl = document.getElementById('imageUrl');
        const ocrUrl = document.getElementById('ocrUrl');
        const wordFileUrl = document.getElementById('wordFileUrl');
        const pdfFileUrl = document.getElementById('pdfFileUrl');
        const resultDiv = document.getElementById('result');

        const uploaderAccordion = document.getElementById('uploaderAccordion');
        const convertAccordion = document.getElementById('convertAccordion');
        const ocrAccordion = document.getElementById('ocrAccordion');
        const wordToPdfAccordion = document.getElementById('wordToPdfAccordion');
        const pdfToWordAccordion = document.getElementById('pdfToWordAccordion');
        const loadingAnimation = document.getElementById('loadingAnimation');

        actionSelect.addEventListener('change', () => {
            [uploaderSection, convertSection, ocrSection, wordToPdfSection, pdfToWordSection].forEach(section => section.classList.add('hidden'));
            [uploaderAccordion, convertAccordion, ocrAccordion, wordToPdfAccordion, pdfToWordAccordion].forEach(accordion => accordion.classList.add('hidden'));

            if (actionSelect.value === 'upload') {
                uploaderSection.classList.remove('hidden');
                uploaderAccordion.classList.remove('hidden');
            } else if (actionSelect.value === 'convert') {
                convertSection.classList.remove('hidden');
                convertAccordion.classList.remove('hidden');
            } else if (actionSelect.value === 'ocr') {
                ocrSection.classList.remove('hidden');
                ocrAccordion.classList.remove('hidden');
            } else if (actionSelect.value === 'wordToPdf') {
                wordToPdfSection.classList.remove('hidden');
                wordToPdfAccordion.classList.remove('hidden');
            } else if (actionSelect.value === 'pdfToWord') {
                pdfToWordSection.classList.remove('hidden');
                pdfToWordAccordion.classList.remove('hidden');
            }
        });

        function showLoading() {
loadingAnimation.classList.remove('hidden');
}

function hideLoading() {
loadingAnimation.classList.add('hidden');
}

        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            resultDiv.innerHTML = '';
            resultDiv.classList.add('hidden');

            // ... (existing form submission code remains the same) ...
            if (actionSelect.value === 'upload') {
                const formData = new FormData();
formData.append('file', fileInput.files[0]);

try {
const response = await fetch('https://itzpire.com/tools/upload', {
method: 'POST',
headers: {
    'accept': '*/*',
},
body: formData,
});

const result = await response.json();

if (response.ok && result.status === "success") {
resultDiv.innerHTML = `
    <p class="mb-4 font-bold text-lg">Berkas berhasil diunggah!</p>
    <div class="space-y-4">
        <div class="bg-dark-400 p-4 rounded-lg">
            <p class="font-semibold mb-2">URL Berkas:</p>
            <div class="flex items-center justify-between">
                <a href="${result.fileInfo.url}" target="_blank" class="text-blue-400 hover:underline text-sm break-all">${result.fileInfo.url}</a>
                <button onclick="copyToClipboard('${result.fileInfo.url}')" class="ml-2 text-gray-300 hover:text-white transition-colors duration-300">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
        <div class="bg-dark-400 p-4 rounded-lg">
            <p class="font-semibold mb-2">URL Unduh:</p>
            <div class="flex items-center justify-between">
                <a href="${result.fileInfo.downloadUrl}" target="_blank" class="text-blue-400 hover:underline text-sm break-all">${result.fileInfo.downloadUrl}</a>
                <button onclick="copyToClipboard('${result.fileInfo.downloadUrl}')" class="ml-2 text-gray-300 hover:text-white transition-colors duration-300">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
        <div class="bg-dark-400 p-4 rounded-lg">
            <p class="text-sm"><span class="font-semibold">Nama Berkas:</span> ${result.fileInfo.fileName}</p>
            <p class="text-sm"><span class="font-semibold">Ukuran:</span> ${(result.fileInfo.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
    </div>
`;
} else {
resultDiv.innerHTML = `<p class="text-red-400">Error: ${result.message || 'Terjadi kesalahan yang tidak diketahui'}</p>`;
}
} catch (error) {
resultDiv.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
} finally {
hideLoading();
resultDiv.classList.remove('hidden');
}
} else if (actionSelect.value === 'convert') { 
try {
const response = await fetch(`https://api.nyxs.pw/tools/hd?url=${encodeURIComponent(imageUrl.value)}`, {
method: 'GET',
headers: {
    'accept': 'application/json',
},
});

const result = await response.json();

if (response.ok && result.status === "true") {
resultDiv.innerHTML = `
    <p class="mb-4 font-bold text-lg">Gambar berhasil dikonversi!</p>
    <div class="bg-dark-400 p-4 rounded-lg">
        <img src="${result.result}" alt="Gambar HD" class="result-image"/>
        <a href="${result.result}" download class="mt-4 inline-block py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-300">
            <i class="fas fa-download mr-2"></i>Unduh Gambar HD
        </a>
    </div>
`;
} else {
resultDiv.innerHTML = `<p class="text-red-400">Error: ${result.message}</p>`;
}
} catch (error) {
resultDiv.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
} finally {
    hideLoading();
                    resultDiv.classList.remove('hidden');
                }
            } else if (actionSelect.value === 'ocr') {
                try {
                    const response = await fetch(`https://api.ngodingaja.my.id/api/ocr?url=${encodeURIComponent(ocrUrl.value)}`, {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                        },
                    });

                    const result = await response.json();

                    if (response.ok && result.status === true) {
                        resultDiv.innerHTML = `
                            <p class="mb-4 font-bold text-lg">Text extracted successfully!</p>
                            <div class="bg-dark-400 p-4 rounded-lg">
                                <h3 class="text-lg font-semibold mb-2">Extracted Text:</h3>
                                <pre class="result-text">${result.hasil}</pre>
                                <button onclick="copyToClipboard('${result.hasil}')" class="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-300">
                                    <i class="fas fa-copy mr-2"></i>Copy Text
                                </button>
                            </div>
                        `;
                    } else {
                        resultDiv.innerHTML = `<p class="text-red-400">Error: ${result.message || 'Unknown error occurred'}</p>`;
                    }
                } catch (error) {
                    resultDiv.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
                } finally {
                    hideLoading();
                    resultDiv.classList.remove('hidden');
                }

            } else if (actionSelect.value === 'wordToPdf') {
                try {
                    const response = await fetch(`https://api.nyxs.pw/converter/word-to-pdf?url=${encodeURIComponent(wordFileUrl.value)}`, {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                        },
                    });

                    const result = await response.json();

                    if (response.ok && result.status === "true") {
                        resultDiv.innerHTML = `
                            <p class="mb-4 font-bold text-lg">File Word berhasil dikonversi ke PDF!</p>
                            <div class="bg-dark-400 p-4 rounded-lg">
                                <p class="font-semibold mb-2">URL File PDF:</p>
                                <div class="flex items-center justify-between">
                                    <a href="${result.result}" target="_blank" class="text-blue-400 hover:underline text-sm break-all">${result.result}</a>
                                    <button onclick="copyToClipboard('${result.result}')" class="ml-2 text-gray-300 hover:text-white transition-colors duration-300">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                </div>
                                <a href="${result.result}" download class="mt-4 inline-block py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-300">
                                    <i class="fas fa-download mr-2"></i>Unduh File PDF
                                </a>
                            </div>
                        `;
                    } else {
                        resultDiv.innerHTML = `<p class="text-red-400">Error: ${result.message || 'Terjadi kesalahan yang tidak diketahui'}</p>`;
                    }
                } catch (error) {
                    resultDiv.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
                } finally {
                    hideLoading();
                    resultDiv.classList.remove('hidden');
                }
            }

            else if (actionSelect.value === 'pdfToWord') {
                try {
                    const response = await fetch(`https://api.nyxs.pw/converter/pdf-to-word?url=${encodeURIComponent(pdfFileUrl.value)}`, {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                        },
                    });

                    const result = await response.json();

                    if (response.ok && result.status === "true") {
                        resultDiv.innerHTML = `
                            <p class="mb-4 font-bold text-lg">File PDF berhasil dikonversi ke Word!</p>
                            <div class="bg-dark-400 p-4 rounded-lg">
                                <p class="font-semibold mb-2">URL File Word:</p>
                                <div class="flex items-center justify-between">
                                    <a href="${result.result}" target="_blank" class="text-blue-400 hover:underline text-sm break-all">${result.result}</a>
                                    <button onclick="copyToClipboard('${result.result}')" class="ml-2 text-gray-300 hover:text-white transition-colors duration-300">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                </div>
                                <a href="${result.result}" download class="mt-4 inline-block py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-300">
                                    <i class="fas fa-download mr-2"></i>Unduh File Word
                                </a>
                            </div>
                        `;
                    } else {
                        resultDiv.innerHTML = `<p class="text-red-400">Error: ${result.message || 'Terjadi kesalahan yang tidak diketahui'}</p>`;
                    }
                } catch (error) {
                    resultDiv.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
                } finally {
                    hideLoading();
                    resultDiv.classList.remove('hidden');
                }
            }
        });

        // CS Image Input
        const csImageInput = document.getElementById('csImageInput');
        const csImage = document.getElementById('csImage');

        csImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    csImage.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });

        // Accordion functionality
        const accordions = document.querySelectorAll('.accordion');
        accordions.forEach(accordion => {
            accordion.addEventListener('click', function() {
                this.classList.toggle('active');
                const panel = this.nextElementSibling;
                const icon = this.querySelector('.fas.fa-chevron-down');
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });

        // Function to copy text to clipboard
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Text copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
