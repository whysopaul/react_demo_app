import * as React from 'react';
import { useRef } from 'react';
import { useOnClickOutside } from './HandleOnClickOutside';

export interface ITestModalProps {
}

export default function TestModal(props: ITestModalProps) {
    const [openModal, setOpenModal] = React.useState(false)

    const refPopup = useRef()

    useOnClickOutside(refPopup, () => { setOpenModal(false) })

    return <>
        <button onClick={(e) => {
            e.stopPropagation()
            setOpenModal(true)
        }}>
            <i className="fas fa-question"></i>
        </button>

        {openModal && <>
            <div className='m-background' />
            <div className='paul-popup-container' ref={refPopup} onClick={e => e.stopPropagation()}>
                <h1>Popup in button</h1>
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
}
