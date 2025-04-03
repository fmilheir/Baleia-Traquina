document.addEventListener('DOMContentLoaded', function() {
    // Handle image loading errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Set loading attribute for lazy loading
        img.setAttribute('loading', 'lazy');
        
        // Handle image loading errors
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            this.alt = 'Image could not be loaded';
        });
    });

    // Scroll behavior
    window.addEventListener('scroll', function() {
        const scrollTopButton = document.getElementById('scrollTop');
        const navbar = document.querySelector('.navbar');
        const heroHeight = document.querySelector('#hero').offsetHeight;
        if (window.scrollY > heroHeight - 100) {
            scrollTopButton.style.display = 'block';
            navbar.classList.add('shadow');
        } else {
            scrollTopButton.style.display = 'none';
            navbar.classList.remove('shadow');
        }
    });

    document.getElementById('scrollTop').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Add image zoom functionality
    const contentImages = document.querySelectorAll('.threat-img, #benefits img, .introduction-container img');
    contentImages.forEach(img => {
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
            if (this.classList.contains('zoomed')) {
                this.style.transform = 'scale(1.3)';
                this.style.zIndex = '1000';
                this.style.position = 'relative';
                this.style.transition = 'transform 0.3s ease';
            } else {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            }
        });
    });
    
    // Optimize image loading
    const loadVisibleImages = () => {
        const imageElements = document.querySelectorAll('img[loading="lazy"]');
        imageElements.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isInViewport) {
                img.loading = 'eager';
            }
        });
    };
    
    // Call on scroll
    window.addEventListener('scroll', loadVisibleImages);
    // Initial call
    loadVisibleImages();
});