import * as React from 'react';
import { IMusicContext } from '../misicContext/musicContext';
import { connect } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { getTimelineCues } from '../store/cuesReducer/cuesSelector';
import { getFixtures } from '../store/fixturesReducer/fixturesSelector';
import { updateFixtureShot } from '../store/fixturesReducer/fixturesActions';
import { ICue, ICueAction } from '../../types/cuesTypes';
import { sendMusicAction } from '../store/appReducer/appActions';

interface IState {
    events: {[key: number]: {id: string, shot: boolean}[]}
}

class ShowRunner extends React.Component<IMusicContext & any> {
    state: IState = {
        events: {}
    };

    componentDidMount(): void {
        const { cues } = this.props;
        this.createTimeEvents(cues);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.context.musicContext.currentTime.toFixed(1) !== this.props.context.musicContext.currentTime.toFixed(1)) {
            this.timeListner(this.props.context.musicContext.currentTime);
        }
        if (prevProps.cues !== this.props.cues) {
            this.createTimeEvents(this.props.cues)
        }
        if (prevProps.context.musicContext.status !== this.props.context.musicContext.status) {
            this.props.sendMusicAction(this.props.context.musicContext.status);
        }
    }

    createTimeEvents = (cues:ICue[]) => {
        console.log('createTimeEvents ====>');
        let events: {[key: number]: {id: string, shot: boolean, action: ICueAction}[]} = {};
        cues.forEach((c: ICue) => {
            c.actions.forEach((a:ICueAction, i: number) => {
                let timeOn = +(+c.startTime + a.startTime).toFixed(1);
                let timeOff = +(+c.startTime + a.startTime + 0.2).toFixed(1);

                if (events[timeOn]) {
                    events[timeOn].push({id: a.fixtureId, shot: true, action: a});

                } else {
                    events[timeOn] = [{id: a.fixtureId, shot: true, action: a}];
                }
                if(events[timeOff]) {
                    events[timeOff].push({id: a.fixtureId, shot: false, action: a});
                } else {
                    events[timeOff] = [{id: a.fixtureId, shot: false, action: a}];
                }
            })
        });
        console.log(events);
        this.setState({
            events: events
        })
    };

    timeListner = (time: number) => {
        if (this.state.events[+time.toFixed(1)]) {
            //console.log('UPDATE ====>');
            // console.log(this.state.events[+time.toFixed(1)]);
            this.state.events[+time.toFixed(1)].forEach(e => this.props.updateFixtureShot(e))
        }
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        //this.timeListner(this.props.context.musicContext.currentTime, this.props.cues);
        return null;
    }
}

const mapStateToProps = (state: RootState) => ({
    cues: getTimelineCues(state),
    fixtures: getFixtures(state)
});

export default connect(mapStateToProps, {updateFixtureShot, sendMusicAction})(ShowRunner);
