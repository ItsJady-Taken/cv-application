
function ResumeBody ({userName, userEmail, userPhone}) {
    return (
        <section className='resume-container'>
            <h1>{userName || 'Your Name'}</h1>
            <div className='user-link-info'>
                <p>{userEmail || 'name@example.com'}</p>
                <p>{userPhone || 'Your Phone Number'}</p>
            </div>
        </section>
    )
}

export default ResumeBody;