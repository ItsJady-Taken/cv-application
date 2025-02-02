import { useState } from 'react';


function CustomInput ({textLabel, inputType, value, onChange, error}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`custom-input ${isFocused || value ? "focused" : ""}`}>
            <label className='floating-label'>{textLabel}</label>
             {/* Show error message if exists */}
           {error && ( <p className="error-message">{error}</p> )}
            
                
            <input type={inputType} value={value} onChange={onChange} 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)} />
            
        </div>
       
    )
 }

function Aside ({ onChangeName, onChangeEmail, onChangePhone }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    //-- Check Validation --//

    const checkValidName = (value) => { 
        if (!/^[A-Za-z\s]+$/.test(value)) {
            setNameError('Name should only contain letters and spaces');
            return false;
        } else {
            setNameError('');
            return true;
        }
     }
    const checkValidEmail = (value) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmailError('Invalid email address (username@example.com)');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    }
    const checkValidPhone = (value) => {
        if (!/^\d{10}$/.test(value)) {
            setPhoneError('Phone number should be 10 digits');
            return false;
        } else if (!/^\d+$/.test(value)) {
            setPhoneError('Phone number should only contain digits');
            return false;
        } 
        else {
            setPhoneError('');
            return true;
        }
    }
     //-- Handle Change in Inputs --//

    const handleNameChange = (e) => {
        if(checkValidName(e.target.value)){
            setName(e.target.value);
            onChangeName(e.target.value);
        }
        else{
            onChangeName('');
            setName(e.target.value);
        }
    }
    const handleEmailChange = (e) => {
        if(checkValidEmail(e.target.value)){
            setEmail(e.target.value);
            onChangeEmail(e.target.value);
        }
        else{
            setEmail(e.target.value);
            onChangeEmail('')
        } 
    }   
    const handlePhoneChange = (e) => {
        if(checkValidPhone(e.target.value)){
            setPhone(e.target.value);
            onChangePhone(e.target.value);
        }
        else{
            setPhone(e.target.value);
            onChangePhone('');
        }
        
    }


    return (
        <aside className='aside'>
            <div className="custom-input-container">
                <p>Personal Information<span>*</span></p>
                <CustomInput textLabel='Your Full Name' inputType='text' value={name} onChange={handleNameChange}  error={nameError} />
                <CustomInput textLabel='Your Email' inputType='email' value={email} onChange={handleEmailChange}  error={emailError} />
                <CustomInput textLabel='Your Phone Number' inputType='tel' value={phone} onChange={handlePhoneChange} error={phoneError} />
            </div>
           
        </aside>  
    )
}


export default Aside