document.getElementById('floors').addEventListener('input', function () {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const floors = parseInt(document.getElementById('floors').value);

    if (isNaN(length) || isNaN(width) || isNaN(floors)) {
        return; // Do nothing if inputs are invalid
    }

    const baseArea = length * width;

    // Removed foundation suggestion logic
});

document.getElementById('calculateBtn').addEventListener('click', () => {
    // Show progress bar
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    progressContainer.style.display = 'block';
    progressBar.value = 0;

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.value = progress;
        if (progress >= 100) {
            clearInterval(interval);
            progressContainer.style.display = 'none'; // Hide progress bar when complete

            const projectName = document.getElementById('projectName').value.trim() || "Công trình Nhà Ở MK Home"; // Use default if empty
            const length = parseFloat(document.getElementById('length').value);
            const width = parseFloat(document.getElementById('width').value);
            const floors = parseInt(document.getElementById('floors').value, 10);
            const roofFactor = parseFloat(document.getElementById('roof').value) / 100;
            const foundationFactor = parseFloat(document.getElementById('foundation').value) / 100;

            if (!projectName) {
                alert('Vui lòng nhập tên công trình!');
                return;
            }

            const costPerSquareMeter = parseFloat(localStorage.getItem('costPerSquareMeter')) || 6000000; // Default to 6 triệu/m² if not set
            const baseArea = length * width;
            const foundationArea = baseArea * foundationFactor;
            const roofArea = baseArea * roofFactor;
            const floorCost = baseArea * costPerSquareMeter;
            const foundationCost = foundationArea * costPerSquareMeter;
            const roofCost = roofArea * costPerSquareMeter;
            const totalCost = foundationCost + floorCost * floors + roofCost;

            // Material estimates
            const totalConcreteVolume = (baseArea * floors + foundationArea + roofArea) * 0.15;
            const sand = totalConcreteVolume * 0.6;
            const stone = totalConcreteVolume * 0.4;
            const cementBags = totalConcreteVolume * 7;
            const bricks = baseArea * floors * 60;
            const plainSteel = totalConcreteVolume * 120 * 0.3; // 30% plain steel
            const deformedSteel = totalConcreteVolume * 120 * 0.7; // 70% deformed steel

            // Generate results table
            let floorRows = '';
            for (let i = 1; i <= floors; i++) {
                floorRows += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>Sàn ${i}</td>
                        <td>${baseArea.toFixed(2)}</td>
                        <td>100%</td>
                        <td>${costPerSquareMeter.toLocaleString()}</td>
                        <td>${floorCost.toLocaleString()}</td>
                    </tr>
                `;
            }

            const resultTable = `
                <h3 style="text-align: center; margin-top: 20px;">BẢNG BẢO GIÁ CHI PHÍ XÂY DỰNG NHÀ</h3> <!-- Added title -->
                <p style="text-align: center; font-style: italic; color: gray;">(Không bao gồm nội thất rời)</p> <!-- Added note -->
                <table border="1" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Hạng Mục</th>
                            <th>Khối Lượng (m²)</th>
                            <th>Hệ Số</th>
                            <th>Đơn Giá (VND)</th>
                            <th>Thành Tiền (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Móng</td>
                            <td>${baseArea.toFixed(2)}</td>
                            <td>${(foundationFactor * 100).toFixed(0)}%</td>
                            <td>${costPerSquareMeter.toLocaleString()}</td>
                            <td>${foundationCost.toLocaleString()}</td>
                        </tr>
                        ${floorRows}
                        <tr>
                            <td>${floors + 2}</td>
                            <td>Mái</td>
                            <td>${baseArea.toFixed(2)}</td>
                            <td>${(roofFactor * 100).toFixed(0)}%</td>
                            <td>${costPerSquareMeter.toLocaleString()}</td>
                            <td>${roofCost.toLocaleString()}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" style="text-align: right;"><strong>Tổng Cộng</strong></td>
                            <td><strong>${totalCost.toLocaleString()}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            `;

            // Generate materials table
            const materialsTable = `
                <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Vật Liệu</th>
                            <th>Khối Lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Cát</td>
                            <td>${sand.toFixed(2)} m³</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Đá (1x2)</td>
                            <td>${stone.toFixed(2)} m³</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Xi măng</td>
                            <td>${cementBags.toFixed(0)} bao</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Gạch</td>
                            <td>${bricks.toFixed(0)} viên</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Thép trơn</td>
                            <td>${plainSteel.toFixed(2)} kg</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Thép vằn</td>
                            <td>${deformedSteel.toFixed(2)} kg</td>
                        </tr>
                    </tbody>
                </table>
            `;

            // Estimated durations for tasks (in days)
            const foundationDays = 10; // Ví dụ: 10 ngày cho thi công móng
            const columnDays = 3.5; // Cố định 3.5 ngày cho thi công cột
            const beamSlabDays = 7; // Cố định 7 ngày cho thi công dầm và sàn
            const wallDays = 5; // Ví dụ: 5 ngày mỗi tầng cho xây tường bao
            const partitionWallDays = 3; // Ví dụ: 3 ngày mỗi tầng cho xây tường ngăn phòng
            const electricalPlumbingDays = 7; // Cố định 7 ngày cho công tác điện nước
            const plasterDays = 10; // Cố định 10 ngày cho tô trong và ngoài
            const paintingDays = 15; // Cố định 15 ngày cho sơn hoàn thiện
            const totalDays = foundationDays + (floors * (columnDays + beamSlabDays + wallDays + partitionWallDays)) + electricalPlumbingDays + plasterDays + paintingDays;

            // Generate progress table rows dynamically
            let progressRows = `
                <tr>
                    <td>1</td>
                    <td>Thi Công Móng</td>
                    <td>${foundationDays} ngày</td>
                </tr>
            `;
            let taskIndex = 2;
            for (let i = 1; i <= floors; i++) {
                progressRows += `
                    <tr>
                        <td>${taskIndex++}</td>
                        <td>Thi Công Cột Tầng ${i}</td>
                        <td>${columnDays} ngày</td>
                    </tr>
                    <tr>
                        <td>${taskIndex++}</td>
                        <td>Thi Công Dầm Sàn Tầng ${i}</td>
                        <td>${beamSlabDays} ngày</td>
                    </tr>
                    <tr>
                        <td>${taskIndex++}</td>
                        <td>Xây Tường Bao Tầng ${i}</td>
                        <td>${wallDays} ngày</td>
                    </tr>
                    <tr>
                        <td>${taskIndex++}</td>
                        <td>Xây Tường Ngăn Phòng Tầng ${i}</td>
                        <td>${partitionWallDays} ngày</td>
                    </tr>
                    <tr>
                        <td>${taskIndex++}</td>
                        <td>Công Tác Điện Nước Tầng ${i}</td>
                        <td>${electricalPlumbingDays} ngày</td>
                    </tr>
                    <tr>
                        <td>${taskIndex++}</td>
                        <td>Tô Trong và Ngoài Tầng ${i}</td>
                        <td>${plasterDays} ngày</td>
                    </tr>
                    <tr>
                        <td>${taskIndex++}</td>
                        <td>Sơn Hoàn Thiện Tầng ${i}</td>
                        <td>${paintingDays} ngày</td>
                    </tr>
                `;
            }

            // Generate progress table
            const progressTable = `
                <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Công Tác</th>
                            <th>Số Ngày Dự Kiến</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${progressRows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" style="text-align: right;"><strong>Tổng Thời Gian</strong></td>
                            <td><strong>${totalDays} ngày</strong></td>
                        </tr>
                    </tfoot>
                </table>
                <p style="margin-top: 10px; font-style: italic; color: gray;">
                    Tiến độ trên chỉ mang tính chất tham khảo. Thực tế khi thi công ngoài công trình còn phụ thuộc vào rất nhiều yếu tố thiên thời, địa lợi, nhân hòa (và tiền). Nên sẽ có sự chênh lệch thực tế.
                </p>
            `;

            // Display results
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
                <h2>Kết Quả</h2>
                <h3 style="text-align: center;">Tên Công Trình: ${projectName}</h3>
                ${resultTable}
                <h3>Dự Toán Vật Liệu</h3>
                ${materialsTable}
                <h3>Tiến Độ Dự Đoán</h3>
                ${progressTable}
            `;

            // Show export buttons
            document.getElementById('exportBtn').style.display = 'block';
            document.getElementById('exportExcelBtn').style.display = 'block';

            // Save to history
            const fullContent = `
                <h2>Kết Quả</h2>
                <h3 style="text-align: center;">Tên Công Trình: ${projectName}</h3>
                ${resultTable}
                <h3>Dự Toán Vật Liệu</h3>
                ${materialsTable}
                <h3>Tiến Độ Dự Đoán</h3>
                ${progressTable}
            `;
            saveToHistory(projectName, fullContent);
        }
    }, 100); // Update progress every 100ms
});

document.getElementById('exportBtn').addEventListener('click', () => {
    window.print(); // Sử dụng trình in của trình duyệt
});

document.getElementById('exportExcelBtn').addEventListener('click', () => {
    const resultDiv = document.getElementById('result');
    const tables = resultDiv.querySelectorAll('table'); // Get all tables in the result section
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];

    // Add project name and main title
    const projectName = document.getElementById('projectName').value.trim() || "Công trình Nhà Ở MK Home";
    worksheetData.push([`Tên Công Trình: ${projectName}`]);
    worksheetData.push(['BẢNG BẢO GIÁ CHI PHÍ XÂY DỰNG NHÀ']);
    worksheetData.push([]); // Empty row for spacing

    tables.forEach((table, index) => {
        // Add section title before each table
        if (index === 0) worksheetData.push(['Dự Toán Chi Phí']);
        if (index === 1) worksheetData.push(['Dự Toán Vật Liệu']);
        if (index === 2) worksheetData.push(['Tiến Độ Dự Đoán']);
        worksheetData.push([]); // Empty row for spacing

        const rows = table.querySelectorAll('tr');
        rows.forEach((row) => {
            const rowData = [];
            row.querySelectorAll('th, td').forEach((cell) => {
                rowData.push(cell.innerText);
            });
            worksheetData.push(rowData);
        });
        worksheetData.push([]); // Empty row for spacing between tables
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Apply styles to the worksheet
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
            if (!worksheet[cellAddress]) continue;

            const cell = worksheet[cellAddress];
            cell.s = {
                font: { name: 'Arial', sz: 12, bold: R === 0 || R === 1 || worksheetData[R - 1]?.[0]?.startsWith('Dự Toán') }, // Bold for titles and section headers
                alignment: { horizontal: 'center', vertical: 'center' },
                border: {
                    top: { style: 'thin', color: { rgb: '000000' } },
                    bottom: { style: 'thin', color: { rgb: '000000' } },
                    left: { style: 'thin', color: { rgb: '000000' } },
                    right: { style: 'thin', color: { rgb: '000000' } },
                },
            };

            // Apply background color for headers
            if (worksheetData[R - 1]?.[0]?.startsWith('STT')) {
                cell.s.fill = { fgColor: { rgb: 'D2B48C' } }; // Tan color for headers
                cell.s.font.color = { rgb: 'FFFFFF' }; // White text for headers
            }
        }
    }

    const fileName = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_Export.xlsx`; // Sanitize file name

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Báo Giá');
    XLSX.writeFile(workbook, fileName);
});

document.getElementById('saveSettingsBtn').addEventListener('click', () => {
    const costPerSquareMeter = parseFloat(document.getElementById('costPerSquareMeter').value);
    const roofFactors = document.getElementById('roofFactors').value.trim();
    const foundationFactors = document.getElementById('foundationFactors').value.trim();

    if (isNaN(costPerSquareMeter) || costPerSquareMeter <= 0) {
        alert('Vui lòng nhập đơn giá hợp lệ!');
        return;
    }

    const roofFactorMap = parseFactors(roofFactors);
    const foundationFactorMap = parseFactors(foundationFactors);

    if (!roofFactorMap || !foundationFactorMap) {
        alert('Vui lòng nhập hệ số % hợp lệ!');
        return;
    }

    // Save settings to localStorage
    localStorage.setItem('costPerSquareMeter', costPerSquareMeter);
    localStorage.setItem('roofFactors', JSON.stringify(roofFactorMap));
    localStorage.setItem('foundationFactors', JSON.stringify(foundationFactorMap));

    // Apply settings immediately
    updateDropdowns(roofFactorMap, foundationFactorMap);

    alert('Cài đặt đã được lưu và áp dụng!');
});

function parseFactors(input) {
    const lines = input.split('\n');
    const factorMap = {};
    for (const line of lines) {
        const [name, value] = line.split(':').map((item) => item.trim());
        if (!name || isNaN(value)) {
            return null;
        }
        factorMap[name] = parseFloat(value);
    }
    return factorMap;
}

function updateDropdowns(roofFactorMap, foundationFactorMap) {
    const roofSelect = document.getElementById('roof');
    const foundationSelect = document.getElementById('foundation');

    roofSelect.innerHTML = '';
    foundationSelect.innerHTML = '';

    for (const [name, value] of Object.entries(roofFactorMap)) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = `${name} (${value}%)`;
        roofSelect.appendChild(option);
    }

    for (const [name, value] of Object.entries(foundationFactorMap)) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = `${name} (${value}%)`;
        foundationSelect.appendChild(option);
    }
}

// Apply saved settings on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedCost = localStorage.getItem('costPerSquareMeter');
    const savedRoofFactors = localStorage.getItem('roofFactors');
    const savedFoundationFactors = localStorage.getItem('foundationFactors');

    if (savedCost) {
        document.getElementById('costPerSquareMeter').value = savedCost;
    }

    if (savedRoofFactors) {
        document.getElementById('roofFactors').value = Object.entries(JSON.parse(savedRoofFactors))
            .map(([name, value]) => `${name}:${value}`)
            .join('\n');
    }

    if (savedFoundationFactors) {
        document.getElementById('foundationFactors').value = Object.entries(JSON.parse(savedFoundationFactors))
            .map(([name, value]) => `${name}:${value}`)
            .join('\n');
    }

    if (savedRoofFactors && savedFoundationFactors) {
        const roofFactorMap = JSON.parse(savedRoofFactors);
        const foundationFactorMap = JSON.parse(savedFoundationFactors);
        updateDropdowns(roofFactorMap, foundationFactorMap);
    }
});

function saveToHistory(projectName, data) {
    const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    const timestamp = new Date().toLocaleString();
    history.push({ projectName, timestamp, data });
    localStorage.setItem('calculationHistory', JSON.stringify(history));
}

const historyBtn = document.getElementById('historyBtn');
const historyPopup = document.getElementById('historyPopup');
const closeHistoryPopup = document.getElementById('closeHistoryPopup');
const popupHistoryList = document.getElementById('popupHistoryList');

historyBtn.addEventListener('click', () => {
    const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    popupHistoryList.innerHTML = '';
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${entry.projectName} - ${entry.timestamp}
            <button class="deleteHistoryBtn" data-index="${index}" style="margin-left: 10px;">Xóa</button>
        `;
        li.style.cursor = 'pointer';
        li.querySelector('.deleteHistoryBtn').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the click event for opening the entry
            deleteHistoryEntry(index);
        });
        li.addEventListener('click', () => {
            const newWindow = window.open('', '_blank', 'width=800,height=600');
            newWindow.document.write(`
                <html>
                    <head>
                        <title>${entry.projectName} - ${entry.timestamp}</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 20px;
                                padding: 0;
                                background-color: #f5f5dc;
                                color: #4b4b4b;
                            }
                            h3 {
                                text-align: center;
                                color: #8b4513;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-top: 20px;
                            }
                            table th, table td {
                                border: 1px solid #ddd;
                                padding: 10px;
                                text-align: center;
                            }
                            table th {
                                background-color: #d2b48c;
                                color: white;
                            }
                            table tr:nth-child(even) {
                                background-color: #fdf5e6;
                            }
                            table tr:hover {
                                background-color: #f5deb3;
                            }
                        </style>
                    </head>
                    <body>
                        <h3>${entry.projectName} - ${entry.timestamp}</h3>
                        ${entry.data}
                    </body>
                </html>
            `);
            newWindow.document.close();
        });
        popupHistoryList.appendChild(li);
    });
    historyPopup.style.display = 'block'; // Hiển thị popup
});

