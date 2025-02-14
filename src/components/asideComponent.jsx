
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
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <button className='show-input-btn' onClick={handleShow}>
            +Add Experience
        </button>
  
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Do not even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>
              Close
            </button>
            <button>Understood</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  


export {SkillSection, ExperienceSection}