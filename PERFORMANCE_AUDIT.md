# Performance Audit

This static site was slow because pages referenced original camera-size JPG files. The runtime path now uses a two-stage static image algorithm: tiny WebP previews render first, then full-quality display WebPs are decoded in the background and swapped in without changing layout.

## What Changed

- Generated full-quality display WebPs under `assets/images/web/`.
- Generated tiny preview WebPs under `assets/images/preview/`.
- Added `assets/js/progressive-images.js`, a 2.4 KB static loader that swaps previews to full-quality images after decode.
- Reduced full display WebPs to about 13 MB total, and preview images to about 1.20 MB total.
- Capped portfolio-only full images at 1280px longest side, which is appropriate for the 620px portfolio viewer even on high-density screens.
- Updated image tags with `width`, `height`, `decoding`, `loading`, and preview/full source attributes.
- Fixed case-sensitive broken blog image paths by replacing them with generated WebP paths.
- Replaced the projects background with a 3 KB preview background, then upgraded it through the same loader.
- Removed unused `portfolio-src/` React/Vite source and `.DS_Store` deployment clutter.

## Direct Initial Payload

These totals count directly referenced HTML/CSS/JS/image assets. Lazy images below the fold still wait for browser visibility rules.

| Page | Direct initial assets | Direct initial payload |
| --- | ---: | ---: |
| `about.html` | 3 | 26 KB |
| `blog/2026/260105.html` | 3 | 56 KB |
| `blog/index.html` | 1 | 20 KB |
| `blog.html` | 3 | 29 KB |
| `index.html` | 3 | 42 KB |
| `misc.html` | 1 | 20 KB |
| `portfolio.html` | 2 | 23 KB |
| `projects/aspergillus.html` | 3 | 47 KB |
| `projects/aspergillus2.html` | 11 | 146 KB |
| `projects/eeprom.html` | 9 | 84 KB |
| `projects/eeprom2.html` | 13 | 221 KB |
| `projects/research1.html` | 6 | 84 KB |
| `projects.html` | 3 | 26 KB |

## Runtime Image Totals

- Preview images: 1.20 MB total across 85 referenced images.
- Full display WebPs: 12.99 MB total across 85 referenced images.
- Portfolio loads one preview immediately, then one full-quality image for the selected random item. It does not load the whole portfolio at once.
- Project detail pages keep below-fold images lazy and only upgrade them as they approach the viewport.

## Referenced Large Images

