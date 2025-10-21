import os
import json

def get_image_files(directory):
    """Get all image files from a directory"""
    valid_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG'}
    images = []
    
    if os.path.exists(directory):
        for filename in sorted(os.listdir(directory)):
            if any(filename.endswith(ext) for ext in valid_extensions):
                # Store only the relative path from the HTML file's perspective
                folder_name = os.path.basename(directory)
                images.append(f"{folder_name}/{filename}")
    
    return images

def generate_js_file():
    """Generate the complete JavaScript file with image arrays"""
    
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Build full paths to the image directories relative to the script location
    digital_dir = os.path.join(script_dir, 'digital')
    analog_dir = os.path.join(script_dir, 'analog')
    
    # Get images from both folders
    digital_images = get_image_files(digital_dir)
    analog_images = get_image_files(analog_dir)
    
    # Create complete JavaScript content
    js_content = f"""// Auto-generated gallery configuration
// Run 'python generate_gallery.py' to update after adding new images

const galleries = {{
    digital: {json.dumps(digital_images, indent=8)},
    analog: {json.dumps(analog_images, indent=8)}
}};

let currentGallery = 'digital';
let currentImageIndex = 0;
let currentImages = [];
let isFullView = false; // Default to grid view

// Initialize galleries
function initGalleries() {{
    loadGallery('digital', document.getElementById('digital-gallery'));
    loadGallery('analog', document.getElementById('analog-gallery'));
    updateViewLabels();
}}

// Load gallery images with orientation detection
function loadGallery(galleryName, container) {{
    const images = galleries[galleryName];
    container.innerHTML = '';
    
    images.forEach((imagePath, index) => {{
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${{galleryName}} photo ${{index + 1}}`;
        img.loading = 'lazy';
        
        // Detect image orientation when loaded
        img.onload = function() {{
            if (this.naturalHeight > this.naturalWidth) {{
                item.classList.add('vertical');
            }} else {{
                item.classList.add('horizontal');
            }}
        }};
        
        item.appendChild(img);
        item.addEventListener('click', () => openLightbox(galleryName, index));
        container.appendChild(item);
    }});
    
    // Observe items for scroll animation
    setTimeout(() => observeGalleryItems(), 100);
}}

// Gallery navigation
document.querySelectorAll('.gallery-btn').forEach(btn => {{
    btn.addEventListener('click', () => {{
        const galleryName = btn.dataset.gallery;
        
        // Update active states
        document.querySelectorAll('.gallery-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.gallery').forEach(g => g.classList.remove('active'));
        document.getElementById(`${{galleryName}}-gallery`).classList.add('active');
        
        currentGallery = galleryName;
    }});
}});

// View toggle functionality
const viewToggle = document.getElementById('viewToggle');
const viewLabels = document.querySelectorAll('.view-label');

viewToggle.addEventListener('change', () => {{
    isFullView = viewToggle.checked;
    toggleView();
    updateViewLabels();
}});

function toggleView() {{
    const galleries = document.querySelectorAll('.gallery');
    
    galleries.forEach(gallery => {{
        if (isFullView) {{
            gallery.classList.remove('grid-view');
            gallery.classList.add('full-view');
        }} else {{
            gallery.classList.remove('full-view');
            gallery.classList.add('grid-view');
        }}
    }});
    
    // Re-observe items after view change
    setTimeout(() => observeGalleryItems(), 100);
}}

function updateViewLabels() {{
    viewLabels.forEach((label, index) => {{
        if (isFullView && index === 1) {{
            label.classList.add('active');
        }} else if (!isFullView && index === 0) {{
            label.classList.add('active');
        }} else {{
            label.classList.remove('active');
        }}
    }});
}}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
const counter = document.querySelector('.image-counter');

function openLightbox(galleryName, index) {{
    currentGallery = galleryName;
    currentImages = galleries[galleryName];
    currentImageIndex = index;
    
    showLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}}

function closeLightbox() {{
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}}

function showLightboxImage() {{
    lightboxImg.src = currentImages[currentImageIndex];
    counter.textContent = `${{currentImageIndex + 1}} / ${{currentImages.length}}`;
}}

function nextImage() {{
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    showLightboxImage();
}}

function prevImage() {{
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    showLightboxImage();
}}

// Event listeners
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {{
    if (e.target === lightbox) {{
        closeLightbox();
    }}
}});

// Keyboard navigation
document.addEventListener('keydown', (e) => {{
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
}});

// Scroll reveal animation
const observerOptions = {{
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
}};

const observer = new IntersectionObserver((entries) => {{
    entries.forEach(entry => {{
        if (entry.isIntersecting) {{
            entry.target.classList.add('visible');
        }}
    }});
}}, observerOptions);

// Observe all gallery items after they're loaded
function observeGalleryItems() {{
    document.querySelectorAll('.gallery-item').forEach(item => {{
        observer.observe(item);
    }});
}}

// Preloader functionality
window.addEventListener('load', () => {{
    setTimeout(() => {{
        const preloader = document.querySelector('.preloader');
        if (preloader) {{
            preloader.classList.add('hidden');
        }}
    }}, 1000);
}});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {{
    // Set grid view as default
    isFullView = false;
    
    // Update the checkbox state
    const viewToggleElement = document.getElementById('viewToggle');
    if (viewToggleElement) {{
        viewToggleElement.checked = false;
    }}
    
    // Set initial view classes
    document.querySelectorAll('.gallery').forEach(gallery => {{
        gallery.classList.remove('full-view');
        gallery.classList.add('grid-view');
    }});
    
    // Load galleries
    initGalleries();
}});
"""
    
    # Write to script.js in the same directory as this script
    output_file = os.path.join(script_dir, 'script.js')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("=" * 60)
    print("✓ Generated script.js successfully!")
    print("=" * 60)
    print(f"  📁 Digital images: {len(digital_images)}")
    print(f"  📁 Analog images:  {len(analog_images)}")
    print(f"  📊 Total images:   {len(digital_images) + len(analog_images)}")
    print("=" * 60)
    
    if len(digital_images) == 0:
        print(f"\n⚠️  Warning: No images found in '{digital_dir}'")
    if len(analog_images) == 0:
        print(f"⚠️  Warning: No images found in '{analog_dir}'")
    
    if len(digital_images) > 0 or len(analog_images) > 0:
        print("\n✅ Ready to deploy!")
        print("   Next steps:")
        print("   1. Review the generated script.js")
        print("   2. Test locally in your browser")
        print("   3. Commit and push to GitHub Pages")
        print("=" * 60)

if __name__ == "__main__":
    generate_js_file()
