import * as React from 'react';
// import RePhraseWorkspace from './RePhraseWorkspace';
import { useEffect, useRef, useState } from 'react';
import RePhraseHelp from './RePhraseHelp';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { RouteComponentProps } from 'react-router-dom'
import { TRephraseFragmentMode, TRephraseProject } from '../../actions/rephrase/types';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';
import { deleteRephraseProject, getRephraseProjects, updateRephraseProject } from '../../actions/rephrase/rephrase';
import { encode } from '../utils/gpt-3-encoder/index'

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
    const [fragmentsMode, setFragmentsMode] = useState<TRephraseFragmentMode[]>(temp?.data.map(i => { return { ...i, showModes: false, mode: 'Entire', is_synonyms: false } }))
    const showModesToggle = (position: number) => {
        setFragmentsMode(fragmentsMode.map(i => {
            if (i.position === position) {
                if (i.showModes) {
                    return {
                        ...i,
                        showModes: false
                    }
                }
                return {
                    ...i,
                    showModes: true
                }
            }
            return i
        }))
    }
    const useSynonymsToggle = (position: number) => {
        setFragmentsMode(fragmentsMode.map(i => {
            if (i.position === position) {
                if (i.is_synonyms) {
                    return {
                        ...i,
                        is_synonyms: false
                    }
                }
                return {
                    ...i,
                    is_synonyms: true
                }
            }
            return i
        }))
    }

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
                        onClick={() => dispatch(updateRephraseProject(title, current_project_id, fragmentsMode.map(({ showModes, mode, is_synonyms, ...original }) => original)))}>
                        <i className='fas fa-save' />
                    </button>
                </div>
                <div>
                    <button onClick={() => dispatch(deleteRephraseProject(current_project_id))}>Удалить</button>
                    <RePhraseHelp />
                </div>
            </div>

            {fragmentsMode?.length >= 0 && fragmentsMode.map((fragment, index) => {

                const showModesClassName = fragment.showModes ? 'rephrase-mode-dropdown show' : 'rephrase-mode-dropdown'

                return <>
                    <div className='rephrase-workspace-container' key={fragment.position}>
                        <div className='rephrase-workspace-left-container'>
                            <div className='rephrase-workspace-left-options'>
                                <button>{index + 1}</button>
                                <div>
                                    <button onClick={() => showModesToggle(fragment.position)}>Выбрать режим</button>
                                    <div className={showModesClassName}>
                                        <button onClick={() => setFragmentsMode(fragmentsMode.map(i => {
                                            if (i.position === fragment.position) {
                                                return {
                                                    ...i,
                                                    mode: 'Personal'
                                                }
                                            }
                                            return i
                                        }))}>Персональная команда</button>
                                        <button onClick={() => setFragmentsMode(fragmentsMode.map(i => {
                                            if (i.position === fragment.position) {
                                                return {
                                                    ...i,
                                                    mode: 'Paragraph'
                                                }
                                            }
                                            return i
                                        }))}>Выбрать абзацы</button>
                                        <button onClick={() => setFragmentsMode(fragmentsMode.map(i => {
                                            if (i.position === fragment.position) {
                                                return {
                                                    ...i,
                                                    mode: 'Entire'
                                                }
                                            }
                                            return i
                                        }))}>Весь текст</button>
                                    </div>
                                </div>
                            </div>
                            <div className='rephrase-workspace-left-mode'>
                                <p>
                                    Режим:
                                    {fragment.mode === 'Entire' && ' Рерайт всего текста'}
                                    {fragment.mode === 'Paragraph' && ' Выбор абзацев'}
                                    {fragment.mode === 'Personal' && ' Персональная команда'}
                                </p>
                                <p><label htmlFor={`use-synonyms id-${fragment.position}`}>Использовать синонимы</label><input type='checkbox' id={`use-synonyms id-${fragment.position}`} checked={fragment.is_synonyms} onChange={() => useSynonymsToggle(fragment.position)} /></p>
                            </div>
                            <div className='rephrase-textarea-container'>
                                <button className='rephrase-delete' onClick={() => {
                                    setFragmentsMode(fragmentsMode.filter(i => i.position !== fragment.position))
                                }}>
                                    <i className='fas fa-trash-alt' />
                                </button>
                                <textarea
                                    id='rephrase-textarea'
                                    onChange={e => {
                                        e.target.style.height = 'auto'
                                        e.target.style.height = e.target.scrollHeight + 'px'
                                        setFragmentsMode(fragmentsMode.map(i => {
                                            if (i.position === fragment.position) {
                                                return {
                                                    ...i,
                                                    variants: [{
                                                        ...i.variants[0],
                                                        text: e.target.value
                                                    }]
                                                }
                                            }
                                            return i
                                        }))
                                    }}
                                >
                                    {fragment.variants[0].text}
                                </textarea>
                            </div>
                            <div className='rephrase-textarea-bottom'>
                                <p className={encode(fragment.variants[0].text).length > 2000 ? 'text-red' : null}>{encode(fragment.variants[0].text).length}/2000</p>
                            </div>
                        </div>
                        <div className='rephrase-workspace-submit-container'>
                            <button onClick={() => dispatch(getRephraseProjects())}><i className='fas fa-brain' /></button>
                        </div>
                        <div className='rephrase-workspace-right-container'>
                            <div className='rephrase-textarea-container'>
                                <textarea id='rephrase-textarea' readOnly></textarea>
                            </div>
                        </div>
                    </div>
                </>
            })}

            {fragmentsMode?.length > 0 && <div className='rephrase-add-fragment-container'>
                <div>
                    <button onClick={() => setFragmentsMode([...fragmentsMode, { position: fragmentsMode[fragmentsMode.length - 1].position + 1, variants: [{ id: 1, is_selected: true, text: '' }], showModes: false, mode: 'Entire', is_synonyms: false }])}>
                        <p>Добавить фрагмент</p>
                        <i className='fas fa-plus' />
                    </button>
                </div>
            </div>}

            {fragmentsMode?.length === 0 && <div className='rephrase-add-first-fragment-container'>
                <button onClick={() => setFragmentsMode([...fragmentsMode, { position: 1, variants: [{ id: 1, is_selected: true, text: '' }], showModes: false, mode: 'Entire', is_synonyms: false }])}>
                    <p>Добавить фрагмент</p>
                    <i className='fas fa-plus' />
                </button>
            </div>}
        </div>
    </>;
};

export default RePhraseProject;
