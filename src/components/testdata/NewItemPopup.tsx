import * as React from 'react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../utils/HandleOnClickOutside';
import { useDispatch } from 'react-redux';
import { AdData } from '../../actions/testdata/types';
import { addNewItem } from '../../actions/testdata/testdata';
import { createAlert } from '../../actions/alerts/alerts';

interface INewItemPopupProps {
}

const NewItemPopup: React.FunctionComponent<INewItemPopupProps> = (props) => {

    const dispatch = useDispatch()

    const [openForm, setOpenForm] = React.useState(false)

    const refPopup = useRef()

    useOnClickOutside(refPopup, () => { setOpenForm(false) })

    const [title, setTitle] = useState('')
    const [mobile, setMobile] = useState(false)

    // создание объявления
    const createNewItem = () => {
        const newItem: AdData = {
            AdCategoties: null,
            AdGroupId: 0,
            AgeLabel: null,
            CampaignId: 0,
            Id: Date.now(),
            State: 'OFF',
            Status: 'DRAFT',
            StatusClarification: '',
            Subtype: null,
            TextAd: {
                AdExtensions: [],
                AdImageHash: null,
                AdImageModeration: null,
                BusinessId: null,
                DisplayDomain: '',
                DisplayUrlPath: null,
                DisplayUrlPathModeration: null,
                Href: '-',
                Mobile: mobile ? 'YES' : 'NO',
                SitelinkSetId: null,
                SitelinksModeration: null,
                Text: '',
                Title: title.length > 0 ? title : 'Без названия',
                Title2: null,
                TurboPageId: null,
                TurboPageModeration: null,
                VCardId: 0,
                VCardModeration: {
                    Status: '',
                    StatusClarification: ''
                },
                VideoExtension: null
            },
            Type: ''
        }
        dispatch(addNewItem(newItem))
    }

    return <>
        <div className='create-new-item-button'>
            <button onClick={() => setOpenForm(true)}>
                <i className="fas fa-plus"></i>
            </button>
        </div>

        {openForm && <>
            <div className='m-background' />
            <div className='paul-popup-container' ref={refPopup} onClick={e => e.stopPropagation()}>
                <h1>Создать объявление</h1>
                <p>Название: <input type='text' value={title} placeholder='Введите название' onChange={e => setTitle(e.target.value)} /></p>
                <p>Android/iOS: <input type='checkbox' checked={mobile} onChange={() => setMobile(!mobile)} /></p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={() => {
                            createNewItem()
                            setTitle('')
                            setOpenForm(false)
                            dispatch(createAlert({ message: 'Объявление успешно создано!', type: 'Success' }))
                        }}
                        className='button-with-icon'>
                        <p>Создать</p>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </>}
    </>;
};

export default NewItemPopup;
