import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useEffect } from 'react';
import { createRephraseProject, getRephraseProjects } from '../../actions/rephrase/rephrase';
import { Link } from 'react-router-dom'
import Unauthorized from '../Unauthorized';

interface IRePhraseHomeProps {
}

const RePhraseHome: React.FunctionComponent<IRePhraseHomeProps> = (props) => {

    const dispatch = useDispatch()

    const userState = useSelector((state: RootStore) => state.authReducer.userdata)
    const projectState = useSelector((state: RootStore) => state.rephraseReducer.projects)

    useEffect(() => {
        if (userState.id !== -1)
            dispatch(getRephraseProjects())
    }, [])

    return <>

        {userState.id === -1 && <Unauthorized />}

        {userState.id !== -1 && <div className='rephrase-main'>
            <h1>Мои проекты</h1>
            <div className='rephrase-projects'>
                {projectState && projectState.length >= 0 && projectState.map(project => {
                    return <>
                        <Link to={'/rephrase/' + project.id} key={project.id}><button>{project.name}</button></Link>
                    </>
                })}
                <button onClick={() => dispatch(createRephraseProject())}><i className='fas fa-plus' /></button>
            </div>
        </div>}
    </>;
};

export default RePhraseHome;
