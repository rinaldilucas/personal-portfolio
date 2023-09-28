import $ from 'jquery/dist/jquery';

const scope = ((window as any).PROJECT = (window as any).PROJECT || {});

scope.$ = (window as any).$ = (window as any).jQuery = $;
scope.regions = {};
scope.views = {};
scope.partials = {};
scope.modals = {};
scope.behaviors = {};
scope.routes = {};
export default scope;
