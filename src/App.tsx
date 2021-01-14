import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import { Modal } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ITable, IData, IAddForm } from './interfaces';
import { TableList } from './components/TableList';
import { AddRowForm } from './components/AddRowForm';
import './App.scss';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const tableHead = ['Name', 'Surname', 'Age', 'City'];

const App: React.FC = () => {
  const [tables, setTables] = useState<ITable[]>([
    { id: 'main', data: [] },
  ] as ITable[]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editTableId, setEditTableId] = useState<string>('');
  const [editingValues, setEditingValues] = useState<IData>({} as IData);
  const [formData, setFormData] = useState<IAddForm>({
    name: '',
    surname: '',
    age: 0,
    city: '',
  });
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

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
        acc = filteredArr[0];
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
      const newRow = { rowId: `row${Date.now()}`, ...formData };
      let newTables = update(tables, { 0: { data: { $push: [newRow] } } });
      setTables(newTables);
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

        let newTables = update(prevState, {
          [indexTable]: { data: { [indexRow]: { $set: editingValues } } },
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
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <AddRowForm
        onChange={onEditChangeFields}
        onSubmit={handleSubmitChangeRow}
        values={editingValues}
        position={'modal'}
      />
    </div>
  );

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <AddRowForm
        onChange={onChangeFields}
        onSubmit={handleSubmitAddRow}
        values={formData}
        position={'row'}
      />
      <AddRowForm
        onChange={onChangeFields}
        onSubmit={handleSubmitAddRow}
        values={formData}
        position={'column'}
      />
      <TableList
        data={tables}
        head={tableHead}
        copyTable={handleCopyTable}
        removeTable={handleRemoveTable}
        editRow={handleEditRow}
        removeRow={handleRemoveRow}
      />
    </>
  );
};

export default App;
