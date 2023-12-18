import 'jquery-mask-plugin/dist/jquery.mask.min';
import $ from 'jquery/dist/jquery';

const masks = {
  cep: '00000-000',
  date: '00/00/0000',
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0000-00',
  phone: '(00) 90000-0000',
};

const SPMaskBehavior = (val): string => (val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009');
const spOptions = {
  onKeyPress: function (_value, _element, field, options): void {
    field.mask(SPMaskBehavior.apply({}, arguments), options);
  },
};

export default {
  mask: {
    ui: {
      date: '.mask_date, [data-rule-date], [data-rule-datepicker]',
      cpf: '.mask_cpf, [data-rule-cpf]',
      cnpj: '.mask_cnpj, [data-rule-cnpj]',
      cep: '.mask_cep, [data-rule-cep]',
      phone: '.mask_phone, [data-rule-phone]',
    },
    listener: function (form): void {
      ($(this.ui.date, form) as any).mask(masks.date);
      ($(this.ui.cpf, form) as any).mask(masks.cpf);
      ($(this.ui.cnpj, form) as any).mask(masks.cnpj);
      ($(this.ui.cep, form) as any).mask(masks.cep);
      ($(this.ui.phone, form) as any).mask(SPMaskBehavior, spOptions);
    },
  },
};
