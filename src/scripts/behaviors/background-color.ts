import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

import scope from '@scripts/scope';

export default scope.behaviors.BackgroundColor = Marionette.Behavior.extend({
  ui: {
    backgrounds: '[data-color]',
  },
  onAttach: function (view) {
    this.build(view.$el);
  },
  build: function () {
    $.each(this.ui.backgrounds, (index, object) => {
      const color = $(object).data('color');
      $(object).css('backgroundColor', color);
    });
  },
});
