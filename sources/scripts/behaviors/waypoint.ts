import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import 'waypoints/lib/jquery.waypoints';

import scope from '@scripts/scope';

scope.behaviors.Waypoint = Marionette.Behavior.extend({
  ui: {
    progressItem: '.about__progress-item',
    progressBar: '.about__progress-bar',
  },
  onAttach: function (view) {
    this.build(view.$el);
  },
  build: function () {
    const self = this;

    (this.ui.progressItem as any).waypoint({
      handler: () => {
        if (self.ui.progressBar instanceof jQuery) {
          self.ui.progressBar.each(function () {
            const barValue = $(this).attr('aria-valuenow') + '%';
            $(this).animate({ width: barValue }, { easing: 'linear' });
          });
        }
      },
      context: '.about__progress-item',
      offset: '50%',
    });
  },
});

export default scope.behaviors.Waypoint;
