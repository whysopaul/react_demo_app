import * as React from 'react';

interface IUnauthorizedProps {
}

const Unauthorized: React.FunctionComponent<IUnauthorizedProps> = (props) => {
    return <>
        <div className='main'>
            <p>Войдите в аккаунт</p>
        </div>
    </>;
};

export default Unauthorized;
