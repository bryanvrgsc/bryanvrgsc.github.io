/**
 * Download Images Script
 * Downloads images from URLs and saves them as WebP in public/img/[section]
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public/img');

// Image mappings: { filename: url, destination_folder }
const IMAGES = {
    // Home section
    home: [
        { name: 'mission_team.webp', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop' },
        { name: 'future_vision.webp', url: 'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?q=80&w=1200&auto=format&fit=crop' },
    ],

    // Portfolio - GymApp
    'portfolio/gymapp': [
        { name: 'cover.webp', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_1.webp', url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_2.webp', url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_3.webp', url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1200&auto=format&fit=crop' },
    ],

    // Portfolio - Data Warehouse
    'portfolio/datawarehouse': [
        { name: 'cover.webp', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_1.webp', url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop' },
    ],

    // Portfolio - C Animation
    'portfolio/c_animation': [
        { name: 'cover.webp', url: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_1.webp', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_2.webp', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop' },
    ],

    // Portfolio - iOS Store
    'portfolio/ios_store': [
        { name: 'cover.webp', url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop' },
    ],

    // Portfolio - Appointment App
    'portfolio/appointment_app': [
        { name: 'cover.webp', url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_1.webp', url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_2.webp', url: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=1200&auto=format&fit=crop' },
    ],

    // Portfolio - Predictive Analysis
    'portfolio/predictive_analysis': [
        { name: 'cover.webp', url: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_1.webp', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop' },
        { name: 'screenshot_2.webp', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop' },
    ],
};

function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        const request = (urlToFetch) => {
            protocol.get(urlToFetch, (response) => {
                // Handle redirect
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    console.log(`  ↪ Redirecting to: ${response.headers.location.substring(0, 50)}...`);
                    request(response.headers.location);
                    return;
                }

                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download: ${response.statusCode}`));
                    return;
                }

                const fileStream = fs.createWriteStream(destPath);
                response.pipe(fileStream);

                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(destPath);
                });

                fileStream.on('error', reject);
            }).on('error', reject);
        };

        request(url);
    });
}

async function main() {
    console.log('🖼️  Starting image download...\n');

    let downloaded = 0;
    let failed = 0;

    for (const [folder, images] of Object.entries(IMAGES)) {
        const destDir = path.join(PUBLIC_DIR, folder);

        // Ensure directory exists
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        console.log(`📁 ${folder}/`);

        for (const img of images) {
            const destPath = path.join(destDir, img.name);

            // Skip if file already exists
            if (fs.existsSync(destPath)) {
                console.log(`   ✓ ${img.name} (already exists)`);
                downloaded++;
                continue;
            }

            try {
                console.log(`   ↓ Downloading ${img.name}...`);
                await downloadImage(img.url, destPath);
                console.log(`   ✓ ${img.name} saved`);
                downloaded++;
            } catch (err) {
                console.log(`   ✗ ${img.name} failed: ${err.message}`);
                failed++;
            }
        }

        console.log('');
    }

    console.log(`\n✅ Done! Downloaded: ${downloaded}, Failed: ${failed}`);
}

main().catch(console.error);
