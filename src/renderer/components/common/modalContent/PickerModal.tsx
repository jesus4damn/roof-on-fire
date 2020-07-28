import * as React from 'react';
import { useState } from 'react';
import { getSvg, ImgLib } from '../../../../assets/imageGetter';

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

const colors = [
    '#FFFFFF', '#828282', '#F2C94C', '#BB6BD9', '#EB5757', '#F2994A', '#2F80ED', '#27AE60',
    '#56CCF2', '#2F80ED', '#27AE60', '#56CCF2', '#2F80ED', '#27AE60', '#56CCF2'];

const imagesFields:IPickerField[] = (Object.keys(ImgLib.svg) as Array<keyof typeof ImgLib.svg>).map((img, i) => {
    return {
        placeholder: 'url',
        title: getSvg(img),
        color: i >= colors.length ? colors[i -colors.length] : colors[i]
    }
});

const PickerModal:React.FC<IProps> = ({ type, onSubmit }: IProps) => {
    const [editable, setEditable] = useState(imagesFields);
    let isImg = type === 'img';

    return editable.length ? (
        <div className={isImg ? 'headerUploadPicture' : 'headerUploadColor'}>
            <span >{isImg ? "Задать Картинку" : "Задать Цвет"}</span>
            <div className={'grid'}>

                {editable.map((f: IPickerField, i: number) => (
                    <div
                        className="element"
                        style={{backgroundColor: type === 'img' ? 'black' : f.color}}
                        key={'imageSelector' + i}
                        onClick={() => onSubmit( type === 'img' ? f.title : f.color)}
                    >

                        {type === 'img' ? <img src={f.title} alt={f.title}/> : null }
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
