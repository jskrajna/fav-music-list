const Input = ({ value, placeholder = '', type = 'text', onChange, ...rest }) => {

    return (
        <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} {...rest}></input >
    );
};

export default Input;