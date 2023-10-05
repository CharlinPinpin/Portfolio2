export default class Header {
  constructor(element) {
    this.element = element;

    //var utilisées dans la script
    this.scrollPosition = 0;
    this.html = document.documentElement;
    this.lastScrollPosition = 0;

    this.init();
    this.initNavMobile();
  }

  //méthode d'initialisation
  init() {
    //permet de changer la limit selon le attribut data
    if (this.element.dataset.header == 'cache') {
      this.scrollLimit = 0;
    } else if (this.element.dataset.header == 'limit') {
      this.scrollLimit = 0.3;
    }

    //permet d'écouter le scroll
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  //Permet de trouver la position du scroll
  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setHeaderState();
    this.setDirectionState();
  }

  //Permet de set si le header est caché ou pas
  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;

    if (this.scrollPosition > scrollHeight * this.scrollLimit) {
      this.html.classList.add('header-is-hidden');
    } else {
      this.html.classList.remove('header-is-hidden');
    }
  }

  //Trouver la direction du scroll
  setDirectionState() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  //permet de cliquer sur le menu hamburger pour la version mobile
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  //toggle le header
  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
