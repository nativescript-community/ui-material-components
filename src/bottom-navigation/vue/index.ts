export default {
  install: (Vue) => {
    Vue.registerElement('BottomNavigation', () => require('../').BottomNavigation);
    Vue.registerElement('BottomNavigationTab', () => require('../').BottomNavigationTab);
  },
};
