// js/main.js

// --- Countdown Timer ---
const countdown = () => {
    // Set the date for the event
    const eventDate = new Date("Jan 13, 2026 09:00:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "The event has started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    };

    // Initial call to display timer immediately
    updateTimer();
    
    // Update the timer every second
    const interval = setInterval(updateTimer, 1000);
};
// Add to js/main.js

// --- Scroll-Triggered Animations ---
const scrollAnimation = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
};
// Add to js/main.js

// --- Mobile Navigation Toggle ---
const mobileNav = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navLinks.classList.toggle('is-active');
        
        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('is-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on nav links
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            navLinks.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('is-active');
            navLinks.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('is-active')) {
            hamburger.classList.remove('is-active');
            navLinks.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    });
};

// --- Interactive Theme Section ---
const interactiveTheme = () => {
    const themeDescription = document.getElementById('theme-description');
    const interactiveCards = document.querySelectorAll('.interactive-card');
    
    const themeContent = {
        definition: {
            title: "What is the Backfire Effect?",
            content: "The Backfire Effect is a cognitive bias where people react to disconfirming evidence by strengthening their beliefs rather than questioning them. When presented with facts that contradict their existing views, individuals may become more entrenched in their original position, essentially 'doubling down' on their beliefs."
        },
        psychology: {
            title: "The Psychology Behind It",
            content: "This phenomenon occurs because challenging our beliefs triggers cognitive dissonance - the mental discomfort of holding contradictory ideas. Our brains, wired to maintain consistency, often resolve this discomfort by rejecting new information rather than updating our worldview. It's a defense mechanism that protects our sense of identity and competence."
        },
        examples: {
            title: "Real-World Examples",
            content: "The Backfire Effect manifests in politics when voters dismiss factual corrections to false claims, in science denial where people reject climate data, and in everyday situations like refusing to acknowledge mistakes. Social media echo chambers amplify this effect, creating environments where contradictory information is filtered out or attacked."
        },
        'tedx-relevance': {
            title: "Why This Matters at TEDx",
            content: "TEDx events are about sharing 'ideas worth spreading,' but the Backfire Effect can prevent these ideas from taking root. Understanding this bias helps speakers craft more effective presentations and audiences become more receptive to challenging concepts. It's about creating a space where intellectual humility can flourish."
        },
        overcoming: {
            title: "Breaking Through the Barriers",
            content: "Overcoming the Backfire Effect requires intentional strategies: approaching disagreements with curiosity rather than judgment, finding common ground before introducing challenging ideas, using stories and emotions alongside facts, and creating safe spaces for people to change their minds without losing face."
        },
        future: {
            title: "Building Better Discourse",
            content: "By acknowledging and addressing the Backfire Effect, we can foster more productive conversations and genuine learning. This leads to better decision-making, reduced polarization, and a society more capable of tackling complex challenges through collaborative thinking rather than tribal positioning."
        }
    };

    const defaultContent = {
        title: "Explore the Backfire Effect",
        content: "Hover over or tap the cards below to discover different aspects of this fascinating cognitive bias and understand why it's our chosen theme for this TEDx event. Each perspective reveals how this psychological phenomenon shapes our daily interactions and why understanding it is crucial for meaningful dialogue."
    };

    // Set default content
    updateThemeContent(defaultContent);

    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    interactiveCards.forEach(card => {
        if (isTouchDevice) {
            // For touch devices, use click/tap
            card.addEventListener('click', () => {
                const contentKey = card.getAttribute('data-content');
                const content = themeContent[contentKey];
                
                // Remove active class from all cards
                interactiveCards.forEach(c => c.classList.remove('active'));
                
                // Toggle active class on current card
                if (card.classList.contains('active')) {
                    card.classList.remove('active');
                    updateThemeContent(defaultContent);
                } else {
                    card.classList.add('active');
                    updateThemeContent(content);
                }
            });
        } else {
            // For desktop, use hover
            card.addEventListener('mouseenter', () => {
                const contentKey = card.getAttribute('data-content');
                const content = themeContent[contentKey];
                
                // Remove active class from all cards
                interactiveCards.forEach(c => c.classList.remove('active'));
                // Add active class to current card
                card.classList.add('active');
                
                updateThemeContent(content);
            });

            card.addEventListener('mouseleave', () => {
                // Small delay to prevent flickering when moving between cards
                setTimeout(() => {
                    if (!document.querySelector('.interactive-card:hover')) {
                        card.classList.remove('active');
                        updateThemeContent(defaultContent);
                    }
                }, 100);
            });
        }

        // Add keyboard support
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');
    });

    function updateThemeContent(content) {
        themeDescription.innerHTML = `
            <div>
                <h4 style="color: var(--color-primary-accent); margin-bottom: var(--spacing-md); font-size: 1.4rem;">${content.title}</h4>
                <p>${content.content}</p>
            </div>
        `;
    }
};

