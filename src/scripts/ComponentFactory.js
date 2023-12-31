import Scrolly from './components/Scrolly';
import Header from './components/header';

export default class ComponentFactory {
  constructor() {
    //list pour la boucle
    this.componentList = {
      Scrolly,
      Header,
    };

    this.init();
  }

  //boucle permettant de défiler dans les scripts importés
  init() {
    const components = document.querySelectorAll('[data-component]');
    console.log(components);

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        new this.componentList[componentName](element);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
