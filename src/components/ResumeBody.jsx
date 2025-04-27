
function ResumeBody({ userName, userEmail, userPhone, skillsList = [], expInfoList = [] }) {
    return (
        <section className='resume-container'>
            <div className="user-name">
                <h1>{userName || 'Your Name'}</h1>
            </div>
            
            <div className='user-link-info'>
                <p>{userEmail || 'name@example.com'}</p>
                <p>{userPhone || 'Your Phone Number'}</p>
            </div>
            <div className="skill-qualification-container">
                <p>skills:</p>
                <ul className="resume-skill-list">
                    {skillsList.length > 0 ? skillsList.map((skill, index) => (
                        <li key={index}>{skill},</li>
                    )) : (
                        <>
                            <li>Example:</li>
                            <li>htm,</li>
                            <li>css,</li>
                            <li>javascript,</li>
                            <li>react</li>
                        </>
                    )
                    }
                </ul>
            </div>
            <div className="resume-experience-container">
                <p>Experience:</p>
                {expInfoList.length > 0 ? expInfoList.map((exp, index) => (
                    <div key={index} className="resume-experience-item">
                        <div className="resume-experience-info">
                            <p className="resume-experience-tilte">{exp.Company} / {exp.Position}</p>
                            <p className="resume-experience-date">{exp.StartDate || '[start date'} / {exp.EndDate || 'end date]'}</p>
                        </div>
                        <ul className="resume-experience-list">
                            <li><p>{exp.FirstContribution || '[reason 1]'}</p></li>
                            <li><p>{exp.SecondContribution || '[reason 2]'}</p></li>
                            <li><p>{exp.ThirdContribution || '[reason 3]'}</p></li>
                        </ul>
                    </div>
                )) : (
                    <>
                        <div>
                            <div className="resume-experience-info">
                                <p>[company / position]</p>
                                <p>[start date / end date]</p>
                            </div>

                            <ul className="resume-experience-list">
                                <li>[reason 1]</li>
                                <li>[reason 2]</li>
                                <li>[reason 3]</li>
                            </ul>
                        </div>
                        <div>
                            <div className="resume-experience-info">
                                <p>[company / position]</p>
                                <p>[start date / end date]</p>
                            </div>

                            <ul className="resume-experience-list">
                                <li>[reason 1]</li>
                                <li>[reason 2]</li>
                                <li>[reason 3]</li>
                            </ul>
                        </div>
                        <div>
                            <div className="resume-experience-info">
                                <p>[company / position]</p>
                                <p>[start date / end date]</p>
                            </div>

                            <ul className="resume-experience-list">

                                <li>[reason 1]</li>
                                <li>[reason 2]</li>
                                <li>[reason 3]</li>
                            </ul>
                        </div>
                    </>

                )}


            </div>
        </section>
    )
}

export default ResumeBody;