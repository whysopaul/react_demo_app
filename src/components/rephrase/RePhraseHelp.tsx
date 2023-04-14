import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';

interface IRePhraseHelpProps {
}

const RePhraseHelp: React.FunctionComponent<IRePhraseHelpProps> = (props) => {

    const [openModal, setOpenModal] = useState(false)

    const refPopup = useRef()

    useOnClickOutside(refPopup, () => { setOpenModal(false) })

    return <>
        <div>
            <button onClick={(e) => { setOpenModal(true) }} title='Справка'>
                <i className="fas fa-question"></i>
            </button>
        </div>

        {openModal && <>
            <div className='m-background' />
            <div className='paul-popup-container' ref={refPopup} onClick={e => e.stopPropagation()}>
                <h2>Инструкция по использованию сервиса</h2>
                <p>hehe</p>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpenModal(false)
                    }}
                    className='button-with-icon'>
                    <p>Закрыть</p>
                    <i className='fas fa-times'></i>
                </button>

            </div>
        </>}
    </>
};

export default RePhraseHelp;
