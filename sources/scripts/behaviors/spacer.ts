import scope from '../scope';
import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import $ from 'jquery/dist/jquery.min';

scope.behaviors.Spacer = Marionette.Behavior.extend({
    ui: {
        spacers: '[data-height]'
    },
    onAttach: function (view) {
        this.build(view.$el);
    },
    build: function () {
        $.each(this.ui.spacers, (index, object) => {
            const size = $(object).data('height');

            $(object).css('height', size * 0.01 + 'rem');
        });
    }
});

export default scope.behaviors.Spacer;
