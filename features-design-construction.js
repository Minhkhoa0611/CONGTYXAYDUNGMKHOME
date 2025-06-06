document.addEventListener("DOMContentLoaded", () => {
    const sections = `
        <main class="main-content" style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <section class="features" style="padding: 50px 20px; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-bottom: 1px solid #ddd;">
                <div class="container" style="max-width: 1200px; margin: 0 auto; text-align: center;">
                    <h2 class="section-title" style="font-size: 36px; font-weight: bold; margin-bottom: 20px; color: #1565c0; text-shadow: 1px 1px 3px rgba(21, 101, 192, 0.3);">Tính Năng Nổi Bật</h2>
                    <div class="feature-items" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
                        ${generateFeatureItems([
                            {
                                title: "Liên tục cập nhật mẫu mới",
                                description: "Chúng tôi luôn theo sát các xu hướng hiện nay trong lĩnh vực thiết kế. Vì vậy, khách hàng của chúng tôi chỉ nhận được những nội thất hiện đại và được ưa chuộng."
                            },
                            {
                                title: "Thi công nhất quán",
                                description: "Chúng tôi tự mình đảm nhận tất cả các dự án – chúng tôi cung cấp một chu trình làm việc đầy đủ. Cách tiếp cận này đảm bảo kết quả chất lượng."
                            },
                            {
                                title: "Cá nhân hoá mẫu thiết kế",
                                description: "Chúng tôi không thực hiện các dự án trên khuôn mẫu có sẵn. Chúng tôi tiếp cận từng khách hàng từ quan điểm giải quyết các vấn đề cụ thể của họ, thay vì đề xuất các giải pháp có sẵn."
                            },
                            {
                                title: "Đội xây dựng của chúng tôi",
                                description: "Chúng tôi chuyên cung cấp đội ngũ chuyên gia có trình độ để thực hiện dự án chính xác nhất và đảm bảo chất lượng cao, đúng tiến độ hoàn thành."
                            }
                        ])}
                    </div>
                </div>
            </section>
        </main>
    `;

    document.body.insertAdjacentHTML("beforeend", sections);

    document.head.insertAdjacentHTML(
        "beforeend",
        `<style>
            .steps .step {
                position: relative;
                overflow: hidden;
            }

            .steps .step:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            }

            .steps .step::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(56, 142, 60, 0.1), rgba(56, 142, 60, 0.2));
                z-index: 0;
                transition: opacity 0.3s;
                opacity: 0;
            }

            .steps .step:hover::before {
                opacity: 1;
            }

            .steps .step-number {
                position: relative;
                z-index: 1;
                font-size: 32px;
                font-weight: bold;
                color: #2e7d32;
                text-shadow: 1px 1px 3px rgba(46, 125, 50, 0.3);
            }

            .steps .step-description {
                position: relative;
                z-index: 1;
                font-size: 16px;
                color: #555;
                line-height: 1.5;
            }

            .steps {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                gap: 20px;
                position: relative;
            }

            .steps .step {
                position: relative;
                background: #f9f9f9;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s, box-shadow 0.3s;
                min-width: 200px;
            }

            .steps .step:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            }

            .steps .step-number {
                font-size: 28px;
                font-weight: bold;
                color: #388e3c;
                margin-bottom: 10px;
            }

            .steps .step-description {
                font-size: 16px;
                color: #555;
                line-height: 1.5;
            }

            .process-connector {
                text-align: center;
                margin: 40px 0;
                font-size: 24px;
                font-weight: bold;
                color: #388e3c;
            }

            .steps .step {
                position: relative;
                background: #f9f9f9;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s, box-shadow 0.3s;
                width: 250px; /* Fixed width */
                height: 150px; /* Fixed height */
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .steps .step:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            }

            .steps .step-number {
                font-size: 28px;
                font-weight: bold;
                color: #388e3c;
                margin-bottom: 10px;
            }

            .steps .step-description {
                font-size: 16px;
                color: #555;
                line-height: 1.5;
                text-align: center;
            }

            .process-connector {
                text-align: center;
                margin: 40px 0;
                font-size: 24px;
                font-weight: bold;
                color: #388e3c;
            }

            .steps-title {
                text-align: center;
                font-size: 28px; /* Ensure consistent font size */
                font-weight: bold;
                margin-bottom: 15px;
                color: #388e3c;
            }

            .process-connector {
                text-align: center;
                margin: 40px 0;
                font-size: 28px; /* Match font size with steps title */
                font-weight: bold;
                color: #388e3c;
            }

            .section-title {
                font-size: 36px;
                font-weight: bold;
                margin-bottom: 20px;
                text-align: center;
                color: #2e7d32;
                text-shadow: 1px 1px 3px rgba(46, 125, 50, 0.3);
                text-decoration: underline; /* Add underline */
                text-transform: uppercase; /* Make text uppercase */
            }

            /* Responsive styles */
            @media (max-width: 768px) {
                .main-content {
                    padding: 20px;
                }

                .features, .process {
                    padding: 30px 10px;
                }

                .feature-items {
                    flex-direction: column;
                    gap: 15px;
                }

                .feature-item {
                    min-width: 100%;
                }

                .steps {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }

                .steps .step {
                    width: 100%;
                    height: auto;
                }

                .section-title {
                    font-size: 28px;
                }

                .steps-title, .process-connector {
                    font-size: 20px;
                }

                .steps .step-number {
                    font-size: 24px;
                }

                .steps .step-description {
                    font-size: 14px;
                }
            }

            @media (max-width: 480px) {
                .section-title {
                    font-size: 24px;
                }

                .steps-title, .process-connector {
                    font-size: 18px;
                }

                .steps .step-number {
                    font-size: 20px;
                }

                .steps .step-description {
                    font-size: 12px;
                }
            }
        </style>`
    );

    function generateFeatureItems(features) {
        return features
            .map(
                (feature) => `
                <div class="feature-item" style="flex: 1; min-width: 250px; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s, box-shadow 0.3s;">
                    <h3 style="font-size: 24px; font-weight: bold; color: #1565c0; margin-bottom: 10px;">${feature.title}</h3>
                    <p style="font-size: 16px; text-align: left;">${feature.description}</p>
                </div>
            `
            )
            .join("");
    }

    function generateSteps(descriptions) {
        return descriptions
            .map(
                (desc, index) => `

                <div class="step" style="background: #f9f9f9; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s, box-shadow 0.3s;">
                    <h3 class="step-number" style="font-size: 28px; font-weight: bold; color: #388e3c; margin-bottom: 10px;">${String(index + 1).padStart(2, "0")}</h3>
                    <p class="step-description" style="font-size: 16px; text-align: left;">${desc}</p>
                </div>
            `
            )
            .join("");
    }
});
