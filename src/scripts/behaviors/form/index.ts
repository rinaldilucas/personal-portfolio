import FormMasks from '@app/scripts/behaviors/form/masks/constructor';
import Form from '@app/scripts/behaviors/form/validate/constructor';

export default (options): any => ({
  Form: {
    behaviorClass: Form,
    rules: options.rules,
  },
  FormMasks: {
    behaviorClass: FormMasks,
    rules: options.rules,
  },
});
