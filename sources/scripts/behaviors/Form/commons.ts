import mask from './Masks/commons';
import validate from './Validate/commons';

export default {
    mask: mask.mask,
    validate: {
        cleanOnSerialize: Object.keys(mask.mask.ui).map((item) => mask.mask.ui[item]),
        ...validate.validate
    }
};
