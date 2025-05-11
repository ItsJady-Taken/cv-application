import { useState } from 'react';
import { SkillSection, ExperienceSection, EducationSection } from './asideComponent';

function CustomInput ({idValue, textLabel, inputType, value, onChange, error, onKeyDown}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`custom-input ${isFocused || value ? "focused" : ""}`}>
            <label htmlFor={idValue} className={`floating-label ${ error ? "label-error" : ""}`}>{textLabel}</label>
             {/* Show error message if exists */}
           {error && <p className="error-message">{error}</p> }
            
                
            <input id={idValue} type={inputType} value={value} onChange={onChange} 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)} 
              className={error ? 'error' : ''}
              onKeyDown={onKeyDown}/>
        </div>
       
    )
 }



function Aside ({ onChangeName, onChangeEmail, onChangePhone, skillsList, expInfoList, eduInfoList }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    

    //-- Check Validation name,email,phone number --//

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
        } else if (value.length > 45){
            setEmailError('# Maximum 45 characters allowed');
            return false;
        }
         else {
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

    //handle adding skills
    const handleAddSkill = (newSkill) => {
        skillsList(newSkill);
    }

    //handle adding experience
    const handleAddExperience = (newExperience) => {
        expInfoList(newExperience);
    }
    //handle adding education
    const handleAddEducation = (newEducation) => {
        eduInfoList(newEducation);
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
                <SkillSection addSkillToList={handleAddSkill} />    
            </div>
            <div className="experience-section-container">
                <p>Experience<span>*</span></p>
                <ExperienceSection addExperienceToList={handleAddExperience} />
            </div>
            <div className="education-section-container">
                <p>Education<span>*</span></p>
                <EducationSection addEducationToList={handleAddEducation} />
            </div>
        </aside>  
    )
}


export {CustomInput}

export default Aside