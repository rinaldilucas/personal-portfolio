export default {
    validate: {
        methods: function (validator) {
            validator.addMethod('document', (value, element) => this.optional(element) || validator.methods.cpf.apply(this, arguments) || validator.methods.cnpj.apply(this, arguments));
        }
    }
};
