import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

import scope from '@scripts/scope';

export default scope.behaviors.Header = Marionette.Behavior.extend({
  ui: {
    menuButton: '[data-header-toggle]',
    menuNav: '[data-header-nav]',
    menuLink: '[data-header-link]',
    menuLabel: '[data-header-label]',
    menuCopyright: '[data-header-copyright]',
    darkModeButton: '[data-toggle-dark-mode]',
  },
  events: {
    'click @ui.menuButton': 'toggleMenu',
    'click @ui.menuLink': 'closeMenu',
    'click @ui.darkModeButton': 'toggleDarkMode',
  },
  onAttach: function (view) {
    this.build(view.$el);
  },
  build: function () {
    const self = this;

    this.ui.menuCopyright.html(`50.762.113/0001-00 <br>© ${new Date().getFullYear()} Rinaldi, Lucas F.`);

    $(document).on('mouseup', (event: any) => {
      if (
        !$(self.ui.menuNav).is(event.target) &&
        $(self.ui.menuNav).has(event.target).length === 0 &&
        !$(self.ui.menuLabel).is(event.target) &&
        $(self.ui.menuLabel).has(event.target).length === 0 &&
        !event.target.hasAttribute('data-outer-link')
      ) {
        $('html').removeClass('active-menu');
        $('.header__button input').prop('checked', false);
      }
    });

    if (localStorage.getItem('dark-mode') === 'true') {
      $('html').addClass('dark');
    }
  },
  toggleMenu: () => {
    $('html').toggleClass('active-menu');
    if (!$('html').hasClass('active-menu')) {
      $('.header__button input').prop('checked', false);
    }
  },
  closeMenu: () => {
    $('html').removeClass('active-menu');
    $('.header__button input').prop('checked', false);
  },
  toggleDarkMode: () => {
    $('html').toggleClass('dark');
    const isDarkMode = $('html').hasClass('dark');
    localStorage.setItem('dark-mode', isDarkMode.toString());
  },
});
