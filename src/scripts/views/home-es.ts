import scope from '@scripts/scope';
import Base from '@scripts/views/base-view';
import data from '../../../assets/data/database.json';
import resources from '../../../assets/i18n/es-es.json';

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
  template: require('@pages/es/home.hbs'),
  templateContext: {
    resources,
    portfolio: data['es-es'].portfolio,
    testimonials: data['es-es'].testimonials,
    repositories: data['es-es'].repositories,
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
    flag: '[data-flag-spanish]',
  },
  onAttach: function () {
    this.ui.flag.hide();
  },
});