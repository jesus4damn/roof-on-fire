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
        color: '#FF00FF'
    },
    {
        placeholder: 'url',
        title: getSvg('eyeBlue'),
        color: '#4400FF'
    },
    {
        placeholder: 'url',
        title: getSvg('blueClock'),
        color: '#660000'
    },
    {
        placeholder: 'url',
        title: getSvg('edit'),
        color: '#880000'
    },
    {
        placeholder: 'url',
        title: getSvg('dollarSign'),
        color: '#FF0000'
    },
    {
        placeholder: 'url',
        title: getSvg('unlock'),
        color: '#00FF00'
    },
];

const PickerModal:React.FC<IProps> = ({ type, onSubmit }: IProps) => {
    const [editable, setEditable] = useState(imagesFields);

    return editable.length ? (
        <div className={'grid'}>
            {editable.map((f: IPickerField, i: number) => (
                <div
                    className={'element'}
                    style={{backgroundColor: type === 'img' ? 'black' : f.color}}
                    key={'imageSelector' + i}
                    onClick={() => onSubmit( type === 'img' ? f.title : f.color)}
                >
                    {type === 'img' ? <img src={f.title}/> : null }
                </div>
            ))}
        </div>
    ) : null;
};

export default PickerModal;
