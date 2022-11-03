import { ReactSVG } from 'react-svg';
import C from './drawPict.module.scss';
import { TypeDrawPict } from "../level/";

export function DrawPict({ name, row, value, haveChild, lastChild, withoutBranch, createRow, deleteRow }: TypeDrawPict) {

	const handleClick = (num:number, level: number) => {
		if (level===3) deleteRow(num);
		else createRow(num, level)
	}

	let style: string = "";
	switch (value) {
		case 0:
			style = C.level0; break;
		case 1:
			style = C.level1; break;
		case 2:
			style = C.level2; break;
		case 3:
			style = C.level3; break;
		default:
			break;
	}

	if (haveChild) style = style + ' ' + C.haveChild;
	if (!lastChild) style = style + ' ' + C.haveNextBrother;	
	if (withoutBranch) style = style + ' ' + C.withoutBranch;

	return (
		<div className={style}>
			<button
				onClick={() => handleClick(row, value)}
			>
				<ReactSVG src={'icons/' + name + '.svg'} />
			</button>
		</div>
	)
}
