import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFragment, deleteFragment } from '../../actions/rephrase/rephrase';
import { RootStore } from '../../store';

interface IRePhraseWorkspaceProps {
    id: number,
    index: number
}

const RePhraseWorkspace: React.FunctionComponent<IRePhraseWorkspaceProps> = (props) => {

    const dispatch = useDispatch()

    const fragmentState = useSelector((state: RootStore) => state.rephraseReducer.fragments)

    return <>
        <div className='rephrase-workspace-container'>
            <div className='rephrase-workspace-left-container'>
                <div className='rephrase-workspace-left-options'>
                    <button>{props.index + 1}</button>
                    <div>
                        <button>Персональная команда</button>
                        <button>Выбрать абзацы</button>
                    </div>
                </div>
                <div className='rephrase-workspace-left-mode'>
                    <p>Режим: Рерайт всего текста</p>
                    <p><label htmlFor='use-synonyms'>Использовать синонимы</label><input type='checkbox' id='use-synonyms' /></p>
                </div>
                <div className='rephrase-textarea-container'>
                    {fragmentState.length > 1 && props.id > fragmentState[0] && <button className='rephrase-delete' onClick={() => dispatch(deleteFragment(props.id))}><i className='fas fa-trash-alt' /></button>}
                    <textarea
                        id='rephrase-textarea'
                        onChange={e => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }}>
                    </textarea>
                </div>
                <div className='rephrase-textarea-bottom'>
                    <p>0/2000</p>
                </div>
            </div>
            <div className='rephrase-workspace-submit-container'>
                <button><i className='fas fa-brain' /></button>
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
