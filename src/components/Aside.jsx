import { useState } from 'react';


function CustomInput ({idValue, textLabel, inputType, value, onChange, error}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`custom-input ${isFocused || value ? "focused" : ""}`}>
            <label htmlFor={idValue} className={`floating-label ${ error ? "label-error" : ""}`}>{textLabel}</label>
             {/* Show error message if exists */}
           {error && <p className="error-message">{error}</p> }
            
                
            <input id={idValue} type={inputType} value={value} onChange={onChange} 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)} 
              className={error ? 'error' : ''}/>
        </div>
       
    )
 }

function SkillSection() {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [skillList, setSkillList] = useState([]);

    const handleDisplayInput = () => {
        setShowInput(!showInput);
    }

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    }

    const handleAddSkill = (e) => {
        e.preventDefault();
        setSkillList([...skillList, inputValue.trim()]);
        setShowInput(false);
        setInputValue('');
    }

    return (
        <>
        <button onClick={handleDisplayInput}>Add skill</button>
        
        {showInput && 
        <form onSubmit={handleAddSkill}>
             <input type="text" value={inputValue} onChange={handleInputValue} placeholder='Add your skill' />
             <button type='submit'>Add</button>
             <button type='reset'>Cancel</button>
        </form>
           
        }

        { skillList.length > 0 &&
            <ul className="skill-list">
                {skillList.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
        </ul>
        }   
        </>
    )       
}


function Aside ({ onChangeName, onChangeEmail, onChangePhone }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    
    // const [addSkill, setAddSkill] = usestate('');

    //-- Check Validation --//

    const checkValidName = (value) => { 
        if (!/^[A-Za-z\s]+$/.test(value)) {
            setNameError('# Name should only contain letters and spaces');
            return false;
        } else {
            setNameError('');
            return true;
        }
     }
    const checkValidEmail = (value) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmailError('# Invalid email address (username@example.com)');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    }
    const checkValidPhone = (value) => {
        if (!/^\d{10}$/.test(value)) {
            setPhoneError('# Phone number should be 10 digits');
            return false;
        } else if (!/^\d+$/.test(value)) {
            setPhoneError('# Phone number should only contain digits');
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
            onChangeName(e.target.value.toUpperCase());
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
                <CustomInput idValue='name-input' textLabel='Your Full Name' inputType='text' value={name} onChange={handleNameChange}  error={nameError} />
                <CustomInput idValue='email-input' textLabel='Your Email' inputType='email' value={email} onChange={handleEmailChange}  error={emailError} />
                <CustomInput idValue='phoneNumber-input' textLabel='Your Phone Number' inputType='tel' value={phone} onChange={handlePhoneChange} error={phoneError} />
            </div>
            <div className="skill-section-container"> 
                <p>Skills/Qualification<span>*</span></p>
                <SkillSection />    
            </div>
        </aside>  
    )
}




export default Aside