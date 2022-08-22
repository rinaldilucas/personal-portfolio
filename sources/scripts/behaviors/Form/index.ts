import FormMasks from '@scripts/behaviors/form/masks/constructor';
import Form from '@scripts/behaviors/form/validate/constructor';

export default (options) => ({
    Form: {
        behaviorClass: Form,
        rules: options.rules
    },
    FormMasks: {
        behaviorClass: FormMasks,
        rules: options.rules
    }
});
