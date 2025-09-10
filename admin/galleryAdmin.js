export function addImage(gallery, img) {
    if (img) {
        gallery.push(img);
        localStorage.setItem('gallery', JSON.stringify(gallery));
        return true;
    }
    return false;
}