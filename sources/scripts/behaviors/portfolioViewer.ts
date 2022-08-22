import scope from '@scripts/scope';
import Marionette from 'backbone.marionette/lib/backbone.marionette.min';

scope.behaviors.PortfolioViewer = Marionette.Behavior.extend({
    ui: {
        closeButton: '[data-close]',
        backButton: '[data-back]',
        portfolioPicker: '[data-portfolio-picker]',
        portfolioAnchor: '[data-portfolio-anchor]',
        pickerOverlay: '[data-picker-overlay]',
        disclaimerText: '[data-disclaimer-replace]',
        viewerOverlay: '[data-viewer-overlay]',
        viewerWrapper: '[data-viewer-wrapper]',
        overlayImage: '[data-overlay-image]',
        overlayFrame: '[data-overlay-frame]'
    },
    events: {
        'click @ui.closeButton': 'closePicker',
        'click @ui.backButton': 'backViewer',
        'click @ui.portfolioPicker': 'openVersionPicker',
        'click @ui.portfolioAnchor': 'openviewerOverlay'
    },
    onAttach: function (view) {
        this.build(view.$el);
    },
    build: function () {
        const self = this;

        $(document).on('keypress', e => {
            if (e.key === 'Escape') {
                if (self.ui.viewerOverlay.hasClass('overlay--openned')) {
                    self.ui.viewerOverlay.removeClass('overlay--openned');
                } else {
                    self.ui.pickerOverlay.removeClass('overlay--openned');
                }
            }
        });
    },
    openviewerOverlay: function (e: Event) {
        const disclaimer = $(e.currentTarget as HTMLAnchorElement).data('disclaimer') ?? $(e.currentTarget as HTMLAnchorElement).data('disclaimer');
        const imagePath = $(e.currentTarget as HTMLAnchorElement).data('image');

        this.ui.disclaimerText.html(disclaimer);
        this.ui.disclaimerText.data('imagePath', imagePath);
        this.ui.pickerOverlay.addClass('overlay--openned');
    },
    closePicker: function () {
        this.ui.pickerOverlay.removeClass('overlay--openned');
    },
    openVersionPicker: function (e: Event) {
        const version = $(e.currentTarget as HTMLAnchorElement).data('portfolioPicker');
        const filename = this.ui.disclaimerText.data('imagePath');
        let fullPath = `./assets/images/portfolio/${filename}-${version}.jpg`;

        if (!scope.config.localhost) { fullPath += '.webp'; }

        if (version === 'desktop') {
            this.ui.viewerWrapper.addClass('overlay__viewer--desktop').removeClass('overlay__viewer--mobile');
            this.ui.overlayFrame.addClass('overlay__frame--desktop');
        } else {
            this.ui.viewerWrapper.addClass('overlay__viewer--mobile').removeClass('overlay__viewer--desktop');
            this.ui.overlayFrame.addClass('overlay__frame--mobile');
        }

        this.ui.viewerOverlay.addClass('overlay--openned');
        this.ui.overlayImage.attr('src', fullPath);

        setTimeout(() => {
            this.ui.overlayImage.addClass('overlay--openned');
            this.ui.overlayImage.show();
            this.ui.overlayImage.focus();
        }, 350);
    },
    backViewer: function () {
        this.ui.pickerOverlay.removeClass('overlay--openned').addClass('overlay--openned');
        this.ui.viewerOverlay.removeClass('overlay--openned');
        setTimeout(() => {
            this.ui.overlayImage.attr('src', '').removeClass('overlay--openned').hide();
            this.ui.overlayFrame.removeClass('overlay__frame--desktop').removeClass('overlay__frame--mobile');
        }, 300);
    }
});

export default scope.behaviors.PortfolioViewer;
