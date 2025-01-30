
function ResumeBody ({userName, userEmail, userPhone}) {
    return (
        <section className='resume-container'>
            <h1>{userName || 'User Name'}</h1>
            <div className='user-link-info'>
                <p>{userEmail || 'name@example.com'}</p>
                <p>{userPhone || 'User Phone Number'}</p>
            </div>
        </section>
    )
}

export default ResumeBody;