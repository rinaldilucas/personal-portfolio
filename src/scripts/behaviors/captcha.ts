import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

import scope from '@scripts/scope';

export default scope.behaviors.Captcha = Marionette.Behavior.extend({
  ui: {
    recaptcha: '[data-recaptcha]',
  },
  onAttach: function (view) {
    this.build(view.$el);
  },
  build: function () {
    const self = this;

    $.getScript('https://www.google.com/recaptcha/api.js');
    (window as any).recaptchaCallback = (): void => self.ui.recaptcha.valid();
  },
});
