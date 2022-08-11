import data from '../data/default.json';
import scope from '../scope';
import Base from './baseView';

import BackgroundColor from '../behaviors/backgroundColor';
import Carousel from '../behaviors/carousel';
import CopyToClipboard from '../behaviors/copyToClipboard';
import Form from '../behaviors/Form';
import Header from '../behaviors/header';
import Morphext from '../behaviors/morphext';
import Parallax from '../behaviors/parallax';
import PortfolioViewer from '../behaviors/portfolioViewer';
import Spacer from '../behaviors/spacer';
import Waypoint from '../behaviors/waypoint';

scope.views.Home = Base.extend({
    template: require('templates/pages/es/home.hbs'),
    templateContext: {
        portfolio: data.portfolio,
        testimonials: data.testimonials,
        repositories: data.repositories,
        tags: data.tags
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
        ...Form({
            rules: [require('../behaviors/Form/Commons')]
        })
    }
});

export default scope.views.Home;
