import { useState } from 'react';


function CustomInput ({textLabel, inputType, value, onChange, placeholder}) {
    

    return (
        <div className='custom-input'>
            <label>{textLabel}</label>
            <input type={inputType} value={value} onChange={onChange} placeholder={placeholder} />
        </div>
       
    )
 }

function Aside () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();

    console.log(name, email, phone);
    return (
            <aside>
                <CustomInput textLabel='Your Full Name' inputType='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Full Name' />
                <CustomInput textLabel='Your Email' inputType='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                <CustomInput textLabel='Your Phone Number' inputType='tel' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Phone Number' />
            </aside>  
    )
}


export default Aside