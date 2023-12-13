export default {
  validate: {
    methods: (validator) => {
      validator.addMethod('complete-name', function (value, element) {
        return this.optional(element) || /^.+\s.+$/i.test(value);
      });

      validator.addMethod('date', function (value, element) {
        return (
          this.optional(element) ||
          /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
            value,
          )
        );
      });

      validator.addMethod('cnpj', (value) => {
        value = value.replace(/\D/g, '');

        if (value.length !== 14) {
          return false;
        }

        let sum = 0;
        let weight = 5;
        for (let i = 0; i < 12; i++) {
          sum += parseInt(value.charAt(i)) * weight;
          weight = weight === 2 ? 9 : weight - 1;
        }
        let remainder = sum % 11;
        const firstVerificationDigit = remainder < 2 ? 0 : 11 - remainder;

        sum = 0;
        weight = 6;
        for (let i = 0; i < 13; i++) {
          sum += parseInt(value.charAt(i)) * weight;
          weight = weight === 2 ? 9 : weight - 1;
        }
        remainder = sum % 11;
        const secondVerificationDigit = remainder < 2 ? 0 : 11 - remainder;

        return (
          parseInt(value.charAt(12)) === firstVerificationDigit &&
          parseInt(value.charAt(13)) === secondVerificationDigit
        );
      });

      validator.addMethod('cpf', (value) => {
        value = value.replace(/\D/g, '');

        if (value.length !== 14) {
          return false;
        }

        let sum = 0;
        let weight = 5;
        for (let i = 0; i < 12; i++) {
          sum += parseInt(value.charAt(i)) * weight;
          weight = weight === 2 ? 9 : weight - 1;
        }
        let remainder = sum % 11;
        const firstVerificationDigit = remainder < 2 ? 0 : 11 - remainder;

        sum = 0;
        weight = 6;
        for (let i = 0; i < 13; i++) {
          sum += parseInt(value.charAt(i)) * weight;
          weight = weight === 2 ? 9 : weight - 1;
        }
        remainder = sum % 11;
        const secondVerificationDigit = remainder < 2 ? 0 : 11 - remainder;

        return (
          parseInt(value.charAt(12)) === firstVerificationDigit &&
          parseInt(value.charAt(13)) === secondVerificationDigit
        );
      });

      validator.addMethod('cep', function (value, element) {
        return this.optional(element) || /^[0-9]{5}-[0-9]{3}$/.test(value);
      });

      validator.addMethod('phone', function (value, element) {
        return (
          this.optional(element) ||
          /^\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}$/.test(value)
        );
      });

      validator.addMethod('letter-sonly', function (value, element) {
        return (
          this.optional(element) ||
          /^[a-z áãâäàéêëèíîïìóõôöòúûüùçñ]+$/i.test(value)
        );
      });

      validator.addMethod('file-size', function (value, element, param) {
        return (
          this.optional(element) || element.files[0].size <= param * 1000000
        );
      });

      validator.addMethod('extension', function (value, element, param) {
        const extensions = param.replace(' ', '').split(',');
        const fileExtension = value.split('.').pop();
        return this.optional(element) || extensions.includes(fileExtension);
      });

      validator.addMethod('zero-currency', function (value, element) {
        return this.optional(element) || value !== '0,00';
      });

      validator.methodGroup('full-name', [
        { rule: 'letter-sonly' },
        { rule: 'complete-name' },
        { rule: 'range-length', param: [5, 75] },
      ]);
    },
  },
};
