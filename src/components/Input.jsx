const Input = (props) => {
    const { id, placeholder = '', label = '',className='', type = 'text' ,name='' ,onChange ,value , ...rest } = props;
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} className={className} value={value} id={id} placeholder={placeholder} onChange={onChange} {...rest} />
        </div>
    );
};

export default Input;