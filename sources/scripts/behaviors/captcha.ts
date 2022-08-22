import scope from '@scripts/scope';
import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

scope.behaviors.Captcha = Marionette.Behavior.extend({
    onAttach: function (view) {
        this.build(view.$el);
    },
    build: function () {
        $.getScript('https://www.google.com/recaptcha/api.js');
    }
});

export default scope.behaviors.Captcha;
