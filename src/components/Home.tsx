import * as React from 'react';
import { Link } from 'react-router-dom'

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    return <>
        <div className='main'>
            <div className='home-header'>
                <h1>Home</h1>
            </div>
            <div className='home-menu'>
                <Link to='/images'><button>Images</button></Link>
                <Link to='/testdata'><button>Test Data</button></Link>
                <Link to='/rephrase'><button>Re-Phrase</button></Link>
            </div>
        </div>
    </>;
};

export default Home;
