const toggleFaq = (e) => {
    const el = document.getElementById(e.target.dataset.target);
    el.classList.toggle("show")
}

console.log("partner", JSON.parse(partnersData));

Object.keys(partnersData).forEach((partnerIndex) => {
    $(`#carousel-${partnerIndex}`).on('slide.bs.carousel', function (e) {
        const $e = $(e.relatedTarget);
        const idx = $e.index();
        const itemsPerSlide = 5;
        const totalItems = $('.carousel-item').length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            const it = itemsPerSlide - (totalItems - idx);
            for (const i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });
})