class MauGallery {
  constructor(gallery, options = {}) {
    this.gallery = gallery;
    this.options = Object.assign({
      columns: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3 },
      showTags: true,
      tagsPosition: 'top',
      lightBox: true,
      lightboxId: 'galleryLightbox',
      navigation: true
    }, options);
    this.tags = new Set();
    this.init();
  }

  init() {
    this.createRowWrapper();
    this.processImages();
    if (this.options.showTags) {
      this.createTagsBar();
      this.activateTagFilter();
    }
    if (this.options.lightBox) {
      this.createLightBox();
      this.setupLightboxListeners();
    }
    this.gallery.style.display = 'block';
  }

  createRowWrapper() {
    this.row = document.createElement('div');
    this.row.className = 'gallery-items-row row';
    this.gallery.appendChild(this.row);
  }

  createColumn() {
    const div = document.createElement('div');
    div.classList.add('item-column', 'mb-4');
    const c = this.options.columns;
    if (c.xs) div.classList.add(`col-${Math.ceil(12 / c.xs)}`);
    if (c.sm) div.classList.add(`col-sm-${Math.ceil(12 / c.sm)}`);
    if (c.md) div.classList.add(`col-md-${Math.ceil(12 / c.md)}`);
    if (c.lg) div.classList.add(`col-lg-${Math.ceil(12 / c.lg)}`);
    if (c.xl) div.classList.add(`col-xl-${Math.ceil(12 / c.xl)}`);
    return div;
  }

  processImages() {
    const images = this.gallery.querySelectorAll('.gallery-item');
    images.forEach(img => {
      img.classList.add('img-fluid');
      const col = this.createColumn();
      col.appendChild(img);
      this.row.appendChild(col);

      const tag = img.dataset.galleryTag;
      if (tag) this.tags.add(tag);
    });
    this.setupListeners();
  }

  setupListeners() {
    const items = this.gallery.querySelectorAll('.gallery-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        if (this.options.lightBox && item.tagName === 'IMG') {
          this.openLightBox(item);
        }
      });
    });
  }

  createTagsBar() {
    const ul = document.createElement('ul');
    ul.className = 'my-4 tags-bar nav nav-pills';

    const allLi = document.createElement('li');
    allLi.className = 'nav-item';
    allLi.innerHTML = `<span class="nav-link active active-tag" data-toggle="all">Tous</span>`;
    ul.appendChild(allLi);

    this.tags.forEach(tag => {
      const li = document.createElement('li');
      li.className = 'nav-item';
      li.innerHTML = `<span class="nav-link" data-toggle="${tag}">${tag}</span>`;
      ul.appendChild(li);
    });

    if (this.options.tagsPosition === 'top') {
      this.gallery.insertBefore(ul, this.gallery.firstChild);
    } else {
      this.gallery.appendChild(ul);
    }
  }

  activateTagFilter() {
    this.gallery.querySelectorAll('.tags-bar .nav-link').forEach(btn => {
      btn.addEventListener('click', () => {
        this.gallery.querySelector('.active-tag')?.classList.remove('active', 'active-tag');
        btn.classList.add('active', 'active-tag');
        const filter = btn.dataset.toggle;

        this.row.querySelectorAll('.item-column').forEach(col => {
          const img = col.querySelector('.gallery-item');
          col.classList.add('hide');
          setTimeout(() => {
            if (filter === 'all' || img.dataset.galleryTag === filter) {
              col.style.display = 'block';
              setTimeout(() => col.classList.remove('hide'), 10);
            } else {
              col.style.display = 'none';
            }
          }, 300);
        });
      });
    });
  }

  createLightBox() {
    const lightboxHTML = `
      <div class="modal fade" id="${this.options.lightboxId}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body position-relative">
              ${this.options.navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;">&#8249;</div>' : ''}
              <img class="lightboxImage img-fluid" alt="Image agrandie"/>
              ${this.options.navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;">&#8250;</div>' : ''}
            </div>
          </div>
        </div>
      </div>`;
    this.gallery.insertAdjacentHTML('beforeend', lightboxHTML);
  }

  openLightBox(item) {
    const modal = document.getElementById(this.options.lightboxId);
    const img = modal.querySelector('.lightboxImage');
    img.src = item.src;
    new bootstrap.Modal(modal).show();
  }

  setupLightboxListeners() {
    const modal = document.getElementById(this.options.lightboxId);
    if (!modal || !this.options.navigation) return;

    modal.querySelector('.mg-prev')?.addEventListener('click', () => this.navigateLightbox(-1));
    modal.querySelector('.mg-next')?.addEventListener('click', () => this.navigateLightbox(1));
  }

  navigateLightbox(direction) {
    const lightboxImage = document.querySelector('.lightboxImage');
    const activeSrc = lightboxImage.src;
    const activeTag = this.gallery.querySelector('.active-tag')?.dataset.toggle || 'all';
    const images = Array.from(this.gallery.querySelectorAll('img.gallery-item')).filter(img => {
      return activeTag === 'all' || img.dataset.galleryTag === activeTag;
    });
    const currentIndex = images.findIndex(img => img.src === activeSrc);
    let nextIndex = (currentIndex + direction + images.length) % images.length;
    lightboxImage.src = images[nextIndex].src;
  }
}
