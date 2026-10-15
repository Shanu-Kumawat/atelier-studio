import os
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

ASSETS_IN = '/home/shanu/dev/websites/atelier-studio/public/assets'
ASSETS_OUT = '/home/shanu/dev/websites/atelier-studio/public/assets'

def make_transparent_cutout(in_path, out_path, size=(1024, 1024)):
    img = Image.open(in_path).convert('RGB')
    w, h = img.size
    
    # Analyze background corners
    arr = np.array(img, dtype=np.float32)
    corners = np.concatenate([
        arr[:40, :40].reshape(-1, 3),
        arr[:40, -40:].reshape(-1, 3),
        arr[-40:, :40].reshape(-1, 3),
        arr[-40:, -40:].reshape(-1, 3)
    ], axis=0)
    bg_color = np.median(corners, axis=0)
    
    # Compute color distance from background
    diff = np.linalg.norm(arr - bg_color, axis=-1)
    
    # Flood-fill connectivity from (0,0), (w-1, 0), (0, h-1), (w-1, h-1)
    # to separate true background from dark shadows inside the metal
    gray = img.convert('L')
    # Threshold binary background map
    bg_thresh = 26.0
    bg_map = (diff < bg_thresh).astype(np.uint8) * 255
    bg_pil = Image.fromarray(bg_map, 'L')
    
    # Floodfill exterior background
    ext_bg = Image.new('L', (w, h), 0)
    # Draw seeds along all 4 outer edges
    draw = ImageDraw.Draw(ext_bg)
    # Any pixel on the border that is dark is background
    for x in range(0, w, 8):
        if diff[0, x] < 35:
            ImageDraw.floodfill(bg_pil, (x, 0), 128, thresh=15)
        if diff[h-1, x] < 35:
            ImageDraw.floodfill(bg_pil, (x, h-1), 128, thresh=15)
    for y in range(0, h, 8):
        if diff[y, 0] < 35:
            ImageDraw.floodfill(bg_pil, (0, y), 128, thresh=15)
        if diff[y, w-1] < 35:
            ImageDraw.floodfill(bg_pil, (w-1, y), 128, thresh=15)
            
    is_ext = np.array(bg_pil) == 128
    
    # Alpha mask: 0 where exterior background, smooth transition at edges, 1 where foreground
    # Initial alpha based on diff
    alpha = np.clip((diff - 16.0) / 18.0, 0.0, 1.0)
    # Outside exterior connected background, alpha is forced to 1.0 (so internal cavities stay solid)
    alpha[~is_ext & (diff >= 12.0)] = 1.0
    alpha[is_ext] = np.clip((diff[is_ext] - 16.0) / 18.0, 0.0, 1.0)
    
    # Smooth edges
    alpha_img = Image.fromarray((alpha * 255).astype(np.uint8), 'L')
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=0.8))
    alpha = np.array(alpha_img, dtype=np.float32) / 255.0
    
    # De-matte foreground to eliminate dark fringing on light stages
    fg = np.zeros_like(arr)
    for c in range(3):
        val = (arr[:,:,c] - (1.0 - alpha) * bg_color[c]) / np.maximum(alpha, 0.04)
        fg[:,:,c] = np.clip(val, 0, 255)
        
    rgba = np.dstack([fg, (alpha * 255).astype(np.uint8)]).astype(np.uint8)
    
    # Fit into 1:1 square canvas, centered with breathing room
    max_d = max(h, w)
    pad = int(max_d * 1.15)
    canvas = np.zeros((pad, pad, 4), dtype=np.uint8)
    yo = (pad - h) // 2
    xo = (pad - w) // 2
    canvas[yo:yo+h, xo:xo+w] = rgba
    
    cutout = Image.fromarray(canvas, 'RGBA')
    cutout = cutout.resize(size, Image.Resampling.LANCZOS)
    cutout.save(out_path, 'PNG')
    print(f"Created cutout: {out_path}")

# Generate cutouts for 8 products
for i in range(1, 9):
    inp = f"{ASSETS_IN}/catalog-0{i}.jpg"
    out = f"{ASSETS_OUT}/a-cutout-0{i}.png"
    make_transparent_cutout(inp, out)

# Generate cutouts for 4 collection items (Site B)
for i in range(1, 5):
    # Map to iconic pieces
    src_idx = [1, 3, 5, 7][i-1]
    inp = f"{ASSETS_IN}/catalog-0{src_idx}.jpg"
    out = f"{ASSETS_OUT}/b-cutout-0{i}.png"
    make_transparent_cutout(inp, out, size=(1200, 1200))

print("All cutouts successfully created.")
