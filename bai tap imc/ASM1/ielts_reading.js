// COMPLETELY FIXED IELTS Reading Practice JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 IELTS Reading Practice - Script loaded successfully!');
    
    // Initialize variables
    const loader = document.getElementById('loader');
    const header = document.getElementById('mainHeader');
    const fab = document.getElementById('fab');
    const themeToggle = document.getElementById('toggleTheme');
    const themeIcon = themeToggle.querySelector('i');
    
    // Page elements
    const homeSection = document.getElementById('home');
    const infoSection = document.getElementById('info');
    const allPageSections = document.querySelectorAll('.page-section');
    
    // Reading practice variables
    let timeLeft = 60 * 60; // 60 minutes in seconds
    let timerInterval = null;

    // Hide loader after 1 second
    setTimeout(() => {
        if (loader) loader.classList.remove('active');
    }, 1000);

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide FAB
        if (window.scrollY > 500) {
            fab.style.display = 'flex';
        } else {
            fab.style.display = 'none';
        }
    });

    // FAB click handler
    fab.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });

    // ========== NAVIGATION FUNCTIONS ==========
    function showHome() {
        console.log('Showing home page');
        
        // Show home sections
        homeSection.style.display = 'flex';
        infoSection.style.display = 'block';
        
        // Hide all page sections
        allPageSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Stop timer if running
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showSection(sectionId) {
        console.log('Showing section:', sectionId);
        
        // Hide home sections
        homeSection.style.display = 'none';
        infoSection.style.display = 'none';
        
        // Hide all page sections
        allPageSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Start timer if it's the reading practice page
            if (sectionId === 'readingPracticePage') {
                console.log('Starting reading practice session');
                setTimeout(() => {
                    startReadingTimer();
                }, 100);
            } else {
                // Stop timer when leaving reading page
                if (timerInterval) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                }
            }
        }
    }

    // ========== NAVIGATION EVENT LISTENERS ==========
    
    // Brand logo - home
    document.getElementById('brandLogo').addEventListener('click', showHome);
    
    // Main navigation buttons
    document.getElementById('bookTestBtn').addEventListener('click', () => showSection('registrationPage'));
    document.getElementById('linkTestTaker').addEventListener('click', () => showSection('testTakersPage'));
    document.getElementById('linkOrganisations').addEventListener('click', () => showSection('organisationsPage'));
    document.getElementById('linkResearchers').addEventListener('click', () => showSection('researchersPage'));
    document.getElementById('linkNews').addEventListener('click', () => showSection('newsPage'));
    
    // Hero section buttons
    document.getElementById('openReadingPractice').addEventListener('click', () => showSection('readingPracticePage'));
    document.getElementById('openRegistration').addEventListener('click', () => showSection('registrationPage'));

    // Back home buttons
    document.getElementById('backHomeFromTestTakers').addEventListener('click', showHome);
    document.getElementById('backHomeFromOrganisations').addEventListener('click', showHome);
    document.getElementById('backHomeFromResearchers').addEventListener('click', showHome);
    document.getElementById('backHomeFromNews').addEventListener('click', showHome);
    document.getElementById('backHomeFromRegistration').addEventListener('click', showHome);
    document.getElementById('backHomeFromReading').addEventListener('click', showHome);

    // ========== REGISTRATION FORM ==========
    const registrationForm = document.getElementById('ieltsRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading
            if (loader) loader.classList.add('active');
            
            // Simulate API call
            setTimeout(() => {
                if (loader) loader.classList.remove('active');
                alert('🎉 Registration Successful!\n\nThank you for registering for IELTS. We have sent a confirmation email with further instructions.');
                this.reset();
                showHome();
            }, 2000);
        });
    }

    // ========== READING PRACTICE FUNCTIONALITY ==========
    
    function startReadingTimer() {
        console.log('🕒 Starting reading timer...');
        
        // Reset timer
        timeLeft = 60 * 60;
        const timerElement = document.getElementById('time');
        
        // Clear existing interval
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        // Update timer immediately
        updateTimerDisplay();
        
        // Start new interval
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                console.log('⏰ Time\'s up! Auto-submitting...');
                submitTest();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const timerElement = document.getElementById('time');
        if (timerElement) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Change color when time is running out
            if (timeLeft < 300) { // 5 minutes
                timerElement.style.color = '#dc3545';
            } else if (timeLeft < 600) { // 10 minutes
                timerElement.style.color = '#ffc107';
            } else {
                timerElement.style.color = 'white';
            }
        }
    }

    // Test submission
    const submitTestBtn = document.getElementById('submitTest');
    if (submitTestBtn) {
        submitTestBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📝 Submit button clicked');
            submitTest();
        });
    }

    function submitTest() {
        console.log('🔍 Submitting test...');
        
        try {
            // Stop timer
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
            
            let score = 0;
            const totalQuestions = 14;
            
            // Check questions 1-6
            for (let i = 1; i <= 6; i++) {
                const input = document.querySelector(`.answer-input[placeholder="${i}"]`);
                if (input) {
                    const userAnswer = input.value.trim().toLowerCase();
                    const correctAnswer = input.getAttribute('data-correct').toLowerCase();
                    
                    if (userAnswer === correctAnswer) {
                        score++;
                        input.classList.add('correct');
                        input.classList.remove('incorrect');
                    } else {
                        input.classList.add('incorrect');
                        input.classList.remove('correct');
                    }
                }
            }
            
            // Check questions 7-14
            for (let i = 7; i <= 14; i++) {
                const input = document.querySelector(`.answer-input[placeholder="${i}"]`);
                if (input) {
                    const userAnswer = input.value.trim().toUpperCase();
                    const correctAnswer = input.getAttribute('data-correct').toUpperCase();
                    
                    if (userAnswer === correctAnswer) {
                        score++;
                        input.classList.add('correct');
                        input.classList.remove('incorrect');
                    } else {
                        input.classList.add('incorrect');
                        input.classList.remove('correct');
                    }
                }
            }
            
            console.log(`📊 Final score: ${score}/${totalQuestions}`);
            displayResults(score, totalQuestions);
            
        } catch (error) {
            console.error('❌ Error in submitTest:', error);
            alert('Có lỗi xảy ra khi chấm bài. Vui lòng thử lại.');
        }
    }
    
    function displayResults(score, total) {
        console.log('📈 Displaying results...');
        
        const finalScoreElement = document.getElementById('finalScore');
        const resultDetailsElement = document.getElementById('resultDetails');
        const resultModal = document.getElementById('resultModal');
        
        if (finalScoreElement) {
            finalScoreElement.textContent = `${score}/${total}`;
        }
        
        if (resultDetailsElement) {
            resultDetailsElement.innerHTML = `
                <h4>Detailed Results:</h4>
                <p><strong>Correct Answers:</strong> ${score}</p>
                <p><strong>Incorrect Answers:</strong> ${total - score}</p>
                <p><strong>Percentage:</strong> ${((score/total)*100).toFixed(1)}%</p>
                
                <div style="margin-top: 1.5rem;">
                    <h5>Answer Key:</h5>
                    ${generateAnswerKey()}
                </div>
                
                <div style="margin-top: 1.5rem; padding: 1rem; background: var(--light-gray); border-radius: 8px;">
                    <h5>Performance Feedback:</h5>
                    <p>${getPerformanceFeedback(score, total)}</p>
                </div>
            `;
        }
        
        if (resultModal) {
            resultModal.classList.add('active');
        }
    }
    
    function generateAnswerKey() {
        let keyHTML = '';
        
        // Questions 1-6
        for (let i = 1; i <= 6; i++) {
            const input = document.querySelector(`.answer-input[placeholder="${i}"]`);
            if (input) {
                const userAnswer = input.value.trim();
                const correctAnswer = input.getAttribute('data-correct');
                const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
                
                keyHTML += `
                    <p><strong>${i}. </strong>
                        <span class="correct-answer">Correct: ${correctAnswer}</span>
                        <span class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">
                            | Your answer: ${userAnswer || 'No answer'}
                        </span>
                    </p>
                `;
            }
        }
        
        // Questions 7-14
        for (let i = 7; i <= 14; i++) {
            const input = document.querySelector(`.answer-input[placeholder="${i}"]`);
            if (input) {
                const userAnswer = input.value.trim();
                const correctAnswer = input.getAttribute('data-correct');
                const isCorrect = userAnswer.toUpperCase() === correctAnswer.toUpperCase();
                
                keyHTML += `
                    <p><strong>${i}. </strong>
                        <span class="correct-answer">Correct: ${correctAnswer}</span>
                        <span class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">
                            | Your answer: ${userAnswer || 'No answer'}
                        </span>
                    </p>
                `;
            }
        }
        
        return keyHTML;
    }
    
    function getPerformanceFeedback(score, total) {
        const percentage = (score / total) * 100;
        
        if (percentage >= 85) {
            return "🎉 Excellent! You have a strong understanding of the passage and excellent reading comprehension skills. This performance is equivalent to IELTS Band 8.0+.";
        } else if (percentage >= 70) {
            return "👍 Good job! You demonstrated solid reading comprehension skills with room for minor improvements. This performance is equivalent to IELTS Band 6.5-7.5.";
        } else if (percentage >= 50) {
            return "💪 Fair attempt. Focus on improving your reading strategies and time management. This performance is equivalent to IELTS Band 5.0-6.0.";
        } else {
            return "📚 Keep practicing! Work on your reading comprehension skills and vocabulary building. This performance is below IELTS Band 5.0.";
        }
    }
    
    // Result modal controls
    const closeResultBtn = document.getElementById('closeResult');
    const retryTestBtn = document.getElementById('retryTest');
    
    if (closeResultBtn) {
        closeResultBtn.addEventListener('click', () => {
            const resultModal = document.getElementById('resultModal');
            if (resultModal) {
                resultModal.classList.remove('active');
            }
        });
    }
    
    if (retryTestBtn) {
        retryTestBtn.addEventListener('click', () => {
            const resultModal = document.getElementById('resultModal');
            if (resultModal) {
                resultModal.classList.remove('active');
            }
            
            // Reset form
            document.querySelectorAll('.answer-input').forEach(input => {
                input.value = '';
                input.classList.remove('correct', 'incorrect');
            });
            
            // Reset and restart timer
            startReadingTimer();
        });
    }

    // ========== OTHER FUNCTIONALITY ==========
    
    // Card hover effects
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Test center booking buttons
    document.querySelectorAll('.center-card .btn').forEach(button => {
        button.addEventListener('click', function() {
            showSection('registrationPage');
        });
    });

    // Initialize form date to future dates only
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const testDateInput = document.getElementById('testDate');
    if (testDateInput) {
        testDateInput.min = nextWeek.toISOString().split('T')[0];
    }

    // News modal functionality
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const newsId = this.getAttribute('data-news');
            const modal = document.getElementById(`newsModal${newsId}`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('.news-modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.news-modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.querySelectorAll('.news-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.news-modal.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            const resultModal = document.getElementById('resultModal');
            if (resultModal && resultModal.classList.contains('active')) {
                resultModal.classList.remove('active');
            }
        }
        
        if (e.ctrlKey && e.key === 'Enter') {
            const readingPage = document.getElementById('readingPracticePage');
            if (readingPage && readingPage.classList.contains('active')) {
                e.preventDefault();
                submitTest();
            }
        }
    });

    // Auto-advance for single character inputs
    document.querySelectorAll('.answer-input[maxlength="1"]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.length === this.maxLength) {
                const nextInput = this.parentElement.nextElementSibling?.querySelector('.answer-input');
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });

    // ========== DEBUG AND INITIALIZATION ==========
    console.log('✅ All elements initialized:');
    console.log('- Home section:', document.getElementById('home'));
    console.log('- Reading section:', document.getElementById('readingPracticePage'));
    console.log('- Submit button:', document.getElementById('submitTest'));
    console.log('- Timer:', document.getElementById('timer'));
    console.log('- Result modal:', document.getElementById('resultModal'));
    console.log('- Answer inputs:', document.querySelectorAll('.answer-input').length);

    console.log('🎉 IELTS Reading Practice fully initialized and ready!');
    
    // Quick test function - uncomment to test automatically
    // setTimeout(() => {
    //     console.log('🚀 Running quick test...');
    //     showSection('readingPracticePage');
    // }, 1000);
});