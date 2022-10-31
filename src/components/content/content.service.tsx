import { useState, useEffect } from 'react'

type UseContent = () => [
    state: {
        list:Array<string>;
        choosen:number
    },
]

const useContent = () => {    
    const state ={
        list: [
            {
              "id": 1863,
              "rowName": "string",
              "total": 1,
              "salary": 0,
              "mimExploitation": 0,
              "machineOperatorSalary": 0,
              "materials": 0,
              "mainCosts": 0,
              "supportCosts": 0,
              "equipmentCosts": 0,
              "overheads": 0,
              "estimatedProfit": 0,
              "child": [
                {
                  "id": 1864,
                  "rowName": "фундаментальные работы",
                  "total": 0,
                  "salary": 0,
                  "mimExploitation": 0,
                  "machineOperatorSalary": 0,
                  "materials": 0,
                  "mainCosts": 0,
                  "supportCosts": 0,
                  "equipmentCosts": 0,
                  "overheads": 0,
                  "estimatedProfit": 0,
                  "child": []
                }
              ]
            }
          ],
    }
    return (
        state
    )
}
export default useContent