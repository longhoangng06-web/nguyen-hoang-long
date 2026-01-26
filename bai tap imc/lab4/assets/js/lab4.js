// --- BÀI 1: Khởi tạo AOS ---
AOS.init({
    duration: 1000, // Thời gian chạy animation (1s)
    once: true, // Chỉ chạy 1 lần khi cuộn xuống
    offset: 100 // Kích hoạt khi cách đáy màn hình 100px
   });
   // --- BÀI 3: GSAP Basic Tween ---
   // Chạy khi trang tải xong
   window.addEventListener('load', () => {
    gsap.to(".gsap-box", {
    x: 200, // Di chuyển sang phải 200px
    opacity: 1, // Hiện rõ dần
    duration: 1.5, // Trong 1.5 giây
    ease: "power2.out", // Hiệu ứng mượt mà
    delay: 0.5 // Đợi 0.5s mới chạy
    });
   });
   // --- BÀI 4: GSAP Timeline ---
   // Tạo chuỗi hành động liên tiếp
   const tl = gsap.timeline({
    defaults: { duration: 0.8, ease: "power2.out" }
   });
   tl.from(".header-anim", { y: -50, opacity: 0 }) // 1. Header trượt từ trên xuống
    .from(".hero-title", { y: 30, opacity: 0 }) // 2. Tiêu đề trượt từ dưới lên
    .from(".hero-cta", { scale: 0, opacity: 0 }); // 3. Nút phóng to ra
   // --- BÀI 5: GSAP Stagger với Scroll Event ---
   window.addEventListener('scroll', () => {
    const section5 = document.querySelector('#bai5');
    const cards = document.querySelectorAll('.card');
   
    // Lấy vị trí của section so với màn hình
    const sectionPos = section5.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    // Nếu người dùng cuộn tới vùng này
    if (sectionPos < screenPos) {
    gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2, // Mỗi card chạy cách nhau 0.2s
    ease: "back.out(1.7)" // Hiệu ứng nảy nhẹ
    });
    }
   });