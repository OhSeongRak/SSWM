import React, { Component } from 'react';
import './StreamComponent.css';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import IconButton from '@material-ui/core/IconButton';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';

export default class OvVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.handleNotificationButtonClick = this.handleNotificationButtonClick.bind(this);
        this.toggleSound = this.toggleSound.bind(this);

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
        if (this.props.onNotificationButtonClick) {
            this.props.onNotificationButtonClick();
          }
    }
    toggleSound(){
        this.props.micButtonClick();
    }

    render() {
        return (
            <div id="d" style={{ position: 'relative' }}>
                {this.props.localUser !== this.props.user && (
                    <IconButton
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '50px',
                            zIndex: 100, // 버튼이 비디오 위에 보이도록 설정
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor:'pointer',
                        }}
                        onClick={() => this.handleNotificationButtonClick()}
                    >
                        <NotificationsActiveIcon/>
                    </IconButton>
                )}
                <div>
                    {!this.props.user.isLocal() && (
                        <IconButton id="volumeButton" onClick={this.toggleSound}>
                            {this.props.mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
                        </IconButton>
                    )}
                </div>
                <video
                    autoPlay={true}
                    id={'video-' + this.props.user.getStreamManager().stream.streamId}
                    ref={this.videoRef}
                    muted={this.props.mutedSound}
                />
            </div>
        );
    }
}
