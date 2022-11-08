// icons
import { PlusCircleIcon } from '@heroicons/react/24/outline'
// components
import Input from "../Input";
import AddButton from '../AddButton';

const handleSubmit = (e) => {
    e.preventDefault();
}

const Form = ({ value, itemAdd, onChange }) => {
    return (
        <form onSubmit={handleSubmit} className='flex flex-wrap align-middle px-4 pt-4 md:px-8 md:pt-8'>
            <Input className={'border-2 border-teal-500 shadow-xl bg-transparent focus:outline-none px-3 py-2 mb-3 md:mb-0'} onChange={(item) => onChange(item)} placeholder={'Album name'} type={'text'} />
            <AddButton onClick={() => value.trim().length !== 0 && itemAdd()} className={'bg-teal-500 uppercase text-md text-slate-900 hover:bg-teal-400 font-bold px-4 flex flex-row items-center border-2 border-slate-900 md:ml-4'}>
                {<>
                    <span>Add to List</span>
                    <PlusCircleIcon className="h-8 w-8 ml-2"></PlusCircleIcon>
                </>
                }
            </AddButton>
        </form>
    );
};

export default Form;