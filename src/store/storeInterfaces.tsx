// типы данных для хранилища


export interface StateSet {
	page: string;
}



export interface StateAll {
    set:StateSet;
}



// экшены

export interface ActionSet {
	type: string;
	payload: StateSet;
}


//props для mapStateToProps

export interface PropsStateMain {
	page: string;
}

//функции для mapDispatchToProps

export interface PropsDispaich {
	onChangePage: Function; 
}