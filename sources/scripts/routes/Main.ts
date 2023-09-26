import AppRouter from 'marionette.approuter/lib/marionette.approuter.min';

import scope from '@scripts/scope';
import HomeBr from '@scripts/views/homeBr';
import HomeEn from '@scripts/views/homeEn';
import HomeEs from '@scripts/views/homeEs';

const AppController = {
  index: () => scope.app.go(new HomeEn()),
  br: () => scope.app.go(new HomeBr()),
  es: () => scope.app.go(new HomeEs()),
};

scope.routes.Main = AppRouter.extend({
  controller: AppController,
  appRoutes: {
    '(/)(index.html)': 'index',
    '(/)br(/)(index.html)': 'br',
    '(/)es(/)(index.html)': 'es',
  },
});

export default scope.routes.Main;
