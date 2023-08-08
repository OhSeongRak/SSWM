import React, { Component } from 'react';
import './StreamComponent.css';

export default class OvVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.handleNotificationButtonClick = this.handleNotificationButtonClick.bind(this);
        
    }

    componentDidMount() {
        if (this.props && this.props.user.streamManager && !!this.videoRef) {
            this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        }

        if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
            this.props.user.streamManager.session.on('signal:userChanged', (event) => {
                const data = JSON.parse(event.data);
                if (data.isScreenShareActive !== undefined) {
                    this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
                }
            });
        }
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        }
    }
    handleNotificationButtonClick(){
        console.log('Notification button clicked');
        console.log(this.props);
        if (this.props.onNotificationButtonClick) {
            this.props.onNotificationButtonClick();
          }
    }

    render() {
        return (
            <div id="d" style={{ position: 'relative' }}>
            <video
                autoPlay={true}
                id={'video-' + this.props.user.getStreamManager().stream.streamId}
                ref={this.videoRef}
                muted={this.props.mutedSound}
            />
            
            {this.props.localUser !== this.props.user && (
                    <button
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: 100, // 버튼이 비디오 위에 보이도록 설정
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '16px',
                        }}
                        onClick={() => this.handleNotificationButtonClick()}
                    >
                        알림
                    </button>
                )}
            </div>
        );
    }
}
