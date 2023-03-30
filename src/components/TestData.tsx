import * as React from 'react';
import { useState } from 'react';
import { AdData, TResultData } from '../actions/testads/types';
import { parsedTestData } from '../data/paul';
import AdComponent from './AdComponent';

export interface ITestDataProps {
}

export default function TestData(props: ITestDataProps) {
    //console.log(parsedTestData)
    const myData: AdData[] = parsedTestData.result.Ads

    const [selectedItem, setSelectedItem] = useState<AdData[]>([...myData])

    const closeItem = (ad: AdData) => {
        selectedItem.map(i => i.Id).includes(ad.Id) ?
            setSelectedItem(selectedItem.filter(i => i.Id != ad.Id)) :
            setSelectedItem([...selectedItem, ad])
    }

    return (
        <div className='main'>
            {myData.map(el => {
                return selectedItem.map(i => i.Id).includes(el.Id) && <AdComponent data={el} deleteItem={() => closeItem(el)} />
            })}
            {!selectedItem.length && 'No current ads'}
            {/* <div>
            <p>{parsedTestData.result.Ads[0].TextAd.Title}</p>
        </div> */}
        </div>
    );
}
