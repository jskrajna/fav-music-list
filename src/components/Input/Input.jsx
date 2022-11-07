const Input = ({ placeholder = '', type = 'text', value, onChange, ...rest }) => {

    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} {...rest}></input>
    );
};

export default Input;