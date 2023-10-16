export default class Scrolly {
  constructor(element) {
    this.element = element;

    //distance par rapport au view port
    this.options = {
      rootMargin: '0px 0px 0px 0px',
    };
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      this.watch.bind(this),
      this.options
    );

    //chercher tous les attributs data-scrolly
    const items = this.element.querySelectorAll('[data-scrolly]');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      this.observer.observe(item);
    }
  }

  //permet de savoir si les cards sont apparues
  watch(entries) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      //si il y a une intersection avec entry ajouter classe .is-active sinon l'enlever
      if (entry.isIntersecting) {
        target.classList.add('is-active');

        if (this.element.dataset.scrolly == 'fois') {
          this.observer.unobserve(target);
        } else {
          this.observer.observe(target);
        }
      } else {
        target.classList.remove('is-active');
      }
    }
  }
}
