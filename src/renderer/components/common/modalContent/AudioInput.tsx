import * as React from 'react';
import { useState } from 'react';
import { getMp3, getMusicList, setMp3 } from '../../../../assets/musicGetter';

interface Iprops {
    label: any,
    onSelect: (path: string) => void
    onChange: (value: any) => void
}

const downloadImg = require('../../../../assets/images/svg/downloadImg.svg');

export const getDownloadImg = () => {
    return downloadImg
};

export const MusicInput: React.FC <Iprops> = ({label, onSelect, onChange}) => {
    let [musicList, setMusicList] = useState(getMusicList());
    const onAddFile = (e: any) => {
        //onChange(e.target.files[0]);
        let file: File = e.target.files[0];
        let fileName = file.name.split(' ')[0];
        //saveMp3(file);
        let src = URL.createObjectURL(file);
        setMp3(file.path, fileName);
        setMusicList([...musicList, fileName]);
    };

    return (
        <div>
            <h2>{label}</h2>
            <div>
                {musicList.length
                    ? musicList.map(li =>
                        <p key={li} style={{cursor: 'pointer'}} onClick={() => onSelect(getMp3(li))}>
                            {li}
                        </p>)
                    : ''}
            </div>
            <div>
                <input
                    type='file'
                    accept='.mp3'
                    id='fileMusic'
                    name='fileMusic'
                    onChange={onAddFile}
                />
                <label htmlFor="fileMusic" style={{backgroundImage:`url(${getDownloadImg()})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '7% 35%',
                backgroundSize: '10%'
                }}>Выберите файл</label>
            </div>
        </div>
    );

};
