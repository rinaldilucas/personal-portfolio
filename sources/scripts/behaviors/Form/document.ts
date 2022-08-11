import mask from './Masks/document';
import validate from './Validate/document';

export default {
    mask: mask.mask,
    validate: {
        cleanOnSerialize: Object.keys(mask.mask.ui).map((item) => mask.mask.ui[item]),
        ...validate.validate
    }
};
