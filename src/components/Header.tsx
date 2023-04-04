import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../store';

export interface IHeaderProps {
}

export default function Header(props: IHeaderProps) {
    const imagesState = useSelector((state: RootStore) => state.paul.data)

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
                <a href="/" className="href">Home</a>
                {/* <a href="/vladik" className="href">vladik</a> */}
                <a href="/testdata" className="href">Test Data</a>
            </div>
            <div className='user-info'>
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
            </div>
        </div>
    );
}
