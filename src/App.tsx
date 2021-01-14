import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import { Modal } from '@material-ui/core';
import { ITable, IData, IAddForm, IEditForm, Errors } from './interfaces';
import { TableList } from './components/TableList';
import { AddRowForm } from './components/AddRowForm';
import { ModalForm } from './components/ModalForm';
import deleteIcon from './assets/delete.png';
import './App.scss';
import validate from './components/AddRowForm/validationRules';



const tableHead = ['Name', 'Surname', 'Age', 'City', ''];

const App: React.FC = () => {
  const [tables, setTables] = useState<ITable[]>([
    { id: 'main', data: [] },
  ] as ITable[]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editTableId, setEditTableId] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [editingValues, setEditingValues] = useState<IEditForm>({} as IEditForm);
  const [formData, setFormData] = useState<IAddForm>({
    name: '',
    surname: '',
    age: '',
    city: '',
  });

  const handleCopyTable = (id: string) => {
    setTables(prevState => {
      const copiedTable: ITable[] = prevState.filter(table => table.id === id);
      const newTable = {
        id: `table${Date.now()}`,
        data: copiedTable[0].data,
      };
      return [...prevState, newTable];
    });
  };

  const handleRemoveTable = (id: string) => {
    const newTables: ITable[] = tables.filter(table => table.id !== id);

    setTables(() => newTables);
  };

  const handleEditRow = (id: string, tableId: string) => {
    const editingData = tables.reduce((acc: any, table) => {
      if (table.id === tableId) {
        const filteredArr = table.data.filter(row => row.rowId === id);
        acc = {
          rowId: filteredArr[0].rowId,
          name: filteredArr[0].name,
          surname: filteredArr[0].surname,
          city: filteredArr[0].city
        };
      }
      return acc;
    }, {});
    setEditingValues(editingData);
    setEditTableId(tableId);
    setShowModal(true);
  };

  const handleRemoveRow = (id: string, tableId: string) => {
    setTables(prevState => {
      const currentState = prevState;
      const curTable = currentState.filter(table => table.id === tableId);
      const newRow = currentState[
        currentState.indexOf(curTable[0])
      ].data.filter(row => row.rowId !== id);
      let newTables;
      if (newRow.length >= 1) {
        newTables = update(tables, {
          [currentState.indexOf(curTable[0])]: { data: { $set: newRow } },
        });
      } else {
        const filteredTables = currentState.filter(
          table => table.id !== tableId,
        );
        newTables = update(tables, { $set: filteredTables });
      }

      return newTables;
    });
  };

  const onChangeFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitAddRow = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrors(validate(formData))
      if(Object.keys(errors).length === 0) {
        const newRow = { rowId: `row${Date.now()}`, ...formData };
        let newTables = update(tables, { 0: { data: { $push: [newRow] } } });
        setTables(newTables);
      }
      
    },
    [setTables, formData],
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setEditTableId('');
    setEditingValues({} as IData);
  };

  const onEditChangeFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValues(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitChangeRow = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setTables(prevState => {
        const curTable = prevState.filter(table => table.id === editTableId);
        const indexTable = prevState.indexOf(curTable[0]);
        const curRow = prevState[indexTable].data.filter(
          row => row.rowId == editingValues.rowId,
        );
        const indexRow = prevState[tables.indexOf(curTable[0])].data.indexOf(
          curRow[0],
        );
        const newRow = {...curRow[0], ...editingValues}

        let newTables = update(prevState, {
          [indexTable]: { data: { [indexRow]: { $set: newRow } } },
        });

        return newTables;
      });

      setShowModal(false);
    },
    [setTables, formData, editingValues],
  );

  useEffect(() => {
    console.log(tables);
  }, [setEditingValues]);

  const body = (
    <div className="modal">
      <div className="modal__head">
        <span className="modal__title">Edit name</span>
        <button className="modal__close" onClick={handleCloseModal}>
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
      <ModalForm
        onChange={onEditChangeFields}
        onSubmit={handleSubmitChangeRow}
        values={editingValues}
      />
    </div>
  );

  return (
    <>
      <div className="container">
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <div className="page__add-row">
          <AddRowForm
            onChange={onChangeFields}
            onSubmit={handleSubmitAddRow}
            values={formData}
            position={'row'}
            errors={errors}
          />
          <AddRowForm
            onChange={onChangeFields}
            onSubmit={handleSubmitAddRow}
            values={formData}
            position={'column'}
            errors={errors}
          />
        </div>
        <TableList
          data={tables}
          head={tableHead}
          copyTable={handleCopyTable}
          removeTable={handleRemoveTable}
          editRow={handleEditRow}
          removeRow={handleRemoveRow}
        />
      </div>
    </>
  );
};

export default App;
