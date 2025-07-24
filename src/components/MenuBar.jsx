import OpenMenu from '../open-menu.png';
import CloseMenu from '../close-menu.png';

export default function MenuBar({  openMenu, onOpenMenu, onCloseMenu }) {
    return (
        <div className='menuBar p-4 fixed flex'>
            {openMenu ? 
                <img src={CloseMenu} alt="Close Menu" onClick={onCloseMenu} className="cursor-pointer" />
                 : 
                <img src={OpenMenu} alt="Open Menu" onClick={onOpenMenu} className="cursor-pointer" />
            }
        </div>
    )
}