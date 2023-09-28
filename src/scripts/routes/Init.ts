import Backbone from 'backbone';
import Uri from 'urijs';

import helpers from '@scripts/libraries/helpers';
import Route from '@scripts/routes/main';
import scope from '@scripts/scope';

export default scope.routes.Init = function () {
  const root: any = (this.root = new Uri(($('#base-id').get(0) as HTMLBaseElement).href));

  new Route();

  Backbone.history.start({
    pushState: true,
    hashChange: false,
    root: root.pathname(),
  });

  const navigate = (url, replace?, noAnchor?) => {
    url = url.replace('./', '');

    const full = root as string;
    const fragment = url + '/' === full ? '' : url.replace(full, '');
    const parts = fragment.split('#');
    const matches = Backbone.history.navigate(parts[0], {
      trigger: true,
      replace,
    });

    if (parts[1]) {
      window.history.replaceState({}, document.title, url);
      !noAnchor && helpers.anchor('#' + parts[1]);
    } else if (window.location.href.indexOf('#') > -1) {
      const uri = window.location.href.substr(0, window.location.href.indexOf('#'));

      window.history.replaceState({}, document.title, uri);
      !noAnchor && helpers.anchor(0);
    } else if (typeof matches === 'undefined') {
      !noAnchor && helpers.anchor(0);
    } else {
      !noAnchor && helpers.anchor(0);
    }

    scope.app.trigger('routed');
  };

  scope.app.navigate = navigate;

  $('#main').on('click', 'a:not([data-bypass])', (event) => {
    const link = event.currentTarget;

    if (link.tagName.toUpperCase() !== 'A') { return; }
    if (link.target === '_blank') { return; }
    if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) { return; }
    if (location.protocol !== link.protocol || location.hostname !== link.hostname) { return; }
    if (event.isDefaultPrevented()) { return; }
    event.preventDefault();
    setTimeout(() => navigate(link.href), 1);
  });
};