// --- Enhanced Parallax Effect for About Section ---
const parallaxEffect = () => {
    const aboutSection = document.querySelector('.about-section-parallax');
    const aboutContent = document.querySelector('.about-content');
    
    if (!aboutSection || !aboutContent) return;
    
    const updateParallax = () => {
        const rect = aboutSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Only apply effect when section is in view
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
            // Calculate scroll progress through the section
            const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
            
            // Apply subtle transform to content for extra depth
            const translateY = (scrollProgress - 0.5) * 20;
            const opacity = 0.8 + (scrollProgress * 0.2);
            
            aboutContent.style.transform = `translateY(${translateY}px)`;
            aboutContent.style.opacity = opacity;
        }
    };
    
    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    updateParallax();
};

// --- Interactive Ticket Animation ---
const ticketAnimation = () => {
    const ticket = document.querySelector('.ticket');
    
    if (!ticket) return;
    
    // Add tear effect on click
    ticket.addEventListener('click', (e) => {
        // Create tear animation
        const tearLine = document.createElement('div');
        tearLine.style.cssText = `
            position: absolute;
            top: 0;
            bottom: 0;
            left: 66.6%;
            width: 2px;
            background: linear-gradient(to bottom, transparent, var(--color-primary-accent), transparent);
            opacity: 0;
            animation: tearAppear 0.3s ease forwards;
            pointer-events: none;
        `;
        
        ticket.appendChild(tearLine);
        
        // Remove tear line after animation
        setTimeout(() => {
            if (tearLine.parentNode) {
                tearLine.parentNode.removeChild(tearLine);
            }
        }, 300);
    });
    
    // Add parallax effect on mouse move
    ticket.addEventListener('mousemove', (e) => {
        const rect = ticket.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        const rotateX = deltaY * -5;
        const rotateY = deltaX * 5;
        const translateZ = Math.abs(deltaX) * 5 + Math.abs(deltaY) * 5;
        
        ticket.style.transform = `
            translateY(-10px) 
            translateZ(${translateZ}px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.02)
        `;
    });
    
    ticket.addEventListener('mouseleave', () => {
        ticket.style.transform = '';
    });
};

// Add CSS for tear effect animation
const addTearEffectStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tearAppear {
            0% {
                opacity: 0;
                transform: scaleY(0);
            }
            50% {
                opacity: 1;
                transform: scaleY(1) scaleX(3);
            }
            100% {
                opacity: 0;
                transform: scaleY(1) scaleX(1);
            }
        }
        
        .ticket:hover .perforation:nth-child(odd) {
            animation-delay: 0.1s;
        }
        
        .ticket:hover .perforation:nth-child(even) {
            animation-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);
};

