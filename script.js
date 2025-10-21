// Auto-generated gallery configuration
// Run 'python generate_gallery.py' to update after adding new images

const galleries = {
    digital: [
        "digital/digital00001.jpg",
        "digital/digital00002.jpg",
        "digital/digital00003.jpg",
        "digital/digital00004.jpg",
        "digital/digital00005.jpg",
        "digital/digital00006.jpg",
        "digital/digital00007.jpg",
        "digital/digital00008.jpg",
        "digital/digital00009.jpg",
        "digital/digital00010.jpg",
        "digital/digital00011.jpg",
        "digital/digital00012.jpg",
        "digital/digital00013.jpg",
        "digital/digital00014.jpg",
        "digital/digital00015.jpg",
        "digital/digital00016.jpg",
        "digital/digital00017.jpg",
        "digital/digital00018.jpg",
        "digital/digital00019.jpg",
        "digital/digital00020.jpg",
        "digital/digital00021.jpg",
        "digital/digital00022.jpg",
        "digital/digital00023.jpg",
        "digital/digital00024.jpg",
        "digital/digital00025.jpg",
        "digital/digital00026.jpg",
        "digital/digital00027.jpg",
        "digital/digital00028.jpg",
        "digital/digital00029.jpg",
        "digital/digital00030.jpg",
        "digital/digital00031.jpg",
        "digital/digital00032.jpg",
        "digital/digital00033.jpg",
        "digital/digital00034.jpg",
        "digital/digital00035.jpg",
        "digital/digital00036.jpg",
        "digital/digital00037.jpg",
        "digital/digital00038.jpg",
        "digital/digital00039.jpg",
        "digital/digital00040.jpg",
        "digital/digital00041.jpg",
        "digital/digital00042.jpg",
        "digital/digital00043.jpg",
        "digital/digital00044.jpg",
        "digital/digital00045.jpg",
        "digital/digital00046.jpg",
        "digital/digital00047.jpg",
        "digital/digital00048.jpg",
        "digital/digital00049.jpg",
        "digital/digital00050.jpg",
        "digital/digital00051.jpg",
        "digital/digital00052.jpg",
        "digital/digital00053.jpg",
        "digital/digital00054.jpg",
        "digital/digital00055.jpg",
        "digital/digital00056.jpg",
        "digital/digital00057.jpg",
        "digital/digital00058.jpg",
        "digital/digital00059.jpg",
        "digital/digital00060.jpg",
        "digital/digital00061.jpg",
        "digital/digital00062.jpg",
        "digital/digital00063.jpg",
        "digital/digital00064.jpg",
        "digital/digital00065.jpg",
        "digital/digital00066.jpg",
        "digital/digital00067.jpg",
        "digital/digital00068.jpg",
        "digital/digital00069.jpg",
        "digital/digital00070.jpg",
        "digital/digital00071.jpg",
        "digital/digital00072.jpg",
        "digital/digital00073.jpg",
        "digital/digital00074.jpg",
        "digital/digital00075.jpg",
        "digital/digital00076.jpg",
        "digital/digital00077.jpg",
        "digital/digital00078.jpg",
        "digital/digital00079.jpg",
        "digital/digital00080.jpg",
        "digital/digital00081.jpg",
        "digital/digital00082.jpg",
        "digital/digital00083.jpg",
        "digital/digital00084.jpg"
],
    analog: [
        "analog/analog00001.jpg",
        "analog/analog00002.jpg",
        "analog/analog00003.jpg",
        "analog/analog00004.jpg",
        "analog/analog00006.jpg",
        "analog/analog00007.jpg",
        "analog/analog00008.jpg",
        "analog/analog00009.jpg",
        "analog/analog00010.jpg",
        "analog/analog00011.jpg",
        "analog/analog00012.jpg",
        "analog/analog00013.jpg",
        "analog/analog00017.jpg",
        "analog/analog00021.jpg",
        "analog/analog00022.jpg",
        "analog/analog00023.jpg",
        "analog/analog00025.jpg",
        "analog/analog00026.jpg",
        "analog/analog00027.jpg",
        "analog/analog00029.jpg",
        "analog/analog00030.jpg",
        "analog/analog00032.jpg",
        "analog/analog00035.jpg",
        "analog/analog00036.jpg",
        "analog/analog00038.jpg",
        "analog/analog00040.jpg",
        "analog/analog00041.jpg",
        "analog/analog00043.jpg",
        "analog/analog00044.jpg",
        "analog/analog00045.jpg",
        "analog/analog00049.jpg",
        "analog/analog00052.jpg",
        "analog/analog00054.jpg",
        "analog/analog00055.jpg",
        "analog/analog00056.jpg",
        "analog/analog00057.jpg",
        "analog/analog00058.jpg",
        "analog/analog00059.jpg",
        "analog/analog00060.jpg",
        "analog/analog00061.jpg",
        "analog/analog00062.jpg",
        "analog/analog00063.jpg",
        "analog/analog00064.jpg",
        "analog/analog00066.jpg",
        "analog/analog00067.jpg",
        "analog/analog00070.jpg",
        "analog/analog00071.jpg",
        "analog/analog00072.jpg",
        "analog/analog00073.jpg",
        "analog/analog00074.jpg"
]
};

