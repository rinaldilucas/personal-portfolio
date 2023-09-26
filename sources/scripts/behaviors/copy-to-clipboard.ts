import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import ClipboardJS from 'clipboard/dist/clipboard.min';
import Toastify from 'toastify-js';

import scope from '@scripts/scope';

export default scope.behaviors.CopyToClipboard = Marionette.Behavior.extend({
  onAttach: function (view) {
    this.build(view.$el);
  },
  build: function (element) {
    if (element.data('clipboard')) {
      return;
    }

    let language = 'enUs';
    if (window.location.pathname.indexOf('/') > -1) { language = 'enEs'; }
    if (window.location.pathname.indexOf('/br') > -1) { language = 'ptBr'; }
    if (window.location.pathname.indexOf('/es') > -1) { language = 'esEs'; }

    let successMessage;
    let errorMessage;
    if (language === 'ptBr') {
      successMessage = 'Valor copiado';
      errorMessage = 'Erro ao copiar';
    } else if (language === 'esEs') {
      successMessage = 'Valor copiado';
      errorMessage = 'Error al copiar';
    } else {
      successMessage = 'Copied value';
      errorMessage = 'Error copying';
    }

    element.data(
      'clipboard',
      new ClipboardJS('[data-copy]', {
        container: element[0],
        text: (trigger) => trigger.getAttribute('data-copy') as string,
      }),
    );

    element.data('clipboard').on('success', () => {
      Toastify({
        text: successMessage,
        duration: 3000,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        className: 'toast',
      }).showToast();
    });

    element.data('clipboard').on('error', () => {
      Toastify({
        text: errorMessage,
        duration: 8000,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        className: 'toast',
      }).showToast();
    });
  },
});