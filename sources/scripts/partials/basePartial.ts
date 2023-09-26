import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import $ from 'jquery/dist/jquery.min';

import scope from '@scripts/scope';

scope.partials.BasePartial = Marionette.View.extend({
  name: 'base-partial',
  constructor: function () {
    this.serviceData = {};
    this.callServiceList = [];

    if (this.partials) {
      this.regions = this.regions || {};

      for (const key in this.partials) {
        this.regions[key] = this.partials[key].region;
      }
    }

    return Marionette.View.prototype.constructor.apply(this, arguments);
  },
  render: function () {
    const result = Marionette.View.prototype.render.apply(this, arguments);

    for (const key in this._uiBindings) {
      this.ui[key].selector = this._uiBindings[key];
    }

    return result;
  },
  serializeData: function () {
    const self = this;
    const result = $.extend(
      {
        _regions: scope.regions,
        _name: self.name,
        _layout: self.getLayout().serializeData(),
        _parent: self._parent.serializeData(),
      },
      Marionette.View.prototype.serializeData.call(self),
      self.options ? self.options.data : {},
      self.serviceData,
    );

    return result;
  },
  load: function () {
    const self = this;
    const deferred = $.Deferred();

    deferred.name = self.name;
    deferred.type = 'partial-load';

    if (self.partials) {
      $.each(self.partials, (key, partial) => {
        const deferredPartial = $.Deferred();

        deferredPartial.name = self.name;
        deferredPartial.subname = key;
        deferredPartial.type = 'partial-child';

        partial.instance = new partial.partial(partial.options);
        partial.instance._parent = self;

        self.callServiceList.push(deferredPartial);
        partial.instance
          .load()
          .done(() => setTimeout(() => deferredPartial.resolve(), 100))
          .catch(() => deferredPartial.reject());
      });
    }

    $.when
      .apply($, self.callServiceList)
      .done(() => deferred.resolve(self))
      .catch(() => deferred.reject());

    return deferred;
  },
  populate: function () {
    const self = this;

    $.each(self.partials, (key, partial) => {
      const view = partial.instance;

      view.populate();
      self.getRegion(key).show(view);
    });
  },
  reload: function () {
    const self = this;

    return self.load().done(() => self.render());
  },
  serializeTemplate: function (data, context, insert) {
    const template = $(this.template(data));

    if (insert) {
      if (insert === 'append') {
        context.append(template.find(context.selector).html());
      }
    }
    if (insert === 'prepend') {
      context.prepend(template.find(context.selector).html());
    } else {
      context.html(template.find(context.selector).html());
    }
  },
  getLayout: function () {
    if (this._parent) {
      return this._parent.getLayout();
    }

    return this;
  },
  getPartials: function (name) {
    const self = this;

    let result: any[] = [];

    $.each(self.partials, (key, partial) => {
      if (key === name) {
        result.push(partial);
      } else {
        result = result.concat(partial.instance.getPartials(name));
      }
    });

    return result;
  },
});

export default scope.partials.BasePartial;
