
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'

import { CustomInput } from './Aside';

function SkillSection({ addSkillToList }) {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [skillList, setSkillList] = useState([]);
    const [cursorFocus, setCursorFocus] = useState(false);
    const handleDisplayInput = () => {
        setShowInput(!showInput);
    }

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    }

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '' || inputValue.length > 15) {
           return false;
        }
        else{
            const newSkill = [...skillList, inputValue.trim()];
            setSkillList(newSkill);
            addSkillToList(newSkill);
            setInputValue('');
        } 
    }

    const handleRemoveSkill = (removeSkillIndex) => {
        const updatedSkillList = skillList.filter((_, skill) => skill !== removeSkillIndex);
        setSkillList(updatedSkillList);
        addSkillToList(updatedSkillList);
    }

    return (
        <>
            <button className='show-input-btn' onClick={handleDisplayInput}>+Add skill</button>
            
            {showInput && 
                <form className="add-skill-container" onSubmit={handleAddSkill}>
                
                     <div className={`skill-input-container ${cursorFocus || inputValue ? "focused" : ""}`}>
                      <label className="add-skill-label" htmlFor="add-skill-input">Enter One Skill At a Time</label>      
                      <input id='add-skill-input' className='add-skill-input' type="text" value={inputValue} onChange={handleInputValue}
                      onFocus={() => setCursorFocus(true)} onBlur={() => setCursorFocus(false)} />
                    </div>
                 
                    <button className='cancel-skill-btn' type='button'onClick={()=>{setShowInput(false), setInputValue('')}}>Cancel</button>
                
                 
                </form>
            }

            { skillList.length > 0 &&
                <ul className="aside-skill-list">
                    {skillList.map((skill, index) => (
                        <li key={index}><span>{skill}</span>  <button onClick={()=>handleRemoveSkill(index)}>Remove</button></li>
                    ))}
            </ul>
            }   
        </>
    )       
}

function ExperienceSection() {
  const [CompanyValue, setCompanyValue] = useState('');
  const [positionValue, setPositionValue] = useState('');
  const [experienceList, setExperienceList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false)
    };
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (CompanyValue.trim() === '' || positionValue.trim() === '') {
      return false;
    }
    else {
          const newExperience = {
          Company: CompanyValue,
          Position: positionValue,
        }       
      //const newPossition = [...experienceList, CompanyValue.trim() + ' - ' + positionValue.trim()];
      setExperienceList([...experienceList, newExperience]);
      setShow(false);
    }
  }
  
  return (
    <>
      <button className='show-input-btn' onClick={handleShow}>
          +Add Experience
      </button>

      <div>
        {experienceList.length > 0 && 
          <ul className="aside-experience-list">
            {experienceList.map((experience, index) => (
              <li key={index}>`{experience.Company}- {experience.Position}`</li>
            ))}
          </ul>
        }
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Fill in your previous/current job experience</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <fieldset>
              <legend>Your Position And Time In the Company</legend>
              <div>  
                <CustomInput idValue="companyInputId" textLabel="Company Name" inputType="text" 
                value={CompanyValue} onChange={(e) => setCompanyValue(e.target.value)} />
              </div>
              <div>
                <CustomInput idValue="positionInputId" textLabel="Position" inputType="text" type="text" 
                value={positionValue} onChange={(e) => setPositionValue(e.target.value)} e />
              </div>
              <div className="form-group">
                <label htmlFor="appointment-date" className="date-input-label">Appointment Date</label>
                <div className="date-input-container">
                  <input type="date" id="appointment-date" className="date-input" />
           
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="appointment-date" className="date-input-label">Appointment Date</label>
                <div className="date-input-container">
                  <input type="date" id="appointment-date" className="date-input" />
                </div>
              </div>
            </fieldset>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Close</button>   
            <button type='submit'>Understood</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
  


export {SkillSection, ExperienceSection}