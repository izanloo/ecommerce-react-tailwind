const Input = (props) => {
    const { id, placeholder = '', label = '',className='', type = 'text', ...rest } = props;
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input type={type} className={className} id={id} placeholder={placeholder} {...rest} />
        </div>
    );
};

export default Input;