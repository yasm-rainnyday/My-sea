let audioStarted = false;

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Fade ranges
    const fade1Start = 100;   // sunrise → sunset starts
    const fade1End   = 400;   // sunset at full opacity

    const fade2Start = 900;   // sunset → jellyfish starts (gives sunset 500px solo time)
    const fade2End   = 1400;  // jellyfish at full opacity

    // Calculate opacities
    let sunsetOpacity = (scrollY - fade1Start) / (fade1End - fade1Start);
    sunsetOpacity = Math.min(Math.max(sunsetOpacity, 0), 1);

    let jellyOpacity = (scrollY - fade2Start) / (fade2End - fade2Start);
    jellyOpacity = Math.min(Math.max(jellyOpacity, 0), 1);

    // Apply video fades
    document.getElementById("Sunrise").style.opacity = 1 - sunsetOpacity;
    document.getElementById("sunset").style.opacity = sunsetOpacity * (1 - jellyOpacity);
    document.getElementById("jellyfish").style.opacity = jellyOpacity;

    // Apply text fades
    document.querySelector(".sunrise-text").style.opacity = 1 - sunsetOpacity;
    document.querySelector(".sunset-text").style.opacity = sunsetOpacity * (1 - jellyOpacity);
    document.querySelector(".jellyfish-text").style.opacity = jellyOpacity;

    // Trigger typewriter animation when scrolling to sunset section (around fade1End)
    const typewriter = document.querySelector(".sunset-text .typewriter");
    if (scrollY > fade1End && typewriter && !typewriter.classList.contains("active")) {
        typewriter.classList.add("active");
    }

    // Audio control based on scroll
    const melody = document.getElementById("rises_the_moon");
    const sea = document.getElementById("Sea_Waves");
    const jelly = document.getElementById("jelly");

    // Start audio on first scroll (user interaction requirement)
    if (scrollY > 0 && !audioStarted) {
        audioStarted = true;
        melody.play().catch(e => console.log("Audio play failed:", e));
        sea.play().catch(e => console.log("Audio play failed:", e));
        jelly.play().catch(e => console.log("Audio play failed:", e));
    }

    // Control volumes based on scroll position
    melody.volume = Math.max(0, 1 - jellyOpacity); // Fades out as sunset comes in
    sea.volume = sunsetOpacity * (1 - jellyOpacity); // Plays during sunset
    jelly.volume = jellyOpacity; // Plays during jellyfish
});



