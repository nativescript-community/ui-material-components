export default {
  install: Vue => {
    Vue.registerElement(
      'BottomNavigationBar',
      () => require('../').BottomNavigationBar,
    );
    Vue.registerElement(
      'BottomNavigationTab',
      () => require('../').BottomNavigationTab,
    );
  },
};
