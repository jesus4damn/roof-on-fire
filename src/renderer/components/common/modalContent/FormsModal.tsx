import * as React from 'react';
import { useEffect, useState } from 'react';
require('../contextMenu.scss');

interface IProps {
    fields: IInputField[],
    onSubmit: (fields: IInputField[]) => void
}

export type TInputType = 'text' | 'number' | 'color' | 'checkbox'

export interface IInputField {
    type: TInputType
    placeholder: string
    title: string
    value: number | string | any
}

const FormsModal:React.FC<IProps> = ({ fields, onSubmit }: IProps) => {
    const [editable, setEditable] = useState(fields);

    const refs = fields.reduce((acc: any, value: IInputField) => {
        acc[value.title] = React.createRef();
        return acc;
    }, {});

    const onChange = (e: any, indx: number) => {
        setEditable(fields.map((f:IInputField, i:number) =>
            i === indx ? {...f, value: e.currentTarget.value} : f
        ));
    };

    return fields.length ? (
        <div className={"renameInput"}>
            <p>Edit {editable[0] && editable[0].title}</p>
            {editable.map((f: IInputField, i: number) => (
                <input
                    key={'field' + f.title + i}
                    ref={refs[f.title]}
                    type={f.type}
                    value={f.value}
                    placeholder={f.placeholder}
                    onChange={(e) => onChange(e, i)}
                />
            ))}
            <button className={"renameInputBt"} onClick={() => onSubmit(editable)}>OK</button>
        </div>
    ) : null;
};

export default FormsModal;
