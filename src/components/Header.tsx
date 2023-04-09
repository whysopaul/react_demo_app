import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getData } from '../actions/paulactions/paulactions';

export interface IHeaderProps {
}

export default function Header(props: IHeaderProps) {

    const dispatch = useDispatch()

    const imagesState = useSelector((state: RootStore) => state.paul.data)

    useEffect(() => {
        dispatch(getData())
    }, [])

    // ???
    function testFn(e) {
        //e.preventDefault();
        alert('hehe')
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
                {/* <a href="/vladik" className="href">vladik</a> */}
                <Link to='/testdata'><p className='href'>Test Data</p></Link>
            </div>
            {imagesState && <div className='user-info'>
                <div className='user'>
                    <div className='user-name-title'>
                        <div className='user-name'>
                            {imagesState[0]?.account.name}
                        </div>
                        <div className='user-title'>
                            Администратор
                        </div>
                    </div>
                </div>
                <div className='user'>
                    <img className='user-photo' src={imagesState[0]?.account.photo} />
                </div>
            </div>}
        </div>
    );
}
