// Namespace object to store DOM elements and timeline
let app = {};


// set up dom
const setupDom = () => {
  app.dom = {};
  app.dom.ad = document.getElementById("ad");
  app.dom.content = document.getElementById("content");
  app.dom.loader = document.getElementById("loader");

}

// Wait for Enabler to load
const init = () => {
  if (Enabler.isPageLoaded()) {
    showAd();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, showAd);
  }
}

// add event listeners
const addListeners = () => {
  app.dom.ad.addEventListener('click', exitHandler);
}

// show ad
const showAd = () => {
  setupDom();
  addListeners();
  app.dom.content.style.visibility = "visible";
  gsap.to("#loader", {autoAlpha: 0, onComplete: () => {
    app.dom.loader.style.visibility = "hidden"
  }})
  initAnimation();
}

const initAnimation = () => {
  const tl = gsap.timeline({delay:0.5})

  tl.fromTo("#new", {xPercent: -100}, { xPercent: 0}, "<")
  tl.fromTo("#terms", {autoAlpha: 0}, { autoAlpha: 1}, "<")
  tl.fromTo("#cta", {autoAlpha: 0}, { autoAlpha: 1}, "<")
  tl.fromTo("#product", {autoAlpha: 0}, { autoAlpha: 1}, "<")
  tl.fromTo("#text-1", {autoAlpha: 0}, { autoAlpha: 1}, "<")
  tl.to("#text-1", {autoAlpha: 0}, "+=3")
  tl.fromTo("#text-2", {autoAlpha: 0}, {autoAlpha: 1}, "+=0.5")
  for (let i = 0; i < 3; i++) {
    tl.to("#cta", {
      scale: 1.1,
      duration: 0.25,
      yoyo: true,
      repeat: 3
    }, "+=2");
  }
}

// handles the exit
const exitHandler = (e) => {
  Enabler.exit("Ad Exit", clickTag);
}

if (Enabler.isInitialized()) {
  init();
} else {
  Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
}