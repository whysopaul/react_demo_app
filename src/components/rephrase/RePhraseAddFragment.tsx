import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFragment } from '../../actions/rephrase/rephrase';
import { RootStore } from '../../store';

interface IRePhraseAddFragmentProps {
}

const RePhraseAddFragment: React.FunctionComponent<IRePhraseAddFragmentProps> = (props) => {

    const dispatch = useDispatch()

    const fragmentState = useSelector((state: RootStore) => state.rephraseReducer.fragments)

    return <>
        <div>
            <button onClick={() => dispatch(addFragment(fragmentState[fragmentState.length - 1].id + 1))}>
                <p>Добавить фрагмент</p>
                <i className='fas fa-plus' />
            </button>
        </div>
    </>;
};

export default RePhraseAddFragment;
