import mask from '@app/scripts/behaviors/Form/masks/document';
import validate from '@app/scripts/behaviors/Form/validate/document';

export default {
  mask: mask.mask,
  validate: {
    cleanOnSerialize: Object.keys(mask.mask.ui).map((item) => mask.mask.ui[item]),
    ...validate.validate,
  },
};
