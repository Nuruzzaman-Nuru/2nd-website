// Function to set the theme and update UI
function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update all theme buttons
    document.querySelectorAll('#switchTheme').forEach(btn => {
        btn.innerHTML = theme === 'dark' 
            ? '<i class="bi bi-sun-fill"></i>' 
            : '<i class="bi bi-moon-stars-fill"></i>';
    });
}

// Initialize theme from localStorage, default to dark if not set
let currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

// Add event listeners to all theme toggle buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#switchTheme').forEach(btn => {
        btn.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(currentTheme);
        });
    });
    // Initialize Bootstrap ScrollSpy with offset matching header height
    try {
        var rootStyles = getComputedStyle(document.documentElement);
        var headerHeight = parseInt(rootStyles.getPropertyValue('--header-height')) || 76;
        if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
            // Dispose any existing ScrollSpy on body to avoid duplicates
            if (document.body._bs_scrollspy) {
                document.body._bs_scrollspy.dispose && document.body._bs_scrollspy.dispose();
            }
            var spy = new bootstrap.ScrollSpy(document.body, { target: '#navbar', offset: headerHeight + 8 });
            // store reference for potential disposal
            document.body._bs_scrollspy = spy;
        }
    } catch (e) {
        // fail silently if bootstrap not available yet
        console.warn('ScrollSpy init skipped:', e);
    }
});

//AOS Initiliaze
AOS.init();

// Fixed Header & back to top button on Scroll
window.addEventListener('scroll', () => {
    // Update scroll progress bar
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgressBar.style.width = scrolled + '%';
    }
    
    // Only handle back-to-top visibility here. Header is fixed by default.
    const backToTopButton = document.getElementById("backToTopButton");
    if (!backToTopButton) return;
    if (window.scrollY > 400) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});


//jumping to top function
function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Testimonial Slider
$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:3,
        nav:true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1170:{
                items:3,
            }
        }
    });
});
