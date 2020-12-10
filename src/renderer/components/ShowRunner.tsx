import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { getTimelineCuesTimes } from '../store/cuesReducer/cuesSelector';
import { updateFixtureShot } from '../store/fixturesReducer/fixturesActions';
import { ICueAction, ICueLineCue } from '../../types/cuesTypes';
import { sendMusicAction } from '../store/appReducer/appActions';
import * as _ from 'lodash';

interface IState {
    events: {[key: number]: {id: string, shot: boolean, done: boolean, action: ICueAction}[]}
}

interface IProps {
    currentTime: number,
    status: any,
    sendMusicAction: (status: string) => void
    updateFixtureShot: (e: any) => void
}
interface IConnected {
    cues: ICueLineCue[],
}
class ShowRunner extends React.Component<IProps & IConnected & any> {
    state: IState = {
        events: {}
    };

    componentDidMount(): void {
        const { cues } = this.props;
        this.createTimeEvents(cues);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.currentTime !== this.props.currentTime) {
            this.timeListner(this.props.currentTime);
            if (prevProps.currentTime < this.props.currentTime) {
                let newEvents = {...this.state.events}
                Object.keys(this.state.events).forEach(key => {
                    if (key > this.props.currentTime) {
                        newEvents[+key] = newEvents[+key].map(e => ({...e, done: false}));
                    }
                })
                this.setState({events: newEvents})
            }
        }
        if (_.differenceWith(prevProps.cues, this.props.cues, _.isEqual).length) {
            this.createTimeEvents(this.props.cues)
        }
        if (prevProps.status !== this.props.status) {
            this.props.sendMusicAction(this.props.status);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): boolean {
        //console.log(_.differenceWith(nextProps.cues, this.props.cues, _.isEqual).length)
        return (nextProps.currentTime !== this.props.currentTime) ||
          _.differenceWith(nextProps.cues, this.props.cues, _.isEqual).length > 0 ||
        (nextProps.status !== this.props.status)
    }

    createTimeEvents = (cues:ICueLineCue[]) => {
        let events: {[key: number]: {id: string, shot: boolean, done: boolean, action: ICueAction}[]} = {};
        cues.forEach((c: ICueLineCue) => {
            c.actions.forEach((a:ICueAction, i: number) => {
                let timeOn = +(+c.startTime + a.startTime).toFixed(1);
                let timeOff = +(+c.startTime + a.startTime + 0.2).toFixed(1);

                if (events[timeOn]) {
                    events[timeOn].push({id: a.fixtureId, shot: true, done: false, action: a});
                } else {
                    events[timeOn] = [{id: a.fixtureId, shot: true, done: false, action: a}];
                }
                if(events[timeOff]) {
                    events[timeOff].push({id: a.fixtureId, shot: false, done: false, action: a});
                } else {
                    events[timeOff] = [{id: a.fixtureId, shot: false, done: false, action: a}];
                }
            })
        });
        console.log('createTimeEvents ====>');
        this.setState({
            events: events
        })
    };

    timeListner = (time: number) => {
        let fixed = +time.toFixed(1);
        let prev = +time.toFixed(1) - 0.1;
        if (this.state.events[fixed]) {
            //console.log('UPDATE ====>' + fixed);
            let toShot = [...this.state.events[fixed]];
            if (this.state.events[prev] && this.state.events[prev].filter(e => !e.done).length) {
                toShot = [...toShot, ...this.state.events[+time.toFixed(1) - 0.1].filter(e => !e.done)]
            }
            this.setState(() => ({events: {
                ...this.state.events,
                    [prev]: this.state.events[prev] ? this.state.events[prev].map(e => ({...e, done: true})) : null
                }}))
            toShot.forEach(e => this.props.updateFixtureShot(e))
        }
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        //this.timeListner(this.props.context.musicContext.currentTime, this.props.cues);
        return null;
    }
}

const mapStateToProps = (state: RootState) => ({
    cues: getTimelineCuesTimes(state),
});

export default connect(mapStateToProps, {updateFixtureShot, sendMusicAction})(ShowRunner);
