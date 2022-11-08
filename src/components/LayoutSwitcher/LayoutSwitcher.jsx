// icons
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline'

const LayoutSwitcher = ({ layout, layoutToggle }) => {
    return (
        <div onClick={(e) => layoutToggle(e.target.getAttribute('name'))} >
            {layout === 'list' ? <button name="grid" className='btn-sort'>
                <Squares2X2Icon className={`btn-sort-icon`}></Squares2X2Icon>
            </button> : <button name="list" className='btn-sort'>
                <ListBulletIcon className={`btn-sort-icon`}></ListBulletIcon>
            </button>}

        </div>
    );
};

export default LayoutSwitcher;