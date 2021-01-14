import React from 'react';
import {TableData} from '../../interfaces';
import './Table.scss'

const Table: React.FC<TableData> = ({
  tableId,
  head,
  data,
  editRow,
  deleteRow,
}) => {
  const handleEditRow = (id: string) => {
    editRow(id, tableId);
  };

  const handleDeleteRow = (id: string) => deleteRow(id, tableId);

  return (
    <table>
      <thead>
        <tr>
          {head.map(item => (
            <td key={item}>{item}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ rowId, name, surname, age, city }) => (
          <tr key={rowId}>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{age}</td>
            <td>{city}</td>
            <td>
              <button className="table__edit-row" onClick={() => handleEditRow(rowId)}>Edit</button>
              <button className="table__remove-row" onClick={() => handleDeleteRow(rowId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
