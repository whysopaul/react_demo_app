import * as React from 'react';
import { AdData, TResultData } from '../actions/testads/types';
import '../css/home.css'
import { parsedTestData } from '../data/paul';

export interface IAdComponentProps {
    data: AdData,
    deleteItem: () => void,
}

export default function AdComponent(props: IAdComponentProps) {
    return (
        <div className='block' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <p style={{ fontSize: '4em', margin: '0', paddingLeft: '1em' }}>A</p>
            </div>
            <div>
                <p><b>{props.data.CampaignId}</b></p>
                <p>#{props.data.Id}</p>
            </div>
            <div>
                <p>Состояние: <b>{props.data.State}</b></p>
                <p>Статус: <b>{props.data.Status}</b></p>
            </div>
            <div>
                <p>Текстовое объявление</p>
                <p>Название: {props.data.TextAd.Title}</p>
                <p>Ссылка: <a href={props.data.TextAd.Href} target='_blank' rel='noopener noreferrer'>{props.data.TextAd.Href}</a></p>
                <p>Android/iOS: {props.data.TextAd.Mobile}</p>
            </div>
            <div>
                <button><i className='fas fa-cog'></i></button>
                <button onClick={() => props.deleteItem()}><i className='fas fa-trash-alt'></i></button>
            </div>
        </div>
    );
}
