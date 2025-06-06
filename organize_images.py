import os
import shutil

# Định nghĩa cấu trúc galleries
galleries = {
    "galleryNhadep2T": {
        "title": "Thiết Kế Nhà Phố 2 Tầng 2025",
        "images": [
            "Mẫu 2 Tầng (1).jpg",
            "Mẫu 2 Tầng (2).jpg",
            "Mẫu 2 Tầng (3).jpg",
            "Mẫu 2 Tầng (4).jpg",
            "Mẫu 2 Tầng (5).jpg",
            "Mẫu 2 Tầng (6).jpg",
            "Mẫu 2 Tầng (7).jpg"
        ]
    },
    "galleryNhadep": {
        "title": "Thiết Kế Nhà Hộp Đẹp Xinh 2025",
        "images": [
            "Mẫu 1.webp",
            "Mẫu 2.webp",
            "Mẫu 3.webp",
            "Mẫu 4.webp",
            "Mẫu 5.webp",
            "Mẫu 6.webp",
            "Mẫu 7.webp"
        ]
    },
    "galleryNVS": {
        "title": "Thiết Kế NVS Hiện Đại 2025",
        "images": [
            "Mẫu NVS1.webp",
            "Mẫu NVS2.webp",
            "Mẫu NVS3.webp",
            "Mẫu NVS4.webp",
            "Mẫu NVS5.webp"
        ]
    },
    "galleryBep": {
        "title": "Thiết Kế Phòng Bếp Sang Trọng 2025",
        "images": [
            "PhongBep (1).webp",
            "PhongBep (2).webp",
            "PhongBep (3).webp",
            "PhongBep (4).webp",
            "PhongBep (5).webp",
            "PhongBep (6).webp",
            "PhongBep (7).webp"
        ]
    },
    "galleryPhongKhach": {
        "title": "Thiết Kế Phòng Khách 2025",
        "images": [
            "Phòng Khách (1).webp",
            "Phòng Khách (2).webp",
            "Phòng Khách (3).webp",
            "Phòng Khách (4).webp",
            "Phòng Khách (5).webp",
            "Phòng Khách (6).webp"
        ]
    },
    "galleryCongNha": {
        "title": "Thiết Kế Cổng Nhà Đẹp 2025",
        "images": [
            "Cổng Nhà (1).webp",
            "Cổng Nhà (2).webp",
            "Cổng Nhà (3).webp",
            "Cổng Nhà (4).webp",
            "Cổng Nhà (5).webp"
        ]
    },
    "galleryShopTT": {
        "title": "Thiết Kế Shop Thời Trang Đẹp",
        "images": [
            "Shop TT (1).webp",
            "Shop TT (2).webp",
            "Shop TT (3).webp",
            "Shop TT (4).webp",
            "Shop TT (5).webp",
            "Shop TT (6).webp",
            "Shop TT (7).webp"
        ]
    },
    "galleryCafe": {
        "title": "Thiết Kế Quán Cafe Sang Trọng",
        "images": [
            "CF1.webp",
            "CF2.webp",
            "CF3.webp",
            "CF4.webp",
            "CF5.webp",
            "CF6.webp",
            "CF7.webp",
            "CF8.webp"
        ]
    }
}

# Đường dẫn gốc và đích
source_folder = r"c:\Users\MKCONS\Desktop\Website-MK-HOME\DuanNP"
destination_folder = r"c:\Users\MKCONS\Desktop\Website-MK-HOME\MauTK"

# Tạo thư mục đích, di chuyển ảnh và đổi tên
for gallery_id, gallery_data in galleries.items():
    gallery_title = gallery_data["title"]
    images = gallery_data["images"]

    # Tạo thư mục con theo tên gallery
    gallery_folder = os.path.join(destination_folder, gallery_title)
    os.makedirs(gallery_folder, exist_ok=True)

    # Di chuyển từng ảnh vào thư mục tương ứng và đổi tên
    for index, image in enumerate(images, start=1):
        source_path = os.path.join(source_folder, image)
        new_image_name = f"{gallery_title} {index}.png"  # Đổi tên ảnh
        destination_path = os.path.join(gallery_folder, new_image_name)

        # Kiểm tra nếu ảnh tồn tại trước khi di chuyển
        if os.path.exists(source_path):
            shutil.copy(source_path, destination_path)  # Sao chép ảnh
            print(f"Đã di chuyển và đổi tên: {source_path} -> {destination_path}")
        else:
            print(f"Không tìm thấy: {source_path}")

print("Hoàn thành việc di chuyển và đổi tên ảnh!")
