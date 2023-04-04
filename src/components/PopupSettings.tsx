import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { AdData } from '../actions/testads/types';
import { useOnClickOutside } from './HandleOnClickOutside';

interface IPopupSettingsProps {
    data: AdData,
    onClose?: () => void,
    selectedItems: AdData[],
    setSelectedItems: (_) => void
}

const PopupSettings: React.FunctionComponent<IPopupSettingsProps> = (props) => {

    // указатель на окно
    const refPopup = useRef()

    // внешняя функция, применяемая на окно => на клик делает то, что указано в () => {}
    useOnClickOutside(refPopup, () => { props.onClose() })

    // создаем стейт тайтла объявления
    const [name, setName] = useState(props.data.TextAd.Title)

    // изменение тайтла объявления через изменение стейта
    const changeName = (e) => {
        setName(e.target.value)
        props.setSelectedItems(props.selectedItems.map(i => {
            if (i.Id === props.data.Id) {
                i.TextAd.Title = e.target.value
                return i
            }
            return i
        }))
        // props.data.TextAd.Title = e.target.value

    }

    // стейт с состоянием объявления
    const [adState, setAdState] = useState(props.data.State)

    // функция переключения состояния объявления
    const changeState = (el: string) => {
        if (el === 'ON') {
            setAdState('OFF')
            props.setSelectedItems(props.selectedItems.map(i => {
                if (i.Id === props.data.Id) {
                    i.State = 'OFF'
                    return i
                }
                return i
            }))
            // props.data.State = 'OFF'
        }
        if (el === 'OFF') {
            setAdState('ON')
            props.setSelectedItems(props.selectedItems.map(i => {
                if (i.Id === props.data.Id) {
                    i.State = 'ON'
                    return i
                }
                return i
            }))
            // props.data.State = 'ON'
        }
        // console.log(props.data.State)
    }

    return <>
        <div className='m-background'></div>
        <div className='paul-popup-container' ref={refPopup}>
            <div>
                <h1>Текстовое объявление #{props.data.Id}</h1>
                <p>Название: <input type='text' value={name} onChange={e => changeName(e)} style={{ width: '200px' }} /></p>
                <p>Состояние: {adState} <input type='checkbox' checked={adState === 'ON' ? true : false} onChange={() => changeState(adState)} /></p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={_ => props.onClose()} className='button-with-icon'>
                    <p>Закрыть</p>
                    <i className='fas fa-times'></i>
                </button>
            </div>
        </div>

    </>;
};

export default PopupSettings;
