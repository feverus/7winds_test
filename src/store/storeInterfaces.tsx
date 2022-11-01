export interface Row {
    "id": number|null,
    "rowName": string,
    "total": number,
    "salary": number,
    "mimExploitation": number,
    "machineOperatorSalary": number,
    "materials": number,
    "mainCosts": number,
    "supportCosts": number,
    "equipmentCosts": number,
    "overheads": number,
    "estimatedProfit": number,
    "child"?: Array<Row>,

    "haveChild"?: boolean;
    "lastChild"?: boolean;
    "parentId"?: number|null;   
    "level"?: number;
}