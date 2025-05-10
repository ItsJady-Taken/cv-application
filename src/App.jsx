import { useState, useRef } from 'react'
import './styles/App.css'
import './styles/aside.css'
import './styles/modal.css'
import Header from './components/Header.jsx'
import Aside from './components/Aside.jsx'
import ResumeBody from './components/ResumeBody.jsx';


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skillsList, setSkillsList] = useState([]);
  const [expInfoList, setExpInfoList] = useState([]);
  const [eduInfoList, setEduInfoList] = useState([]);

  const resumeRef = useRef(null); // create a ref object


  return (
    <>
     <Header resumeBodyRef={resumeRef} />
      <main className='main-content-container'>
        <Aside onChangeName={setName} onChangeEmail={setEmail} onChangePhone={setPhone} skillsList={setSkillsList}  expInfoList={setExpInfoList} eduInfoList={setEduInfoList} />
        <ResumeBody ref={resumeRef} userName={name} userEmail={email} userPhone={phone} skillsList={skillsList} expInfoList={expInfoList} eduInfoList={eduInfoList} />
      </main> 
        
    </>
  )
}

export default App
