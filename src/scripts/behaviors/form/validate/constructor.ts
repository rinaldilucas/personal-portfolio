import Marionette from 'backbone.marionette/lib/backbone.marionette.min';
import 'jquery-validation/dist/jquery.validate.min';
import Toastify from 'toastify-js';

let language = 'enUs';

export default Marionette.Behavior.extend({
  ui: {
    form: 'form:not([data-form-bypass])',
  },
  onAttach: function () {
    this.onRender.apply(this);
  },
  onRender: function () {
    this.onBuild.apply(this);
  },
  onBuild: function () {
    const self = this;

    this.ui.form.each(function () {
      const rules = self.getOption('rules');

      if (rules) {
        for (let rule = 0; rule < rules.length; rule++) {
          const validate = rules[rule].default ? rules[rule].default.validate : rules[rule].validate;

          if (validate && validate.methods) {
            validate.methods(jQuery.validator);
          }
        }
      }

      self.formListener($(this));
    });
  },
  formListener: function (form) {
    const rules = this.getOption('rules');

    if (rules) {
      for (let rule = 0; rule < rules.length; rule++) {
        const validate = rules[rule].default ? rules[rule].default.validate : rules[rule].validate;

        if (validate && validate.listener) {
          validate.listener(form);
        }
      }
    }

    this.rebuild(form);
  },
  onFormRebuild: function (form) {
    this.rebuild(form);
  },
  rebuild: function (form) {
    const self = this;

    if (window.location.pathname.indexOf('/') > -1) { language = 'enEs'; }
    if (window.location.pathname.indexOf('/br') > -1) { language = 'ptBr'; }
    if (window.location.pathname.indexOf('/es') > -1) { language = 'esEs'; }

    form.validate({
      ignore: '.ignore,[readonly]',
      errorElement: 'p',
      rules: {
        hiddenRecaptcha: {
          required: () => {
            if ((window as any).grecaptcha.getResponse() === '') {
              return true;
            } else {
              return false;
            }
          },
        },
      },
      errorPlacement: (error, element) => error.insertAfter(element),
      highlight: (element, errorClass, validClass) => {
        if (element && $(element)[0].hasAttribute('data-file-upload-button')) {
          $(element).parent().find('[data-error-holder]').removeClass(validClass).addClass(errorClass);
        } else {
          $(element).removeClass(validClass).addClass(errorClass);
        }
      },
      unhighlight: (element, errorClass, validClass) => {
        if (element && $(element)[0].hasAttribute('data-file-upload-button')) {
          $(element).parent().find('[data-error-holder]').removeClass(errorClass).addClass(validClass);
        } else {
          $(element).removeClass(errorClass).addClass(validClass);
        }
      },
      submitHandler: () => {
        const executeOnSubmitHandler = () => {
          form.data('prevent-submit', true);
          $('[type=submit], [data-prevent-double-click]').prop('disabled', true);
          $('[data-prevent-double-click] i').removeClass('icon--hide');

          $('#g-recaptcha-response').prop('disabled', true);
          form.find('input:hidden').prop('disabled', true);
          const serializedFormData = new FormData(form[0]);

          const action = form.attr('action');
          const method = form.attr('method');

          let successMessage;
          let errorMessage;
          if (language === 'ptBr') {
            successMessage = 'Formulário enviado com sucesso. Caso necessário, entraremos em contato.';
            errorMessage = 'Erro ao enviar mensagem. Se o erro persistir, entre em contato conosco através dos contatos do website.';
          } else if (language === 'esEs') {
            successMessage = 'Formulario enviado con éxito. Si es necesario, nos pondremos en contacto.';
            errorMessage = 'Error al enviar mensaje. Si el error persiste, póngase en contacto con nosotros a través de los contactos del sitio web.';
          } else {
            successMessage = 'Form sent successfully. If necessary, we will contact you.';
            errorMessage = 'Error sending message. If the error persists, contact us through the contacts on the website.';
          }

          const successProcess = () => {
            Toastify({
              text: successMessage,
              duration: 3000,
              gravity: 'bottom',
              position: 'center',
              stopOnFocus: true,
              className: 'toast toast--success',
            }).showToast();

            self.clearInputs(form);
            $('[type=submit], [data-prevent-double-click]').prop('disabled', false);
            $('[data-prevent-double-click] i').addClass('icon--hide');
            form.data('prevent-submit', false);
          };

          const errorProcess = () => {
            Toastify({
              text: errorMessage,
              duration: 8000,
              gravity: 'bottom',
              position: 'center',
              stopOnFocus: true,
              className: 'toast toast--error',
            }).showToast();

            $('[type=submit], [data-prevent-double-click]').prop('disabled', false);
            $('[data-prevent-double-click] i').addClass('icon--hide');
            form.data('prevent-submit', false);
          };

          const options = {
            contentType: method === 'POST' ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
            processData: method !== 'POST',
            url: form.attr('action'),
            method: form.attr('method'),
            mimeType: form.attr('mimeType'),
            data: serializedFormData,
            success: () => successProcess(),
            error: () => errorProcess(),
          } as any;

          form.trigger('beforeProcessRequest', [options]);

          if (action) {
            $.ajax(options);
          } else {
            form.trigger('processRequest', [serializedFormData, successProcess, errorProcess]);
          }
        };

        executeOnSubmitHandler();

        return false;
      },
    });

    if (language === 'ptBr') {
      $.extend($.validator.messages, {
        date: 'Digite uma data válida.',
        digits: 'Este campo só aceita dígitos.',
        email: 'Informe um email válido.',
        'equal-to': 'Os valores precisam ser iguais.',
        number: 'Este campo só aceita números.',
        remote: 'O campo é inválido.',
        required: 'O campo é obrigatório.',
        url: 'O endereço do site deve iniciar com http:// ou https://.',
        'complete-name': 'O campo deve conter nome e sobrenome.',
        cnpj: 'Informe um CNPJ válido.',
        cpf: 'Informe um CPF válido.',
        cep: 'Informe um CEP válido.',
        phone: 'Informe um numero válido.',
        'letters-only': 'O campo deve conter apenas letras e espaços.',
        'file-size': 'O arquivo deve ter menos de {0} MB.',
        extension: 'O arquivo deve possuir a extensão {0}.',
        'zero-currency': 'Valores precisam ser maiores que zero.',
        document: 'Informe um CPF ou CNPJ válido.',
        'max-length': $.validator.format('O campo deve conter no máximo {0} caracteres.'),
        'min-length': $.validator.format('O campo deve conter no mínimo {0} caracteres.'),
        'range-length': $.validator.format('O campo deve conter de {0} até {1} caracteres.'),
        range: $.validator.format('Apenas números de {0} até {1}.'),
        max: $.validator.format('Apenas números até {0}.'),
        min: $.validator.format('Apenas números a partir de {0}.'),
      });
    } else if (language === 'esEs') {
      $.extend($.validator.messages, {
        date: 'Por favor introduzca una fecha valida.',
        digits: 'Este campo solo acepta dígitos.',
        email: 'Proporcione un correo electrónico válido.',
        'equal-to': 'Los valores deben ser los mismos.',
        number: 'Este campo solo acepta números.',
        remote: 'Campo es inválido.',
        required: 'El campo es obligatorio.',
        url: 'La dirección del sitio web debe comenzar con http:// o https://.',
        'complete-name': 'El campo debe contener nombre y apellido.',
        cnpj: 'Proporcione un CNPJ válido.',
        cpf: 'Proporcione un CPF válido.',
        cep: 'Por favor ingrese un código postal válido.',
        phone: 'Por favor ingrese un número válido.',
        'letters-only': 'El campo debe contener solo letras y espacios.',
        'file-size': 'El archivo debe tener menos de {0} MB.',
        extension: 'El archivo debe tener la extensión {0}.',
        'zero-currency': 'Los valores deben ser mayores que cero.',
        document: 'Introduzca un CPF o CNPJ válido.',
        'max-length': $.validator.format('El campo debe contener un máximo de {0} caracteres.'),
        'min-length': $.validator.format('El campo debe contener al menos {0} caracteres.'),
        'range-length': $.validator.format('El campo debe contener de {0} a {1} caracteres.'),
        range: $.validator.format('Solo números del {0} al {1}.'),
        max: $.validator.format('Solo números hasta {0}.'),
        min: $.validator.format('Solo números a partir de {0}.'),
      });
    } else {
      $.extend($.validator.messages, {
        date: 'Please enter a valid date.',
        digits: 'This field only accepts digits.',
        email: 'Please provide a valid email.',
        'equal-to': 'The values must be the same.',
        number: 'Este campo só aceita números.',
        remote: 'This field only accepts numbers.',
        required: 'This field is mandatory.',
        url: 'This field only accepts numbers.',
        'complete-name': 'The field must contain first and last name.',
        cnpj: 'Please provide a valid CNPJ.',
        cpf: 'Please provide a valid CPF.',
        cep: 'Please provide a valid postal code.',
        phone: 'Please enter a valid number.',
        'letters-only': 'The field must contain only letters and spaces.',
        'file-size': 'The file must be less than {0} MB.',
        extension: 'The file must have the extension {0}.',
        'zero-currency': 'Values must be greater than zero.',
        document: 'Enter a valid CPF or CNPJ.',
        'max-length': $.validator.format('The field must contain a maximum of {0} characters.'),
        'min-length': $.validator.format('The field must contain at least {0} characters.'),
        'range-length': $.validator.format('The field must contain from {0} to {1} characters.'),
        range: $.validator.format('The field must contain from {0} to {1} characters.'),
        max: $.validator.format('Only numbers from {0} to {1}.'),
        min: $.validator.format('Only numbers starting from {0}.'),
      });
    }
  },
  clearInputs: (form) => {
    const fields = form.find(['input'].join(','));

    fields.each((index, element) => {
      const input = $(element);

      input.val('');
    });
  },
});

(jQuery.validator as any).methodGroup = (name, rules, message) => {
  message = message || 'Field with error';
  if (language === 'ptBr') { message = message || 'Campo com erro'; }
  if (language === 'esEs') { message = message || 'Campo con error'; }

  const getMessage = () => message;

  jQuery.validator.addMethod(
    name,
    function (value, element) {
      for (let x = 0; x < rules.length; x++) {
        const rule = rules[x];
        const check = jQuery.validator.methods[rule.rule];

        if (check && !check.apply(this, [value, element, rule.param])) {
          message = jQuery.validator.messages[rule.rule];
          message = $.isFunction(message) ? message.apply(this, rule.param) : message;

          return false;
        }
      }

      return true;
    },
    getMessage,
  );
};
