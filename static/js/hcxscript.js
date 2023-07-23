const toggleFaq = (e) => {
    const el = document.getElementById(e.target.dataset.target);
    el.classList.toggle("show")
}

document.addEventListener("DOMContentLoaded", function () {
    Object.keys(JSON.parse(partnersData)).forEach((item, index) => {
        const wrapper = document.querySelector(`#wrapper-${index}`);
        const sliderInterval = parseInt(wrapper.dataset.interval);
        const carousel = document.querySelector(`#carousel-${index}`);
        const firstCardWidth = carousel.querySelector(`#carousel-${index} .card`).offsetWidth;
        const arrowBtns = document.querySelectorAll(`#wrapper-${index} i`);
        const carouselChildren = [...carousel.children];

        let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
        let cardPerView;
        let screenWidth = window.innerWidth;

        // Set the number of cards that can fit in the carousel at once
        if (window.innerWidth >= 900) {
            cardPerView = 4
        } else if (screenWidth >= 600 && screenWidth < 900) {
            cardPerView = 3;
        } else {
            cardPerView = 1;
        }

        //don't show slider if items are less than what carousel can show at once
        if (carouselChildren.length < cardPerView) {
            const nonSliderWrapper = document.querySelector(`#flex-wrapper-${index}`);
            nonSliderWrapper.style.display = "flex";

            wrapper.style.display = "none";
        }

        // Insert copies of the last few cards to beginning of carousel for infinite scrolling
        carouselChildren.slice(-cardPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        // Insert copies of the first few cards to end of carousel for infinite scrolling
        carouselChildren.slice(0, cardPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");

        // Add event listeners for the arrow buttons to scroll the carousel left and right
        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
            });
        });

        const dragStart = (e) => {
            isDragging = true;
            carousel.classList.add("dragging");
            // Records the initial cursor and scroll position of the carousel
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        }

        const dragging = (e) => {
            if (!isDragging) return; // if isDragging is false return from here
            // Updates the scroll position of the carousel based on the cursor movement
            carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        }

        const dragStop = () => {
            isDragging = false;
            carousel.classList.remove("dragging");
        }

        const infiniteScroll = () => {
            // If the carousel is at the beginning, scroll to the end
            if (carousel.scrollLeft === 0) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
                carousel.classList.remove("no-transition");
            }
            // If the carousel is at the end, scroll to the beginning
            else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                carousel.classList.add("no-transition");
                carousel.scrollLeft = carousel.offsetWidth;
                carousel.classList.remove("no-transition");
            }

            // Clear existing timeout & start autoplay if mouse is not hovering over carousel
            clearTimeout(timeoutId);
            if (!wrapper.matches(":hover")) autoPlay();
        }

        const autoPlay = () => {
            if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
            // Autoplay the carousel after every sliderInterval
            timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, sliderInterval);
        }
        autoPlay();

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("scroll", infiniteScroll);
        wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
        wrapper.addEventListener("mouseleave", autoPlay);
    });
});