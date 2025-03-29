
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'

import { CustomInput } from './Aside';

function SkillSection({ addSkillToList }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [skillList, setSkillList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleDisplayInput = () => {
          setShowInput(!showInput);
      }

  const handelErrorMessage = (value) => {
      if (value.length > 15) {
          setErrorMessage('# Maximum 15 characters allowed');
      }
      else {
          setErrorMessage('');
      }
  }

  
  const handleInputValue = (e) => {
      handelErrorMessage(e.target.value);
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
              <CustomInput idValue='add-skill-input' textLabel='Enter A Skill At a Time' inputType='text'
              value={inputValue} onChange={handleInputValue} error={errorMessage} />
              <button className='cancel-skill-btn' type='button'onClick={()=>{setShowInput(false), setInputValue('')}}>Cancel</button>
              
            </form>
        }

        { skillList.length > 0 &&
          <ol className="aside-skill-list">
                {skillList.map((skill, index) => (
                    <li key={index}><span>{skill}</span>  <button onClick={()=>handleRemoveSkill(index)}>Remove</button></li>
                ))}
          </ol>
        }   
    </>
  )       
}

function ExperienceSection({ addExperienceToList }) {
  const [CompanyValue, setCompanyValue] = useState('');
  const [positionValue, setPositionValue] = useState('');
  const [experienceList, setExperienceList] = useState([]);

  // display useState
  const [limitCount, setLimitCount] = useState(0);
  const maxChars = 200;
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
      setExperienceList([...experienceList, newExperience]);
      addExperienceToList([...experienceList, newExperience]);
      setCompanyValue('');
      setPositionValue('');
      setShow(false);
    }
  }

  const handleFirstTextareaLimit = (e) => {
    setLimitCount(e.target.value.length);
  }

  const getColor = () => {
    if (limitCount > maxChars ) {
      return '#ef4444';
    }
    else {
      return '';
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
        <form className='modal-form' onSubmit={handleSubmit}>
          <Modal.Body>
            <fieldset className='modal-fieldset'>
              <legend>Your Position And Time In the Company</legend>
             
              <CustomInput className='company-input' idValue="companyInputId" textLabel="Company Name" inputType="text" 
              value={CompanyValue} onChange={(e) => setCompanyValue(e.target.value)} />
            
            
              <CustomInput idValue="positionInputId" textLabel="Position / Title" inputType="text" 
              value={positionValue} onChange={(e) => setPositionValue(e.target.value)} />

              <div className="date-input-container">
                <div className="form-group">
                <label htmlFor="appointment-date" className="date-input-label">Start Date</label>
                  <div className="date-input-container">
                    <input type="date" id="appointment-date" className="date-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="appointment-date" className="date-input-label">End Date</label>
                  <div className="date-input-container">
                    <input type="date" id="appointment-date" className="date-input" />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className='modal-fieldset'>
              <legend>Your Controbution</legend>
              <div className="textarea-wrapper">
                <textarea id="modern-textarea" className="textarea" placeholder=" "  onChange={handleFirstTextareaLimit} required></textarea>
                <label htmlFor="modern-textarea" className="textarea-label">Your first contribution...</label>
                <div className="textarea-footer">
                    <div className="char-count" style={{ color: getColor() }}>{limitCount} / {maxChars} characters</div>
                </div>
              </div>
            </fieldset>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose} className="btn btn-cancel">Close</button>   
            <button type='submit' className="btn btn-submit">Understood</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
  


export {SkillSection, ExperienceSection}