const Input = (props) => {
    const { id, placeholder = '', label = '',className='', type = 'text',onChange = '', ...rest } = props;
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input type={type} className={className} id={id} placeholder={placeholder} onChange={onChange} {...rest} />
        </div>
    );
};

export default Input;