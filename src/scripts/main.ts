import Init from '@root/src/scripts/routes/init';
import App from '@scripts/app';
import scope from '@scripts/scope';
import Main from '@scripts/views/init';

((context): void => {
  ('use strict');

  const base: any = (document.getElementById('base-id') as HTMLAnchorElement).href.split(location.host).pop();

  context.app = App;
  context.config = {
    urls: {
      base,
      origin: location.protocol + '//' + location.hostname,
      site: location.href.replace('index.html', ''),
    },
    localhost: window.location.host.indexOf('localhost') > -1,
  };
  context.app.on('start', Main);
  context.app.on('start', Init);
  context.app.start();
})(scope);
