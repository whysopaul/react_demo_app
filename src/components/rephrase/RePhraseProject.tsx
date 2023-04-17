import * as React from 'react';
import RePhraseWorkspace from './RePhraseWorkspace';
import { useEffect, useRef, useState } from 'react';
import RePhraseHelp from './RePhraseHelp';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { RouteComponentProps } from 'react-router-dom'
import { TRephraseProject } from '../../actions/rephrase/types';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';
import { getRephraseProjects } from '../../actions/rephrase/rephrase';

interface IRePhraseProjectProps {
    id: number
}

const RePhraseProject: React.FunctionComponent<IRePhraseProjectProps> = ({ match }: RouteComponentProps<IRePhraseProjectProps>) => {

    const dispatch = useDispatch()

    const current_project_id: number = parseInt(match.params.id)

    const projectState = useSelector((state: RootStore) => state.rephraseReducer.projects)

    useEffect(() => {
        dispatch(getRephraseProjects())
    }, [])

    const temp: TRephraseProject = projectState.find(i => i.id === current_project_id)

    console.log(temp)

    // Project Title
    const [title, setTitle] = useState<string>(temp?.name)
    const [editMode, setEditMode] = useState(false)

    const ref = useRef()
    useOnClickOutside(ref, () => { setEditMode(false) })

    // Project Workspace
    const [fragments, setFragments] = useState<TRephraseProject['data']>(temp?.data)

    return <>
        <div className='rephrase-main'>
            <div className='rephrase-title-container'>
                <div className='rephrase-project-title-container'>
                    {!editMode && <>
                        <h2 onClick={() => setEditMode(true)}>{title}</h2>
                    </>}

                    {editMode && <>
                        <input autoFocus type='text' id='rephrase-title-input' value={title} size={title.length + 1} onChange={e => setTitle(e.target.value)} ref={ref} />
                    </>}

                    <button
                        className='rephrase-save-button'
                        onClick={() => {
                            // setEditMode(!editMode)
                            // dispatch(createAlert({ message: 'Название обновлено', type: 'Success' }))
                        }}>
                        <i className='fas fa-save' />
                    </button>
                </div>
                <RePhraseHelp />
            </div>

            {fragments?.length >= 0 && fragments.map(fragment => {
                return <RePhraseWorkspace fragment={fragment} />
            })}

            {fragments?.length > 0 && <div className='rephrase-add-fragment-container'>
                <div>
                    <button onClick={() => setFragments([...fragments, { position: fragments[fragments.length - 1].position + 1, variants: [{ id: 1, is_selected: true, text: '' }] }])}>
                        <p>Добавить фрагмент</p>
                        <i className='fas fa-plus' />
                    </button>
                </div>
            </div>}

            {fragments?.length === 0 && <div className='rephrase-add-first-fragment-container'>
                <button onClick={() => setFragments([...fragments, { position: 1, variants: [{ id: 1, is_selected: true, text: '' }] }])}>
                    <p>Добавить фрагмент</p>
                    <i className='fas fa-plus' />
                </button>
            </div>}
        </div>
    </>;
};

export default RePhraseProject;
