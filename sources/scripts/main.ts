import Init from '@app/scripts/routes/init';
import App from '@scripts/app';
import scope from '@scripts/scope';
import Main from '@scripts/views/init';

((scope) => {
    ('use strict');

    const base: any = (document.getElementById('base-id') as HTMLAnchorElement).href.split(location.host).pop();

    scope.app = App;
    scope.config = {
        urls: {
            base,
            origin: location.protocol + '//' + location.hostname,
            site: location.href.replace('index.html', '')
        },
        localhost: window.location.host.indexOf('localhost') > -1
    };
    scope.app.on('start', Main);
    scope.app.on('start', Init);
    scope.app.start();
})(scope);
