import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { useRef } from 'react';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';
import { clearAlerts } from '../../actions/alerts/alerts';

interface IAlertContainerProps {
}

const AlertContainer: React.FunctionComponent<IAlertContainerProps> = (props) => {

    const alertState = useSelector((state: RootStore) => state.alerts.alerts)

    const ref = useRef()

    const dispatch = useDispatch()

    useOnClickOutside(ref, () => { dispatch(clearAlerts()) })

    const alertType = () => {
        switch (alertState.type) {
            case 'Success':
                return <i className='fas fa-check' style={{ color: 'green' }} />
            case 'Notification':
                return <i className='fas fa-exclamation' style={{ color: 'yellow' }} />
            case 'Error':
                return <i className='fas fa-times' style={{ color: 'red' }} />
        }
    }

    return <>
        {alertState && <div className={'alert-container'} ref={ref}>
            <p>{alertType()} {alertState.message}</p>
        </div>}
    </>;
};

export default AlertContainer;
