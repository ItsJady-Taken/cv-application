
function ResumeBody ({userName, userEmail, userPhone, skillsList=[] }) {
    return (
        <section className='resume-container'>
            <h1>{userName || 'Your Name'}</h1>
            <div className='user-link-info'>
                <p>{userEmail || 'name@example.com'}</p>
                <p>{userPhone || 'Your Phone Number'}</p>
            </div>
            <div className="skill-qualification-container">
                <p>skills:</p>
                <ul className="resume-skill-list">
                    {skillsList.length > 0 ? skillsList.map((skill, index) => (
                        <li key={index}>{skill},</li>
                    )) :( 
                        <>
                            <li>htm,</li>
                            <li>css,</li>
                            <li>javascript,</li>
                            <li>react</li>
                        </>
                    )
                  }
               </ul>
            </div>
            <div>
                <p>Experience:</p>
            </div>
        </section>
    )
}

export default ResumeBody;