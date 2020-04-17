import * as React from 'react';
import { useEffect, useState } from 'react';
import { getSvg } from '../../../assets/imageGetter';
require('./modalContent.scss');

interface IProps {
    type: string,
    onSubmit: (value: string) => void
}

export interface IPickerField {
    placeholder: string
    title: string
    color: string
}

const imagesFields:IPickerField[] = [
    {
        placeholder: 'url',
        title: getSvg('lock'),
        color: '#FFFFFF'
    },
    {
        placeholder: 'url',
        title: getSvg('eyeBlue'),
        color: '#828282'
    },
    {
        placeholder: 'url',
        title: getSvg('blueClock'),
        color: '#F2C94C'
    },
    {
        placeholder: 'url',
        title: getSvg('edit'),
        color: '#BB6BD9'
    },
    {
        placeholder: 'url',
        title: getSvg('dollarSign'),
        color: '#EB5757'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#F2994A'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#2F80ED'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#27AE60'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#56CCF2'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#2F80ED'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#27AE60'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#56CCF2'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#2F80ED'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#27AE60'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#56CCF2'
    },
];

const PickerModal:React.FC<IProps> = ({ type, onSubmit }: IProps) => {
    const [editable, setEditable] = useState(imagesFields);
    let isImg = type === 'img';

    return editable.length ? (
        <div className={isImg ? 'headerUploadPicture' : 'headerUploadColor'}>
            <span >{isImg ? "Задать Картинку" : "Задать Цвет"}</span>
            <div className={'grid'}>

                {editable.map((f: IPickerField, i: number) => (
                    <div
                        className={ "element"}
                        style={{backgroundColor: type === 'img' ? 'black' : f.color}}
                        key={'imageSelector' + i}
                        onClick={() => onSubmit( type === 'img' ? f.title : f.color)}
                    >

                        {type === 'img' ? <img src={f.title}/> : null }
                    </div>
                ))}
            </div>
            {isImg ?  <div className={"uploadPictureWrap"}>
                <button className={"uploadPicture"}>Загрузить с компьютера</button>
            </div>: ""}


        </div>

    ) : null;
};

export default PickerModal;
