import * as React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginVTargete } from '../../actions/auth/auth';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';
import { createAlert } from '../../actions/alerts/alerts';

interface ILoginPopupProps {
}

const LoginPopup: React.FunctionComponent<ILoginPopupProps> = (props) => {

    const dispatch = useDispatch()

    const [openForm, setOpenForm] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const refPopup = useRef()
    useOnClickOutside(refPopup, () => { setOpenForm(false) })

    const submitLogin = () => {
        if (!username || !password) {
            dispatch(createAlert({
                message: 'Заполните поля ввода',
                type: 'Notification'
            }))
            return
        }
        dispatch(loginVTargete(username, password))
        setOpenForm(false)
    }

    return <>
        <button onClick={() => setOpenForm(true)}>Log In</button>

        {openForm && <>
            <div className='m-background' />
            <div className='paul-popup-container' ref={refPopup} onClick={e => e.stopPropagation()}>
                <p>Логин: <input type="text" value={username} onChange={e => setUsername(e.target.value)} /></p>
                <p>Пароль: <input type="password" value={password} onChange={e => setPassword(e.target.value)} /></p>
                <div className='popup-button-container'>
                    <button onClick={submitLogin}>Login</button>
                </div>
            </div>
        </>}
    </>;
};

export default LoginPopup;
