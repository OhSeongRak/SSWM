import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';
//import VolumeUp from '@material-ui/icons/VolumeUp';
//import VolumeOff from '@material-ui/icons/VolumeOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FormHelperText from '@material-ui/core/FormHelperText';
// import { useParams } from "react-router-dom";

export default class StreamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: this.props.user.getNickname(),
            showForm: false,
            mutedSound: false,
            isFormValid: true,
            studyroom: this.props.studyroom
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
        this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
        this.toggleSound = this.toggleSound.bind(this);
        this.handleNotificationButtonClick = this.handleNotificationButtonClick.bind(this);

    }
    
    handleChange(event) {
        this.setState({ nickname: event.target.value });
        event.preventDefault();
    }

    toggleNicknameForm() {
        if (this.props.user.isLocal()) {
            this.setState({ showForm: !this.state.showForm });
        }
    }

    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound });
    }

    handlePressKey(event) {
        if (event.key === 'Enter') {
            console.log(this.state.nickname);
            if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
                this.props.handleNickname(this.state.nickname);
                this.toggleNicknameForm();
                this.setState({ isFormValid: true });
            } else {
                this.setState({ isFormValid: false });
            }
        }
    }

    handleNotificationButtonClick = () => {
        if (this.props.onHandleNotification) {
            this.props.onHandleNotification(this.props.user.connectionId);
          }
    };

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainderSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;
    }

    render() {
        // 스터디룸 총 휴식 시간 - 내가 사용한 휴식시간 => 남은 휴식시간


        return (
            <div className="OT_widget-container">
                <div className="pointer nickname">
                    {this.state.showForm ? (
                        <FormControl id="nicknameForm">
                            <IconButton color="inherit" id="closeButton" onClick={this.toggleNicknameForm}>
                                <HighlightOff />
                            </IconButton>
                            <InputLabel htmlFor="name-simple" id="label">
                                Nickname
                            </InputLabel>
                            <Input
                                color="inherit"
                                id="input"
                                value={this.state.nickname}
                                onChange={this.handleChange}
                                onKeyPress={this.handlePressKey}
                                required
                            />
                            {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                                <FormHelperText id="name-error-text">Nickname is too short!</FormHelperText>
                            )}
                            {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                                <FormHelperText id="name-error-text">Nickname is too long!</FormHelperText>
                            )}
                        </FormControl>
                    ) : (
                        <div>
                            <span id="nickname">{this.props.user.getNickname()}</span>
                            {this.props.user.isLocal() && <span id=""></span> && (
                            <div style={{ marginTop: "10px" }}>남은 쉬는 시간 : {this.formatTime(this.props.studyroom.maxRestTime - this.props.restTime)}</div>
                            )}
                        </div>
                    )}
                </div>

                {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
                    <div className="streamComponent">
                        <OvVideoComponent user={this.props.user} mutedSound={this.state.mutedSound} localUser={this.props.localUser} onNotificationButtonClick={this.handleNotificationButtonClick} micButtonClick={this.toggleSound}/>
                        <div id="statusIcons">
                            {!this.props.user.isVideoActive() ? (
                                <div id="camIcon">
                                    <VideocamOff id="statusCam" />
                                </div>
                            ) : null}

                            {!this.props.user.isAudioActive() ? (
                                <div id="micIcon">
                                    <MicOff id="statusMic" />
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}