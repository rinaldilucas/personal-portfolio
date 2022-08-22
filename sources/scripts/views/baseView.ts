import defaultJson from '@scripts/data/default.json';
import helper from '@scripts/libraries/helpers';
import scope from '@scripts/scope';
import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

scope.views.BaseView = Marionette.View.extend({
    name: 'base-view',
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
    serializeData: function () {
        const object = {
            cdn_url: './',
            data: defaultJson
        };

        if (process.env.NODE_ENV === 'production') {
            object.cdn_url = './';
        }

        return $.extend(object, Marionette.View.prototype.serializeData.call(this), this.options.data);
    },
    load: function () {
        const self = this;
        const deferred = $.Deferred() as any;

        deferred.name = self.name;
        deferred.type = 'page-load';

        if (self.partials) {
            $.each(self.partials, (key, partial) => {
                const deferredPartial = $.Deferred() as any;

                deferredPartial.name = self.name;
                deferredPartial.subname = key;
                deferredPartial.type = 'page-child';

                if (partial.partial) {
                    partial.instance = new partial.partial.default(partial.options);
                }

                if (partial.instance) {
                    partial.instance._parent = self;
                    self.callServiceList.push(deferredPartial);

                    partial.instance
                        .load()
                        .done(() => setTimeout(() => deferredPartial.resolve(), 100))
                        .catch(() => deferredPartial.reject());
                }
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
            if (!scope.config.localhost) { helper.replaceImagesForWebp(); }
        });
    },
    reload: function () {
        const self = this;

        return self.load().done(() => self.render());
    },
    getLayout: function () {
        if (this._parent) { return this._parent.getLayout(); }

        return this;
    },
    getPartials: function (name) {
        const self = this;
        let result: string[] = [];

        $.each(self.partials, (key, partial) => {
            if (key === name) {
                result.push(partial);
            } else {
                result = result.concat(partial.instance.getPartials(name));
            }
        });

        return result;
    }
});

export default scope.views.BaseView;
