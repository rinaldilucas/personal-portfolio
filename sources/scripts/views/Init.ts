import scope from '../scope';
import _Layout from './layout';

scope.views.Init = function () {
    const Layout = _Layout;

    this.layout = new Layout();
    this.layout.triggerMethod('attach');
};

export default scope.views.Init;
