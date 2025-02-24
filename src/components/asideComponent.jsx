
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'

function SkillSection({ addSkillToList }) {
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
        if (inputValue.trim() === '') {
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
                <form className='add-skill-container' onSubmit={handleAddSkill}>
                    <input id='add-skill-input' className='add-skill-input' type="text" value={inputValue} onChange={handleInputValue} placeholder='Add your skill' />
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
    const [show, setShow] = useState(false);
  
    const handleClose = (e) => {
      e.preventDefault();
      setShow(false)
     };
    const handleShow = (e) => {
      e.preventDefault();
      setShow(true)
    };
  
    return (
      <>
        <button className='show-input-btn' onClick={handleShow}>
            +Add Experience
        </button>
  
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              
                <div>
                  <label htmlFor="companyInput">Enter Company Name</label>
                  <input name="companyInput" type="text" placeholder='Company Name' />
                </div>
                <div>
                  <label htmlFor="positionInput">Enter Position</label>
                  <input name="positionInput" type="text" placeholder='Position' />
                </div>
                <div>
                  <label htmlFor="durationStart">Start</label>
                  <input name="durationStart" type="date" placeholder='Duration' />
                </div>
                <div>
                  <label htmlFor="durationEnd">End</label>
                  <input name="durationEnd" type="date" placeholder='Duration' />
                </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleClose}>Close</button>   
              <button type='submit' onClick={handleClose}>Understood</button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
  


export {SkillSection, ExperienceSection}