function deleteHistoryEntry(index) {
    const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    history.splice(index, 1); // Remove the selected entry
    localStorage.setItem('calculationHistory', JSON.stringify(history));
    historyBtn.click(); // Refresh the history list
}

document.getElementById('clearAllHistoryBtn').addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử?')) {
        localStorage.removeItem('calculationHistory'); // Clear all history
        historyBtn.click(); // Refresh the history list
    }
});

closeHistoryPopup.addEventListener('click', () => {
    historyPopup.style.display = 'none'; // Ẩn popup
});

// Make the popup draggable
const makePopupDraggable = (popup) => {
    let isDragging = false;
    let offsetX, offsetY;

    popup.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - popup.offsetLeft;
        offsetY = e.clientY - popup.offsetTop;
        popup.style.cursor = 'move';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            popup.style.left = `${e.clientX - offsetX}px`;
            popup.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        popup.style.cursor = 'default';
    });
};

// Apply draggable functionality to the history popup
makePopupDraggable(historyPopup);

// Hiển thị và đóng popup Cài Đặt
const settingsBtn = document.getElementById('settingsBtn');
const settingsPopup = document.getElementById('settingsPopup');
const closeSettingsPopup = document.getElementById('closeSettingsPopup');

settingsBtn.addEventListener('click', () => {
    settingsPopup.style.display = 'block';
});

