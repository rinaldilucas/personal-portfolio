import AppRouter from 'marionette.approuter/lib/marionette.approuter.min';

import scope from '@scripts/scope';
import HomeBr from '@scripts/views/home-br';
import HomeEn from '@scripts/views/home-en';
import HomeEs from '@scripts/views/home-es';

const AppController = {
  index: () => scope.app.go(new HomeEn()),
  br: () => scope.app.go(new HomeBr()),
  es: () => scope.app.go(new HomeEs()),
};

export default scope.routes.main = AppRouter.extend({
  controller: AppController,
  appRoutes: {
    '(/)(index.html)': 'index',
    '(/)br(/)(index.html)': 'br',
    '(/)es(/)(index.html)': 'es',
  },
});