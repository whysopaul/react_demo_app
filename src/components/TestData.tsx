import * as React from 'react';
import { useState } from 'react';
import { AdData, TResultData } from '../actions/testads/types';
import { parsedTestData } from '../data/paul';
import AdComponent from './AdComponent';
import PopupSettings from './PopupSettings';

export interface ITestDataProps {
}

export default function TestData(props: ITestDataProps) {
    //console.log(parsedTestData)
    const myData: AdData[] = parsedTestData.result.Ads

    // передача данных в стейт
    const [selectedItems, setSelectedItems] = useState<AdData[]>([...myData])

    // удаляет объявление и снимает выделение
    const closeItem = (el: AdData) => {
        let temp = selectedItems.filter(i => i.Id != el.Id)
        setSelectedItems(temp)
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

    const selectAd = (el) => {
        selectedAds.map(i => i.Id).includes(el.Id)
            ? setSelectedAds(selectedAds.filter(i => i.Id != el.Id))
            : setSelectedAds([...selectedAds, el])
    }

    // новый стейт с поисковым запросом
    const [inputValue, setInputValue] = useState('')

    const searchArray = []

    selectedItems.map(i => {
        if (i.TextAd.Title.toLowerCase().includes(
            inputValue.toLowerCase()
        ) || i.Id.toString().includes(
            inputValue.toLowerCase()
        )) {
            return searchArray.push(i)
        }
    })

    return (<>
        {showPopupSettings && <>
            <PopupSettings data={oneItem} onClose={() => setShowPopupSettings(false)} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
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
                    <button style={{ marginRight: 0 }}>Получить объявления</button>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <h1 style={{ margin: 0 }}>Объявления</h1>
                <div style={{ position: 'relative' }}>
                    <i className="fas fa-search" style={{ position: 'absolute', left: '16px', top: '12px', color: 'darkgray' }}></i>
                    <input
                        style={{ border: '1px solid lightgray', borderRadius: '20px', width: '200px', height: '100%', paddingLeft: '24px' }}
                        type='search'
                        placeholder='Введите название или ID'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)} />
                </div>
            </div>
            {!selectedItems.length
                ? <p>No current ads</p>
                : searchArray.length
                    ? searchArray.map(el => {
                        return <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <AdComponent data={el} deleteItem={() => closeItem(el)} showSettings={openSettings} showInputs={showInputs} selectAd={() => selectAd(el)} selectedAds={selectedAds} key={el.Id} />
                            </div>
                        </>
                    })
                    : <p>Not found</p>}
        </div>
    </>);
}
