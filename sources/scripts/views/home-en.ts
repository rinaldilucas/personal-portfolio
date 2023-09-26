import data from '@scripts/data/default.json';
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
    portfolio: data.portfolio,
    testimonials: data.testimonials,
    repositories: data.repositories,
    tags: data.tags,
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
});