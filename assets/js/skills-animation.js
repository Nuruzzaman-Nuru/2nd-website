document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    let animated = false;

    function animateProgressBars() {
        if (!animated) {
            progressBars.forEach(progress => {
                const value = progress.getAttribute('data-value');
                progress.style.width = '0%';
                setTimeout(() => {
                    progress.style.transition = 'width 1.5s ease-in-out';
                    progress.style.width = value + '%';
                }, 100);
            });
            animated = true;
        }
    }

    // Trigger animation when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    }, { threshold: 0.1 });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});
