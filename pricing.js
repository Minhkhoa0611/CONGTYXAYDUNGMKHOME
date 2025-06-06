document.addEventListener("DOMContentLoaded", () => {
    const pricingSection = `
        <div id="baogia" class="baogia">
            <h1>BÁO GIÁ DỊCH VỤ TƯ VẤN GIÁM SÁT - THIẾT KẾ THI CÔNG MK HOME</h1>
            <h2>📋 Dịch vụ Giám Sát</h2>
            <table>
                <tr>
                    <th>Gói dịch vụ</th>
                    <th>Thời gian giám sát</th>
                    <th>Thời gian (h)/Ngày</th>
                    <th>Nhà phố</th>
                    <th>Biệt thự</th>
                </tr>
                <tr>
                    <td>Gói tiêu chuẩn</td>
                    <td>3 buổi/tuần</td>
                    <td>3 – 4 giờ</td>
                    <td>8.000.000đ</td>
                    <td>10.000.000đ</td>
                </tr>
                <tr>
                    <td>Tư vấn Giám Sát bán thời gian</td>
                    <td>5 buổi/tuần</td>
                    <td>3 – 4 giờ</td>
                    <td>12.000.000đ</td>
                    <td>14.000.000đ</td>
                </tr>
                <tr>
                    <td>Tư vấn Giám Sát nguyên ngày</td>
                    <td>Thứ 2 – Thứ 7</td>
                    <td>7 – 8 giờ</td>
                    <td>18.000.000đ</td>
                    <td>22.000.000đ</td>
                </tr>
            </table>
            <h2>📐 Dịch vụ Thiết Kế & Thi Công</h2>
            <table>
                <tr>
                    <th>Dịch vụ</th>
                    <th>Nhà phố</th>
                    <th>Biệt thự</th>
                </tr>
                <tr>
                    <td>Thiết kế Full Hồ Sơ</td>
                    <td>70.000đ/m²</td>
                    <td>150.000đ/m²</td>
                </tr>
                <tr>
                    <td>Đơn giá thi công trọn gói (Không bao gồm Nội thất rời)</td>
                    <td>6.000.000đ/m²</td>
                    <td>6.000.000đ/m²</td>
                </tr>
                <tr>
                    <td>Đơn giá thi công Nhân Công (Không bao gồm Vật Tư)</td>
                    <td>2.500.000đ/m²</td>
                    <td>2.500.000đ/m²</td>
                </tr>
            </table>
        </div>
    `;

    const pricingStyles = `
        <style>
            #baogia {
                padding: 20px;
                background-color: #f0f8ff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                margin: 20px auto;
                max-width: 1200px;
                font-family: Arial, sans-serif;
            }

            #baogia h1, #baogia h2 {
                text-align: center;
                color: #0055ff;
                margin-bottom: 20px;
                text-shadow: 1px 1px 2px rgba(0, 85, 255, 0.3);
            }

            #baogia table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 16px;
                text-align: left;
                background-color: #ffffff;
            }

            #baogia th, #baogia td {
                padding: 12px;
                border: 1px solid #ddd;
            }

            #baogia th {
                background-color: #e6f7ff;
                font-weight: bold;
                color: #0055ff;
            }

            #baogia tr:nth-child(even) {
                background-color: #f9f9f9;
            }

            #baogia tr:hover {
                background-color: #e0f0ff;
            }

            @media (max-width: 768px) {
                #baogia table {
                    display: block;
                    overflow-x: auto;
                    white-space: nowrap;
                }

                #baogia h1, #baogia h2 {
                    font-size: 20px;
                }
            }

            @media (max-width: 480px) {
                #baogia table {
                    display: block;
                    overflow-x: auto;
                    white-space: nowrap;
                }

                #baogia th, #baogia td {
                    padding: 8px;
                }

                #baogia h1, #baogia h2 {
                    font-size: 18px;
                }

                #baogia {
                    padding: 10px;
                }
            }
        </style>
    `;

    document.body.insertAdjacentHTML("beforeend", pricingSection);
    document.head.insertAdjacentHTML("beforeend", pricingStyles);
});