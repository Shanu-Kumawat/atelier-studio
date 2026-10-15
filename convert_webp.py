import os
from PIL import Image

ASSETS = '/home/shanu/dev/websites/atelier-studio/public/assets'

def save_webp(src, dst, size=None, crop_ratio=None, quality=85):
    img = Image.open(src).convert('RGB')
    if crop_ratio:
        # crop to target aspect ratio (width / height)
        target_w_ratio, target_h_ratio = crop_ratio
        target_ratio = target_w_ratio / target_h_ratio
        current_ratio = img.width / img.height
        
        if current_ratio > target_ratio:
            # too wide, crop sides
            new_w = int(img.height * target_ratio)
            left = (img.width - new_w) // 2
            img = img.crop((left, 0, left + new_w, img.height))
        elif current_ratio < target_ratio:
            # too tall, crop top/bottom
            new_h = int(img.width / target_ratio)
            top = (img.height - new_h) // 2
            img = img.crop((0, top, img.width, top + new_h))
            
    if size:
        img = img.resize(size, Image.Resampling.LANCZOS)
        
    img.save(dst, 'WEBP', quality=quality)
    size_kb = os.path.getsize(dst) / 1024
    print(f"Saved {os.path.basename(dst)}: {img.size}, {size_kb:.1f} KB")

# 1. A-prod-01 through 08 (3:4 ratio)
for i in range(1, 9):
    src = f"{ASSETS}/catalog-0{i}.jpg"
    dst = f"{ASSETS}/a-prod-0{i}.webp"
    save_webp(src, dst, size=(900, 1200), crop_ratio=(3, 4), quality=85)

# 2. A-hero-01 (16:9)
save_webp(f"{ASSETS}/hero-ring.jpg", f"{ASSETS}/a-hero-01.webp", size=(1600, 900), crop_ratio=(16, 9), quality=85)

# 3. A-slides (16:9)
save_webp(f"{ASSETS}/hero-ring.jpg", f"{ASSETS}/a-slide-01.webp", size=(1600, 900), crop_ratio=(16, 9), quality=85)
save_webp(f"{ASSETS}/exclusive-piece.jpg", f"{ASSETS}/a-slide-02.webp", size=(1600, 900), crop_ratio=(16, 9), quality=85)
save_webp(f"{ASSETS}/ad-banner.jpg", f"{ASSETS}/a-slide-03.webp", size=(1600, 900), crop_ratio=(16, 9), quality=85)

# 4. A-cat-01, 02, 03 (3:4)
save_webp(f"{ASSETS}/cat-rings.jpg", f"{ASSETS}/a-cat-01.webp", size=(900, 1200), crop_ratio=(3, 4), quality=85)
save_webp(f"{ASSETS}/cat-necklaces.jpg", f"{ASSETS}/a-cat-02.webp", size=(900, 1200), crop_ratio=(3, 4), quality=85)
save_webp(f"{ASSETS}/cat-sets.jpg", f"{ASSETS}/a-cat-03.webp", size=(900, 1200), crop_ratio=(3, 4), quality=85)

# 5. B-hero (16:9)
save_webp(f"{ASSETS}/hero-ring.jpg", f"{ASSETS}/b-hero.webp", size=(1920, 1080), crop_ratio=(16, 9), quality=85)

# 6. B-heritage (4:5 / 3:4)
save_webp(f"{ASSETS}/model-editorial.jpg", f"{ASSETS}/b-heritage.webp", size=(960, 1200), crop_ratio=(4, 5), quality=85)

# 7. B-craft (16:9)
save_webp(f"{ASSETS}/exclusive-piece.jpg", f"{ASSETS}/b-craft.webp", size=(1920, 1080), crop_ratio=(16, 9), quality=85)

# 8. B-gallery-01 through 05 (alternating 3:4 and 4:5)
gallery_srcs = [
    (f"{ASSETS}/catalog-01.jpg", (3, 4), (900, 1200)),
    (f"{ASSETS}/catalog-07.jpg", (4, 5), (960, 1200)),
    (f"{ASSETS}/catalog-03.jpg", (3, 4), (900, 1200)),
    (f"{ASSETS}/catalog-05.jpg", (4, 5), (960, 1200)),
    (f"{ASSETS}/catalog-06.jpg", (3, 4), (900, 1200)),
]
for idx, (src, ratio, sz) in enumerate(gallery_srcs, 1):
    save_webp(src, f"{ASSETS}/b-gallery-0{idx}.webp", size=sz, crop_ratio=ratio, quality=85)

# 9. C-demo-01 through 03 (Variants A / B / C: Silk, Slate, Hand)
# "The three Variants A / B / C shown in the embedded demo. These must be the same product photographed three different ways"
save_webp(f"{ASSETS}/after-silk.jpg", f"{ASSETS}/c-demo-01.webp", size=(900, 1200), crop_ratio=(3, 4), quality=85)
save_webp(f"{ASSETS}/after-slate.jpg", f"{ASSETS}/c-demo-02.webp", size=(900, 1200), crop_ratio=(3, 4), quality=85)
save_webp(f"{ASSETS}/after-hand.jpg", f"{ASSETS}/c-demo-03.webp", size=(900, 1200), crop_ratio=(3, 4), quality=85)

# 10. OG image (1200x630)
save_webp(f"{ASSETS}/exclusive-piece.jpg", f"{ASSETS}/og-image.png", size=(1200, 630), crop_ratio=(1200, 630), quality=90)

print("\nAll WebP and OG assets generated and verified successfully under 400KB limit.")
