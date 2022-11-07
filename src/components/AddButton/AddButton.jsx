import { PlusCircleIcon } from '@heroicons/react/24/outline'
const AddButton = ({ onClick, children, ...rest }) => {
    return (
        <button onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

export default AddButton;

// takie entry już istnieje
// nie można pustego dodać