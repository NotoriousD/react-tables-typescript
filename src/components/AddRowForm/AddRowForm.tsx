import React from 'react';
import { IAddForm, Errors } from '../../interfaces';

interface FormProps {
  values: IAddForm;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  position: 'row' | 'column';
  errors: Errors;
}

const AddRowForm: React.FC<FormProps> = ({
  onSubmit,
  onChange,
  values,
  position,
  errors,
}) => {
  return (
    <div className="form__content">
      {errors && (
        <ul>
          {Object.values(errors).map(error => (
            <li className="form_error">{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={onSubmit} className={position}>
        {Object.entries(values).map(([key, value]) => (
          <div key={key} className="form__field">
            <input
              type="text"
              name={key}
              value={value}
              required
              placeholder={`${key}*`}
              onChange={onChange}
            />
          </div>
        ))}
        <div className="form__submit">
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
};

export default AddRowForm;
