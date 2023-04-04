import * as React from 'react';
import { useState } from 'react';
import { AdData, TResultData } from '../actions/testads/types';
import '../css/home.css'
import { parsedTestData } from '../data/paul';
import TestModal from './TestModal';

export interface IAdComponentProps {
    data: AdData,
    deleteItem: () => void,
    showSettings: (data: AdData) => void,
    showInputs: boolean,
    selectAd: () => void,
    selectedAds: AdData[]
}

export default function AdComponent(props: IAdComponentProps) {
    return (<>
        {props.showInputs && <div className='selection-container'>
            <input className='selection-checkbox' type='checkbox' checked={props.selectedAds.map(i => i.Id).includes(props.data.Id) ? true : false} onChange={props.selectAd} />
        </div>}
        <div className='block' onClick={props.showInputs && props.selectAd} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div>
                <p style={{ fontSize: '4em', margin: '0', paddingLeft: '1em' }}>A</p>
            </div>
            <div>
                <p><b>{props.data.CampaignId}</b></p>
                <p>#{props.data.Id}</p>
            </div>
            <div style={{ display: 'flex' }}>
                <div>
                    <p style={{ textAlign: 'end' }}>Состояние:</p>
                    <p style={{ textAlign: 'end' }}>Статус:</p>
                </div>
                <div>
                    <p>&nbsp;<b>{props.data.State}</b></p>
                    <p>&nbsp;<b>{props.data.Status}</b></p>
                </div>
            </div>
            <div>
                <p style={{ textAlign: 'center' }}>Текстовое объявление</p>
                <p>Название: {props.data.TextAd.Title}</p>
                <p>Ссылка: <a href={props.data.TextAd.Href} target='_blank' rel='noopener noreferrer'>{props.data.TextAd.Href}</a></p>
                <p>Android/iOS: {props.data.TextAd.Mobile}</p>
            </div>
            <div>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        props.showSettings(props.data)
                    }}
                >
                    <i className='fas fa-cog'></i>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        props.deleteItem()
                    }}
                >
                    <i className='fas fa-trash-alt'></i>
                </button>
                <TestModal />
            </div>
        </div>
    </>);
}
