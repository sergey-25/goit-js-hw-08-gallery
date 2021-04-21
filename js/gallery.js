import galleryItems from '../gallery-items.js';

const elemRefs = {
  gallery: document.querySelector('.js-gallery'),
  closeBtn: document.querySelector('.lightbox__button'),
  modal: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
};

const galleryMarkup = galleryItems
  .map((item, i) => {
    return `<li class="gallery__item">
      <a
        class="gallery__link"
        href=${item.original}
      >
        <img
          class="gallery__image"
          src=${item.preview}
          data-source=${item.original}
          data-index=${i}
          alt=${item.description}
        />
      </a>
    </li>`;
  })
  .join('');

elemRefs.gallery.innerHTML = galleryMarkup;

elemRefs.gallery.addEventListener('click', event => {
  
  event.preventDefault();
  if (event.target.tagName !== 'IMG') return;
  
  elemRefs.modal.classList.add('is-open');
  
  elemRefs.modalImage.dataset.ind = event.target.dataset.index;
  elemRefs.modalImage.alt =
    galleryItems[+elemRefs.modalImage.dataset.ind].description;
  elemRefs.modalImage.src =
    galleryItems[+elemRefs.modalImage.dataset.ind].original;
  
  elemRefs.closeBtn.addEventListener('click', () => {
    closeLightBox();
  });
 
  elemRefs.modal.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
      return;
    }
    closeLightBox();
  });
  window.addEventListener('keyup', controlKeyboardEvents);
});

function setModalImageAttribute(index, step) {
  elemRefs.modalImage.src = galleryItems[index + step].original;
  elemRefs.modalImage.alt = galleryItems[index + step].alt;
  elemRefs.modalImage.dataset.ind = `${index + step}`;
  console.log(elemRefs.modalImage.dataset.ind);
}
function controlKeyboardEvents(event) {
  if (event.code === 'Escape') {
    closeLightBox();
  }
  if (event.code === 'ArrowRight') {
    pressRight();
  }
  if (event.code === 'ArrowLeft') {
    pressLeft();
  }
}
function closeLightBox() {
  elemRefs.modal.classList.remove('is-open');
  elemRefs.modalImage.src = '';
  elemRefs.modalImage.alt = '';
  window.removeEventListener('keyup', controlKeyboardEvents);
}
function pressRight() {
  let index = Number(elemRefs.modalImage.dataset.ind);
  if (index === galleryItems.length - 1) return;
  setModalImageAttribute(index, 1);
}
function pressLeft() {
  let index = +elemRefs.modalImage.dataset.ind;
  if (index === 0) return;
  setModalImageAttribute(index, -1);
}