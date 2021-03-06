export enum ButtonClasses {
    Edit = 'edit',
    DeleteRow = 'table__delete-row',
    DeleteTable = 'table__delete-table',
    Copy = 'table__copy-table'
}

export interface IData {
    rowId: string,
    name: string,
    surname: string,
    age: string,
    city: string
}

export interface Errors {
    name?: string,
    surname?: string,
    age?: string ,
    city?: string 
}

export interface IButton {
    handleClick: () => void,
    classes: ButtonClasses,
    title?: "Some text" | string | null,
}

export interface ITable {
    id: string,
    data: IData[],
}

export interface TableData {
    tableId: string,
    head: string[],
    data: IData[],
    deleteRow: (id: string, tableId: string) => void,
    editRow: (id: string, tableId: string) => void,
}

export interface IAddForm {
    name: string,
    surname: string,
    age: string,
    city: string
}

export interface IEditForm {
    rowId: string,
    name: string,
    surname: string,
    city: string
}