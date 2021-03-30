import * as React from 'react';
import { App } from '../../../app';

interface IProps {
  onErrorCallback?: () => void
  hiLevel?: boolean
}
interface IState {
  error: null | any
  errorInfo: null | any
  returnNew: boolean
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { 
      error: null,
      errorInfo: null,
      returnNew: false,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // setTimeout(() => {
    //   if (this.props.onErrorCallback) {
    //     this.props.onErrorCallback();
    //   }
    // }, 1000);

    console.log(error);
    console.log(errorInfo);
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return this.props.hiLevel
        ? (
            <div
              style={{
                height: '80vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <button onClick={() => this.setState({ returnNew: true })}>
                <span>Reload.</span>
              </button>
            </div>
          )
        : <div>
          <h2 style={{ color: 'red' }}>Sorry, Something went wrong.</h2>
          <button onClick={() => this.props.onErrorCallback ? this.props.onErrorCallback() : null}>Reset</button>
      </div>;
    }
    if (this.state.returnNew && this.props.hiLevel) {
      this.setState({returnNew: false});
      return <App />
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
