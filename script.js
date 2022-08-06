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

if (window.innerWidth > 1024) {
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
          li.nextElementSibling.querySelector(".link__hidden").style.width =
            "0%";
        if (li.previousElementSibling)
          li.previousElementSibling.querySelector(".link__hidden").style.width =
            "100%";
      }
    });
  }
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
        const sectionTop = section.offsetTop;

        if (pageYOffset >= sectionTop - 60) {
          this.removeDotStyles();
          dots[index].classList.add('is-active');
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

  function mainFunctions() {
    for (let i = 0; i < navDots.length; i++) {
      if (navDots[i].classList.contains("is-active")) count = i;
    }
    if (count > 0) {
      prev.href = navDots[count - 1].querySelector("a").getAttribute("href");
    }
    if (count < navDots.length - 1) {
      next.href = navDots[count + 1].querySelector("a").getAttribute("href");
    }
    if (!navDots[count + 1]) {
      next.classList.add("active");
    } else {
      next.classList.remove("active");
    }
    if (!navDots[count - 1]) {
      prev.classList.add("active");
    } else {
      prev.classList.remove("active");
    }
  }
  mainFunctions();

  window.addEventListener("scroll", () => {
    mainFunctions()
  });
  next.addEventListener("click", () => {
    if (count < navDots.length - 1) {
      count += 1;
      next.href = navDots[count].querySelector("a").getAttribute("href");
    }
  });

  prev.addEventListener("click", () => {
    if (count > 0) {
      count -= 1;
      prev.href = navDots[count].querySelector("a").getAttribute("href");
    }
  });
}
