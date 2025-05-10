
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
     
      if (value.trim().length > 20) {
          setErrorMessage('# Maximum 20 characters allowed');
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
      handelErrorMessage(e.target.value.replace(/\s/g, ''));
      setInputValue(e.target.value.replace(/\s/g, ''));
  }

  const handleAddSkill = (e) => {
      e.preventDefault();
     
      if (inputValue.trim() === '' || inputValue.trim().length > 20 || skillList.includes(inputValue) || skillList.length >= 20) {
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
              <div className="add-skill-btn-container">
                <button className='add-skill-btn' type='submit'>Add</button>
                <button className='cancel-skill-btn' type='button'onClick={()=>{setShowInput(false), setInputValue('')}}>Cancel</button>
              
              </div>
              
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

  // useState value for modal
  const [companyValue, setCompanyValue] = useState('');
  const [positionValue, setPositionValue] = useState('');
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [fisrtContri, setFisrtContri] = useState('');
  const [secondContri, setSecondContri] = useState('');
  const [thirdContri, setThirdContri] = useState('');
  const [experienceList, setExperienceList] = useState([]);

  // error useState value for modal
  const [companyError, setCompanyError] = useState('');
  const [positionError, setPositionError] = useState('');
  // Texarea error
  const [fisrtContriError, setFisrtContriError] = useState('');
  const [secondContriError, setSecondContriError] = useState('');
  const [thirdContriError, setThirdContriError] = useState('');

  // limmit character input in modal textarea
  const [limitCount, setLimitCount] = useState(0);
  const [limitCount2, setLimitCount2] = useState(0);
  const [limitCount3, setLimitCount3] = useState(0);

  // editing experience index
 const [editIndex, setEditIndex] = useState(null);

  // const reset all usestate value in modal
  const clearAll = () => {
    //reset form input
    setCompanyValue('');
    setPositionValue('');
    setStartDateValue('');
    setEndDateValue('');
    setFisrtContri('');
    setSecondContri('');  
    setThirdContri('');

    //reset error message
    setCompanyError('');
    setPositionError('');
    setFisrtContriError('');
    setSecondContriError('');
    setThirdContriError('');
    setLimitCount(0);
    setLimitCount2(0);
    setLimitCount3(0);
  }
  
  // useState value for displaying the modal
  const [show, setShow] = useState(false);
  const maxChars = 200;

  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleShow = (e) => {
    e.preventDefault();
    if(experienceList.length === 5){ 
      alert('You can not add more than 5 experience');
      return false;
    }
    else {
      clearAll();
      setEditIndex(null);
      setShow(true)
    }
    
  };

  // submit modal form
  const handleSubmit = (e) => {
     e.preventDefault();
    // validation errors
    if (companyValue.trim() === ''){ 
      setCompanyError('# Fill in your company name'); 
      return false;
    }
    else if (positionValue.trim() === '') {
      setPositionError('# Fill in your position / Role');
    }
    else if(limitCount > maxChars || limitCount2 > maxChars || limitCount3 > maxChars) {
      return false;
    }
    // if no error
    else {
      const newExperience = {
        Company: companyValue,
        Position: positionValue,
        StartDate: startDateValue,
        EndDate: endDateValue,
        FirstContribution: fisrtContri,
        SecondContribution: secondContri,
        ThirdContribution: thirdContri,
        ToggleAddExp: false
      }   
      let updatedList;
      if(editIndex !== null) {
        updatedList = experienceList.map((exp, index) =>
          index === editIndex ? newExperience : exp
        );
        addExperienceToList(updatedList);
      }
      else {
        // CREATE: append new
        updatedList = [...experienceList, newExperience];
      }
      // add to list   
      setExperienceList(updatedList);
      
      
      clearAll();
      setShow(false);
    }
  }

  // toggle switch diplay experience section
  const handleAddExpToResume = (index) => {
    let updatedList = [...experienceList];
    
    if(updatedList[index].ToggleAddExp === false) {
      updatedList[index].ToggleAddExp = true;
      setExperienceList(updatedList);
      addExperienceToList(updatedList);
    }
    else {
      updatedList[index].ToggleAddExp = false;
      setExperienceList(updatedList);
      addExperienceToList(updatedList.filter((_, i) => i !== index));
    }  
  } 

  const handleToggleStyle = (index) => {
    let updatedList = [...experienceList];
    if(updatedList[index].ToggleAddExp === false) {
      return 'line-through';
    }
    
  }

  // limit character function in textarea for modal
  const handleFirstTextareaLimit = (e) => {
    const noSpaceChar = e.target.value.replace(/\s/g, '').length;
    setLimitCount(noSpaceChar);
    if(limitCount > maxChars) {
      setFisrtContriError('# Maximum 200 characters allowed');
   }
    else {
       setFisrtContriError('');
    }
  }

  const handleSecondTextareaLimit = (e) => {
    const noSpaceChar = e.target.value.replace(/\s/g, '').length;
    setLimitCount2(noSpaceChar);
     if(limitCount2 > maxChars) {
      setSecondContriError('# Maximum 200 characters allowed');
    }
    else {
      setSecondContriError('');
    }
  } 

  const handleThirdTextareaLimit = (e) => {
    const noSpaceChar = e.target.value.replace(/\s/g, '').length;
    setLimitCount3(noSpaceChar);
    if(limitCount3 > maxChars) {
      setThirdContriError('# Maximum 200 characters allowed');
    }
    else {
      setThirdContriError('');
    }
  }

  // error color for textarea in modal
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

  // handle edit experience
  const handleEdit = (editIndex) => {
  
    let exp = experienceList[editIndex];

    setCompanyValue(exp.Company);
    setPositionValue(exp.Position);
    setStartDateValue(exp.StartDate);
    setEndDateValue(exp.EndDate);
    setFisrtContri(exp.FirstContribution);
    setSecondContri(exp.SecondContribution);
    setThirdContri(exp.ThirdContribution);

    setEditIndex(editIndex);
    setShow(true);
    
  }


  return (
    <>
    <div>
      <button className='show-input-btn' onClick={handleShow}>
          +Add Experience
      </button>
    </div>
      

      <div>
        {experienceList.length > 0 &&
          <ul className="aside-experience-list">
            {experienceList.map((experience, index) => (
              <li className='aside-experience-item' id={index} key={index}>
                <span onClick={() => handleEdit(index)} style={{textDecoration: handleToggleStyle(index)}}>{experience.Company} - {experience.Position}</span> 
                <ToggleSwitch idValue={index} onChange={() => handleAddExpToResume(index)} isChecked={experience.ToggleAddExp} />   
              </li>     
            ))}
          </ul>
        }
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>YOUR JOB EXPERIENCE AND CONTRIBUTIONS</Modal.Title>
        </Modal.Header>
        <form className='modal-form' onSubmit={handleSubmit}>
         
          <Modal.Body>
            <fieldset className='modal-fieldset'>
              <legend>Enter your job title and the length of time you&apos;ve been with the company</legend>
              <div className='modal-text-container'>
                <CustomInput className='company-input' idValue="companyInputId" textLabel="Company Name (required)" inputType="text" 
                value={companyValue} onChange={(e) => setCompanyValue(e.target.value)} error={companyError} onKeyDown={(e) => {if (e.key === 'Enter')e.preventDefault();}} />
              
    
                <CustomInput idValue="positionInputId" textLabel="Position / Title (required)" inputType="text" 
                value={positionValue} onChange={(e) => setPositionValue(e.target.value)} error={positionError} onKeyDown={(e) => {if (e.key === 'Enter')e.preventDefault();}} />
              </div>
              
              <div className="modal-date-container">
                <div className="date-form-group">
                <label htmlFor="start-date" className="date-input-label">Start Date</label>
                  <div className="date-input-container">
                    <input type="date" id="start-date" className="date-input" value={startDateValue} 
                    onChange={(e) => setStartDateValue(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter')e.preventDefault();}}/>
                  </div>
                </div>
                <div className="date-form-group">
                  <label htmlFor="end-date" className="date-input-label">End Date</label>
                  <div className="date-input-container">
                    <input type="date" id="end-date" className="date-input" value={endDateValue} 
                    onChange={(e) => setEndDateValue(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter')e.preventDefault();}} />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className='modal-fieldset'>
              <legend>Give 3 decriptions of your previous/current job experience and contributions</legend>
              <p style={{ color: '#6c757d', fontStyle: 'italic'}}>Note: Your descriptions must be less than 200 characters</p>
              <div className="textarea-wrapper">
                <textarea id="contro-textarea-1" className="textarea" placeholder=" " value={fisrtContri}
                  onChange={(e)=>{ setFisrtContri(e.target.value); handleFirstTextareaLimit(e)}} ></textarea>
                <label htmlFor="contro-textarea-1" className="textarea-label">Write a description of your first contribution...</label>
                <div className="textarea-footer">
                    <div className="char-count" style={{ color: getColor() }}>{limitCount} / {maxChars} characters</div>
                    <div className="textarea-error-message" style={{ color: getColor() }}>{fisrtContriError}</div>
                </div>
              </div>

              <div className="textarea-wrapper">
                <textarea id="contro-textarea-2" className="textarea" placeholder=" " value={secondContri}  onChange={(e)=>{ setSecondContri(e.target.value); handleSecondTextareaLimit(e)}} ></textarea>
                <label htmlFor="contro-textarea-2" className="textarea-label">Write a description of your second contribution...</label>
                <div className="textarea-footer">
                    <div className="char-count" style={{ color: getColor2() }}>{limitCount2} / {maxChars} characters</div>
                    <div className="textarea-error-message" style={{ color: getColor2() }}>{secondContriError}</div>
                </div>
              </div>

              <div className="textarea-wrapper">
                <textarea id="contro-textarea-3" className="textarea" placeholder=" " value={thirdContri} onChange={(e)=>{setThirdContri(e.target.value); handleThirdTextareaLimit(e)}} ></textarea>
                <label htmlFor="contro-textarea-3" className="textarea-label">Write a description of your third contribution...</label>
                <div className="textarea-footer">
                    <div className="char-count" style={{ color: getColor3() }}>{limitCount3} / {maxChars} characters</div>
                    <div className="textarea-error-message" style={{ color: getColor3()}}>{thirdContriError}</div>
                </div>
              </div>
            </fieldset>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose} className="btn btn-cancel">Close</button>   
            <button type='submit' className="btn btn-submit">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
 
function EducationSection({ addEducationToList }) {
  const [educationlist, setEducationlist] = useState([]);
  const [schoolName, setSchoolName] = useState('');
  const [schoolLocation, setSchoolLocation] = useState('');
  const [degree, setDegree] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [courseWorkValue, setCourseWorkValue] = useState('');

  const [editEdu, setEditEdu] = useState(null);

  // error messages
  const [schoolNameError, setSchoolNameError] = useState('');
  const [schoolLocationError, setSchoolLocationError] = useState('');
  const [schoolDegreeError, setSchoolDegreeError] = useState('');

  // reset all usestate value in modal
  const clearAll = () => {
    setSchoolName(''); 
    setSchoolLocation('');
    setDegree('');
    setStartDate('');
    setEndDate('');

    setSchoolNameError('');
    setSchoolLocationError('');
    setSchoolDegreeError('');
  }

  // displaying the modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    if (educationlist.length >= 1) {
      alert('You can only add one education details');
      return false;
    }
    clearAll();
    setEditEdu(null);
    setShowModal(true);
  }

  const handleEdit = (editIndex) => {
    let edu = educationlist[editIndex];
    setSchoolName(edu.SchoolName);
    setSchoolLocation(edu.SchoolLocation);
    setDegree(edu.Degree);
    setStartDate(edu.StartDate);
    setEndDate(edu.EndDate);
    setCourseWorkValue(edu.CourseWork);
    setEditEdu(editIndex);

    setShowModal(true);
  }

  // handle validation input
  const handleSchoolName = (e) => {
    const noSpaceChar = e.target.value.replace(/\s/g, '').length;
    if (noSpaceChar > 30) {
      setSchoolNameError("# Your University's name is too long. Please shorten it to under 30 characters");
    }
    else {
      setSchoolNameError('');
      setSchoolName(e.target.value);
    }
  }

  const handleSchoolLocation = (e) => {
    const noSpaceChar = e.target.value.replace(/\s/g, '').length;
    if (noSpaceChar > 30) {
      setSchoolLocationError("# University location is too long. Please shorten it to under 30 characters");
    }
    else {
      setSchoolLocationError('');
      setSchoolLocation(e.target.value);
    }
  }

  const handleDegree = (e) => {
    const noSpaceChar = e.target.value.replace(/\s/g, '').length;
    if (noSpaceChar > 50) {
      setSchoolDegreeError("# No way! Your degree is this long? Please shorten it to under 30 characters");
    }
    else {
      setSchoolDegreeError('');
      setDegree(e.target.value);
    }
  }

  // submit modal form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (schoolName.trim() === '') {
      setSchoolNameError("# Enter your University name");
    }
    else {
      const educationDetails = {
        SchoolName: schoolName,
        SchoolLocation: schoolLocation,
        Degree: degree,
        StartDate: startDate,
        EndDate: endDate,
        CourseWork: courseWorkValue

      }

      let updatedList;
      if(editEdu !== null) {
         updatedList = educationlist.map((edu, index) =>
          index === editEdu ? educationDetails : edu
        );}
      else {
        updatedList = [...educationlist, educationDetails];
         
      }
      setEducationlist(updatedList);
      addEducationToList(updatedList);
    
      clearAll();
      setShowModal(false);
    }
  }

  return (
    <>
    <div>
      <button className='show-input-btn' onClick={handleShow} >
          +Add Education
      </button>
    </div>

    <div className="education-section-container">
      {educationlist.map((item, index) => (
        <div className="education-item" key={index}>  
          <div className="education-item-name"><p>{item.SchoolName}</p> <button onClick={() => handleEdit(index)}>Edit</button></div>
        </div>
      ))}
    </div>  


    <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>YOUR EDUCATION DETAILS</Modal.Title>
        </Modal.Header>
        <form className='modal-form' onSubmit={handleSubmit}>
          <Modal.Body>
            <fieldset className='modal-fieldset'>
              <legend>Your University/School name, location, degree and graduation date</legend>
              <CustomInput idValue="school-input" textLabel="University Name (required)" inputType="text" 
              value={schoolName} onChange={handleSchoolName} error={schoolNameError} onKeyDown={(e) => {if (e.key === 'Enter')e.preventDefault();}}/>

              <CustomInput idValue="field-input" textLabel="University Location" inputType="text"
              value={schoolLocation} onChange={handleSchoolLocation} error={schoolLocationError} onKeyDown={(e) => {if (e.key === 'Enter')e.preventDefault();}} />
              
              <CustomInput idValue="degree-input" textLabel="Degree" inputType="text" 
              value={degree} onChange={handleDegree} error={schoolDegreeError} onKeyDown={(e) => {if (e.key === 'Enter')e.preventDefault();}} />

                
              <div className="modal-date-container">
                  <div className="date-form-group">
                  <label htmlFor="start-date" className="date-input-label">Start Date</label>
                    <div className="date-input-container">
                      <input type="date" id="start-date" className="date-input" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                      onKeyDown={(e) => {if (e.key === 'Enter')e.preventDefault();}}/>
                    </div>
                  </div>
                  <div className="date-form-group">
                    <label htmlFor="end-date" className="date-input-label">End Date</label>
                    <div className="date-input-container">
                      <input type="date" id="end-date" className="date-input" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                      onKeyDown={(e) => {if (e.key === 'Enter')e.preventDefault();}} />
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className='modal-fieldset'>
                <legend>Relavant Coursework</legend>
                <div className="textarea-wrapper">
                  <textarea id="contro-textarea-3" className="textarea" placeholder=" " value={courseWorkValue} onChange={(e) => setCourseWorkValue(e.target.value)}></textarea>
                  <label htmlFor="contro-textarea-3" className="textarea-label"><strong>Example:</strong> Data Science, Machine Learning, Artificial Intelligence, etc...</label>
                </div>
              </fieldset>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" onClick={handleClose} className="btn btn-cancel">Close</button>   
            <button type='submit' onClick={handleSubmit} className="btn btn-submit">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}


function ToggleSwitch({idValue, onChange, isChecked}) {
  return (
    <label className="switch">
        <input type="checkbox" id={idValue} onClick={onChange} checked={isChecked} readOnly/>
        <span className="slider"></span>
    </label>
  
  );
} 



export {SkillSection, ExperienceSection, EducationSection, ToggleSwitch}