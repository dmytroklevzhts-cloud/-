import os
from PIL import Image

BASE_DIR = r"e:\Коледж\Сайт"
IMG_DIR = os.path.join(BASE_DIR, "img")

stats = []

def process_image(src_rel_path, target_rel_path_webp=None, max_dim=None, quality=84, in_place_fallback=True):
    src_path = os.path.join(BASE_DIR, src_rel_path)
    if not os.path.exists(src_path):
        print(f"File not found: {src_rel_path}")
        return

    orig_size_bytes = os.path.getsize(src_path)
    with Image.open(src_path) as im:
        orig_w, orig_h = im.size
        orig_mode = im.mode

        new_w, new_h = orig_w, orig_h
        if max_dim and max(orig_w, orig_h) > max_dim:
            scale = max_dim / max(orig_w, orig_h)
            new_w = int(round(orig_w * scale))
            new_h = int(round(orig_h * scale))

        if (new_w, new_h) != (orig_w, orig_h):
            im_resized = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        else:
            im_resized = im.copy()

    # 1. Save WebP version if requested
    webp_size_bytes = None
    if target_rel_path_webp:
        webp_path = os.path.join(BASE_DIR, target_rel_path_webp)
        os.makedirs(os.path.dirname(webp_path), exist_ok=True)
        
        save_im = im_resized
        if save_im.mode in ('RGBA', 'LA') or (save_im.mode == 'P' and 'transparency' in save_im.info):
            save_im.save(webp_path, "WEBP", quality=quality, method=6)
        else:
            save_im.convert("RGB").save(webp_path, "WEBP", quality=quality, method=6)
        webp_size_bytes = os.path.getsize(webp_path)

    # 2. Optimize original in-place if requested
    new_orig_size_bytes = orig_size_bytes
    if in_place_fallback:
        ext = os.path.splitext(src_path)[1].lower()
        if ext in ('.jpg', '.jpeg'):
            im_resized.convert("RGB").save(src_path, "JPEG", quality=quality, optimize=True, progressive=True)
            new_orig_size_bytes = os.path.getsize(src_path)
        elif ext == '.png':
            # For photos saved as PNG (e.g., practice/6.png or Teacher/2.png)
            if im_resized.mode in ('RGBA', 'LA'):
                im_resized.save(src_path, "PNG", optimize=True)
            else:
                im_resized.convert("RGB").save(src_path, "PNG", optimize=True)
            new_orig_size_bytes = os.path.getsize(src_path)

    stats.append({
        "src": src_rel_path,
        "orig_dim": f"{orig_w}x{orig_h}",
        "new_dim": f"{new_w}x{new_h}",
        "orig_kb": orig_size_bytes / 1024,
        "webp_path": target_rel_path_webp,
        "webp_kb": (webp_size_bytes / 1024) if webp_size_bytes else None,
        "fallback_kb": new_orig_size_bytes / 1024,
    })

print("Optimizing images...")

# 1. College hero image (max 1600px width for crystal-clear retina)
process_image(r"img\Коледж.jpg", r"img\Коледж.webp", max_dim=1600, quality=85)

# 2. Teacher portraits (960x1284 px, perfect 2x/3x retina for 450px container)
for i in range(1, 11):
    process_image(rf"img\Teacher\{i}.jpg", rf"img\Teacher\{i}.webp", max_dim=1280, quality=84)

# 3. Practice items (max 1440px)
for i in range(1, 10):
    if i == 6:
        process_image(r"img\practice\6.png", r"img\practice\6.webp", max_dim=1440, quality=84)
    else:
        process_image(rf"img\practice\{i}.jpg", rf"img\practice\{i}.webp", max_dim=1440, quality=84)

# 4. Hero 3D illustrations (keep resolution, convert to WebP with transparency)
process_image(r"img\hero_design_illustration.png", r"img\hero_design_illustration.webp", max_dim=None, quality=88, in_place_fallback=True)
process_image(r"img\hero_software_illustration.png", r"img\hero_software_illustration.webp", max_dim=None, quality=88, in_place_fallback=True)

# 5. Figma mockups (convert to WebP to reduce 14 MB mockups to ~1.5 MB)
for i in range(1, 7):
    process_image(rf"img\Figma\{i}.png", rf"img\Figma\{i}.webp", max_dim=1920, quality=84, in_place_fallback=False)

# 6. Legacy Teacher PNGs (optimize so 2.png is not 16.3 MB)
for i in range(1, 11):
    png_rel = rf"img\Teacher\{i}.png"
    if os.path.exists(os.path.join(BASE_DIR, png_rel)):
        process_image(png_rel, None, max_dim=1280, quality=84, in_place_fallback=True)

print("\nFinished optimization! Summary:")
print(f"{'Source':<32} | {'Orig Dim':<10} -> {'New Dim':<10} | {'Orig KB':<8} -> {'WebP KB':<8} | {'Fallback KB':<11} | {'WebP Saved %'}")
print("-" * 95)
total_orig = 0
total_webp = 0
for s in stats:
    orig = s["orig_kb"]
    webp = s["webp_kb"] if s["webp_kb"] is not None else s["fallback_kb"]
    total_orig += orig
    total_webp += webp
    webp_str = f"{s['webp_kb']:6.1f}KB" if s["webp_kb"] is not None else "  N/A   "
    fb_str = f"{s['fallback_kb']:6.1f}KB"
    saved = (1 - webp / orig) * 100
    print(f"{s['src']:<32} | {s['orig_dim']:<10} -> {s['new_dim']:<10} | {orig:6.1f}KB -> {webp_str} | {fb_str:11} | {saved:5.1f}%")

print("-" * 95)
print(f"Total: {total_orig/1024:.2f} MB -> {total_webp/1024:.2f} MB ({((1 - total_webp/total_orig)*100):.1f}% total reduction)")

