// Initialize smooth scrolling using Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

// Custom cursor movement based on mouse position
document.addEventListener("mousemove", function (e) {
  const cursor = document.querySelector(".customCursor");
  cursor.style.left = `${e.clientX - 20}px`;
  cursor.style.top = `${e.clientY - 20}px`;
});

// Navigation menu animation that follows the mouse
function menuAnim() {
  const menuContainer = document.querySelector(".menu-container");
  const menu = document.querySelector(".menu");

  let initialPosition = {
    left: menu.offsetLeft,
    top: menu.offsetTop,
  };

  // Update the initial position when the window is resized
  function updateInitialPosition() {
    initialPosition = {
      left: menu.offsetLeft,
      top: menu.offsetTop,
    };
  }
  window.addEventListener("resize", debounce(updateInitialPosition, 200));

  menuContainer.addEventListener("mousemove", (e) => {
    gsap.to(".customCursor", {
      scale: 1.2,
      duration: 0.3,
    });

    const contRect = menuContainer.getBoundingClientRect();
    gsap.to(menu, {
      left: `${e.clientX - contRect.left}px`,
      top: `${e.clientY - contRect.top + 10}px`,
      ease: "power4.out",
      overwrite: true,
    });
  });

  menuContainer.addEventListener("mouseleave", () => {
    gsap.to(".customCursor", {
      scale: 1,
      duration: 0.3,
    });

    gsap.to(menu, {
      left: `${initialPosition.left}px`,
      top: `${initialPosition.top}px`,
      ease: "power4.out",
      duration: 0.5,
    });
  });
}

// List item animation within the navigation section
function listAnim() {
  const liCont = document.querySelectorAll(".nav-section ul li");

  liCont.forEach((liItem) => {
    const aTagg = liItem.querySelector("a");

    let initialPosition = {
      left: aTagg.offsetLeft,
      top: aTagg.offsetTop,
    };

    // Update the initial position when the window is resized
    function updateInitialPosition() {
      initialPosition = {
        left: aTagg.offsetLeft,
        top: aTagg.offsetTop,
      };
    }
    window.addEventListener("resize", debounce(updateInitialPosition, 200));

    liItem.addEventListener("mousemove", (e) => {
      gsap.to(".customCursor", {
        scale: 1.2,
        duration: 0.3,
      });

      const contRect = liItem.getBoundingClientRect();

      gsap.to(aTagg, {
        x: e.clientX - contRect.left - contRect.width / 2,
        y: e.clientY - contRect.top - contRect.height / 2,
        ease: "power4.out",
        overwrite: true,
      });
    });

    liItem.addEventListener("mouseleave", () => {
      gsap.to(".customCursor", {
        scale: 1,
        duration: 0.3,
      });

      gsap.to(aTagg, {
        x: 0,
        y: 0,
        ease: "power4.out",
        duration: 0.5,
      });
    });
  });
}

// Video container animation and custom cursor behavior
function vdoContAnim() {
  const vdoContainer = document.querySelector("#home-vdo-cont");
  const vdoBtn = document.querySelector(".vdo-btn");

  vdoContainer.addEventListener("mousemove", (e) => {
    gsap.to(".customCursor", {
      scale: 0,
      autoAlpha: 0,
      duration: 0.3,
    });

    const contRect = vdoContainer.getBoundingClientRect();

    gsap.to(vdoBtn, {
      top: 0,
      left: 0,
      x: e.clientX - contRect.left - 60,
      y: e.clientY - contRect.top - 60,
      ease: "power4.out",
      overwrite: true,
    });
  });

  vdoContainer.addEventListener("mouseleave", () => {
    gsap.to(".customCursor", {
      scale: 1,
      autoAlpha: 1,
      duration: 0.3,
    });

    gsap.to(vdoBtn, {
      top: "-5%",
      left: "80%",
      x: 0,
      y: 0,
      ease: "power4.out",
      duration: 0.5,
    });
  });
}

// Handle video play/pause button click
const vdoBtn = document.querySelector(".vdo-btn");
const vdo = document.querySelector("#home-vdo video");
const vdoCover = document.querySelector("#vdo-thumbnail");
let isVdoPlaying = false;

vdoBtn.addEventListener("click", () => {
  if (isVdoPlaying === false) {
    playVdo();
  } else {
    pauseVdo();
  }
});

function playVdo() {
  gsap.to(vdoCover, {
    autoAlpha: 0,
    duration: 0.3,
    ease: "power4.out",
    onComplete: () => {
      vdo.play();
      isVdoPlaying = true;
      changeVdoBtnToPause();
    },
  });
}

function pauseVdo() {
  gsap.to(vdoCover, {
    autoAlpha: 1,
    duration: 0.3,
    ease: "power4.out",
    onComplete: () => {
      vdo.pause();
      isVdoPlaying = false;
      changeVdoBtnToPlay();
    },
  });
}

function changeVdoBtnToPause() {
  const vdoIcon = vdoBtn.querySelector("div");
  vdoIcon.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  gsap.to(vdoBtn, {
    width: "5vw",
    height: "5vw",
    duration: 0.3,
    ease: "power4.out",
    onComplete: () => {
      //vdoIcon.style.scale = "1.5";
    },
  });
}

function changeVdoBtnToPlay() {
  const vdoIcon = vdoBtn.querySelector("div");
  vdoIcon.innerHTML = `<i class="fa-solid fa-play"></i>`;

  gsap.to(vdoBtn, {
    width: "10vw",
    height: "10vw",
    duration: 0.3,
    ease: "power4.out",
    onComplete: () => {
      //vdoIcon.style.scale = "1";
    },
  });
}

// Start the animations when the page loads
menuAnim();
listAnim();
vdoContAnim();

// Debounce function to optimize resize event
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

gsap.to("#underline", {
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#parentLine",
    start: "top 75%",
    end: "bottom top",
    toggleActions: "play none none reverse",
    markers: false,
    invalidateOnRefresh: true, // Invalidate on refresh to recalculate positions
  },
});
