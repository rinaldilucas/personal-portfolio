import $ from 'jquery';
import 'jquery-mask-plugin';

const masks = {
    cpf: '000.000.000-00',
    cnpj: '00.000.000/0000-00'
};

export default {
    mask: {
        ui: {
            document: '[data-rule-document]'
        },
        listener: function (form) {
            ($(this.ui.document, form) as any)
                .on('paste', (event) => {
                    const pastedData = event.originalEvent.clipboardData.getData('text').replace(/\D/g, '');

                    $(this)
                        .mask(pastedData.length <= 11 ? masks.cpf : masks.cnpj)
                        .val(pastedData);
                })
                .on('keydown', (event) => {
                    try {
                        const digit = event.key ? event.key.replace(/\D/g, '') : '';
                        const value = ($(this).val() as string).replace(/\D/g, '');

                        if (/^[0-9]/.test(value)) {
                            const size = value.concat(digit).length;

                            $(this).mask(size <= 11 ? masks.cpf : masks.cnpj);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })
                .trigger('keydown');
        }
    }
};
