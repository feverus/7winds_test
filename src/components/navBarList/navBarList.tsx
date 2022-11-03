import useNavBarList from './navBarList.service'
import C from './navBarList.module.scss'
import { ReactSVG } from 'react-svg'

//не стал выносить в отдельный файл, т.к. компонент не имеет функционала и создан "для красоты"
function Item(item:string, id:number, choosen:number) {
	let style = (id===choosen)?
		' '+C.choosen:
		''
	return (
		<div key={id}
			className={C.listItem+style}>
			<ReactSVG src="icons/default.svg" />
			<label>{item}</label>
		</div>
	)
}

export function NavBarList() {
	const [state] = useNavBarList()
	return (
		<div className={C.body}>
			{state.list.map((item, id)=>(
				Item(item, id, state.choosen)
			))}	
		</div>
	)
}