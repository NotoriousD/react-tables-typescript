import React from 'react';
import {IAddForm} from '../../interfaces'

interface FormProps {
    values: IAddForm,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    position: 'row' | 'column' | 'modal'
}

const AddRowForm: React.FC<FormProps> = ({onSubmit, onChange, values, position}) => {
    
    return (
        <form onSubmit={onSubmit} className={position}>
            {Object.entries(values).map(([key, value]) => (
                <div key={key} className="form__field">
                    <input type="text" name={key} value={value} required placeholder={`${key}*`} onChange={onChange} />
                </div>
            ))}
            <div className="form__submit">
                <input type="submit" value="Add Row" />
            </div>
        </form>
    )
}

export default AddRowForm;
