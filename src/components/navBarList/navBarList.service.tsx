import { useState, useEffect } from 'react'

type UseNavBarList = () => [
    state: {
        list:Array<string>;
        choosen:number
    },
]

const useNavBarList:UseNavBarList = () => {    
    const state ={
        list: ['По проекту', 'Объекты', 'РД', 'МТО', 'СМР', 'График', 'МиМ', 'Рабочие', 'Капвложения', 'Бюджет', 'Финансирование', 'Панорамы', 'Камеры', 'Поручения', 'Контрагенты'],
        choosen: 4,
    }
    return (
        [state]
    )
}
export default useNavBarList