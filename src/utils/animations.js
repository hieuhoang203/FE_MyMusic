// Modern Animation Utilities for Enhanced UI

/**
 * Intersection Observer for lazy loading animations
 */
export const createIntersectionObserver = (callback, options = {}) => {
    const defaultOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observerOptions = { ...defaultOptions, ...options };

    return new IntersectionObserver(callback, observerOptions);
};

/**
 * Initialize fade-in animations on scroll
 */
export const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.fade-in-observer, .slide-in-left-observer, .slide-in-right-observer, .scale-in-observer');
    
    if (animatedElements.length === 0) return;

    const observer = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
};

/**
 * Add stagger animation delays to elements
 */
export const addStaggerAnimation = (elements, baseDelay = 100) => {
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * baseDelay}ms`;
    });
};

/**
 * Ripple effect for buttons
 */
export const createRippleEffect = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    // Remove existing ripples
    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
};

/**
 * Initialize ripple effects on buttons
 */
export const initRippleEffects = () => {
    const buttons = document.querySelectorAll('.modern-btn, .icon-btn, td.button');
    
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
};

/**
 * Smooth scroll to element
 */
export const smoothScrollTo = (element, offset = 0) => {
    const targetPosition = element.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
};

/**
 * Animate number counting
 */
export const animateNumber = (element, start, end, duration = 2000) => {
    const startTime = performance.now();
    const difference = end - start;

    const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (difference * easeOut));
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
};

/**
 * Initialize number animations
 */
export const initNumberAnimations = () => {
    const numberElements = document.querySelectorAll('[data-animate-number]');
    
    const observer = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const endValue = parseInt(element.dataset.animateNumber) || parseInt(element.textContent);
                animateNumber(element, 0, endValue);
                observer.unobserve(element);
            }
        });
    });

    numberElements.forEach(element => {
        observer.observe(element);
    });
};

/**
 * Parallax scrolling effect
 */
export const initParallaxEffect = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    const handleScroll = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * (element.dataset.parallax || 0.5);
            element.style.transform = `translateY(${rate}px)`;
        });
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
};

/**
 * Loading animation for tables
 */
export const showTableLoading = (tableElement) => {
    const tbody = tableElement.querySelector('tbody');
    const loadingRow = document.createElement('tr');
    loadingRow.className = 'loading-row';
    loadingRow.innerHTML = `
        <td colspan="100%" style="text-align: center; padding: 2rem;">
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        </td>
    `;
    
    tbody.innerHTML = '';
    tbody.appendChild(loadingRow);
};

/**
 * Hide table loading
 */
export const hideTableLoading = (tableElement) => {
    const loadingRow = tableElement.querySelector('.loading-row');
    if (loadingRow) {
        loadingRow.remove();
    }
};

/**
 * Initialize all animations
 */
export const initAllAnimations = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initScrollAnimations();
            initRippleEffects();
            initNumberAnimations();
            initParallaxEffect();
        });
    } else {
        initScrollAnimations();
        initRippleEffects();
        initNumberAnimations();
        initParallaxEffect();
    }
};

/**
 * Debounce function for performance
 */
export const debounce = (func, wait, immediate) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
};

/**
 * Throttle function for performance
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Conditional animation based on user preference
 */
export const conditionalAnimate = (element, animationClass) => {
    if (!prefersReducedMotion()) {
        element.classList.add(animationClass);
    }
};

// Auto-initialize animations
initAllAnimations();
