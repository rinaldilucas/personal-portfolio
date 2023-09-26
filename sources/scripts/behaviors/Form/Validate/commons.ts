export default {
  validate: {
    methods: (validator) => {
      validator.addMethod(
        'completename',
        function (value, element) {
          return this.optional(element) || /^.+\s.+$/i.test(value);
        }
      );

      validator.addMethod(
        'date',
        function (value, element) {
          return (
            this.optional(element) ||
            /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
              value
            )
          );
        }
      );

      validator.addMethod(
        'cnpj',
        (value) => {
          let numeros;
          let soma;
          let i;
          let resultado;
          let pos;
          let tamanho;
          let digitosIguais;

          if (value.length === 0) {
            return true;
          }

          value = value.replace(/\D+/g, '');
          digitosIguais = 1;

          for (i = 0; i < value.length - 1; i++) {
            if (value.charAt(i) !== value.charAt(i + 1)) {
              digitosIguais = 0;
              break;
            }
          }

          if (digitosIguais) {
            return false;
          }

          tamanho = value.length - 2;
          numeros = value.substring(0, tamanho);
          const digitos = value.substring(tamanho);

          soma = 0;
          pos = tamanho - 7;
          for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
              pos = 9;
            }
          }
          resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
          if (resultado !== digitos.charAt(0)) {
            return false;
          }
          tamanho = tamanho + 1;
          numeros = value.substring(0, tamanho);
          soma = 0;
          pos = tamanho - 7;
          for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
              pos = 9;
            }
          }

          resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

          return resultado === digitos.charAt(1);
        }
      );

      validator.addMethod(
        'cpf',
        (value) => {
          let cpf, b, c, i, x, y;

          value = $.trim(value);

          value = value.replace('.', '');
          value = value.replace('.', '');
          cpf = value.replace('-', '');
          while (cpf.length < 11) {
            cpf = '0' + cpf;
          }
          const expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
          const a: any = [];

          b = 0;
          c = 11;
          for (i = 0; i < 11; i++) {
            a[i] = cpf.charAt(i);
            if (i < 9) {
              b += a[i] * --c;
            }
          }
          if ((x = b % 11) < 2) {
            a[9] = 0;
          } else {
            a[9] = 11 - x;
          }
          b = 0;
          c = 11;
          for (y = 0; y < 10; y++) {
            b += a[y] * c--;
          }
          if ((x = b % 11) < 2) {
            a[10] = 0;
          } else {
            a[10] = 11 - x;
          }
          if (cpf.charAt(9) !== a[9] || cpf.charAt(10) !== a[10] || cpf.match(expReg)) {
            return false;
          }

          return true;
        }
      );

      validator.addMethod(
        'cep',
        function (value, element) {
          return this.optional(element) || /^[0-9]{5}-[0-9]{3}$/.test(value);
        }
      );

      validator.addMethod(
        'phone',
        function (value, element) {
          return this.optional(element) || /^\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}$/.test(value);
        }
      );

      validator.addMethod(
        'lettersonly',
        function (value, element) {
          return this.optional(element) || /^[a-z áãâäàéêëèíîïìóõôöòúûüùçñ]+$/i.test(value);
        }
      );

      validator.addMethod(
        'filesize',
        function (value, element, param) {
          return this.optional(element) || element.files[0].size <= param * 1000000;
        }
      );

      validator.addMethod(
        'extension',
        function (value, element, param) {
          const extensions = param.replace(' ', '').split(',');
          const fileExtension = value.split('.').pop();
          return this.optional(element) || extensions.includes(fileExtension);
        }
      );

      validator.addMethod(
        'zerocurrency',
        function (value, element) {
          return this.optional(element) || value !== '0,00';
        }
      );

      validator.methodGroup('fullname', [{ rule: 'lettersonly' }, { rule: 'completename' }, { rule: 'rangelength', param: [5, 75] }]);
    }
  }
};
