import Form from './Validate/constructor';
import FormMasks from './Masks/constructor';

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
