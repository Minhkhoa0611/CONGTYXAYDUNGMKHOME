document.addEventListener("DOMContentLoaded", function () {
    const contactFormHTML = `
        <section id="contact-form" class="contact-form">
            <div class="container">
                <h2>Tư vấn ngay</h2>
                <form id="consultationForm">
                    <label for="name">Họ tên</label>
                    <input type="text" id="name" name="name" placeholder="Nhập họ tên" required>
        
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Nhập email" required>
        
                    <label for="phone">Điện thoại</label>
                    <input type="tel" id="phone" name="phone" placeholder="Nhập số điện thoại" required>
        
                    <label for="product">Chọn sản phẩm</label>
                    <input type="file" id="product" name="product" multiple>
        
                    <label for="message">Tin nhắn</label>
                    <textarea id="message" name="message" placeholder="Nhập tin nhắn" rows="4"></textarea>
        
                    <button type="submit">Gửi</button>
                    <progress id="progressBar" value="0" max="100" style="width: 100%; display: none;"></progress>
                </form>

                <!-- Cửa sổ xác nhận -->
                <div id="confirmPopup" class="popup" style="display: none;">
                    <div class="popup-content">
                        <p>Khi nhấn "Xác nhận", bạn đồng ý chia sẻ thông tin của mình.</p>
                        <button id="confirmButton">Xác nhận</button>
                        <button id="cancelButton">Hủy</button>
                    </div>
                </div>

                <!-- Cửa sổ thông báo -->
                <div id="popupMessage" class="popup" style="display: none;">
                    <div class="popup-content">
                        <p>Thông tin đã được gửi thành công!</p>
                        <button id="closePopupButton">Đóng</button>
                    </div>
                </div>
            </div>
        </section>
    `;

    document.body.insertAdjacentHTML("beforeend", contactFormHTML);

    // Add styles dynamically
    const contactFormStyles = `
        #contact-form {
            background: linear-gradient(135deg, #f0f8ff, #e6f7ff);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
            margin: 40px auto;
            max-width: 800px;
        }
        #contact-form h2 {
            font-size: 28px;
            font-weight: bold;
            color: #0055ff;
            text-align: center;
            margin-bottom: 30px;
            text-shadow: 1px 1px 3px rgba(0, 85, 255, 0.3);
        }
        .form-group {
            margin-bottom: 20px;
        }
        #contact-form label {
            display: block;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
        }
        #contact-form input, #contact-form textarea, #contact-form button {
            width: 100%;
            padding: 12px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 16px;
        }
        #contact-form input:focus, #contact-form textarea:focus {
            border-color: #0055ff;
            outline: none;
            box-shadow: 0 0 8px rgba(0, 85, 255, 0.5);
        }
        #contact-form button {
            background: linear-gradient(135deg, #0055ff, #00aaff);
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.3s ease;
            font-size: 18px;
        }
        #contact-form button:hover {
            background: linear-gradient(135deg, #0033cc, #0077ff);
            transform: scale(1.05);
        }
        .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #0a0f1e, #1b2a47);
            padding: 30px;
            box-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
            border: 2px solid rgba(0, 255, 255, 0.9);
            border-radius: 15px;
            z-index: 1000;
            text-align: center;
            width: 400px;
        }
        .popup-content {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            color: white;
        }
        .popup button {
            margin: 10px;
            padding: 14px 24px;
            font-size: 16px;
            font-weight: bold;
            border: 2px solid rgba(0, 255, 255, 0.6);
            background: rgba(0, 0, 0, 0.6);
            color: white;
            cursor: pointer;
            border-radius: 10px;
            transition: 0.3s ease-in-out;
        }
        .popup button:hover {
            background: rgba(0, 255, 255, 0.2);
            transform: scale(1.1);
        }
        .contact-info {
            background: linear-gradient(135deg, #f9f9f9, #e6f7ff);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            margin: 40px auto;
            max-width: 800px;
            text-align: center;
        }
        .contact-info h3 {
            font-size: 24px;
            font-weight: bold;
            color: #0055ff;
            margin-bottom: 20px;
            text-shadow: 1px 1px 3px rgba(0, 85, 255, 0.3);
        }
        .contact-info p {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        .contact-info a {
            color: #0055ff;
            font-weight: bold;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .contact-info a:hover {
            color: #0033cc;
            text-decoration: underline;
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = contactFormStyles;
    document.head.appendChild(styleSheet);

    // Add form functionality
    const form = document.getElementById("consultationForm");
    const confirmPopup = document.getElementById("confirmPopup");
    const popupMessage = document.getElementById("popupMessage");
    const progressBar = document.getElementById("progressBar");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        confirmPopup.style.display = "block";
    });

    document.getElementById("confirmButton").addEventListener("click", async function () {
        confirmPopup.style.display = "none";
        progressBar.style.display = "block";
        progressBar.value = 10;

        const token = "7699835490:AAHXNqBbklJBgBxKBhRm2vBi2Ssjls4YVuw"; // Replace with your bot token
        const chatId = "7991407654"; // Replace with your chat ID
        const formData = new FormData(form);

        try {
            // Send text message
            const textMessage = `
                Họ tên: ${formData.get("name")}
                Email: ${formData.get("email")}
                Điện thoại: ${formData.get("phone")}
                Tin nhắn: ${formData.get("message")}
            `;

            const textResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: chatId, text: textMessage }),
            });

            const textResult = await textResponse.json();
            if (!textResponse.ok) {
                throw new Error(`Failed to send text message: ${textResult.description}`);
            }

            progressBar.value = 50;

            // Send files if any
            const fileInput = document.getElementById("product");
            if (fileInput && fileInput.files.length > 0) {
                for (const file of fileInput.files) {
                    const fileData = new FormData();
                    fileData.append("chat_id", chatId);
                    fileData.append("document", file);

                    const fileResponse = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
                        method: "POST",
                        body: fileData,
                    });

                    const fileResult = await fileResponse.json();
                    if (!fileResponse.ok) {
                        throw new Error(`Failed to send file: ${fileResult.description}`);
                    }
                }
            }

            progressBar.value = 100;
            popupMessage.style.display = "block";
        } catch (error) {
            console.error("Error sending form:", error);
            alert("Gửi thất bại, vui lòng thử lại!");
        } finally {
            progressBar.style.display = "none";
            progressBar.value = 0;
            form.reset();
        }
    });

    document.getElementById("cancelButton").addEventListener("click", function () {
        confirmPopup.style.display = "none";
    });

    document.getElementById("closePopupButton").addEventListener("click", function () {
        popupMessage.style.display = "none";
    });

    function renderContactInfo() {
        const contactInfoHTML = `
            <section class="contact-info">
                <div class="container">
                    <h3>Hoặc gọi ngay cho chúng tôi</h3>
                    <p><i class="fas fa-phone-alt"></i> MK HOME:</p>
                    <p>- <a href="tel:0867544809"><i class="fas fa-phone"></i> SDT 1: 0867544809</a></p>
                    <p>- <a href="tel:0825864379"><i class="fas fa-phone"></i> SDT 2: 0825864379</a></p>
                    <p>Đội ngũ nhân sự giải đáp - tư vấn chuyên nghiệp đã sẵn sàng hỗ trợ quý khách mọi lúc mọi nơi. Gọi ngay hotline MK HOME để được tư vấn tận tình và chi tiết nhất!</p>
                    <p><a href="https://maps.app.goo.gl/v7ZCYzXvkSNTwEqDA" target="_blank"><i class="fas fa-map-marker-alt"></i> Tìm chúng tôi trên Google Maps</a></p>
                </div>
            </section>
        `;

        const contactFormSection = document.getElementById('contact-form');
        if (contactFormSection) {
            contactFormSection.insertAdjacentHTML('afterend', contactInfoHTML);
        }
    }

    // Call the function to render the contact info
    renderContactInfo();
});
