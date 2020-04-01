import * as React from 'react';
import { IFixture } from '../../../../types/fixtureTypes';
import { useState } from 'react';
require('./FixtureItem.scss');


interface IProps {
    fixture: IFixture,
    update: (fixture: IFixture) => void
}
type TFixtureParams = keyof IFixture

const FixtureItem: React.FC<IProps> = ({ fixture, update }) => {
    const [editMode, setEditMode] = useState<TFixtureParams | 'none'>('none');
    const [inputValue, setInputValue] = useState<string | number >('');

    const select = () => { update({...fixture, selected: !fixture.selected}) };
    const edit = () => {
        update({...fixture, [editMode]: inputValue});
        setEditMode('none')
    };

    return (
        <div className={"fixtureRow"}
            style={{backgroundColor: fixture.active ? 'red' : fixture.selected ? 'green' : 'rgb(35, 35, 35)'}}>
            <div><img alt={'fixture'} src={fixture.img ? fixture.img  : ''}/></div>
            <div onClick={select} className={"paramBlock"}>
                <span className={"title"}>№</span>
                <span>{fixture.number}</span>
            </div>
            <div className={"paramBlock"}>
                <span className={"title"}>DMX</span>
                { editMode === 'startAddress'
                    ? <input
                        onChange={(e) => {setInputValue(e.target.value)}}
                        value={inputValue}
                        onBlur={edit}
                    />
                    : <span onDoubleClick={() => {
                                setInputValue(fixture.startAddress !== null ? fixture.startAddress : '');
                                setEditMode('startAddress');
                            }
                            }>{fixture.startAddress}</span>}
            </div>
            <div className={"paramBlock"}>
                <span className={"title"}>name</span>
                { editMode === 'name'
                    ? <input
                        onChange={(e) => {setInputValue(e.target.value)}}
                        value={inputValue}
                        onBlur={edit}
                    />
                    : <span className={'title'}
                            style={{width: '150px'}}
                            onDoubleClick={() => {
                                setInputValue(fixture.name !== null ? fixture.name : '');
                                setEditMode('name');
                            }
                            }>{fixture.name}</span>}
            </div>
            {fixture.params.map(p => {
                return (
                    <div key={'Parametr' + p.name} className={"paramBlock"}>
                        <span className={"title"}>{p.name}</span>
                        <span>{p.physicalOutput}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default FixtureItem;
