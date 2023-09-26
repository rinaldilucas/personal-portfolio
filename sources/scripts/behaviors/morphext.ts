import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import 'morphext/dist/morphext.min';

import scope from '@scripts/scope';

scope.behaviors.Morphext = Marionette.Behavior.extend({
  ui: {
    morphext: '[data-morphext]',
  },
  onAttach: function (view) {
    this.build(view.$el);
  },
  build: function () {
    this.ui.morphext.Morphext({
      animation: 'bounceIn',
      separator: ',',
      speed: 4000,
    });
  },
});

export default scope.behaviors.Morphext;
