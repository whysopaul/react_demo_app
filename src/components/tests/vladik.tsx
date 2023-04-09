import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';

interface IvladikProps {
}

const vladik: React.FunctionComponent<IvladikProps> = (props) => {
    const dispatch = useDispatch()
    const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    return <>
        <h1>vladik</h1>
        {numberArray.map(e => {

            return <>
                <h2>{e}</h2>
            </>
        })}
    </>
};

export default vladik;
