import { useState } from 'react';


function CustomInput ({textLabel, inputType, value, onChange, placeholder}) {
    

    return (
        <div className='custom-input'>
            <label>{textLabel}</label>
            <input type={inputType} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
       
    )
 }

function Aside ({ onChangeName, onChangeEmail, onChangePhone }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleNameChang = (e) => {
        setName(e.target.value);
        onChangeName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        onChangeEmail(e.target.value);
    }   

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        onChangePhone(e.target.value);
    }

    return (
        <aside className='aside'>
            <CustomInput textLabel='Your Full Name' inputType='text' value={name} onChange={handleNameChang} placeholder='Enter Full Name' />
            <CustomInput textLabel='Your Email' inputType='email' value={email} onChange={handleEmailChange} placeholder='Enter Email' />
            <CustomInput textLabel='Your Phone Number' inputType='tel' value={phone} onChange={handlePhoneChange} placeholder='Enter Phone Number' />
        </aside>  
    )
}


export default Aside