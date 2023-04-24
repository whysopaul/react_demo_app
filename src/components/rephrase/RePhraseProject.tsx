import * as React from 'react';
// import RePhraseWorkspace from './RePhraseWorkspace';
import { useEffect, useRef, useState } from 'react';
// import RePhraseHelp from './RePhraseHelp';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { RouteComponentProps } from 'react-router-dom'
import { TRephraseFragmentMode, TRephraseProject } from '../../actions/rephrase/types';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';
import { deleteRephraseProject, getRephraseOptions, getRephraseProjects, updateRephraseProject } from '../../actions/rephrase/rephrase';
import { encode } from '../utils/gpt-3-encoder/index'
import RePhraseLoading from './RePhraseLoading';
import { createAlert } from '../../actions/alerts/alerts';

interface IRePhraseProjectProps {
    id: number
}

const RePhraseProject: React.FunctionComponent<IRePhraseProjectProps> = ({ match }: RouteComponentProps<IRePhraseProjectProps>) => {

    const current_project_id: number = parseInt(match.params.id)

    const dispatch = useDispatch()

    const rephraseState = useSelector((state: RootStore) => state.rephraseReducer)

    useEffect(() => {
        dispatch(getRephraseProjects())
    }, [])

    const [rephraseInnerState, setRephraseInnerState] = useState(rephraseState)

    const temp: TRephraseProject = rephraseInnerState.projects.find(i => i.id === current_project_id)
    // console.log(temp)

    // Project Title
    const [title, setTitle] = useState<string>(temp?.name)
    const [editMode, setEditMode] = useState(false)

    const ref = useRef()
    useOnClickOutside(ref, () => { setEditMode(false) })

    // Project Workspace
    const [fragmentsMode, setFragmentsMode] = useState<TRephraseFragmentMode[]>(temp?.data.map(i => { return { ...i, showModes: false, mode: 'Entire', is_synonyms: false, batch: [], custom_start: '' } }))

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

    // State update after response
    useEffect(() => {
        setRephraseInnerState(rephraseState)
        // console.log('reload')
    }, [rephraseState.responses])

    // Resize textareas by content
    useEffect(() => {
        const textareas = document.getElementsByTagName('textarea')

        if (textareas.length > 0)
            for (let i = 0; i < textareas.length; i++) {
                textareas[i].style.height = 'auto'
                textareas[i].style.height = textareas[i].scrollHeight - 20 + 'px'
            }
    })

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
                        title='Сохранить изменения'
                        onClick={() => dispatch(updateRephraseProject(title, current_project_id, fragmentsMode.map(({ showModes, mode, is_synonyms, ...original }) => original)))}>
                        <i className='fas fa-save' />
                    </button>
                </div>
                <div>
                    <button onClick={() => dispatch(deleteRephraseProject(current_project_id))}>Удалить проект</button>
                    {/* <RePhraseHelp /> */}
                </div>
            </div>

            {rephraseState.is_loading && <RePhraseLoading />}

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
                                                    mode: 'Personal',
                                                    batch: []
                                                }
                                            }
                                            return i
                                        }))}>Персональная команда</button>
                                        <button onClick={() => setFragmentsMode(fragmentsMode.map(i => {
                                            if (i.position === fragment.position) {
                                                return {
                                                    ...i,
                                                    mode: 'Paragraph',
                                                    custom_start: ''
                                                }
                                            }
                                            return i
                                        }))}>Выбрать абзацы</button>
                                        <button onClick={() => setFragmentsMode(fragmentsMode.map(i => {
                                            if (i.position === fragment.position) {
                                                return {
                                                    ...i,
                                                    mode: 'Entire',
                                                    batch: [],
                                                    custom_start: ''
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
                                    {fragment.mode === 'Paragraph' && ' Выбор абзацев ' + fragment.batch.map(i => i + 1).sort((a, b) => a - b).join(', ')}
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

                                {fragment.mode === 'Entire' && <>
                                    <textarea
                                        id='rephrase-textarea'
                                        onChange={e => {
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
                                        value={fragment.variants[0].text}
                                    />
                                </>}

                                {fragment.mode === 'Paragraph' && <>
                                    <div className='rephrase-paragraph-selection'>
                                        {fragment.variants[0].text
                                            .split('\n')
                                            .filter(i => i !== '')
                                            .map((p, idx) => {
                                                return <>
                                                    <p data-id={idx}
                                                        className={fragment.batch.includes(idx) ? 'selected-paragraph' : null}
                                                        onClick={_ => {
                                                            // console.log(idx)
                                                            fragment.batch.includes(idx)
                                                                ? setFragmentsMode(fragmentsMode.map(i => {
                                                                    if (i.position === fragment.position) {
                                                                        return {
                                                                            ...i,
                                                                            batch: fragment.batch.filter(i => i !== idx)
                                                                        }
                                                                    }
                                                                    return i
                                                                }))
                                                                : setFragmentsMode(fragmentsMode.map(i => {
                                                                    if (i.position === fragment.position) {
                                                                        return {
                                                                            ...i,
                                                                            batch: [...i.batch, idx]
                                                                        }
                                                                    }
                                                                    return i
                                                                }))
                                                        }}
                                                    >{p}</p>
                                                </>
                                            })}
                                    </div>
                                </>}

                                {fragment.mode === 'Personal' && <>
                                    <textarea
                                        id='rephrase-textarea-personal'
                                        placeholder='Пример: "Перефразируй абзац №1 и №2 в этом тексте:"'
                                        onChange={e => {
                                            setFragmentsMode(fragmentsMode.map(i => {
                                                if (i.position === fragment.position && i.mode === 'Personal') {
                                                    return {
                                                        ...i,
                                                        custom_start: e.target.value
                                                    }
                                                }
                                                return i
                                            }))
                                        }}
                                        value={fragment.custom_start}
                                    />
                                    <textarea
                                        id='rephrase-textarea'
                                        onChange={e => {
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
                                        value={fragment.variants[0].text}
                                    />
                                </>}

                            </div>
                            <div className='rephrase-textarea-bottom'>
                                <p className={encode(fragment.variants[0].text).length > 2000 ? 'text-red' : null}>{encode(fragment.variants[0].text).length}/2000</p>
                            </div>
                        </div>

                        <div className='rephrase-workspace-submit-container'>
                            <button onClick={() => {
                                if (fragment.variants[0].text.trim().length === 0) {
                                    dispatch(createAlert({ message: 'Введите текст в поле слева', type: 'Notification' }))
                                }
                                if (fragment.variants[0].text.trim().length > 0) {
                                    dispatch(getRephraseOptions(temp.id, fragment.position, fragment.variants[0].text, fragment.is_synonyms, fragment.batch, fragment.custom_start))
                                }
                            }}>
                                <i className='fas fa-brain' />
                            </button>
                        </div>

                        {rephraseInnerState.responses.filter(i => i.id === current_project_id && i.position === fragment.position).length > 0 && <div className='rephrase-workspace-right-container'>
                            <div className='rephrase-textarea-container'>
                                <textarea id='rephrase-textarea' value={rephraseInnerState.responses.findLast(i => i.id === current_project_id && i.position === fragment.position).result[0]} readOnly />
                            </div>
                        </div>}

                        {rephraseInnerState.responses.filter(i => i.id === current_project_id && i.position === fragment.position).length === 0 && <div className='rephrase-workspace-right-container'>
                            <div className='rephrase-textarea-container'>
                                <textarea id='rephrase-textarea' readOnly />
                            </div>
                        </div>}
                    </div>
                </>
            })}

            {fragmentsMode?.length > 0 && <div className='rephrase-add-fragment-container'>
                <div>
                    <button onClick={() => setFragmentsMode([...fragmentsMode, { position: fragmentsMode[fragmentsMode.length - 1].position + 1, variants: [{ id: 1, is_selected: true, text: '' }], showModes: false, mode: 'Entire', is_synonyms: false, batch: [], custom_start: '' }])}>
                        <p>Добавить фрагмент</p>
                        <i className='fas fa-plus' />
                    </button>
                </div>
            </div>}

            {fragmentsMode?.length === 0 && <div className='rephrase-add-first-fragment-container'>
                <button onClick={() => setFragmentsMode([...fragmentsMode, { position: 1, variants: [{ id: 1, is_selected: true, text: '' }], showModes: false, mode: 'Entire', is_synonyms: false, batch: [], custom_start: '' }])}>
                    <p>Добавить фрагмент</p>
                    <i className='fas fa-plus' />
                </button>
            </div>}
        </div>
    </>;
};

export default RePhraseProject;