closeSettingsPopup.addEventListener('click', () => {
    settingsPopup.style.display = 'none';
});

// Apply styles to tables for better appearance
document.querySelectorAll('table').forEach((table) => {
    table.style.border = '1px solid #ddd';
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.marginTop = '20px';
});

document.querySelectorAll('table th, table td').forEach((cell) => {
    cell.style.border = '1px solid #ddd';
    cell.style.padding = '10px';
    cell.style.textAlign = 'center';
});

document.querySelectorAll('table th').forEach((header) => {
    header.style.backgroundColor = '#4CAF50';
    header.style.color = 'white';
    header.style.fontWeight = 'bold';
});

// Style buttons for a modern look
document.querySelectorAll('button').forEach((button) => {
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.margin = '5px';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    button.style.fontSize = '14px';
});

document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#45a049';
    });
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#4CAF50';
    });
});

// Style popups for better aesthetics
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.style.backgroundColor = '#f9f9f9';
    popup.style.border = '1px solid #ddd';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    popup.style.padding = '20px';
    popup.style.width = '80%';
    popup.style.maxWidth = '600px';
    popup.style.margin = 'auto';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.zIndex = '1000';
});

// Style popup close buttons
document.querySelectorAll('.popup .close').forEach((closeButton) => {
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.backgroundColor = '#ff5c5c';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.width = '30px';
    closeButton.style.height = '30px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.textAlign = 'center';
    closeButton.style.lineHeight = '30px';
    closeButton.style.fontSize = '16px';
});

document.querySelectorAll('.popup .close').forEach((closeButton) => {
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = '#ff3333';
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.backgroundColor = '#ff5c5c';
    });
});
