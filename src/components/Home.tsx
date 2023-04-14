import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { loginVTargete } from '../actions/auth/auth';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return <>
        <div>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={() => dispatch(loginVTargete(username, password))}>Login</button>
        </div>
        <div className='main'>
            <h1>Home</h1>
            <div className='home-menu'>
                <Link to='/images'><button>Images</button></Link>
                <Link to='/testdata'><button>Test Data</button></Link>
                <Link to='/rephrase'><button>Re-Phrase</button></Link>
            </div>
        </div>
    </>;
};

export default Home;
