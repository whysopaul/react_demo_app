import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';

interface ITestReducerProps {
}

const TestReducer: React.FunctionComponent<ITestReducerProps> = (props) => {

    const dispatch = useDispatch()

    const item = useSelector((state: RootStore) => state.testReducer)

    const plusId = () => {
        dispatch({ type: 'PLUS', payload: 1 })
    }

    return <>
        <div>
            <p style={{ marginLeft: '10px' }}>{item.id}</p>
            <button onClick={() => plusId()}>Создать объявление</button>
        </div>
    </>;
};

export default TestReducer;
