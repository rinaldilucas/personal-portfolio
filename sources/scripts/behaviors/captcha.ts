import scope from '@scripts/scope';
import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

scope.behaviors.Captcha = Marionette.Behavior.extend({
    ui: {
        recaptcha: '[data-recaptcha]'
    },
    onAttach: function (view) {
        this.build(view.$el);
    },
    build: function () {
        const self = this;

        $.getScript('https://www.google.com/recaptcha/api.js');
        (window as any).recaptchaCallback = () => self.ui.recaptcha.valid();
    }
});

export default scope.behaviors.Captcha;
