let badges = document.querySelectorAll('.volunteer-badge');

badges?.forEach(badge => {
    if(badge.dataset?.image.length === 0) {
        let initials = badge.dataset.name?.split(' ')?.map(str => {if(str !== 'Dr.') {return str[0]}})
        .join('');
        badge.textContent = initials;
    }
});