// --- Elegant Loading Screen ---
const loadingScreen = () => {
    const loadingElement = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    const loadingPercentage = document.getElementById('loading-percentage');
    
    if (!loadingElement) return;
    
    // Elegant loading messages
    const messages = [
        'Preparing Experience',
        'Loading Content',
        'Finalizing Details',
        'Welcome to TEDx'
    ];
    
    let messageIndex = 0;
    let percentage = 0;
    
    // Smooth percentage counter
    const updatePercentage = () => {
        if (percentage < 100) {
            percentage += Math.random() * 3 + 1; // Random increment for natural feel
            if (percentage > 100) percentage = 100;
            
            if (loadingPercentage) {
                loadingPercentage.textContent = Math.floor(percentage) + '%';
            }
            
            setTimeout(updatePercentage, 50);
        }
    };
    
    // Start percentage counter
    setTimeout(updatePercentage, 500);
    
    // Update loading text elegantly
    const updateLoadingText = () => {
        if (loadingText && messageIndex < messages.length) {
            loadingText.innerHTML = messages[messageIndex] + '<span class="loading-dots"></span>';
            messageIndex++;
        }
    };
    
    // Change text every 800ms for a more refined pace
    const textInterval = setInterval(updateLoadingText, 800);
    
    // Add subtle entrance animation to logo lines
    const logoLines = document.querySelectorAll('.logo-line');
    logoLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
    
    // Hide loading screen after 4 seconds for a more premium feel
    setTimeout(() => {
        clearInterval(textInterval);
        
        // Final message
        if (loadingText) {
            loadingText.innerHTML = 'Welcome to TEDx<span class="loading-dots"></span>';
        }
        
        setTimeout(() => {
            loadingElement.classList.add('fade-out');
            
            // Remove from DOM after fade out
            setTimeout(() => {
                if (loadingElement.parentNode) {
                    loadingElement.parentNode.removeChild(loadingElement);
                }
            }, 1000);
        }, 500);
    }, 4000);
};

