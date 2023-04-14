import * as React from 'react';
import { useState } from 'react';
import { AdData } from '../../actions/testdata/types';
// import { parsedTestData } from '../data/paul';
import AdComponent from './AdComponent';
import PopupSettings from './PopupSettings';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getTestData } from '../../actions/testdata/testdata';
import { RootStore } from '../../store';
import NewItemPopup from './NewItemPopup';
import { createAlert } from '../../actions/alerts/alerts';

export interface ITestDataProps {
}

export default function TestData(props: ITestDataProps) {
    //console.log(parsedTestData)
    // const myData: AdData[] = parsedTestData.result.Ads

    // reducer

    const dispatch = useDispatch()

    const testDataState = useSelector((store: RootStore) => store.testDataReducer.data)

    // React.useEffect(() => {
    //     dispatch(getTestData())
    // }, [])

    // передача данных в стейт
    const [selectedItems, setSelectedItems] = useState<AdData[]>(testDataState)

    React.useEffect(() => {
        setSelectedItems(testDataState)
    }, [testDataState])

    // удаляет объявление и снимает выделение
    const closeItem = (el: AdData) => {
        dispatch(deleteItem(el.Id))
        setSelectedAds(selectedAds.filter(i => i.Id != el.Id))
    }

    // показ попапа и передача в него стейта
    const [showPopupSettings, setShowPopupSettings] = useState(false)

    const [oneItem, setOneItem] = useState<AdData>()

    const openSettings = (i: AdData) => {
        setOneItem(i)
        setShowPopupSettings(true)
    }

    // показ инпутов выделения и функция выделения
    const [showInputs, setShowInputs] = useState(false)

    const [selectedAds, setSelectedAds] = useState([])

    const selectAd = (el: AdData) => {
        selectedAds.map(i => i.Id).includes(el.Id)
            ? setSelectedAds(selectedAds.filter(i => i.Id != el.Id))
            : setSelectedAds([...selectedAds, el])
    }

    // новый стейт с поисковым запросом
    const [inputValue, setInputValue] = useState('')

    const searchCondition = selectedItems.filter(i => {
        if (i.TextAd.Title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) || i.Id.toLocaleString().includes(inputValue.toLocaleLowerCase())) {
            return i
        }
    })

    return (<>
        {showPopupSettings && <>
            <PopupSettings data={oneItem} onClose={() => setShowPopupSettings(false)} />
        </>}
        <div className='main'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    {selectedItems.length ? <>
                        <button
                            style={{ marginLeft: 0 }}
                            onClick={!showInputs
                                ? () => setShowInputs(!showInputs)
                                : () => { setSelectedAds([]); setShowInputs(!showInputs) }}
                        >
                            {!showInputs ? 'Выбрать кампании' : 'Сбросить выделение'}
                        </button>
                        Выбрано: {selectedAds.length}
                    </> : null}
                </div>
                <div>
                    <button style={{ marginRight: 0 }} onClick={() => dispatch(getTestData())}>Получить объявления</button>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <h1 style={{ margin: 0 }}>Объявления</h1>
                <div style={{ position: 'relative' }}>
                    <i className="fas fa-search" style={{ position: 'absolute', left: '8px', top: '12px', color: 'darkgray' }}></i>
                    <input
                        style={{ border: '1px solid lightgray', borderRadius: '20px', width: '100%', height: '100%', paddingLeft: '24px', margin: '0' }}
                        type='search'
                        placeholder='Введите название или ID'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)} />
                </div>
            </div>

            {!selectedItems.length && <p>No current ads</p>}

            {selectedItems.length && !searchCondition.length ? <p>Not found</p> : null}

            {selectedItems.length && searchCondition.length ? searchCondition.map(el => {
                return <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AdComponent data={el} deleteItem={() => closeItem(el)} showSettings={openSettings} showInputs={showInputs} selectAd={() => selectAd(el)} selectedAds={selectedAds} key={el.Id} />
                    </div>
                </>
            }) : null}

        </div>

        <NewItemPopup />

    </>);
}
