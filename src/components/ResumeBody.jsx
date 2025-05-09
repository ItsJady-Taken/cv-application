
function ResumeBody({ userName, userEmail, userPhone, skillsList = [], expInfoList = [], eduInfoList = [] }) {
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
                            <li><strong>Example:</strong></li>
                            <li>html,</li>
                            <li>css,</li>
                            <li>javascript,</li>
                            <li>react,</li>
                            <li>...</li>
                        </>
                    )
                    }
                </ul>
            </div>
            <div id="resume-experience-container" className="resume-experience-container">
                <p>Experience:</p>
                {expInfoList.length >= 1 ? expInfoList.map((exp, index) => (
                    exp.ToggleAddExp === true ?(
                    
                    <div key={index} id={`resume-experience-item-${index}`} className="resume-experience-item">
                        <div className="resume-experience-info">
                            <p className="resume-experience-tilte"><span className="resume-experience-company-text">{exp.Company+':'}</span>  <span className="resume-experience-position-text">{exp.Position}</span></p>
                            <p className="resume-experience-date">{exp.StartDate || '[start date]'} / {exp.EndDate || '[end date]'}</p>
                        </div>
                        <ul className="resume-experience-list">
                            <li><p>{exp.FirstContribution || '[reason 1]'}</p></li>
                            <li><p>{exp.SecondContribution || '[reason 2]'}</p></li>
                            <li><p>{exp.ThirdContribution || '[reason 3]'}</p></li>
                        </ul>
                    </div>
                
                    ) : null )) : (
                    <>
                        <div>
                            <div className="resume-experience-info">
                                <p>[company: position]</p>
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
                                <p>[company: position]</p>
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
                                <p>[company: position]</p>
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
                                <p>[company: position]</p>
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
                                <p>[company: position]</p>
                                <p>[start date / end date]</p>
                            </div>

                            <ul className="resume-experience-list">
                                <li>[reason 1]</li>
                                <li>[reason 2]</li>
                                <li>[reason 3]</li>
                            </ul>
                        </div>
                    </> ) 
                }
            </div> 
                   
            {eduInfoList.length > 0 ? eduInfoList.map((edu, index) => (
                <div key={index} className="resume-education-container">
                    <p>Education:</p>
                    <div className="resume-education-info">
                        <p><strong>{edu.SchoolName}</strong> || {edu.SchoolLocation || '[University Location]'}</p>
                        <p><em>{edu.StartDate || '[start date]'} / {edu.EndDate || '[end date]'}</em></p>
                    </div>
                    <div className="resume-degrees-info">
                        <p>{edu.Degree}</p>
                        <p><strong>Relevant Coursework:</strong><span></span></p>
                    </div>
                </div>
            )) : (
                <div className="resume-education-container">
                    <p>Education:</p>
                    <div className="resume-education-info">
                        <p>[University Name || University Location]</p>
                        <p>[start date / end date]</p>
                    </div>
                    <div className="resume-degrees-info">
                        <p>[Degrees]</p>
                        <p><strong>Relevant Coursework:</strong><span>[<strong>Example:</strong> Data Structures and Algorithms, Web Development,...]</span></p>
                    </div>
                </div>
            )}
            
             

        </section>
    )    
}

export default ResumeBody;