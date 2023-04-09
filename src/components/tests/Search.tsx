import * as React from 'react';

export interface ISearchProps {
}

export default function Search(props: ISearchProps) {

    const [testAr, setTestAr] = React.useState([
        { id: 1, title: 'Item One' },
        { id: 2, title: 'Item Two' },
        { id: 3, title: 'Item Three' },
        { id: 4, title: 'Item Four' },
        { id: 5, title: 'Item Five' },
    ])

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => setTestAr(json))
    }, [])

    const [filter, setFilter] = React.useState('')

    let secondAr = []

    testAr.map(i => {
        if (i.title.toLowerCase().indexOf(
            filter.toLowerCase()
        ) != -1) {
            return secondAr.push(i)
        }
    })

    return <>
        <input type='text' value={filter} onChange={e => setFilter(e.target.value)} />
        {secondAr.length ? secondAr.map(i => {
            return <p>{i.title}</p>
        }) : <p>Nothing here</p>}
    </>
}
