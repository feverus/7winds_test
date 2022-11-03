import useLevel from './level.service'
import { DrawPict } from "../drawPict/drawPict";
import C from './level.module.scss'
import { TypeLevel } from "./level.props";

export function Level({row, value, haveChild, lastChild, showBranch,  editedRow, createRow, deleteRow}:TypeLevel) {
	const [state, api] = useLevel()

	let content = <></>
	let style: string = C.plug;
	if (showBranch) style = style + ' ' + C.showBranch;

	if (state.showMenu) {
		content = <div className={C.menu}>
			{state.iconsNames.map(
				(name, num) => (num>=value && !(value===0 && num===2))?
					<DrawPict				
						name={state.iconsNames[num]} 
						row={row}
						value={num} 
						haveChild={(value==num) ? haveChild : false} 
						lastChild={(value===num) ? lastChild : true} 
						withoutBranch={(value===num) ? false : true} 
						createRow={createRow}
						deleteRow={deleteRow}
						key={name+'-'+num}
					/>:
					<div className={style} key={name+'-'+num}></div>
			)}
		</div>
	} else {
		content = <div className={C.oneIcon}>
			{state.iconsNames.map(
				(name, num) => (num==value)?
					<DrawPict
						name={state.iconsNames[value]}
						row={row}
						value={value}
						haveChild={haveChild}
						lastChild={lastChild}
						withoutBranch={false}
						createRow={createRow}
						deleteRow={deleteRow}
						key={name+'-'+num}
					/>:
					<div className={style} key={name+'-'+num}></div>					
		)}			
		</div>
	}

	return (
		<div
			className={C.body}
			onMouseEnter={()=>api.toggleMenu(editedRow, true)}
			onMouseLeave={()=>api.toggleMenu(editedRow, false)}
		>
			{content}
		</div>
	)
}