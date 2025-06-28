document.getElementById('ai-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    let prompt = form.prompt.value.trim();
    let topic = form.topic.value.trim();
    let aiServer = form.ai_server.value;
    let timeFrame = form.time_frame.value;

    // Xử lý trường hợp không còn input image (nếu đã xóa khỏi HTML)
    let imageFile = null;
    if (form.image) {
        imageFile = form.image.files[0];
    }

    if (!prompt && !topic) {
        alert("Vui lòng nhập mô tả ý tưởng hoặc chọn chủ đề!");
        return;
    }

    // Nếu prompt rỗng thì dùng topic làm prompt, ngược lại ghép cả hai
    let fullPrompt = '';
    if (prompt && topic) {
        fullPrompt = `${topic}, ${prompt}`;
    } else if (topic) {
        fullPrompt = topic;
    } else {
        fullPrompt = prompt;
    }

    // Thêm khung thời gian nếu có chọn
    if (timeFrame) {
        fullPrompt = `${fullPrompt}, ${timeFrame}`;
    }

    // Hiển thị trạng thái loading cho 1 ảnh lớn
    document.getElementById('result-image-1').innerHTML = '<span>Đang tạo ảnh...</span>';
    if (document.getElementById('result-image-2')) document.getElementById('result-image-2').innerHTML = '';
    if (document.getElementById('result-image-3')) document.getElementById('result-image-3').innerHTML = '';

    // Hàm gọi API ClipDrop với lựa chọn API key theo server
    async function generateImage(promptText, server) {
        const apiUrl = "https://clipdrop-api.co/text-to-image/v1";
        let apiKey = "a6341a5f8920d9600d950c43870af22cc7c271cdd865658c7bfb906388040e84ac1876fec312b8118a1ffbe9c04acc76";
        if (server === "server2") {
            apiKey = "418e63f89d4f2ca4ad938623fc7493c50d97be3bfad45d55277b14201073e3b04e04b2fae994444666e762e41547b04b";
        } else if (server === "server3") {
            apiKey = "5158c09248c48a39488833739bf5187b25541ffd75f672e29fae0eb98733c7a276c441ab1ea8aed09c3f9d974890966e";
        }
        const body = { prompt: promptText };
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const contentType = response.headers.get("content-type");
        if (response.ok && contentType && contentType.startsWith("image/")) {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }

        let data;
        try {
            data = await response.json();
        } catch (err) {
            throw new Error("API trả về dữ liệu không hợp lệ hoặc không phải JSON.");
        }

        if (!response.ok) {
            throw new Error(data.error || "API error");
        }
        return data.images && data.images[0] ? data.images[0] : null;
    }

    // Hàm dịch prompt sang tiếng Anh bằng Google Translate API (không cần API key)
    async function translateToEnglish(text) {
        try {
            const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=${encodeURIComponent(text)}`);
            const data = await res.json();
            return data[0][0][0];
        } catch (err) {
            console.warn("Không thể tự động dịch, dùng nguyên văn tiếng Việt.");
            return text;
        }
    }

    // Dịch prompt sang tiếng Anh trước khi gửi cho AI
    fullPrompt = await translateToEnglish(fullPrompt);
    let promptText = `${fullPrompt}, photorealistic`;
    try {
        let imgUrl;
        let triedServer2 = false;
        try {
            imgUrl = await generateImage(promptText, aiServer);
        } catch (err) {
            // Nếu đang ở server1 và lỗi, thử lại với server2
            if (aiServer === "server1" && !triedServer2) {
                triedServer2 = true;
                document.getElementById('result-image-1').innerHTML = '<span>Sever 1 lỗi, đang chuyển sang Sever 2...</span>';
                imgUrl = await generateImage(promptText, "server2");
                // Đổi select về server2 cho user thấy
                if (form.ai_server) form.ai_server.value = "server2";
            } else {
                throw err;
            }
        }
        if (imgUrl && typeof imgUrl === "string") {
            const base64 = await imageUrlToBase64(imgUrl);
            document.getElementById('result-image-1').innerHTML = `
                <div class="image-wrapper">
                    <img id="ai-result-img" src="data:image/png;base64,${base64}" alt="Kết quả AI">
                    <span class="ai-watermark-by">By MinhKhoa</span>
                </div>
            `;
            document.getElementById('result-url').innerHTML = `<a href="${imgUrl}" target="_blank">${imgUrl}</a>`;
            showDownloadButtons(base64);
        } else {
            document.getElementById('result-image-1').innerHTML = '<span>Không tạo được ảnh</span>';
            document.getElementById('result-url').innerHTML = '';
            hideDownloadButtons();
            console.error("Không nhận được ảnh hợp lệ từ API:", imgUrl);
        }
    } catch (err) {
        document.getElementById('result-image-1').innerHTML = '<span>Lỗi tạo ảnh</span>';
        document.getElementById('result-url').innerHTML = '';
        hideDownloadButtons();
        console.error("Lỗi tạo ảnh", err);
    }
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Hàm chuyển URL ảnh sang base64
async function imageUrlToBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result.split(',')[1];
            resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// --- Download buttons logic ---
function showDownloadButtons(base64) {
    const btns = document.getElementById('download-buttons');
    btns.style.display = 'flex';
    document.getElementById('download-watermark').dataset.base64 = base64;
    // Thêm base64 cho nút không watermark
    const btnNoWatermark = document.getElementById('download-no-watermark');
    if (btnNoWatermark) btnNoWatermark.dataset.base64 = base64;
}

function hideDownloadButtons() {
    const btns = document.getElementById('download-buttons');
    btns.style.display = 'none';
    document.getElementById('download-watermark').removeAttribute('data-base64');
    // Ẩn cho nút không watermark
    const btnNoWatermark = document.getElementById('download-no-watermark');
    if (btnNoWatermark) btnNoWatermark.removeAttribute('data-base64');
}

// Download có watermark
document.getElementById('download-watermark').onclick = async function() {
    const base64 = this.dataset.base64;
    if (!base64) return;
    // Tạo ảnh mới với watermark
    const img = new window.Image();
    img.src = 'data:image/png;base64,' + base64;
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Vẽ watermark
        const text = 'By MinhKhoa';
        const fontSize = Math.round(canvas.height * 0.045);
        ctx.font = `bold ${fontSize}px Segoe UI, Arial`;
        ctx.textBaseline = 'bottom';
        ctx.textAlign = 'right';
        const padding = Math.round(canvas.height * 0.03);
        // Shadow
        ctx.shadowColor = 'rgba(99,102,241,0.25)';
        ctx.shadowBlur = 4;
        // Không vẽ nền mờ nữa
        // ctx.globalAlpha = 0.65;
        // ctx.fillStyle = '#6366f1';
        // ctx.fillRect(canvas.width - textWidth - padding*2, canvas.height - rectHeight - padding, textWidth + padding*2, rectHeight);
        ctx.globalAlpha = 1;
        // Text
        ctx.fillStyle = '#fff';
        ctx.fillText(text, canvas.width - padding, canvas.height - padding - 4);

        // Xuất ảnh
        const url = canvas.toDataURL('image/png');
        downloadUrl(url, 'ai-mkhome-watermark.png');
    };
};

// Download không watermark
const btnNoWatermark = document.getElementById('download-no-watermark');
if (btnNoWatermark) {
    btnNoWatermark.onclick = function() {
        const base64 = this.dataset.base64;
        if (!base64) return;
        const url = 'data:image/png;base64,' + base64;
        downloadUrl(url, 'ai-mkhome.png');
    };
}

// Biến toàn cục để lưu số thứ tự download
let downloadCounter = 1;

function downloadUrl(url, filename) {
    // Thêm tiền tố ngày giờ và số thứ tự vào tên file
    const now = new Date();
    const prefix = now.toISOString().replace(/[-:T]/g, '').slice(0, 12); // yyyyMMddhhmm
    const newFilename = `${prefix}_${downloadCounter}_${filename}`;
    downloadCounter++;
    const a = document.createElement('a');
    a.href = url;
    a.download = newFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