let currentGallery = 'digital';
let currentImageIndex = 0;
let currentImages = [];
let isFullView = false; // Default to grid view

// Initialize galleries
function initGalleries() {
    loadGallery('digital', document.getElementById('digital-gallery'));
    loadGallery('analog', document.getElementById('analog-gallery'));
    updateViewLabels();
}

// Load gallery images with orientation detection
function loadGallery(galleryName, container) {
    const images = galleries[galleryName];
    container.innerHTML = '';
    
    images.forEach((imagePath, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${galleryName} photo ${index + 1}`;
        img.loading = 'lazy';
        
        // Detect image orientation when loaded
        img.onload = function() {
            if (this.naturalHeight > this.naturalWidth) {
                item.classList.add('vertical');
            } else {
                item.classList.add('horizontal');
            }
        };
        
        item.appendChild(img);
        item.addEventListener('click', () => openLightbox(galleryName, index));
        container.appendChild(item);
    });
    
    // Observe items for scroll animation
    setTimeout(() => observeGalleryItems(), 100);
}

// Gallery navigation
document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const galleryName = btn.dataset.gallery;
        
        // Update active states
        document.querySelectorAll('.gallery-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.gallery').forEach(g => g.classList.remove('active'));
        document.getElementById(`${galleryName}-gallery`).classList.add('active');
        
        currentGallery = galleryName;
    });
});

// View toggle functionality
const viewToggle = document.getElementById('viewToggle');
const viewLabels = document.querySelectorAll('.view-label');

viewToggle.addEventListener('change', () => {
    isFullView = viewToggle.checked;
    toggleView();
    updateViewLabels();
});

function toggleView() {
    const galleries = document.querySelectorAll('.gallery');
    
    galleries.forEach(gallery => {
        if (isFullView) {
            gallery.classList.remove('grid-view');
            gallery.classList.add('full-view');
        } else {
            gallery.classList.remove('full-view');
            gallery.classList.add('grid-view');
        }
    });
    
    // Re-observe items after view change
    setTimeout(() => observeGalleryItems(), 100);
}

function updateViewLabels() {
    viewLabels.forEach((label, index) => {
        if (isFullView && index === 1) {
            label.classList.add('active');
        } else if (!isFullView && index === 0) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
const counter = document.querySelector('.image-counter');

function openLightbox(galleryName, index) {
    currentGallery = galleryName;
    currentImages = galleries[galleryName];
    currentImageIndex = index;
    
    showLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showLightboxImage() {
    lightboxImg.src = currentImages[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    showLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    showLightboxImage();
}

// Event listeners
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all gallery items after they're loaded
function observeGalleryItems() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
}

// Preloader functionality
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 1000);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set grid view as default
    isFullView = false;
    
    // Update the checkbox state
    const viewToggleElement = document.getElementById('viewToggle');
    if (viewToggleElement) {
        viewToggleElement.checked = false;
    }
    
    // Set initial view classes
    document.querySelectorAll('.gallery').forEach(gallery => {
        gallery.classList.remove('full-view');
        gallery.classList.add('grid-view');
    });
    
    // Load galleries
    initGalleries();
});
