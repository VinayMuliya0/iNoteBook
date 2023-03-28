import React from 'react'
import Notes from './Notes'



const Home = (props) => {

    return (
        <>
            <div className='container'>
                <div className="col-12">
                    <Notes showAlert={props.showAlert} />
                </div>
            </div>
        </>
    )
}

export default Home
