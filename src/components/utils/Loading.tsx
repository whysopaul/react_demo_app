import * as React from 'react';
import ReactLoading from "react-loading";

interface ILoadingProps {
    height: number
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
    return <>
        <div className='m-background' />
        <div style={{ position: 'relative', height: props.height + 'px', display: 'flex', justifyContent: 'center', justifyItems: 'center', alignItems: 'center' }}>

            <ReactLoading type={'spin'} color="#4d75a3" height={32} width={32} className='m-loading-new-block' />
        </div>
    </>;
};

export default Loading;
