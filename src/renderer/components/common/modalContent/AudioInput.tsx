import * as React from 'react';
import { getMp3, getMusicList, saveMp3, setMp3 } from '../../../../assets/musicGetter';
import { useEffect, useState } from 'react';

interface Iprops {
    label: any,
    onSelect: (path: string) => void
    onChange: (value: any) => void
}

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
                    onChange={onAddFile}
                />
            </div>
        </div>
    );

};
