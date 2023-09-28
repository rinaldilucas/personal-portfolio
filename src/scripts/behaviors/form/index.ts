import FormMasks from '@app/scripts/behaviors/Form/masks/constructor';
import Form from '@app/scripts/behaviors/Form/validate/constructor';

export default (options) => ({
  Form: {
    behaviorClass: Form,
    rules: options.rules,
  },
  FormMasks: {
    behaviorClass: FormMasks,
    rules: options.rules,
  },
});
