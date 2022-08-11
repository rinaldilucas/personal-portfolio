import scope from '../scope';
import AppRouter from 'marionette.approuter/lib/marionette.approuter.min';

import HomeEn from '../views/homeEn';
import HomeBr from '../views/homeBr';
import HomeEs from '../views/homeEs';

const AppController = {
    index: () => scope.app.go(new HomeEn()),
    br: () => scope.app.go(new HomeBr()),
    es: () => scope.app.go(new HomeEs())
};

scope.routes.Main = AppRouter.extend({
    controller: AppController,
    appRoutes: {
        '(/)(index.html)': 'index',
        '(/)br(/)(index.html)': 'br',
        '(/)es(/)(index.html)': 'es'
    }
});

export default scope.routes.Main;
