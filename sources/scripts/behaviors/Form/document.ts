import mask from '@scripts/behaviors/form/masks/document';
import validate from '@scripts/behaviors/form/validate/document';

export default {
  mask: mask.mask,
  validate: {
    cleanOnSerialize: Object.keys(mask.mask.ui).map((item) => mask.mask.ui[item]),
    ...validate.validate,
  },
};
