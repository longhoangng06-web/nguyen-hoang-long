// Bài 1: Nút đổi nền
const toggleBtn = document.getElementById('toggleTheme');
toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark')) {
        icon.className = 'fas fa-sun';
        this.innerHTML = '<i class="fas fa-sun"></i> Đổi nền';
    } else {
        icon.className = 'fas fa-moon';
        this.innerHTML = '<i class="fas fa-moon"></i> Đổi nền';
    }
});

// Bài 2: Menu highlight khi cuộn
const menuLinks = document.querySelectorAll('.menu-link');
const sections = document.querySelectorAll('.lab-section');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Bài 3: Hiệu ứng xuất hiện khi cuộn
const boxes = document.querySelectorAll('.box');

const checkBoxes = () => {
    const triggerBottom = window.innerHeight * 0.8;
    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
};

window.addEventListener('scroll', checkBoxes);
checkBoxes(); // Kiểm tra ngay khi load trang

// Bài 4: Nút nhảy khi hover
const jumpBtn = document.getElementById('jumpBtn');

jumpBtn.addEventListener('mouseover', function() {
    this.classList.add('animate');
    setTimeout(() => {
        this.classList.remove('animate');
    }, 500);
});

// Thêm CSS animation qua JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes jump {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    .animate {
        animation: jump 0.5s ease;
    }
`;
document.head.appendChild(style);

// Bài 5: Hình tròn di chuyển theo chuột
const circle = document.querySelector('.circle');
const mouseArea = document.querySelector('.mouse-area');

document.addEventListener('mousemove', function(e) {
    // Giới hạn trong khu vực mouseArea
    const areaRect = mouseArea.getBoundingClientRect();
    if (
        e.clientX >= areaRect.left && 
        e.clientX <= areaRect.right && 
        e.clientY >= areaRect.top && 
        e.clientY <= areaRect.bottom
    ) {
        circle.style.left = `${e.clientX - areaRect.left - 15}px`;
        circle.style.top = `${e.clientY - areaRect.top - 15}px`;
    }
});