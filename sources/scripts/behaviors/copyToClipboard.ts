import scope from '@scripts/scope';
import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import ClipboardJS from 'clipboard/dist/clipboard.min';
import Toastify from 'toastify-js';

scope.behaviors.CopyToClipboard = Marionette.Behavior.extend({
  onAttach: function (view) {
    this.build(view.$el);
  },
  build: function (element) {
    if (element.data('clipboard')) {
      return;
    }

    element.data(
      'clipboard',
      new ClipboardJS('[data-copy]', {
        container: element[0],
        text: (trigger) => trigger.getAttribute('data-copy') as string
      })
    );

    element.data('clipboard').on('success', () => {
      Toastify({
        text: 'Pix copiado!',
        duration: 5000,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        className: 'toast'
      }).showToast();
    });

    element.data('clipboard').on('error', () => {
      Toastify({
        text: 'Erro ao copiar',
        duration: 5000,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        className: 'toast'
      }).showToast();
    });
  }
});

export default scope.behaviors.CopyToClipboard;
