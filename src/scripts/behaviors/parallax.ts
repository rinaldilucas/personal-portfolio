import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import $ from 'jquery/dist/jquery.min';
import Parallax from 'parallax-js/dist/parallax.min';

import scope from '@scripts/scope';

export default scope.behaviors.Parallax = Marionette.Behavior.extend({
  ui: {
    parallaxes: '[data-parallax]',
  },
  onAttach: function (view) {
    this.build(view.$el);
  },
  build: function () {
    if (this.ui.parallaxes.length) {
      const parallaxList = this.ui.parallaxes;

      $.each(
        parallaxList,
        (index, object) => new Parallax(object, { relativeInput: true }),
      );
    }
  },
});
