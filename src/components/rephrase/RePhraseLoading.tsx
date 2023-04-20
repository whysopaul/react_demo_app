import * as React from 'react';
import ReactLoading from 'react-loading';

interface IRePhraseLoadingProps {
}

const RePhraseLoading: React.FunctionComponent<IRePhraseLoadingProps> = (props) => {
    return <>
        <div className='m-background' />
        <div className='rephrase-loading'>
            <ReactLoading type={'spin'} color="#4d75a3" height={32} width={32} />
        </div>
    </>;
};

export default RePhraseLoading;
