export function renderGallerySection(gallery) {
    let galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';
    gallery.forEach(img => {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${img}" alt="Gallery Image" style="width:100%;">`;
        galleryGrid.appendChild(card);
    });
}