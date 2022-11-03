export type UseLevel = () => [
    state: {
        iconsNames: Array<string>;
        showMenu: boolean;
    },
    api: {
        toggleMenu: (editedRow: number | undefined, onOff: boolean) => void;
    }
];

export type TypeLevel = {
	row: number;
	value: number;
	haveChild: boolean;
	lastChild: boolean;
	showBranch: boolean;
	editedRow?: number;
	createRow: (row: number, level: number) => void;
	deleteRow: (row: number) => void;
};

export type TypeDrawPict = {
	name: string;
	row: number;
	value: number;
	haveChild: boolean;
	lastChild: boolean;
	withoutBranch: boolean;
	createRow: (row: number, level: number) => void;
	deleteRow: (row: number) => void;
};
