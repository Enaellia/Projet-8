document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    new MauGallery(gallery, {
      columns: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3
      },
      showTags: true,
      tagsPosition: 'top'
    });
  }
});