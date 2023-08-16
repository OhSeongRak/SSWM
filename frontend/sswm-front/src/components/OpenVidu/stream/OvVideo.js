import React, { Component } from 'react';
import './StreamComponent.css';
import MicOff from '@material-ui/icons/MicOff';
import Mic from '@material-ui/icons/Mic';
import VideocamOff from '@material-ui/icons/VideocamOff';
import VideocamOn from '@material-ui/icons/Videocam';

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
                {this.props.localUser !== this.props.user && (
                <div>
                    {!this.props.user.isAudioActive() ? (
                        <div style={{
                            position: 'absolute',
                            top: '24px',
                            right: '100px',
                            zIndex: 150, // 버튼이 비디오 위에 보이도록 설정
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'red',
                            cursor:'pointer',
                        }}>
                            <MicOff id="statusMic" />
                        </div>
                    ) : <div style={{
                        position: 'absolute',
                        top: '24px',
                        right: '100px',
                        zIndex: 150, // 버튼이 비디오 위에 보이도록 설정
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor:'pointer',
                    }}>
                        <Mic id="statusMic" />
                    </div>}
                    {!this.props.user.isVideoActive() ? (
                        <div style={{
                            position: 'absolute',
                            top: '24px',
                            right: '135px',
                            zIndex: 150, // 버튼이 비디오 위에 보이도록 설정
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'red',
                            cursor:'pointer',
                        }}>
                            <VideocamOff id="statusCam" />
                        </div>
                    ) : <div style={{
                        position: 'absolute',
                        top: '24px',
                        right: '135px',
                        zIndex: 150, // 버튼이 비디오 위에 보이도록 설정
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor:'pointer',
                    }}>
                        <VideocamOn id="statusCam" />
                    </div>}
                </div>
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
