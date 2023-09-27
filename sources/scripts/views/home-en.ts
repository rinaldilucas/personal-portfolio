import data from '@app/data/database.json';
import resources from '@app/i18n/en-us.json';
import scope from '@scripts/scope';
import Base from '@scripts/views/base-view';

import BackgroundColor from '@scripts/behaviors/background-color';
import Captcha from '@scripts/behaviors/captcha';
import Carousel from '@scripts/behaviors/carousel';
import CopyToClipboard from '@scripts/behaviors/copy-to-clipboard';
import Form from '@scripts/behaviors/form';
import Header from '@scripts/behaviors/header';
import Morphext from '@scripts/behaviors/morphext';
import Parallax from '@scripts/behaviors/parallax';
import PortfolioViewer from '@scripts/behaviors/portfolio-viewer';
import Spacer from '@scripts/behaviors/spacer';
import Waypoint from '@scripts/behaviors/waypoint';

export default scope.views.Home = Base.extend({
  template: require('@templates/pages/home.hbs'),
  templateContext: {
    resources,
    portfolio: data['en-us'].portfolio,
    testimonials: data['en-us'].testimonials,
    repositories: data['en-us'].repositories,
    tags: data.general.tags,
    captchaSecret: process.env.CAPTCHA_SECRET,
    getformApiKey: process.env.GETFORM_API_KEY,
  },
  name: 'home',
  behaviors: {
    Header,
    CopyToClipboard,
    Spacer,
    Carousel,
    Parallax,
    Morphext,
    Background: BackgroundColor,
    Waypoint,
    PortfolioViewer,
    Captcha,
    ...Form({
      rules: [require('@scripts/behaviors/Form/Commons')],
    }),
  },
  ui: {
    flag: '[data-flag-english]',
  },
  onAttach: function () {
    this.ui.flag.hide();
  },
});