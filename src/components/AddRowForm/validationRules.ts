import { Errors } from '../../interfaces';

export default function validate(values: Errors) {
  const regLatin = new RegExp('/([1-9]{1})w+/g');

  let errors: Errors = {};

  if (!values.name) {
    errors.name = 'Type name';
  } else if (values.name.length < 3) {
    errors.name = 'Name must be min 3 letters';
  }

  if (!values.surname) {
    errors.surname = 'Type surname';
  } else if (values.surname.length < 3) {
    errors.surname = 'Surname must be min 3 letters';
  }

  if (!values.age) {
    errors.age = 'Type age';
  } else if (!regLatin.test(values.age)) {
    errors.age = 'Age must be max 2 letters';
  }

  if (!values.surname) {
    errors.surname = 'Type surname';
  } else if (values.surname.length < 3) {
    errors.surname = 'Surname must be min 3 letters';
  }

  if (!values.city) {
    errors.city = 'Type city';
  } else if (values.city.length < 3) {
    errors.city = 'City must be min 3 letters';
  }

  return errors;
}