| Original file | Original size | Original dimensions | Used in | Preview | Preview size | Full display WebP | Full size | Full dimensions | Treatment |
| --- | ---: | ---: | --- | --- | ---: | --- | ---: | ---: | --- |
| assets/images/IMG_8563.jpg | 16.40 MB | 5472x3648 | portfolio.html | assets/images/preview/IMG_8563.webp | 32 KB | assets/images/web/IMG_8563.webp | 209 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2430_3.jpg | 11.15 MB | 3648x5472 | portfolio.html | assets/images/preview/IMG_2430_3.webp | 37 KB | assets/images/web/IMG_2430_3.webp | 369 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2883.jpg | 8.48 MB | 3648x5472 | portfolio.html | assets/images/preview/IMG_2883.webp | 8 KB | assets/images/web/IMG_2883.webp | 180 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2491.jpg | 7.33 MB | 5472x3648 | portfolio.html | assets/images/preview/IMG_2491.webp | 28 KB | assets/images/web/IMG_2491.webp | 333 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_5327.jpg | 7.32 MB | 5472x3648 | portfolio.html | assets/images/preview/IMG_5327.webp | 17 KB | assets/images/web/IMG_5327.webp | 167 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_9733.jpg | 7.25 MB | 3544x5295 | portfolio.html | assets/images/preview/IMG_9733.webp | 31 KB | assets/images/web/IMG_9733.webp | 357 KB | 857x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_4665.jpg | 7.14 MB | 5233x3488 | portfolio.html | assets/images/preview/IMG_4665.webp | 29 KB | assets/images/web/IMG_4665.webp | 328 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2835.jpg | 6.76 MB | 5472x3648 | portfolio.html | assets/images/preview/IMG_2835.webp | 5 KB | assets/images/web/IMG_2835.webp | 143 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2777.jpg | 6.34 MB | 5472x3648 | portfolio.html | assets/images/preview/IMG_2777.webp | 10 KB | assets/images/web/IMG_2777.webp | 72 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_6687.jpg | 5.99 MB | 3648x5472 | portfolio.html | assets/images/preview/IMG_6687.webp | 6 KB | assets/images/web/IMG_6687.webp | 43 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_4634.jpg | 5.52 MB | 5472x3648 | portfolio.html | assets/images/preview/IMG_4634.webp | 25 KB | assets/images/web/IMG_4634.webp | 255 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2821.jpg | 5.49 MB | 3648x5472 | portfolio.html | assets/images/preview/IMG_2821.webp | 21 KB | assets/images/web/IMG_2821.webp | 167 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_5526.jpg | 5.25 MB | 3648x5472 | portfolio.html | assets/images/preview/IMG_5526.webp | 11 KB | assets/images/web/IMG_5526.webp | 152 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2182.jpg | 4.78 MB | 3648x5472 | portfolio.html | assets/images/preview/IMG_2182.webp | 27 KB | assets/images/web/IMG_2182.webp | 227 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2708_2.jpg | 4.75 MB | 3648x5472 | portfolio.html | assets/images/preview/IMG_2708_2.webp | 10 KB | assets/images/web/IMG_2708_2.webp | 78 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_7317.jpg | 4.42 MB | 3648x5472 | portfolio.html | assets/images/preview/IMG_7317.webp | 11 KB | assets/images/web/IMG_7317.webp | 127 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_5673.jpg | 4.09 MB | 5472x3648 | portfolio.html | assets/images/preview/IMG_5673.webp | 21 KB | assets/images/web/IMG_5673.webp | 172 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_6604.jpg | 4.03 MB | 4032x3024 | projects/aspergillus2.html, projects/eeprom2.html, projects/research1.html | assets/images/preview/ISS/IMG_6604.webp | 23 KB | assets/images/web/ISS/IMG_6604.webp | 350 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_3441_3.jpg | 3.94 MB | 3509x4745 | portfolio.html | assets/images/preview/IMG_3441_3.webp | 16 KB | assets/images/web/IMG_3441_3.webp | 180 KB | 947x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_3362.jpg | 3.88 MB | 3958x2306 | projects/aspergillus.html | assets/images/preview/ISS/IMG_3362.webp | 24 KB | assets/images/web/ISS/IMG_3362.webp | 434 KB | 1600x932 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_6603.jpg | 3.85 MB | 4032x3024 | projects/aspergillus2.html, projects/eeprom2.html, projects/research1.html | assets/images/preview/ISS/IMG_6603.webp | 23 KB | assets/images/web/ISS/IMG_6603.webp | 363 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_4814.jpg | 3.71 MB | 3566x4845 | portfolio.html | assets/images/preview/IMG_4814.webp | 22 KB | assets/images/web/IMG_4814.webp | 153 KB | 942x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_1354.jpg | 3.67 MB | 4032x3024 | portfolio.html | assets/images/preview/IMG_1354.webp | 12 KB | assets/images/web/IMG_1354.webp | 181 KB | 1280x960 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_5074.jpg | 3.52 MB | 3648x5472 | portfolio.html | assets/images/preview/IMG_5074.webp | 7 KB | assets/images/web/IMG_5074.webp | 70 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_5647.jpg | 3.50 MB | 5472x3648 | portfolio.html | assets/images/preview/IMG_5647.webp | 9 KB | assets/images/web/IMG_5647.webp | 76 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_4196.jpg | 3.46 MB | 5280x3648 | blog.html | assets/images/preview/IMG_4196.webp | 7 KB | assets/images/web/IMG_4196.webp | 26 KB | 720x497 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_1133.jpg | 3.10 MB | 4032x3024 | about.html | assets/images/preview/IMG_1133.webp | 3 KB | assets/images/web/IMG_1133.webp | 34 KB | 1200x900 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_3549.jpg | 3.00 MB | 3189x5203 | portfolio.html | assets/images/preview/IMG_3549.webp | 15 KB | assets/images/web/IMG_3549.webp | 124 KB | 785x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_0102.jpg | 2.92 MB | 3024x4032 | portfolio.html | assets/images/preview/IMG_0102.webp | 17 KB | assets/images/web/IMG_0102.webp | 177 KB | 960x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_1333_2.jpg | 2.90 MB | 3024x4032 | portfolio.html | assets/images/preview/IMG_1333_2.webp | 11 KB | assets/images/web/IMG_1333_2.webp | 163 KB | 960x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_2404.jpg | 2.83 MB | 4032x3024 | projects/eeprom2.html | assets/images/preview/ISS/IMG_2404.webp | 18 KB | assets/images/web/ISS/IMG_2404.webp | 270 KB | 1600x1200 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_0811_2.jpg | 2.79 MB | 3024x4032 | portfolio.html | assets/images/preview/IMG_0811_2.webp | 9 KB | assets/images/web/IMG_0811_2.webp | 161 KB | 960x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_5685.jpg | 2.69 MB | 5472x3648 | portfolio.html | assets/images/preview/IMG_5685.webp | 3 KB | assets/images/web/IMG_5685.webp | 27 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_2904.jpg | 2.54 MB | 4032x3024 | projects/aspergillus2.html | assets/images/preview/ISS/IMG_2904.webp | 9 KB | assets/images/web/ISS/IMG_2904.webp | 192 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_9534.jpg | 2.53 MB | 3024x4032 | portfolio.html | assets/images/preview/IMG_9534.webp | 15 KB | assets/images/web/IMG_9534.webp | 146 KB | 960x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_6854.jpg | 2.35 MB | 4032x3024 | projects/research1.html | assets/images/preview/ISS/IMG_6854.webp | 7 KB | assets/images/web/ISS/IMG_6854.webp | 131 KB | 1600x1200 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2365_3.jpg | 2.34 MB | 5300x3533 | portfolio.html | assets/images/preview/IMG_2365_3.webp | 6 KB | assets/images/web/IMG_2365_3.webp | 52 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_2296.jpg | 2.32 MB | 4032x3024 | projects/eeprom2.html | assets/images/preview/ISS/IMG_2296.webp | 10 KB | assets/images/web/ISS/IMG_2296.webp | 136 KB | 1600x1200 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_3087_2.jpg | 2.29 MB | 4032x3024 | projects/aspergillus2.html | assets/images/preview/ISS/IMG_3087_2.webp | 13 KB | assets/images/web/ISS/IMG_3087_2.webp | 157 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_4657.jpg | 2.22 MB | 2835x3648 | portfolio.html | assets/images/preview/IMG_4657.webp | 11 KB | assets/images/web/IMG_4657.webp | 110 KB | 995x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_3917_5.jpg | 2.13 MB | 3418x5039 | portfolio.html | assets/images/preview/IMG_3917_5.webp | 2 KB | assets/images/web/IMG_3917_5.webp | 23 KB | 868x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_3089.jpg | 2.08 MB | 4032x3024 | projects/aspergillus2.html | assets/images/preview/ISS/IMG_3089.webp | 13 KB | assets/images/web/ISS/IMG_3089.webp | 137 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2161_4.jpg | 2.06 MB | 3227x4757 | portfolio.html | assets/images/preview/IMG_2161_4.webp | 13 KB | assets/images/web/IMG_2161_4.webp | 73 KB | 868x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_2405.jpg | 2.04 MB | 3088x2316 | projects/eeprom2.html | assets/images/preview/ISS/IMG_2405.webp | 19 KB | assets/images/web/ISS/IMG_2405.webp | 280 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_2423.jpg | 1.92 MB | 3024x4032 | projects/eeprom2.html | assets/images/preview/ISS/IMG_2423.webp | 17 KB | assets/images/web/ISS/IMG_2423.webp | 152 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_3363_2.jpg | 1.92 MB | 4032x3024 | projects/aspergillus2.html | assets/images/preview/ISS/IMG_3363_2.webp | 15 KB | assets/images/web/ISS/IMG_3363_2.webp | 153 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_6086.jpg | 1.66 MB | 4032x3024 | projects/aspergillus2.html | assets/images/preview/ISS/IMG_6086.webp | 10 KB | assets/images/web/ISS/IMG_6086.webp | 117 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_9071.jpg | 1.63 MB | 1443x2256 | portfolio.html | assets/images/preview/IMG_9071.webp | 29 KB | assets/images/web/IMG_9071.webp | 292 KB | 819x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_3332.jpg | 1.55 MB | 4032x3024 | projects/aspergillus2.html | assets/images/preview/ISS/IMG_3332.webp | 8 KB | assets/images/web/ISS/IMG_3332.webp | 89 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_1775.jpg | 1.49 MB | 1600x2400 | portfolio.html | assets/images/preview/IMG_1775.webp | 23 KB | assets/images/web/IMG_1775.webp | 225 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_0001.jpg | 1.47 MB | 1620x1080 | blog/2026/260105.html, portfolio.html | assets/images/preview/IMG_0001.webp | 33 KB | assets/images/web/IMG_0001.webp | 392 KB | 1600x1067 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_0068.jpg | 1.47 MB | 1620x1080 | portfolio.html | assets/images/preview/IMG_0068.webp | 33 KB | assets/images/web/IMG_0068.webp | 338 KB | 1280x853 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2542_2.jpg | 1.47 MB | 3024x4032 | portfolio.html | assets/images/preview/IMG_2542_2.webp | 8 KB | assets/images/web/IMG_2542_2.webp | 60 KB | 960x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_2115.jpg | 1.36 MB | 2696x2022 | index.html | assets/images/preview/IMG_2115.webp | 19 KB | assets/images/web/IMG_2115.webp | 164 KB | 1200x900 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_0002.jpg | 1.16 MB | 1080x1620 | portfolio.html | assets/images/preview/IMG_0002.webp | 16 KB | assets/images/web/IMG_0002.webp | 187 KB | 853x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_0036.jpg | 1.13 MB | 1536x2048 | projects/eeprom2.html | assets/images/preview/ISS/IMG_0036.webp | 18 KB | assets/images/web/ISS/IMG_0036.webp | 277 KB | 1200x1600 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_9912_3.jpg | 1.12 MB | 3499x5159 | portfolio.html | assets/images/preview/IMG_9912_3.webp | 3 KB | assets/images/web/IMG_9912_3.webp | 22 KB | 868x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/IMG_6240.jpg | 1.03 MB | 1499x2335 | portfolio.html | assets/images/preview/IMG_6240.webp | 21 KB | assets/images/web/IMG_6240.webp | 161 KB | 822x1280 | Preview-first, decoded full-quality swap; dimensions reserved. |
| assets/images/ISS/IMG_2735.jpg | 1.02 MB | 2048x1536 | projects/eeprom2.html | assets/images/preview/ISS/IMG_2735.webp | 20 KB | assets/images/web/ISS/IMG_2735.webp | 199 KB | 1600x1200 | Preview-first, decoded full-quality swap; dimensions reserved. |

## Heavy Assets Still Kept

The original images and videos still exist under `assets/images/` as source/archive files, but the pages no longer load them. For the fastest deploys on GitHub Pages and Tencent EdgeOne Pages, move unused originals/videos out of the deploy branch or into a separate archive repository after you confirm they are not needed as public content.

## Future Image Rule

For each new photo, keep an optional original outside the runtime path, create a preview WebP around 480px longest side, and create a full display WebP around 1280px for portfolio images or 1600px for project/article images. Point HTML at the preview with `data-full-src` for the display version.
