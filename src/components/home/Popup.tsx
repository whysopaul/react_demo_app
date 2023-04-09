import * as React from 'react';
import { useEffect } from 'react';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';

interface IPopupProps {

    onClose?: () => void,
    val?: string

}

const Popup: React.FunctionComponent<IPopupProps> = (props) => {

    // тест поля input
    const [username, setUsername] = React.useState('')

    // указатель на окно
    const refPopup = React.useRef()

    // внешняя функция, применяемая на окно => на клик делает то, что указано в () => {}
    useOnClickOutside(refPopup, () => { props.onClose() })

    // если массив пустой [] - то при обновлении страницы
    // если [a,b] то при обновлении переменных a,b
    // если [, a, b] то при обновлении страницы, и при обновлении a,b
    useEffect(() => {
        console.log(username)
    }, [username])

    return <>
        <div className='m-background'></div>
        <div className='paul-popup-container' ref={refPopup}>
            <h1>{props.val}</h1>
            <h1>hehehehehehehe</h1>
            <p>kwjfekaw fwlkefj alewksf walekfjh awlefkj waelkfjhawelkfjh awelkfjh awelfk</p>

            <input placeholder='Введите имя' value={username} onChange={e => setUsername(e.currentTarget.value)}></input>

            <button onClick={_ => props.onClose()} className='button-with-icon'>
                <p>Закрыть</p>
                <i className='fas fa-times'></i>
            </button>

        </div>

    </>;
};

export default Popup;