// --- Speaker Flip Cards ---
const speakerFlipCards = () => {
    const flipCards = document.querySelectorAll('.speaker-flip-card');
    const modal = document.getElementById('speaker-modal');
    const modalContent = document.getElementById('modal-speaker-content');
    const modalClose = document.querySelector('.modal-close');
    
    // Speaker data for modal display
    const speakerData = {
        1: {
            name: "Dr. Sarah Johnson",
            title: "AI Ethics Researcher & Professor",
            bio: "Dr. Johnson is a leading expert in artificial intelligence ethics and responsible AI development. She has published over 50 papers on AI safety and works with tech companies to implement ethical AI practices. Her research focuses on the intersection of technology and human values, ensuring that AI systems are designed with fairness, transparency, and accountability in mind.",
            achievements: [
                "🎓 PhD in Computer Science, MIT",
                "📚 Author of 'Ethical AI Design'",
                "🏆 AI Ethics Excellence Award 2024",
                "🔬 Lead Researcher at AI Safety Institute",
                "🌍 Advisor to UN on AI Governance"
            ],
            talkTopic: "Breaking Through AI Bias: The Backfire Effect in Machine Learning"
        },
        2: {
            name: "Mark Rodriguez",
            title: "Innovation Strategist & Entrepreneur",
            bio: "Mark is a serial entrepreneur who has founded three successful tech startups valued at over $500M combined. He specializes in helping organizations overcome innovation resistance and embrace disruptive change. His work spans across multiple industries, from fintech to healthcare innovation.",
            achievements: [
                "🚀 Founded 3 successful startups ($500M+ value)",
                "💼 Innovation Consultant for Fortune 500",
                "🌟 TEDx Speaker (5+ talks)",
                "📈 Venture Partner at Tech Ventures",
                "🏅 Entrepreneur of the Year 2023"
            ],
            talkTopic: "Innovation Immunity: Why Good Ideas Get Rejected"
        },
        3: {
            name: "Dr. Priya Sharma",
            title: "Cognitive Psychologist & Researcher",
            bio: "Dr. Sharma studies human decision-making and cognitive biases with over 15 years of research experience. Her work has been featured in Nature, Science, and Psychology Review, focusing on how people process contradictory information and the mechanisms behind belief perseverance.",
            achievements: [
                "🧠 PhD in Cognitive Psychology, Stanford",
                "📖 100+ peer-reviewed publications",
                "🔬 Lead Researcher at Brain Institute",
                "🎯 Expert in cognitive bias research",
                "📺 Featured expert on BBC, CNN"
            ],
            talkTopic: "The Mind's Defense Mechanisms: Understanding Confirmation Bias"
        },
        4: {
            name: "James Chen",
            title: "Communication Expert & Media Consultant",
            bio: "James helps leaders communicate complex ideas effectively and persuasively. He has worked with CEOs, politicians, and scientists to craft messages that resonate and create positive change. His expertise lies in bridging communication gaps and building understanding across diverse audiences.",
            achievements: [
                "🎤 International Speaking Coach",
                "📺 Media Training for 500+ executives",
                "📘 Bestselling author on communication",
                "🌐 Crisis Communication Specialist",
                "🏆 Communication Excellence Award"
            ],
            talkTopic: "Words That Heal: Communicating Across Divides"
        },
        5: {
            name: "Lisa Thompson",
            title: "Social Impact Leader & Activist",
            bio: "Lisa has dedicated her career to social justice and community building over the past 20 years. She founded multiple nonprofits that have impacted over 100,000 lives and has been recognized internationally for her work in bridging cultural and ideological divides.",
            achievements: [
                "🌍 Founded 3 successful nonprofits",
                "🏅 Social Justice Award recipient",
                "🤝 Community Bridge Builder",
                "📊 Impacted 100,000+ lives",
                "🗣️ UN Human Rights Speaker"
            ],
            talkTopic: "Building Bridges: Overcoming Social Echo Chambers"
        },
        6: {
            name: "Prof. Michael Davis",
            title: "Education Innovator & University Professor",
            bio: "Professor Davis revolutionizes education through evidence-based teaching methods at Harvard University. His work focuses on critical thinking skills and helping students navigate information in the digital age. He has transformed educational approaches in over 200 institutions worldwide.",
            achievements: [
                "🎓 Professor of Education, Harvard",
                "📚 Pioneer in critical thinking pedagogy",
                "🏆 Excellence in Teaching Award",
                "🌐 Educational consultant to 200+ institutions",
                "📖 Author of 5 educational bestsellers"
            ],
            talkTopic: "Teaching Truth: Critical Thinking in the Information Age"
        }
    };
    
    // Add click handlers for flip cards
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const speakerId = card.getAttribute('data-speaker');
            const speaker = speakerData[speakerId];
            
            if (speaker) {
                // Create modal content
                modalContent.innerHTML = `
                    <div class="modal-speaker-details">
                        <h3>${speaker.name}</h3>
                        <p class="speaker-title">${speaker.title}</p>
                        <p class="speaker-bio">${speaker.bio}</p>
                        <div class="speaker-achievements">
                            <h4 style="color: var(--color-primary-accent); margin-bottom: var(--spacing-md);">Achievements & Background</h4>
                            ${speaker.achievements.map(achievement => 
                                `<div class="achievement">${achievement}</div>`
                            ).join('')}
                        </div>
                        <div class="talk-topic">
                            <strong>Talk Topic:</strong><br>
                            "${speaker.talkTopic}"
                        </div>
                    </div>
                `;
                
                // Show modal with animation
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Add subtle hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Close modal functionality
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
};

// --- Initialize all scripts on page load ---
document.addEventListener('DOMContentLoaded', () => {
    loadingScreen();
    
    // Initialize main functions after loading screen
    setTimeout(() => {
        countdown();
        scrollAnimation();
        mobileNav();
        interactiveTheme();
        addTearEffectStyles();
        ticketAnimation();
        speakerFlipCards();
        parallaxEffect(); // Add parallax effect
    }, 4500); // Start after elegant loading screen finishes
});