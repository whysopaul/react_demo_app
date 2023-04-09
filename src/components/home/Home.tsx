import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { getData } from '../../actions/paulactions/paulactions';
import { TPaulImage } from '../../actions/paulactions/types';
import Loading from '../utils/Loading';
import Popup from './Popup';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    // хук react для вызова функций из папки actions
    const dispatch = useDispatch()

    // ссылка на кеш хранилище, куда будут сохранены данные
    const imagesState = useSelector((state: RootStore) => state.paul.data)
    const loadingState = useSelector((state: RootStore) => state.paul.is_loading)

    // Первичная загрузка данных
    React.useEffect(() => {
        dispatch(getData())
    }, [])

    // массив с выбранными элементами
    const [selectedImages, setSelectedImages] = React.useState<TPaulImage[]>([])

    // однуление массива, где хранятся выбранные элементы
    function testFn4(e) {
        setSelectedImages([])
    }

    const selectAll2 = () => {
        setSelectedImages(imagesState)
    }

    // {id: 2, name: '123123123}
    // гайд скринил
    const toggleImage = (image: TPaulImage) => {
        // [{id: 1, name: 'ss'}] -> [1] -> if 2 in [1]
        selectedImages.map(i => i.id).includes(image.id) ?

            // [{id: 1, name: 'ss'}] => [{id: 1, name: 'ss'}] -> []
            setSelectedImages(selectedImages.filter(i => i.id != image.id)) :


            setSelectedImages([...selectedImages, image])

    }

    // состояние для того, чтобы понимать отображается окно или нет
    const [showPopup, setShopPopup] = useState(false)

    return <>

        {showPopup && <>
            <Popup val={'12345'} onClose={() => setShopPopup(false)} />
        </>}

        <div>
            <div className='main'>
                <div className='block upload'>
                    <div className='upload-file'>
                        <input type='file' />
                    </div>
                    <div>
                        <button onClick={_ => setShopPopup(true)} className='button-with-icon'>

                            <p>Загрузить</p>
                            <i className='fas fa-download'></i>

                        </button>
                    </div>
                </div>
                <div className='block'>
                    <button onClick={selectAll2}>Выбрать все</button>
                    <button onClick={testFn4}>Сбросить выделение</button>
                </div>
                <div className={loadingState ? 'block' : 'block images'}>
                    {loadingState && <>

                        <Loading height={400} />
                    </>}

                    {!loadingState && imagesState.map(el => {

                        const className = selectedImages.map(i => i.id).includes(el.id) ? 'image selected' : 'image'

                        return <>
                            <div
                                style={{ backgroundImage: `url(${el.url})` }}
                                className={className}
                                onClick={() => toggleImage(el)}
                            >
                                {/* <img src={el.url} /> */}
                            </div>
                        </>
                    })}
                </div>
            </div>
        </div>
    </>
};

export default Home;