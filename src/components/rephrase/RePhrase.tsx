import * as React from 'react';
import RePhraseWorkspace from './RePhraseWorkspace';
import { useState } from 'react';
import RePhraseProjectTitle from './RePhraseProjectTitle';
import RePhraseHelp from './RePhraseHelp';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import RePhraseAddFragment from './RePhraseAddFragment';

interface IRePhraseProps {
}

const RePhrase: React.FunctionComponent<IRePhraseProps> = (props) => {

    const dispatch = useDispatch()

    const fragmentsState = useSelector((state: RootStore) => state.rephraseReducer.fragments)

    return <>
        <div className='rephrase-main'>
            <div className='rephrase-title-container'>
                <RePhraseProjectTitle />
                <RePhraseHelp />
            </div>
            {fragmentsState.map((fragment, index) => {
                return <RePhraseWorkspace id={fragment.id} index={index} key={fragment.id} />
            })}
            <div className='rephrase-add-fragment-container'>
                <RePhraseAddFragment />
            </div>
        </div>
    </>;
};

export default RePhrase;
