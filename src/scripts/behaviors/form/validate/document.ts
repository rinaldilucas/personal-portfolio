export default {
  validate: {
    methods: function (validator): void {
      validator.addMethod('document', function (_value, element) {
        return this.optional(element) || validator.methods.cpf.apply(this, arguments) || validator.methods.cnpj.apply(this, arguments);
      });
    },
  },
};
