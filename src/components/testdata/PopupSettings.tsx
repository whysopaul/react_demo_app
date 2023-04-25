import * as React from 'react';
import { useRef, useState } from 'react';
import { AdData } from '../../actions/testdata/types';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';
import { useDispatch } from 'react-redux';
import { changeItem } from '../../actions/testdata/testdata';
import { createAlert } from '../../actions/alerts/alerts';

interface IPopupSettingsProps {
    data: AdData,
    onClose?: () => void
}

const PopupSettings: React.FunctionComponent<IPopupSettingsProps> = (props) => {

    const [adState, setAdState] = useState<AdData>(props.data)

    const dispatch = useDispatch()

    // указатель на окно
    const refPopup = useRef()

    // внешняя функция, применяемая на окно => на клик делает то, что указано в () => {}
    useOnClickOutside(refPopup, () => { props.onClose() })

    // изменение тайтла объявления через изменение стейта
    const changeTitle = (inputValue: string) => {
        setAdState({ ...adState, TextAd: { ...adState.TextAd, Title: inputValue } })
    }

    // функция переключения состояния объявления
    const changeState = (stateValue: string) => {
        if (stateValue === 'ON') {
            setAdState({ ...adState, State: 'OFF' })
        }
        if (stateValue === 'OFF') {
            setAdState({ ...adState, State: 'ON' })
        }
    }

    return <>
        <div className='m-background'></div>
        <div className='paul-popup-container' ref={refPopup}>
            <div>
                <h1>Текстовое объявление #{adState.Id}</h1>
                <p>Название: <input type='text' value={adState.TextAd.Title} onChange={e => changeTitle(e.target.value)} style={{ width: '200px' }} /></p>
                <p>Состояние: {adState.State} <input type='checkbox' checked={adState.State === 'ON' ? true : false} onChange={() => changeState(adState.State)} /></p>
            </div>
            <div className='popup-button-container'>
                <button
                    onClick={() => {
                        dispatch(changeItem(adState))
                        props.onClose()
                        dispatch(createAlert({ message: 'Изменения сохранены', type: 'Success' }))
                    }}
                    className='button-with-icon'
                >
                    <p>Сохранить</p>
                    <i className="fas fa-save"></i>
                </button>
            </div>
        </div>

    </>;
};

export default PopupSettings;
