import * as React from 'react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { updateTitle } from '../../actions/rephrase/rephrase';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';
import { createAlert } from '../../actions/alerts/alerts';

interface IRePhraseProjectTitleProps {
}

const RePhraseProjectTitle: React.FunctionComponent<IRePhraseProjectTitleProps> = (props) => {

    const dispatch = useDispatch()
    const rephraseState = useSelector((state: RootStore) => state.rephraseReducer)

    const [title, setTitle] = useState<string>(rephraseState.title)
    const [editMode, setEditMode] = useState(false)

    const ref = useRef()
    useOnClickOutside(ref, () => { setEditMode(false) })

    return <>
        <div className='rephrase-project-title-container' ref={ref}>
            {!editMode && <>
                <h2>{title}</h2>
                <button onClick={() => { setEditMode(!editMode) }}><i className='fas fa-pen' /></button>
            </>}

            {editMode && <>
                <input autoFocus type='text' id='rephrase-title-input' value={title} size={title.length + 1} onChange={e => setTitle(e.target.value)} />
                {/* хотел сделать через span, но ввод работает криво
                <span role='textbox' contentEditable onInput={e => setTitle(e.currentTarget.innerText)}>{title}</span> 
                */}
                <button
                    className='rephrase-save-button'
                    onClick={() => {
                        setEditMode(!editMode)
                        dispatch(updateTitle(title))
                        dispatch(createAlert({ message: 'Название обновлено', type: 'Success' }))
                    }}>
                    <i className='fas fa-check' />
                </button>
            </>}
        </div>
    </>;
};

export default RePhraseProjectTitle;
