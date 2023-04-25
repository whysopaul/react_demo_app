import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { Link } from 'react-router-dom'
import LoginPopup from './auth/LoginPopup';
import { authLogout } from '../actions/auth/auth';
import { URL } from '../utils';

export interface IHeaderProps {
}

export default function Header(props: IHeaderProps) {

    const dispatch = useDispatch()
    const userState = useSelector((state: RootStore) => state.authReducer.userdata)

    // ???
    function testFn() {
        window.location.replace(URL + '/')
    }

    return (
        <div className='header'>
            <div className='return' onClick={testFn}>
                <div className='arrow'>
                    &#10132;
                </div>
            </div>
            <div className='nav'>
                <Link to='/'><p className='href'>Home</p></Link>
                <Link to='/images'><p className='href'>Images</p></Link>
                {/* <a href="/vladik" className="href">vladik</a> */}
                <Link to='/testdata'><p className='href'>Test Data</p></Link>
                <Link to='/rephrase'><p className='href'>Re-phrase</p></Link>
            </div>
            {userState.id !== -1 && <div className='user-info'>
                <div className='user'>
                    <div className='user-name-title'>
                        <div className='user-name'>
                            {userState?.username}
                        </div>
                        <div className='user-title'>
                            {userState.is_admin ? 'Администратор' : 'Пользователь'}
                        </div>
                    </div>
                </div>
                {userState.vk_profile && <div className='user'>
                    <img className='user-photo' src={userState.vk_profile.photo} />
                </div>}
            </div>}
            <div className='login-container'>
                {userState.id === -1 && <LoginPopup />}
                {userState.id !== -1 && <button onClick={() => dispatch(authLogout())}>Logout</button>}
            </div>
        </div>
    );
}
