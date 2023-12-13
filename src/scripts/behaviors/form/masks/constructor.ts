import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

($.fn as any).maskClear = function () {
  const fn = $(this).data('maskClearFn');

  return fn
    ? fn.apply(this)
    : (($(this).val() || '') as any).replace(
        $(this).data('maskClearRegex') || /^$/,
        '',
      );
};

export default Marionette.Behavior.extend({
  ui: {
    FormMasksForm: 'form:not([data-form-bypass])',
  },
  onRender: function () {
    this.onAttach();
  },
  onAttach: function () {
    const self = this;

    this.ui.FormMasksForm.each((index, element) => self.formListener(element));
  },
  formListener: function (form) {
    const rules = this.getOption('rules');

    if (rules) {
      for (let rule = 0; rule < rules.length; rule++) {
        const mask = rules[rule].default
          ? rules[rule].default.mask
          : rules[rule].mask;

        if (mask && mask.listener) {
          mask.listener(form);
        }
      }
    }
  },
});
