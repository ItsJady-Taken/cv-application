import { useState } from 'react'
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

  return (
    <>
     <Header />
      <main className='main-content-container'>
        <Aside onChangeName={setName} onChangeEmail={setEmail} onChangePhone={setPhone} skillsList={setSkillsList} />
        <ResumeBody userName={name} userEmail={email} userPhone={phone} skillsList={skillsList} />
      </main>
        
    </>
  )
}

export default App
