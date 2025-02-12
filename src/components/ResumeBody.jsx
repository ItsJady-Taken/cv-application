
function ResumeBody ({userName, userEmail, userPhone}) {
    return (
        <section className='resume-container'>
            <h1>{userName || 'Your Name'}</h1>
            <div className='user-link-info'>
                <p>{userEmail || 'name@example.com'}</p>
                <p>{userPhone || 'Your Phone Number'}</p>
            </div>
            <div className="skill-qualification-container">
                <p>skills</p>
                <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                </ul>
            </div>
        </section>
    )
}

export default ResumeBody;