import * as React from 'react';
import { useState } from 'react';
import { getMp3, getMusicList, setMp3 } from '../../../../assets/musicGetter';
import { parseFile } from '../../../store/getInitalState';
import { IPattern } from '../../../../types/fixtureTypes';

interface Iprops {
    label: any,
    onSelect: (path: string) => void
    onChange: (value: any) => void
}

const downloadImg = require('../../../../assets/images/svg/downloadImg.svg');

export const getDownloadImg = () => {
    return downloadImg
};

export const MusicInput: React.FC <Iprops> = ({label, onSelect}) => {
    let [musicList, setMusicList] = useState(getMusicList());
    const onAddFile = (e: any) => {
        //onChange(e.target.files[0]);
        let file: File = e.target.files[0];
        let fileName = file.name.split(' ')[0];
        //saveMp3(file);
        //let src = URL.createObjectURL(file);
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

interface ITextProps {
    label: any,
    onSelect: (patterns: IPattern[]) => void
}
export const TextPatternsInput: React.FC <ITextProps> = ({label, onSelect}) => {

    const onAddFile = async (e: any) => {
        //onChange(e.target.files[0]);
        let file: File = e.target.files[0];
        let patterns: IPattern[] = await parseFile(file.path);
        if (patterns.length) {
            onSelect(patterns);
        }
        console.log(patterns)
    };

    return (
      <div>
          <h2>{label}</h2>
          <div>
              <input
                type='file'
                accept='.txt'
                id='fileTXT'
                name='fileTXT'
                onChange={onAddFile}
              />
              <label htmlFor="fileTXT" style={{backgroundImage:`url(${getDownloadImg()})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '7% 35%',
                  backgroundSize: '10%'
              }}>Выберите файл</label>
          </div>
      </div>
    );
};
