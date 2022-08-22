import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import WOW from 'wow.js/dist/wow.min';
import helper from './libraries/helpers';

const Application = Marionette.Application.extend({
    el: function () {
        return this.layout.$el.find('#content');
    },
    go: function (view) {
        const self = this;

        this.layout.go(view, () => (self.sections = $('section[data-anchor-scroll]')));
    },
    anchor: function (where) {
        helper.anchor(where);
    },
    onStart: function () {
        const self = this;
        const imageSrcArray = document.images;

        $('body').addClass('on-loading');

        helper
            .loadImages(imageSrcArray)
            .then(
                (imageArray) => imageArray.length,
                (error) => {
                    console.log(error);
                    $('body').removeClass('on-loading').addClass('on-loaded');
                    $('.loading').addClass('loaded');
                }
            )
            .then(() => {
                $('body').removeClass('on-loading').addClass('on-loaded');
                $('.loading').addClass('loaded');

                const hash = document.location.hash;

                if (hash) {
                    $(window).scrollTop(0);
                    self.anchor(hash);
                }

                setTimeout(() => (self.loaded = true), 300);
            });

        $(window)
            .scroll(() => {
                const top = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY;

                self.trigger('scroll', { top, width: $(window).width(), height: $(window).height() });
            })
            .resize(() => {
                const top = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY;

                self.trigger('resize', { top, width: $(window).width(), height: $(window).height() });
            })
            .mousemove((e) => self.trigger('mousemove', { left: e.pageX, top: e.pageY }))
            .mousemove((e) => self.trigger('mousemove', { left: e.pageX, top: e.pageY }))
            .keydown((e) => {
                switch (e.key) {
                case 'Escape':
                    self.trigger('esc');
                    break;
                default:
                }
            });
        $(document)
            .on('mouseup', () => self.trigger('mouseup'))
            .on('mousemove', (e) => self.trigger('mousemove', { left: e.pageX, top: e.pageY }))
            .on('touchend', () => self.trigger('touchend'))
            .on('touchmove', (e) => self.trigger('touchmove', { left: e.touches[0].pageX, top: e.touches[0].pageY }));
    },
    initialize: function () {
        setTimeout(() => new WOW().init(), 0);

        this.sections = $('section[data-anchor-scroll]');
        const self = this;
        let last = false;

        ($.fn as any).shuffle = () => {
            let j;

            for (let i = 0; i < this.length; i++) {
                j = Math.floor(Math.random() * this.length);
                $(this[i]).before($(this[j]));
            }

            return this;
        };

        $(window)
            .scroll(function () {
                const top = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY;
                let current;

                self.trigger('scroll', { top });

                for (let i = 0; i < self.sections.length; i++) {
                    const element = $(self.sections[i]);

                    const elementTop = element.position().top;

                    if (elementTop - top <= ($(window).height() as number) / 4) {
                        current = element;
                    }
                }

                if (current && current.attr('data-anchor-scroll') && current.attr('data-anchor-scroll') !== last) {
                    if (!self.loaded) return;

                    last = current.attr('data-anchor-scroll');
                    const menuLinks = $('[data-header-link]');

                    if (last.toString() === '#') {
                        document.location.hash = '!';
                        menuLinks.removeClass('active');
                        return;
                    }

                    document.location.hash = '#!' + last;
                    menuLinks.each(function () {
                        if (last.toString() === ($(this).attr('data-header-link') as any).replace('#', '')) {
                            $(this).addClass('active');

                            const pos = ($(this).offset() as any).left;
                            const scrollPos = $('.navigation__container').scrollLeft();
                            const offset = parseInt($('.navigation').css('padding-left'));

                            $('.navigation__container').animate({ scrollLeft: (scrollPos as number) + pos - offset }, 100);
                        } else {
                            $(this).removeClass('active');
                        }
                    });
                }
            })
            .resize(() => {
                const top = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY;

                self.trigger('resize', { top, width: $(window).width(), height: $(window).height() });
            });
    }
});

export default new Application();
