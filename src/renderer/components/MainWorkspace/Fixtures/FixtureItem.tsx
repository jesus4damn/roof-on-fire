import * as React from 'react';
import { IFixture } from '../../../../types/fixtureTypes';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { dragTypes } from '../../../../types/dragTypes';

require('./FixtureItem.scss');


interface IProps {
    fixture: IFixture,
    update: (fixture: IFixture) => void
}

type TFixtureParams = keyof IFixture

const FixtureItem: React.FC<IProps> = ({ fixture, update }) => {
    const [editMode, setEditMode] = useState<TFixtureParams | 'none'>('none');
    const [inputValue, setInputValue] = useState<string | number>('');
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: dragTypes.PATTERN_FIELD,
        drop: () => ({ fixtureId: fixture.id }),
        //canDrop: () => onDropPattern(),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    const onDropPattern = () => {

    };

    const select = () => {
        update({ ...fixture, selected: !fixture.selected });
    };
    const edit = () => {
        update({ ...fixture, [editMode]: inputValue });
        setEditMode('none');
    };

    return (
        <div className={'fixtureRow'} style={{ background: fixture.selected ? ' rgba(39, 174, 96, 0.4)' : 'none' }}>
            <div onClick={select}>
                <img alt={'fixture'}
                     src={fixture.img ? fixture.img : ''}
                     className={`paramBlock ${fixture.selected ? 'paramBlock-active' : ''}`}
                />
            </div>
            <div onClick={select} className={`paramBlock ${fixture.selected ? 'paramBlock-active' : ''}`}>
                <span className={'title'}>№</span>
                <span className={'titleParameters'}>{fixture.number}</span>
            </div>
            <div className={`paramBlock  paramDmx ${fixture.selected ? 'paramBlock-active' : ''}`}>

                <div className={'blockDmx'}>
                    <span className={'title '}>DMX</span>
                    {editMode === 'startAddress'
                        ? <input
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                            value={inputValue}
                            onBlur={edit}
                        />
                        : <span className={'titleParameters'} onDoubleClick={() => {
                            setInputValue(fixture.startAddress !== null ? fixture.startAddress : '');
                            setEditMode('startAddress');
                        }
                        }>{fixture.startAddress}
                </span>}
                </div>
                <div className={'blockFireMachine'}>
                    <span className={'title '}>ARM adress</span>
                    {editMode === 'name'
                        ? <input
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                            value={inputValue}
                            onBlur={edit}
                        />
                        : <span className={'titleParameters'}
                                onDoubleClick={() => {
                                    setInputValue(fixture.name !== null ? fixture.name : '');
                                    setEditMode('name');
                                }}>{fixture.name}</span>}
                </div>

            </div>

            {fixture.params
                .filter(p => !p.parts && p.name !== 'patterns')
                .map(p => {
                    return (
                        <div key={'Parametr' + p.name} className={`paramBlock ${fixture.selected ? 'paramBlock-active' : ''}`}>
                            <span className={'title'}>{p.name}</span>
                            <span className={'titleParameters'}>{p.physicalOutput}</span>
                        </div>
                    );
                })}
            <div
                className={`${fixture.activePattern && fixture.activePattern.img ? '' :'paramBlock'}`}
                ref={drop}
            >
                {fixture.activePattern && <img alt={'pattern'}
                     src={fixture.activePattern.img ? fixture.activePattern.img : ''}
                     className={`paramBlock ${fixture.selected || (canDrop && isOver) ? 'paramBlock-active' : ''}`}
                />}
            </div>
        </div>

    );
};

export default FixtureItem;
