window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    const fadeStart = 100;  // when fading begins
    const fadeEnd = 600;    // when fully visible

    let opacity = (scrollY - fadeStart) / (fadeEnd - fadeStart);

    // clamp between 0 and 1
    opacity = Math.min(Math.max(opacity, 0), 1);

    document.getElementById("sunset").style.opacity = opacity;
});


    

