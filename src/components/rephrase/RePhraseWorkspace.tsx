import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFragment, deleteFragment, getRephraseObjects } from '../../actions/rephrase/rephrase';
import { RootStore } from '../../store';
import { useState } from 'react';
import { encode } from 'gpt-3-encoder';
import { TRephraseMode } from '../../actions/rephrase/types';

interface IRePhraseWorkspaceProps {
    id: number,
    index: number
}

const RePhraseWorkspace: React.FunctionComponent<IRePhraseWorkspaceProps> = (props) => {

    const dispatch = useDispatch()

    const fragmentState = useSelector((state: RootStore) => state.rephraseReducer.fragments)

    const [showModes, setShowModes] = useState(false)
    const [mode, setMode] = useState<TRephraseMode>('Entire')
    const [textarea, setTextarea] = useState('')

    return <>
        <div className='rephrase-workspace-container'>
            <div className='rephrase-workspace-left-container'>
                <div className='rephrase-workspace-left-options'>
                    <button>{props.index + 1}</button>
                    <div>
                        <button onClick={() => setShowModes(!showModes)}>Выбрать режим</button>
                        <div className={!showModes ? 'rephrase-mode-dropdown' : 'rephrase-mode-dropdown show'}>
                            <button onClick={() => setMode('Personal')}>Персональная команда</button>
                            <button onClick={() => setMode('Paragraph')}>Выбрать абзацы</button>
                            <button onClick={() => setMode('Entire')}>Весь текст</button>
                        </div>
                    </div>
                </div>
                <div className='rephrase-workspace-left-mode'>
                    <p>
                        Режим:
                        {mode === 'Entire' && ' Рерайт всего текста'}
                        {mode === 'Paragraph' && ' Выбор абзацев'}
                        {mode === 'Personal' && ' Персональная команда'}
                    </p>
                    <p><label htmlFor={`use-synonyms id-${props.id}`}>Использовать синонимы</label><input type='checkbox' id={`use-synonyms id-${props.id}`} /></p>
                </div>
                <div className='rephrase-textarea-container'>
                    {fragmentState.length > 1 && props.id > fragmentState[0].id && <button className='rephrase-delete' onClick={() => dispatch(deleteFragment(props.id))}><i className='fas fa-trash-alt' /></button>}
                    <textarea
                        id='rephrase-textarea'
                        onChange={e => {
                            e.target.style.height = 'auto'
                            e.target.style.height = e.target.scrollHeight + 'px'
                            setTextarea(e.target.value)
                        }}
                    >
                        {textarea}
                    </textarea>
                </div>
                <div className='rephrase-textarea-bottom'>
                    <p className={encode(textarea).length > 2000 ? 'text-red' : null}>{encode(textarea).length}/2000</p>
                </div>
            </div>
            <div className='rephrase-workspace-submit-container'>
                <button onClick={() => dispatch(getRephraseObjects())}><i className='fas fa-brain' /></button>
            </div>
            <div className='rephrase-workspace-right-container'>
                <div className='rephrase-textarea-container'>
                    <textarea id='rephrase-textarea' readOnly></textarea>
                </div>
            </div>
        </div>
    </>;
};

export default RePhraseWorkspace;
