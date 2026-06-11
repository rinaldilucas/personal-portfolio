import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

import scope from '@scripts/scope';

export default scope.behaviors.ScrollProgress = Marionette.Behavior.extend({
  onAttach: function () {
    this.build();
  },
  build: function () {
    $(window).on('scroll', () => {
      const scrollTop = $(window).scrollTop() || 0;
      const docHeight = $(document).height() || 1;
      const winHeight = $(window).height() || 0;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

      $('#main').css('--scroll-progress', `${scrollPercent}%`);
    });
  },
});
