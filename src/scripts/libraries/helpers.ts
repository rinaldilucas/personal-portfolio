import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import 'jquery.scrollto/jquery.scrollTo.min';
import when from 'when/dist/browser/when.min';

const Helper = Marionette.Object.extend({
  anchor: function (where) {
    const self = this;

    setTimeout(() => {
      let offtop = ($(window) as any).scrollTop();
      let discount = $('.navigation').height() === undefined ? 0 : ($('.navigation').height() as number);

      if ($.isNumeric(where)) {
        offtop = where;
      } else {
        window.location.hash = where;
        where = where.replace(/['"/<>!]/gim, '');
        const element = $(where);

        if (where === '#home' || where === '#highlight') {
          ($(window) as any).scrollTo(1, 750, {
            interrupt: self.isDesktop,
            axis: 'y',
          });

          return;
        }
        if (element.data('anchor-scroll-align') === 'bottom') {
          discount = ((element.height() as number) - Math.abs(($(window) as any).height())) * -1;
        }

        offtop = (element as any).offset().top;
      }

      ($(window) as any).scrollTo(offtop - (discount as number), 750, {
        interrupt: self.isDesktop,
        axis: 'y',
      });
    }, 200);
  },
  loadImage: function (source) {
    const deferred = when.defer();
    const imgElement = document.createElement('img');

    imgElement.onload = (): void => deferred.resolve(imgElement);
    imgElement.onerror = (): void => deferred.reject(new Error(`Image not found: ${source.src}`));

    imgElement.src = source.src || source;

    return deferred.promise;
  },
  loadImages: function (sources) {
    const deferredArray: any[] = [];
    const self = this;

    $.each(sources, (_index, element) => {
      if (element.src) {
        deferredArray.push(self.loadImage(element));
      }
    });

    return when.all(deferredArray);
  },
  replaceImagesForWebp: () => {
    const isChromium = (window as any).chrome;
    const isOpera = (window as any).opera;

    const imagesElement = $('img');

    if (isChromium || isOpera) {
      $.each(imagesElement, (_index, element) => {
        if ((element as HTMLImageElement).src) {
          const validExtensions = 'jpeg,jpg,png';

          if (validExtensions.includes((element as HTMLImageElement).src.replace(/^.*\./, ''))) {
            $(element).attr('src', (element as HTMLImageElement).src + '.webp');
          }
        }
      });
    }
  },
});

export default new Helper();
