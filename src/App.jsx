import { useState } from 'react'
import './styles/App.css'
import Header from './components/Header.jsx'
import Aside from './components/Aside.jsx'
import ResumeBody from './components/ResumeBody.jsx';
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  return (
    <>
     <Header />
      <main className='main-content-container'>
       
       
        <Aside onChangeName={setName} onChangeEmail={setEmail} onChangePhone={setPhone} />
       
        <ResumeBody userName={name} userEmail={email} userPhone={phone} />
  
        
      </main>
        
    </>
  )
}

export default App
