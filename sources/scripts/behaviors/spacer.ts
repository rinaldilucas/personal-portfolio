import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

import scope from '@scripts/scope';

export default scope.behaviors.Spacer = Marionette.Behavior.extend({
  ui: {
    spacers: '[data-height]',
  },
  onAttach: function (view) {
    this.build(view.$el);
  },
  build: function () {
    $.each(this.ui.spacers, (index, object) => {
      const size = $(object).data('height');

      $(object).css('height', size * 0.01 + 'rem');
    });
  },
});