import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import ReactDataSheet from 'react-datasheet';
import * as I from '../../store/storeInterfaces';


export type PropsSheetRenderer = { className: string; children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; };

export type PropsRowRenderer = { row: any; children: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; };

export type PropsCellRenderer = {
    row: any ; col: any ; cell: any ;
    children: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined;
};

export type PropsChanges = { cell: any; row: any; col: any; value: any; }[];

export interface GridElement extends ReactDataSheet.Cell<GridElement, number | string> {
    value: number | string;
    col?: number;
    row?: number;
}

export type StateType = {
    grid: GridElement[][];
    editedRow: number | undefined;
    editedData: I.Row;
};

export type ApiType = {
    getGrid: (rawData: Array<I.Row>, level: number, childsCount: number) => void;
    init: (rawData:Array<I.Row>, level:number, childsCount:number, parentId:number|null) => void;
    changeEditMode: (num: number|undefined) => void;
    clearEditedData: () => void;
    updateEditedData: (field: string, value: string|number, needSave: boolean) => void;
    saveEditedData: (field: string, value: string|number) => void;
    createRow: (row: number, level: number) => void;
    deleteRow: (row: number) => void;
};

export type ApiResponse = {
    changed: Array<I.Row>;
    current: I.Row;
}

export type UseContent = () => [
    state: StateType,
    api: ApiType
];