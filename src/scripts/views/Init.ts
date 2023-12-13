import scope from '@scripts/scope';
import _Layout from '@scripts/views/layout';

export default scope.views.Init = function () {
  const Layout = _Layout;

  this.layout = new Layout();
  this.layout.triggerMethod('attach');
};
