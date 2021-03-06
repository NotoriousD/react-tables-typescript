import React from 'react';
import { ITable, ButtonClasses } from '../../interfaces';
import Table from '../Table/Table';
import { Button } from '../Button';
import deleteRedIcon from '../../assets/delete__red.png';
import './TableList.scss';

interface TableListProps {
  data: ITable[];
  head: string[];
  copyTable: (id: string) => void;
  removeTable: (id: string) => void | null;
  editRow: (id: string, tableId: string) => void;
  removeRow: (id: string, tableId: string) => void;
};

const TableList: React.FC<TableListProps> = ({
  data,
  copyTable,
  removeTable,
  editRow,
  removeRow,
  head,
}) => {
  return (
    <>
      {data.map(({ id, data }) => (
        <div key={id} className="table__container">
          <div className="table__control">
            <Button
              classes={ButtonClasses.Copy}
              title="Copy table"
              handleClick={() => copyTable(id)}
            />
            {id !== 'main' && <Button
              classes={ButtonClasses.DeleteTable}
              title=""
              handleClick={() => removeTable(id)}
            ><img src={deleteRedIcon} alt="delete"/></Button>}
          </div>
          <Table tableId={id} data={data} head={head} editRow={editRow} deleteRow={removeRow} />
        </div>
      ))}
    </>
  );
};

export default TableList;
