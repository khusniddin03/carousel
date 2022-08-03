document.querySelector(".progress__list").style.width = document.body.clientWidth + "px";

window.addEventListener("scroll", () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.querySelector(".progress__bg").style.width = scrolled + "%";
    console.log(scrolled);
})
