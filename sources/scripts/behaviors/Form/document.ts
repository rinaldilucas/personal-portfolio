import mask from '@scripts/behaviors/form/masks/commons';
import validate from '@scripts/behaviors/form/validate/commons';

export default {
    mask: mask.mask,
    validate: {
        cleanOnSerialize: Object.keys(mask.mask.ui).map((item) => mask.mask.ui[item]),
        ...validate.validate
    }
};
