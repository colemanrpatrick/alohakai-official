const KwikiSlider = (function (sliderId, _config) {
  const defaultConfig = {
    autoTransitionDelay: 5, // seconds between slide transitions
    fadeDelay: 0.5, // seconds to fade slides when in "fade" transitionMode (must match CSS transition delay for .temp-slide class!)
    mobileModeScreenSize: 812,
    mobileTransitionMode: "slide", // slide or fade
    desktopTransitionMode: "fade", // slide or fade
    transitionMode: "slide", // default
  }
  const config = {
    ...defaultConfig,
    ..._config
  }
  let slider_wrapper;
  let slider;
  let autoTransitionTimer;

  const initSlider = () => {
    slider_wrapper = document.getElementById(sliderId);
    slider = slider_wrapper.querySelector(`.content-slider`);
    createSliderDots();
    createArrows();
    addEventListeners();
    initAutoTransition();
    resizeWindowHandler();
  }

  const autoTransition = () => {
    const nextBtn = document.querySelector(`#${sliderId} .content-slider-arrow.arrow-right`);
    nextBtn.click();
  }

  const initAutoTransition = () => {
    clearInterval(autoTransitionTimer);
    autoTransitionTimer = setInterval(autoTransition, config.autoTransitionDelay * 1000);
  }

  const createArrows = () => {
    const arrows_node = document.createElement("div");
    arrows_node.className = "content-slider-arrows";
    let arrows_html =
      '<div class="content-slider-arrow arrow-left">'
      + '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">'
      + '<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>'
      + '</svg>'
      + '</div>'
      + '<div class="content-slider-arrow arrow-right">'
      + '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">'
      + '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>'
      + '</svg>'
      + '</div>';
    arrows_node.innerHTML = arrows_html;
    slider_wrapper.appendChild(arrows_node);
  }

  const createSliderDots = () => {
    const num_slides = slider.childElementCount;
    const dots_node = document.createElement("div");
    dots_node.className = "content-slider-dots";
    let dots_html = "";
    [...Array(num_slides)].map((item, i) => {
      dots_html += `<div class="content-slider-dot ${i == 0 ? 'active' : ''}"></div>`;
    });
    dots_node.innerHTML = dots_html;
    slider_wrapper.appendChild(dots_node);
  }

  const updateActiveDotByIndex = (index) => {
    try {
      if (isNaN(index)) index = 0;
      const dots = document.querySelectorAll(`#${sliderId} .content-slider-dot`);
      dots.forEach((item, i) => {
        item.classList.remove("active");
        if (i === index) item.classList.add("active");
      });
    } catch (err) {
      console.error(err);
    }
  }

  const sliderScrollHandler = (e) => {
    initAutoTransition();
    const slideWidth = slider.querySelector(`#${sliderId} .slide`).clientWidth;
    const totalSliderWidth = (slider.childElementCount * slideWidth);
    const activeSlideIndex = Math.round(slider.childElementCount - ((totalSliderWidth - slider.scrollLeft) / slideWidth));
    updateActiveDotByIndex(activeSlideIndex);
  }

  const goToSlideByIndexSlide = (index) => {
    const slideWidth = slider.querySelector(`#${sliderId} .slide`).clientWidth;
    const leftScrollPos = (slideWidth * index) - slider.scrollLeft;
    slider.scrollBy({ left: leftScrollPos, top: 0, behavior: 'smooth' });
  }

  const goToSlideByIndexFade = (index) => {
    const slideWidth = slider.querySelector(`#${sliderId} .slide`).clientWidth;
    const leftScrollPos = (slideWidth * index) - slider.scrollLeft;
    setCurrentSlideToStaticAndFade();
    slider.scrollBy({ left: leftScrollPos, top: 0, behavior: 'instant' });
  }

  const goToSlideByIndex = (index) => {
    initAutoTransition();
    switch (config.transitionMode) {
      case "slide":
        goToSlideByIndexSlide(index);
        break;
      case "fade":
        goToSlideByIndexFade(index);
        break;

      default:
        goToSlideByIndexSlide(index);
        break;
    }
  }

  const addEventListenersForDots = (dots) => {
    dots.forEach((item, i) => {
      item.addEventListener("click", () => {
        goToSlideByIndex(i);
      });
    });
  }

  const slideAction = (item, i) => {
    const isLeftArrow = item.classList.contains("arrow-left") ? true : false;
    let nextSlideIndex = getActiveSlideIndex() + 1;
    let prevSlideIndex = getActiveSlideIndex() - 1;
    if (nextSlideIndex > slider.childElementCount - 1) {
      nextSlideIndex = 0;
    }
    if (prevSlideIndex < 0) {
      prevSlideIndex = slider.childElementCount - 1;
    }

    if (isLeftArrow) {
      goToSlideByIndexSlide(prevSlideIndex);
    } else {
      goToSlideByIndexSlide(nextSlideIndex);
    }
  }

  const getActiveSlideIndex = () => {
    let activeSlideIndex = 0;
    const sliderDots = document.querySelectorAll(`#${sliderId} .content-slider-dot`);
    sliderDots.forEach((item, index) => {
      if (item.classList.contains("active")) {
        activeSlideIndex = index;
      }
    });

    return activeSlideIndex;
  }

  const setCurrentSlideToStaticAndFade = () => {
    const slides = slider.querySelectorAll(`#${sliderId} .slide`);
    const activeSlideIndex = getActiveSlideIndex();
    slides.forEach((item, index) => {
      if (index === activeSlideIndex) {
        const tempSlide = document.createElement("div");
        tempSlide.className = "temp-slide";
        tempSlide.innerHTML = item.innerHTML;
        slider_wrapper.appendChild(tempSlide);
        slider.classList.add("slide-hide-instant");
        setTimeout(() => {
          tempSlide.style.opacity = 0;
          slider.classList.remove("slide-hide-instant");
          setTimeout(() => {
            tempSlide.remove();
          }, config.fadeDelay * 1000);
        }, 200);
        return;
      }
    });
  }

  const fadeAction = (item, i) => {
    const isLeftArrow = item.classList.contains("arrow-left") ? true : false;
    let nextSlideIndex = getActiveSlideIndex() + 1;
    let prevSlideIndex = getActiveSlideIndex() - 1;
    if (nextSlideIndex > slider.childElementCount - 1) {
      nextSlideIndex = 0;
    }
    if (prevSlideIndex < 0) {
      prevSlideIndex = slider.childElementCount - 1;
    }

    if (isLeftArrow) {
      goToSlideByIndexFade(prevSlideIndex);
    } else {
      goToSlideByIndexFade(nextSlideIndex);
    }
  }

  const arrowClickHandler = (item, i) => {
    initAutoTransition();
    switch (config.transitionMode) {
      case "slide":
        slideAction(item, i);
        break;
      case "fade":
        fadeAction(item, i);
        break;

      default:
        slideAction(item, i);
        break;
    }
  }

  const addEventListenersForArrows = (arrows) => {
    arrows.forEach((item, i) => {
      item.addEventListener("click", () => {
        arrowClickHandler(item, i);
      });
    });
  }

  const resizeWindowHandler = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= config.mobileModeScreenSize) {
      config.transitionMode = config.mobileTransitionMode;
    } else {
      config.transitionMode = config.desktopTransitionMode;
    }
  }

  const addResponsiveEventListeners = () => {
    window.addEventListener("resize", resizeWindowHandler);
  }

  const addEventListeners = () => {
    const dots = document.querySelectorAll(`#${sliderId} .content-slider-dot`);
    addEventListenersForDots(dots);
    const arrows = document.querySelectorAll(`#${sliderId} .content-slider-arrow`);
    addEventListenersForArrows(arrows);
    slider.addEventListener('scroll', sliderScrollHandler, false);
    addResponsiveEventListeners();
  }

  const init = () => {
    document.addEventListener('DOMContentLoaded', initSlider, false);
  }

  init();
});
