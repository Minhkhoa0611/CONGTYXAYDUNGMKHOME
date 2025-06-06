function generateDesignSteps() {
    const steps = [
        "Tiếp nhận thông tin và yêu cầu của khách hàng",
        "Tư vấn báo giá gói thiết kế và dự trù gói thi công",
        "Khảo sát địa hình và tư vấn chi tiết, ký hợp đồng thiết kế",
        "Triển khai mặt bằng công năng theo yêu cầu của khách hàng",
        "Thiết kế 3D kiến trúc công trình",
        "Triển khai hồ sơ xin phép và hồ sơ thi công công trình",
        "Thiết kế 3D nội thất công trình và triển khai hồ sơ chi tiết nội thất",
        "Bàn giao hồ sơ toàn bộ công trình tới tay khách hàng"
    ];
    return generateSteps(steps);
}

function generateConstructionSteps() {
    const steps = [
        "Chuẩn bị mặt bằng và vật liệu thi công",
        "Thi công phần móng và kết cấu chính",
        "Thi công phần thô (xây, trát, lắp đặt hệ thống điện nước)",
        "Thi công hoàn thiện (ốp lát, sơn, lắp đặt nội thất)",
        "Kiểm tra chất lượng và nghiệm thu công trình",
        "Bàn giao công trình cho khách hàng",
        "Hỗ trợ bảo trì sau bàn giao",
        "Đánh giá và thu thập phản hồi từ khách hàng"
    ];
    return generateSteps(steps);
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

export { generateDesignSteps, generateConstructionSteps };
