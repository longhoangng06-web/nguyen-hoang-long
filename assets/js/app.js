// Bài 1: Khởi tạo AOS [cite: 187, 188]
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Bài 3: GSAP Basic Tween [cite: 193, 195]
window.addEventListener('load', () => {
    gsap.to(".gsap-box", {
        x: 200,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5
    });
});

// Bài 4: GSAP Timeline [cite: 207, 209]
const tl = gsap.timeline({
    defaults: { duration: 0.8, ease: "power2.out" }
});
tl.from(".header-anim", { y: -50, opacity: 0 })
  .from(".hero-title", { y: 30, opacity: 0 })
  .from(".hero-cta", { scale: 0, opacity: 0 });

// Bài 5: GSAP Stagger với Scroll Event [cite: 215, 221, 222]
window.addEventListener('scroll', () => {
    const section5 = document.querySelector('#bai5');
    const cards = document.querySelectorAll('.card');
    const sectionPos = section5.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
        gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });
    }
});