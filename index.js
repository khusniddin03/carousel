class Slider {
  constructor(options) {
    this.sections = document.querySelectorAll(options.section);
    this.navigation = document.querySelector(options.dots);

    this.navigation.addEventListener('click', this.scrollToSection.bind(this))
    window.addEventListener('scroll', this.setDotStatus.bind(this));
  }

  removeDotStyles() {
    const dots = this.navigation;
    const is_active = dots.querySelector('.is-active');

    if (is_active != null) {
      is_active.classList.remove('is-active');
    }
  }

  setDotStatus() {
    const scroll_position = window.scrollY;
    const dots = Array.from(this.navigation.children);

    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;

      if (pageYOffset >= sectionTop - 60) {
        this.removeDotStyles();
        dots[index].classList.add('is-active');
      }
      // const half_window = window.innerHeight / 2;
      // const section_top = section.offsetTop;
      // if (scroll_position > section_top - half_window && scroll_position < section_top + half_window) {
        
      //   this.removeDotStyles();
      //   dots[index].classList.add('is-active');
      // }
    });
  }

  scrollToSection(e) {
    const dots = Array.from(this.navigation.children);
    const window_height = window.innerHeight;
   
    dots.forEach((dot, index) => {
      if (dot == e.target) {

        window.scrollTo({
          top: window_height * index,
          behavior: 'smooth',
        });
      }
    });
  }
 
}

new Slider({
  section: '.section',
  dots: '#js-dots',
});


const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const navDots = document.querySelectorAll(".nav-dots > li");
let count = 0;
for(let i = 0; i < navDots.length;i++) {
  if(navDots[i].classList.contains("is-active")) count = i;
}

window.addEventListener("scroll", () => {
  for(let i = 0; i < navDots.length;i++) {
    if(navDots[i].classList.contains("is-active")) count = i;
  }
})
next.addEventListener("click",() => {
  for(let i = 0; i < navDots.length;i++) {
    navDots[i].classList.remove("is-active");
  }
  if(count < navDots.length-1) {
    count += 1;
    next.href = navDots[count].querySelector("a").getAttribute("href");
    // console.log();
  }
  navDots[count].classList.add("is-active");
});

prev.addEventListener("click",() => {
  for(let i = 0; i < navDots.length;i++) {
    navDots[i].classList.remove("is-active");
  }
  if(count > 0) {
    count -= 1;
    prev.href = navDots[count].querySelector("a").getAttribute("href");
  }
  navDots[count].classList.add("is-active");
});



