import { useState, useEffect } from 'react'
import { UseLevel } from './level.props';

const useLevel:UseLevel = () => {    
    const iconsNames = [
		"directory",
		"subtract",
		"sheet",
		"trashFill"
	]

    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = (editedRow: number | undefined, onOff: boolean) => {
        if (editedRow===undefined) setShowMenu(onOff)
    }

    const state = {
        iconsNames: iconsNames,
        showMenu: showMenu,
    }

    const api = {
        toggleMenu,
    }

    return (
        [state, api]
    )
}
export default useLevel