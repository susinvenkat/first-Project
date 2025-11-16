This project includes a helper script to download remote images referenced in HTML and optionally convert them to WebP for better performance.

How to use (Windows PowerShell):

1. Open PowerShell in the project root (e.g., `c:\Users\mecve\Desktop\first Project`).
2. Allow script execution for the session:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

3. Run the script:

```powershell
.\scripts\download_and_convert_images.ps1
```

4. Optional: To convert images to WebP automatically the script uses ImageMagick (`magick`). Install ImageMagick and ensure `magick` is available in PATH, then re-run the script.

Notes:
- The script downloads the remote images into `assets/img/products/`, `assets/img/industries/`, and `assets/img/contact/`.
- HTML pages (`products-actuators-gearboxes.html`, `industries-served.html`, `contact.html`) have been updated to reference local files under `assets/img/...` and include `<picture>` with WebP fallback sources.
- If any downloads fail due to remote server SSL issues, try visiting the remote URLs in a browser and re-run the script, or manually place the images into the appropriate `assets/img/` folders.
