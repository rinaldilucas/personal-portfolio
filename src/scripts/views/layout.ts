import Backbone from 'backbone';

import scope from '@scripts/scope';
import Base from '@scripts/views/base-view';

let firstLoop = true;

export default scope.views.Layout = Base.extend({
  name: 'layout',
  el: '#main',
  partials: {
    content: {
      region: '#site-content',
    },
  },
  initialize: function () {
    const self = this;
    let last: string;

    self.getRegion('content').on('show', (_layout, view) => {
      if (!firstLoop) {
        $('body').addClass('page-changed');
      }
      $('body')
        .removeClass(last)
        .addClass((last = view.name));

      setTimeout(() => {
        firstLoop = false;
        $('body').removeClass('page-changed').removeClass('on-loading').addClass('on-loaded');
        $('.loading').addClass('loaded');

        $('#preloader').delay(350).fadeOut('slow');
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

        if (!isChrome) {
          (document.getElementsByClassName('infinityChrome')[0] as HTMLElement).style.display = 'none';
          (document.getElementsByClassName('infinity')[0] as HTMLElement).style.display = 'block';
        }
      }, 500);
    });
  },
  go: function (view, callback) {
    const self = this;

    self.partials.content.instance = view;
    $('body').addClass('on-loading');

    self
      .load()
      .done((response) => {
        if (response.error) {
          return Backbone.history.navigate('error', { trigger: true });
        }

        self.populate();
        scope.app.started = true;

        if (typeof callback === 'function') {
          callback();
        }
      })
      .catch(() => {
        if (typeof callback === 'function') {
          callback();
        }
      });
  },
});
