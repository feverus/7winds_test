import { ReactSVG } from 'react-svg';
import C from './drawPict.module.scss';
import { D } from "../level/level";

export function DrawPict({ name, value, haveChild, lastChild, withoutBranch = false }: D) {
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

	if (haveChild)
		style = style + ' ' + C.haveChild;
	if (!lastChild)
		style = style + ' ' + C.haveNextBrother;
	if (withoutBranch)
		style = style + ' ' + C.withoutBranch;

	return (
		<div className={style}>
			<ReactSVG src={'icons/' + name + '.svg'} />
		</div>
	);
}
