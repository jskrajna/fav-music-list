
// utils
import { nanoid } from 'nanoid';
// icons
import { FireIcon, MusicalNoteIcon, MinusCircleIcon } from '@heroicons/react/24/outline'

const ListItem = ({ item, removeItem, toggleBest, layout, index }) => {
    return (
        <li key={nanoid()} className={`${layout === 'grid' ? 'flex flex-wrap mb-3' : 'grid grid-cols-2'} py-2 px-4 items-start border-l-2 border-slate-900 hover:border-teal-400`}>
            <p className={`flex-wrap gap-4 items-center grid ${layout === 'grid' ? 'grid-cols-1' : 'md:grid-cols-2'} `}>
                <span className={`flex flex-wrap items-center justify-start gap-2`}>
                    <span className={`font-bold`}>{item.id}</span>
                    <MusicalNoteIcon className={`min-w-fit w-10 h-10 border-2 shadow-xl bg-teal-200 border-teal-600 p-1`} />
                    <span className={`font-regular pr-6`}>{item.name}</span>
                </span>
                <span className={`font-regular`}>{item.date}</span>
            </p>
            <p className={`inline-flex md:flex md:ml-auto mr-0`}>
                <FireIcon onClick={() => toggleBest()} className={`h-8 w-8 ml-2 hover:text-teal-300 cursor-pointer ${item.best === true && 'text-teal-300'}`}></FireIcon>
                <MinusCircleIcon onClick={() => removeItem()} className="h-8 w-8 ml-2 hover:text-teal-300 cursor-pointer"></MinusCircleIcon>
            </p>
        </li>
    );
};

const List = ({ list, layout, removeItem, toggleBest }) => {

    return (
        <ul className={`list-none pt-8 ${layout === 'grid' ? 'grid grid-cols-2 gap-y-2' : ''}`}>
            {list.length !== 0 && [...list].map((item, i) => {
                return <ListItem layout={layout} item={item} index={i} removeItem={() => removeItem(i)} toggleBest={() => toggleBest(list, item)} />
            })}
        </ul>
    )
}

export default List;