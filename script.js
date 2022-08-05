/*
ФИКС БАГА 100VH ДЛЯ HEIGHT
использование: для нужного элемента прописать height: var(--app-height);
*/

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

/*
АНИМАЦИЯ ПЛАВНОЙ ПРОКРУТКИ К ЯКОРЮ
*/

$(".scrollto a").on("click", function () {
  let href = $(this).attr("href");

  $("html, body").animate(
    {
      scrollTop: $(href).offset().top,
    },
    {
      duration: 450,
      easing: "swing",
    }
  );

  return false;
});

window.addEventListener("scroll", activeLink);
const sections = document.querySelectorAll(".tube-content > section");
const navLi = document.querySelectorAll(".progress__list li");
function activeLink() {
  let current = "";
  let present = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
      const currentPresent =
        (section.getClientRects()[0].top * -1) /
        (section.getClientRects()[0].height / 100);
      if (100 >= currentPresent) {
        present = Math.ceil(currentPresent);
      }
    } else {
      navLi.forEach((li) => {
        if (li.classList.contains("active")) {
          li.querySelector(".link__hidden").style.width = 0 + "%";
        }
      });
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
    if (li.classList.contains("active")) {
      li.querySelector(".link__hidden").style.width = present + "%";
      li.querySelector(".link__hidden > span").style.width =
        li.querySelector("a > span").offsetWidth + "px";
      li.style.right = present + "%";
      if (li.nextElementSibling)
        li.nextElementSibling.querySelector(".link__hidden").style.width = "0%";
      if (li.previousElementSibling)
        li.previousElementSibling.querySelector(".link__hidden").style.width =
          "100%";
    }
  });
}

// if(window.screenX)
if (window.innerWidth < 1025) {
  class Slider {
    constructor(options) {
      this.sections = document.querySelectorAll(options.section);
      this.navigation = document.querySelector(options.dots);

      this.navigation.addEventListener(
        "click",
        this.scrollToSection.bind(this)
      );
      window.addEventListener("scroll", this.setDotStatus.bind(this));
    }

    removeDotStyles() {
      const dots = this.navigation;
      const is_active = dots.querySelector(".is-active");

      if (is_active != null) {
        is_active.classList.remove("is-active");
      }
    }

    setDotStatus() {
      const scroll_position = window.scrollY;
      const dots = Array.from(this.navigation.children);

      this.sections.forEach((section, index) => {
        const half_window = window.innerHeight / 2;
        const section_top = section.offsetTop;
        if (
          scroll_position > section_top - half_window &&
          scroll_position < section_top + half_window
        ) {
          this.removeDotStyles();
          dots[index].classList.add("is-active");
        }
      });
    }

    scrollToSection(e) {
      const dots = Array.from(this.navigation.children);
      const window_height = window.innerHeight;

      dots.forEach((dot, index) => {
        if (dot == e.target) {
          window.scrollTo({
            top: window_height * index,
            behavior: "smooth",
          });
        }
      });
    }
  }

  new Slider({
    section: ".section",
    dots: "#js-dots",
  });

  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  const navDots = document.querySelectorAll(".nav-dots > li");
  let count = 0;
  for (let i = 0; i < navDots.length; i++) {
    if (navDots[i].classList.contains("is-active")) count = i;
    prev.href = navDots[count].querySelector("a").getAttribute("href");
    next.href = navDots[count].querySelector("a").getAttribute("href");
  }

  window.addEventListener("scroll", () => {
    for (let i = 0; i < navDots.length; i++) {
      if (navDots[i].classList.contains("is-active")) count = i;
      prev.href = navDots[count].querySelector("a").getAttribute("href");
      next.href = navDots[count].querySelector("a").getAttribute("href");
    }
  });
  next.addEventListener("click", () => {
    for (let i = 0; i < navDots.length; i++) {
      navDots[i].classList.remove("is-active");
    }
    if (count < navDots.length - 1) {
      count += 1;
      next.href = navDots[count].querySelector("a").getAttribute("href");
    }
    navDots[count].classList.add("is-active");
  });

  prev.addEventListener("click", () => {
    for (let i = 0; i < navDots.length; i++) {
      navDots[i].classList.remove("is-active");
    }
    if (count > 0) {
      count -= 1;
      prev.href = navDots[count].querySelector("a").getAttribute("href");
    }
    navDots[count].classList.add("is-active");
  });
}
