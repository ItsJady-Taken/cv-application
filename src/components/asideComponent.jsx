
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
      else if (skillList.includes(value)) {
          setErrorMessage('# Skill already added');
      }
      else if (skillList.length >= 20) {
          setErrorMessage('# Maximum 20 skills allowed');
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
      if (inputValue.trim() === '' || inputValue.length > 15 || skillList.includes(inputValue) || skillList.length >= 20) {
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
              <CustomInput idValue='add-skill-input' textLabel='Add a skill one at a time' inputType='text'
              value={inputValue} onChange={handleInputValue} error={errorMessage} />
              <button className='add-skill-btn' type='submit'>Add</button>
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
  const [companyValue, setCompanyValue] = useState('');
  const [positionValue, setPositionValue] = useState('');
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [fisrtContri, setFisrtContri] = useState('');
  const [experienceList, setExperienceList] = useState([]);

  // error useState
  const [companyError, setCompanyError] = useState('');
  const [positionError, setPositionError] = useState('');
  // limmit character input
  const [limitCount, setLimitCount] = useState(0);
  const [limitCount2, setLimitCount2] = useState(0);
  const [limitCount3, setLimitCount3] = useState(0);
  const maxChars = 200;
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false)
    };
  const handleShow = (e) => {
    e.preventDefault();
    if(experienceList.length >= 5){
      return false;
    }
    else {
      setShow(true)
    }
    
  };


  const handleSubmit = (e) => {
     e.preventDefault();
  
    if (companyValue.trim() === '' || positionValue.trim() === '') {
      setCompanyError('# Company name is required');
      setPositionError('# Position / Role is required');
      return false;
    }
    else {
      const newExperience = {
        Company: companyValue,
        Position: positionValue,
        StartDate: startDateValue,
        EndDate: endDateValue,
        FirstContribution: fisrtContri,

      }   
      // add to list   
      setExperienceList([...experienceList, newExperience]);
      addExperienceToList([...experienceList, newExperience]);
      //reset form input
      setCompanyValue('');
      setPositionValue('');
      setStartDateValue('');
      setEndDateValue('');
      setFisrtContri('');

      //reset error message
      setCompanyError('');
      setLimitCount(0);
      setLimitCount2(0);
      setLimitCount3(0);
      setShow(false);
    }
  }

  const handleFirstTextareaLimit = (e) => {
    setLimitCount(e.target.value.length);

  }

  const handleSecondTextareaLimit = (e) => {
    setLimitCount2(e.target.value.length);
  } 

  const handleThirdTextareaLimit = (e) => {
    setLimitCount3(e.target.value.length);
  }

  const getColor = () => {
    if (limitCount > maxChars) {
      return '#ef4444';
    }
    else {
      return '';
    }
  }

  const getColor2 = () => {
     if (limitCount2 > maxChars) {
      return '#ef4444';
    }
    else {
      return '';
    }
  }

  const getColor3 = () => {
    if (limitCount3 > maxChars) {
      return '#ef4444';
    }
    else {
      return '';
    }
  }

  return (
    <>
    <div>
      <div className='experience-error'></div>
      <button className='show-input-btn' onClick={handleShow}>
          +Add Experience
      </button>
    </div>
      

      <div>
        {experienceList.length > 0 && 
          <ul className="aside-experience-list">
            {experienceList.map((experience, index) => (
              <li className='aside-experience-item' key={index}><span>{experience.Company} - {experience.Position}</span></li>
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
              <legend>Fill in your job title and the time you worked in the company </legend>
              <div className='modal-text-container'>
                <CustomInput className='company-input' idValue="companyInputId" textLabel="Company Name" inputType="text" 
                value={companyValue} onChange={(e) => setCompanyValue(e.target.value)} error={companyError} />
              
    
                <CustomInput idValue="positionInputId" textLabel="Position / Role" inputType="text" 
                value={positionValue} onChange={(e) => setPositionValue(e.target.value)} error={positionError} />
              </div>
              
              <div className="modal-date-container">
                <div className="date-form-group">
                <label htmlFor="appointment-date" className="date-input-label">Start Date</label>
                  <div className="date-input-container">
                    <input type="date" id="appointment-date" className="date-input" value={startDateValue} onChange={(e) => setStartDateValue(e.target.value)} />
                  </div>
                </div>
                <div className="date-form-group">
                  <label htmlFor="appointment-date" className="date-input-label">End Date</label>
                  <div className="date-input-container">
                    <input type="date" id="appointment-date" className="date-input" value={endDateValue} onChange={(e) => setEndDateValue(e.target.value)} />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className='modal-fieldset'>
              <legend>Give 3 decriptions of your previous/current job experiences and contributions</legend>
              <div className="textarea-wrapper">
                <textarea id="contro-textarea-1" className="textarea" placeholder=" " value={fisrtContri}  onChange={(e)=>{ setFisrtContri(e.target.value); handleFirstTextareaLimit(e)}} ></textarea>
                <label htmlFor="contro-textarea-1" className="textarea-label">Your first contribution...</label>
                <div className="textarea-footer">
                    <div className="char-count" style={{ color: getColor() }}>{limitCount} / {maxChars} characters</div>
                    <div></div>
                </div>
              </div>

              <div className="textarea-wrapper">
                <textarea id="contro-textarea-2" className="textarea" placeholder=" "  onChange={handleSecondTextareaLimit} ></textarea>
                <label htmlFor="contro-textarea-2" className="textarea-label">Your second contribution...</label>
                <div className="textarea-footer">
                    <div className="char-count" style={{ color: getColor2() }}>{limitCount2} / {maxChars} characters</div>
                </div>
              </div>

              <div className="textarea-wrapper">
                <textarea id="contro-textarea-3" className="textarea" placeholder=" "  onChange={handleThirdTextareaLimit} ></textarea>
                <label htmlFor="contro-textarea-3" className="textarea-label">Your third contribution...</label>
                <div className="textarea-footer">
                    <div className="char-count" style={{ color: getColor3() }}>{limitCount3} / {maxChars} characters</div>
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