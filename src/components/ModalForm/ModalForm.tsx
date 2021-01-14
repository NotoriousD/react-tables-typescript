import React, { useState } from 'react';
import { IEditForm } from '../../interfaces';

interface FormProps {
  values: IEditForm,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalForm: React.FC<FormProps> = ({ values, onSubmit, onChange }) => {
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const onChangeCheckbox = () => {
    setCheckbox(!checkbox);
  };
  return (
    <form onSubmit={onSubmit} className="modal__form">
      <div className="form__field">
        <input
          type="text"
          name={'name'}
          value={values.name}
          required
          placeholder="Name"
          onChange={onChange}
        />
      </div>
      <div className="form__field">
        <input
          type="text"
          name={'surname'}
          value={values.surname}
          required
          placeholder='Surname'
          onChange={onChange}
        />
      </div>
      <div className="form__field">
        <input
          type="text"
          name={'city'}
          value={values.city}
          required
          placeholder="City"
          onChange={onChange}
        />
      </div>
      <div className="form__submit">
        <div className="form__checkout">
          <input
            type="checkbox"
            name="agree"
            id="agree"
            onChange={onChangeCheckbox}
            required
          />
          <label htmlFor="agree">Totally agree</label>
        </div>
        <input type="submit" disabled={!checkbox} value="Save" />
      </div>
    </form>
  );
};

export default ModalForm;
