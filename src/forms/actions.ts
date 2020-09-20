import { action } from 'typesafe-actions';

import { FormFields, Forms, FormsActionTypes } from './models';

export const setFormField = (form: Forms, field: FormFields, text: string) =>
  action(FormsActionTypes.SET_FORM_FIELD, {
    form,
    field,
    text,
  });
