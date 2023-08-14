import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import ChatComponent from './chat/ChatComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import StreamComponent from './stream/StreamComponent';
import './VideoRoomComponent.css';
import styled from "styled-components";
import OpenViduLayout from './layout/openvidu-layout';
import UserModel from './models/user-model';
//import ToolbarComponent from './toolbar/ToolbarComponent';
//import * as tmPose from '@teachablemachine/pose';
import * as tmImage from '@teachablemachine/image';
import sound from '../../assets/Dingdong.mp3'
import LiveRoomSnackbar from '../LiveRoom/LiveRoomSnackbar';
//import LiveRoomFooter from '../LiveRoom/LiveRoomFooter';

import BedIcon from '@mui/icons-material/Bed';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
//import Videocam from '@material-ui/icons/Videocam';
//import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
//import SwitchVideoIcon from '@material-ui/icons/SwitchVideo';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";

import Popper from '@mui/material/Popper';
import Paper from "@mui/material/Paper";
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { styled as muistyled } from "@mui/material/styles";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";

let model, webcam;
var localUser = new UserModel();
const APPLICATION_SERVER_URL = 'https://i9a206.p.ssafy.io:5443/';
const accessToken = JSON.parse(localStorage.getItem("accessToken"));

class VideoRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.hasBeenUpdated = false;
        this.layout = new OpenViduLayout();
        // let userName = this.props.user ? this.props.user : 'OpenVidu_User' + Math.floor(Math.random() * 100);
        this.remotes = [];
        this.localUserAccessAllowed = false;
        this.state = {
            mySessionId: props.studyroomId,
            myUserName: undefined,
            session: undefined,
            localUser: undefined,
            subscribers: [],
            chatDisplay: 'none',
            currentVideoDevice: undefined,
            open: false,
            anchorEl: null,
            minute : 0,
            restOn: false, // 휴식 상태 여부
            restTime: 0,
            isOut: false,
        };
        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.updateLayout = this.updateLayout.bind(this);
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.nicknameChanged = this.nicknameChanged.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.closeDialogExtension = this.closeDialogExtension.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
        this.checkSize = this.checkSize.bind(this);
        this.predict = this.predict.bind(this);
        this.loop = this.loop.bind(this);
        this.init = this.init.bind(this);
        this.sendAlarm = this.sendAlarm.bind(this);
        this.displayAlarmMessage = this.displayAlarmMessage.bind(this);
    }

    componentDidMount() {
        const openViduLayoutOptions = {
            maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
            minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
            fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
            bigClass: 'OV_big', // The class to add to elements that should be sized bigger
            bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
            bigFixedRatio: false, // fixedRatio for the big ones
            bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
            bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
            bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
            animate: true, // Whether you want to animate the transitions
        };
        
        axios
        .get("/api/users", {
            headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
            },
        })
        .then((response) => {
            // eslint-disable-next-line
            this.state.myUserName = response.data.nickname;
        })
        .catch(error => {
            console.error('요청 에러:', error);
        });

        this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
        window.addEventListener('beforeunload', this.onbeforeunload);
        window.addEventListener('resize', this.updateLayout);
        window.addEventListener('resize', this.checkSize);
        this.joinSession();
        this.init();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
        window.removeEventListener('resize', this.updateLayout);
        window.removeEventListener('resize', this.checkSize);
        this.leaveSession();
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    joinSession() {
        this.OV = new OpenVidu();
        this.sendEventAxios({
            type: 'STUDY',
            status: 'ON',
            studyroomId: this.state.mySessionId,
        })

        this.setState(
            {
                session: this.OV.initSession(),
            },
            async () => {
                this.subscribeToStreamCreated();
                await this.connectToSession();
            },
        );
        
        this.sendRestTimeAxios();
    }

    async connectToSession() {
        if (this.props.token !== undefined) {
            console.log('token received: ', this.props.token);
            this.connect(this.props.token);
        } else {
            try {
                var token = await this.getToken();
                this.connect(token);
            } catch (error) {
                console.error('There was an error getting the token:', error.code, error.message);
                if(this.props.error){
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error getting the token:', error.message);
            }
        }
    }

    connect(token) {
	    console.log("connect token", token);
        this.state.session
            .connect(
                token.token,
                { clientData: this.state.myUserName },
            )
            .then(() => {
                this.connectWebCam();
            })
            .catch((error) => {
                if(this.props.error){
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error connecting to the session:', error.message);
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
    }

    async connectWebCam() {
        await this.OV.getUserMedia({ audioSource: undefined, videoSource: undefined });
        var devices = await this.OV.getDevices();
        var videoDevices = devices.filter(device => device.kind === 'videoinput');

        let publisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
        });

        if (this.state.session.capabilities.publish) {
            publisher.on('accessAllowed' , () => {
                this.state.session.publish(publisher).then(() => {
                    this.updateSubscribers();
                    this.localUserAccessAllowed = true;
                    if (this.props.joinSession) {
                        this.props.joinSession();
                    }
                });
            });

        }
        localUser.setNickname(this.state.myUserName);
        localUser.setConnectionId(this.state.session.connection.connectionId);
        localUser.setScreenShareActive(false);
        localUser.setStreamManager(publisher);
        this.subscribeToUserChanged();
        this.subscribeToStreamDestroyed();
        this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
        this.getAlarmMessage();
        this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
            this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
                this.updateLayout();
                publisher.videos[0].video.parentElement.classList.remove('custom-class');
            });
        });
    }

    updateSubscribers() {
        var subscribers = this.remotes;
        this.setState(
            {
                subscribers: subscribers,
            },
            () => {
                if (this.state.localUser) { 
                    this.sendSignalUserChanged({
                        isAudioActive: this.state.localUser.isAudioActive(),
                        isVideoActive: this.state.localUser.isVideoActive(),
                        nickname: this.state.localUser.getNickname(),
                        isScreenShareActive: this.state.localUser.isScreenShareActive(),
                    });
                }
                this.updateLayout();
            },
        );
    }

    // axios 요청 함수
    sendEventAxios = (data) => {        
        axios
        .post("/api/event", data, {
            headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
            },
        })
        .then((response) => {
            this.camStatusChanged(data.type, data.status);
        })
        .catch(error => {
            console.error('요청 에러:', error);
        });
    };

    sendRestTimeAxios() {
        // 휴식 시간 가져오기
        axios
        .get(`/api/user-logs/${this.state.mySessionId}`, {
            headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
            }
        })
        .then((response) => {
        this.setState({ restTime: response.data.restTime });
        console.log("비디오룸컴포넌트에서 쉬는시간 호출:::::::::", response.data)
        })
        .catch(error => {
            console.error('요청 에러:', error);
        });            
    }

    leaveSession() {
        this.sendEventAxios({
            type: 'REST',
            status: 'OFF',
            studyroomId: this.state.mySessionId,
        })
        this.restOn = false

        this.sendEventAxios({
            type: 'STUDY',
            status: 'OFF',
            studyroomId: this.state.mySessionId,
        })
        setTimeout(() => {
            const mySession = this.state.session;

            if (mySession) {
                mySession.disconnect();
            }

            // Empty all properties...
            this.OV = null;
            this.setState({
                session: undefined,
                subscribers: [],
                mySessionId: 'Session2270callreact',
                myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
                localUser: undefined,
            });
            if (this.props.leaveSession) {
                this.props.leaveSession();
            }
        }, 200);
    }
    camStatusChanged(type, status) {
        if ((type==='REST' && status==='ON') || (type==='STUDY' && status==='OFF')){
            localUser.setVideoActive(false);
        }
        else{
            localUser.setVideoActive(true);
        }

        //localUser.setVideoActive(!localUser.isVideoActive());
        localUser.getStreamManager().publishVideo(localUser.isVideoActive());
        this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
        this.setState({ localUser: localUser });
    }

    micStatusChanged() {
        localUser.setAudioActive(!localUser.isAudioActive());
        localUser.getStreamManager().publishAudio(localUser.isAudioActive());
        this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
        this.setState({ localUser: localUser });
    }

    nicknameChanged(nickname) {
        let localUser = this.state.localUser;
        localUser.setNickname(nickname);
        this.setState({ localUser: localUser });
        this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
    }

    deleteSubscriber(stream) {
        const remoteUsers = this.state.subscribers;
        const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            this.setState({
                subscribers: remoteUsers,
            });
        }
    }

    subscribeToStreamCreated() {
        this.state.session.on('streamCreated', (event) => {
            const subscriber = this.state.session.subscribe(event.stream, undefined);
            // var subscribers = this.state.subscribers;
            subscriber.on('streamPlaying', (e) => {
                this.checkSomeoneShareScreen();
                subscriber.videos[0].video.parentElement.classList.remove('custom-class');
            });
            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            this.remotes.push(newUser);
            if(this.localUserAccessAllowed) {
                this.updateSubscribers();
            }
        });
    }

    subscribeToStreamDestroyed() {
        // On every Stream destroyed...
        this.state.session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            this.deleteSubscriber(event.stream);
            setTimeout(() => {
                this.checkSomeoneShareScreen();
            }, 20);
            event.preventDefault();
            this.updateLayout();
        });
    }

    subscribeToUserChanged() {
        this.state.session.on('signal:userChanged', (event) => {
            let remoteUsers = this.state.subscribers;
            remoteUsers.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    console.log('EVENTO REMOTE: ', event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                    if (data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }
                }
            });
            this.setState(
                {
                    subscribers: remoteUsers,
                },
                () => this.checkSomeoneShareScreen(),
            );
        });
    }

    updateLayout() {
        setTimeout(() => {
            this.layout.updateLayout();
        }, 20);
    }

    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }

    toggleFullscreen() {
        const document = window.document;
        const fs = document.getElementById('container');
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    async switchCamera() {
        try{
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if(videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: localUser.isAudioActive(),
                        publishVideo: localUser.isVideoActive(),
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.localUser.getStreamManager());
                    await this.state.session.publish(newPublisher)
                    this.state.localUser.setStreamManager(newPublisher);
                    this.setState({
                        currentVideoDevice: newVideoDevice,
                        localUser: localUser,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    screenShare() {
        const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
        const publisher = this.OV.initPublisher(
            undefined,
            {
                videoSource: videoSource,
                publishAudio: localUser.isAudioActive(),
                publishVideo: localUser.isVideoActive(),
                mirror: false,
            },
            (error) => {
                if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                    this.setState({ showExtensionDialog: true });
                } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
                    alert('Your browser does not support screen sharing');
                } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
                    alert('You need to enable screen sharing extension');
                } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                    alert('You need to choose a window or application to share');
                }
            },
        );

        publisher.once('accessAllowed', () => {
            this.state.session.unpublish(localUser.getStreamManager());
            localUser.setStreamManager(publisher);
            this.state.session.publish(localUser.getStreamManager()).then(() => {
                localUser.setScreenShareActive(true);
                this.setState({ localUser: localUser }, () => {
                    this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
                });
            });
        });
        publisher.on('streamPlaying', () => {
            this.updateLayout();
            publisher.videos[0].video.parentElement.classList.remove('custom-class');
        });
    }

    closeDialogExtension() {
        this.setState({ showExtensionDialog: false });
    }

    stopScreenShare() {
        this.state.session.unpublish(localUser.getStreamManager());
        this.connectWebCam();
    }

    checkSomeoneShareScreen() {
        let isScreenShared;
        // return true if at least one passes the test
        isScreenShared = this.state.subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
        const openviduLayoutOptions = {
            maxRatio: 3 / 2,
            minRatio: 9 / 16,
            fixedRatio: isScreenShared,
            bigClass: 'OV_big',
            bigPercentage: 0.8,
            bigFixedRatio: false,
            bigMaxRatio: 3 / 2,
            bigMinRatio: 9 / 16,
            bigFirst: true,
            animate: true,
        };
        this.layout.setLayoutOptions(openviduLayoutOptions);
        this.updateLayout();
    }

    toggleChat(property) {
        let display = undefined;
         
        if (display === undefined) {
            console.log(this.state.chatDisplay);
            display = this.state.chatDisplay === 'none' ? 'block' : 'none';
        }
        if (display === 'block') {
            console.log("block");
            this.setState({ chatDisplay: display, messageReceived: false });
        } else {
            console.log("else");
            console.log('chat', display);
            this.setState({ chatDisplay: display });
        }
        this.updateLayout();
    }

    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }
    checkSize() {
        if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
            this.toggleChat('none');
            this.hasBeenUpdated = true;
        }
        if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
            this.hasBeenUpdated = false;
        }
    }

    //휴식 버튼 클릭
    handleRestClick = (event) => {
        console.log("event : ", event);
        if (event){
            this.setState((prevState) => ({
                anchorEl: event.target,
                open: !prevState.open
            }));
        }
        else{
            this.setState((prevState) => ({
                open: !prevState.open
            }));
        }

      };
    
    //휴식 시간 감소
    handleMinusClick = () => {
        if (this.state.minute > 0){
            this.setState((prevState) => ({
                minute: prevState.minute -1
            }));
        }
    }

    //휴식 시간 증가
    handlePlusClick = () => {
        console.log("this.state.restTime/60:::", Math.floor(this.state.restTime/60));
        // this.props.studyroom.maxRestTime/60 - this.state.restTime/60
        if (this.state.minute < Math.floor((this.props.studyroom.maxRestTime - this.state.restTime) / 60)) {
        this.setState((prevState) => ({
            minute: prevState.minute + 1
          }));
        }
    }

    //휴식 시작 버튼 클릭
    handleApplyClick = () => {
        if(this.state.minute === -1){
            this.leaveSession();
        }
        //0초면 팝업 닫기
        else if(this.state.minute <= 0 && this.state.minute !== -1){
            this.setState({
                open: false,
                timerRunning: false,
            });
        }
        else {
            const { minute } = this.state;
            console.log("minute!!: ", minute);

            const timerValue = minute * 60; // 분을 초로 변환
        
            this.setState({
            timerValue,
            timerRunning: true,
            open: true // 팝업 열기
            });
        
            this.startTimer();

            // const restStatus = restOn ? 'OFF' : 'ON';
            // const studyStatus = restOn ? 'ON' : 'OFF';

            this.sendEventAxios({
                type: 'REST',
                status: 'ON',
                studyroomId: this.state.mySessionId,
            })
            this.restOn = true

            this.sendEventAxios({
                type: 'STUDY',
                status: 'OFF',
                studyroomId: this.state.mySessionId,
            })
        }
    };
    
    //타이머 설정
    startTimer = () => {
        this.timerInterval = setInterval(() => {
          this.setState((prevState) => {
            const newTimerValue = prevState.timerValue - 1;
    
            if (newTimerValue <= 0) {
                this.setState(
                    {
                        minute: 0,
                    },
                )
                clearInterval(this.timerInterval);
                this.setState({
                    timerRunning: false,
                    open: false
                });
              
              this.sendEventAxios({
                type: 'REST',
                status: 'OFF',
                studyroomId: this.state.mySessionId,
              })
              this.restOn = false

              this.sendEventAxios({
                type: 'STUDY',
                status: 'ON',
                studyroomId: this.state.mySessionId,
              })

              setTimeout(() => {
                this.sendRestTimeAxios();
              }, 100);
            }
            
            return {
              timerValue: newTimerValue
            };
          });
        }, 1000); // 1초마다 감소
      };
    async init() {
        const URL = "https://teachablemachine.withgoogle.com/models/xtvI2r9Ck/";
        const modelURL = URL+"model.json";
        const metadataURL = URL+"metadata.json";

        console.log("before model");
        model = await tmImage.load(modelURL, metadataURL);
        console.log("after model");

        const size = 200;
        const flip = true; 
        webcam = new tmImage.Webcam(size, size, flip); 
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(this.loop);

    }

    async loop(timestamp) {
        webcam.update(); // update the webcam frame
        await this.predict();
        window.requestAnimationFrame(this.loop);
    }
    
    async predict() {
        
        const prediction = await model.predict(webcam.canvas);
        if(prediction[1].probability > 0.9){
            console.log("start rest");
            if(this.state.isOut === false){
                this.setState({
                    isOut : true,
                    minute : (this.props.studyroom.maxRestTime - this.state.restTime) / 60,
                    //minute : 10,
                });
                setTimeout(() => {
                    this.handleApplyClick();
                }, 100);
                //this.handleApplyClick();
                console.log("start here");
            }
        //     this.leaveSession();
        //     //this.startRest();
        } 
        else{

            if(this.state.isOut === true){
                console.log("stop rest");
                this.setState({
                    isOut : false,
                    minute : 0,
                });
                setTimeout(() => {
                    this.sendEventAxios({
                        type: 'REST',
                        status: 'OFF',
                        studyroomId: this.state.mySessionId,
                    })
                    this.restOn = true
        
                    this.sendEventAxios({
                        type: 'STUDY',
                        status: 'ON',
                        studyroomId: this.state.mySessionId,
                    })
                    
                    setTimeout(() => {
                        this.sendRestTimeAxios();
                    }, 100);

                    setTimeout(() => {
                        if(this.state.restTime === 0){
                            this.leaveSession();
                        }
                    }, 300);
                }, 100);
                
                console.log("stop here");

            }
        }


    }

    //알람 전송
    sendAlarm(connectionId) {
        //this.state.session.remoteConnections에서 for문 돌면서 맞는 connectionId에서 connection을 가져와서 to에 넣어주자
        var con = undefined;
        this.state.session.remoteConnections.forEach(function(Connection){
            if (Connection.connectionId === connectionId){
                con = Connection;
            }
        });
        if(con){
        this.state.session.signal({
            data: 'My custom message',  // Any string (optional)
            to: [con],        // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: 'alarm'             // The type of message (optional)
          });

          var currentSound = undefined;
          if(currentSound) {
              currentSound.pause();
              currentSound.currentTime = 0;
          }
      
          // TODO: mp3 파일 경로는 맞게 수정해주세요!
          currentSound = new Audio(sound);
          currentSound.play();
        }
        else{
            console.log("알람 전송 실패");
        }
        

          
    }

    //알람 수신

    getAlarmMessage(){

        this.state.session.on('signal:alarm', (event) => {
                // 알람 메시지를 화면에 표시합니다.
                console.log("get alarm");
                this.displayAlarmMessage(event.data);
            }
        );
        
    }
    displayAlarmMessage(message) {

        var currentSound = undefined;
        if(currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
    
        // TODO: mp3 파일 경로는 맞게 수정해주세요!
        currentSound = new Audio(sound);
        currentSound.play();
    }
    render() {
        //const mySessionId = this.state.mySessionId;
        const localUser = this.state.localUser;
        var chatDisplay = { display: this.state.chatDisplay };
        const { open, anchorEl } = this.state;
        const canBeOpen = open && Boolean(anchorEl);
        const id = canBeOpen ? 'transition-popper' : undefined;
        const Item = muistyled(Paper)(({ theme }) => ({
            textAlign: "center",
          }));
        return (
            <div className="container" id="container">
                <ContainerWrap>
                    <HeaderWrap>
                        <LiveRoomSnackbar />
                    </HeaderWrap>
                </ContainerWrap>


                <DialogExtensionComponent showDialog={this.state.showExtensionDialog} cancelClicked={this.closeDialogExtension} />

                <div id="layout" className="bounds">
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        <div className="OT_root OT_publisher custom-class" id="localUser">
                            <StreamComponent
                                user={localUser}
                                handleNickname={this.nicknameChanged}
                                localUser={localUser}
                                studyroom={this.props.studyroom}
                                restTime={this.state.restTime}
                            />
                        </div>
                    )}
                    {this.state.subscribers.map((sub, i) => (
                        <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                            <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} localUser={localUser} onHandleNotification={this.sendAlarm} />
                        </div>
                    ))}
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
                            <ChatComponent
                                user={localUser}
                                chatDisplay={this.state.chatDisplay}
                                close={this.toggleChat}
                                messageReceived={this.checkNotification}
                            />
                        </div>
                    )}

                </div>


               <FooterWrap>
        <div className="buttonsContent" >
            {/* 휴식 버튼 시작 */}
            <IconButton
                aria-describedby={id}
                id="rest-button"
                onClick={this.handleRestClick}
            >
                <BedIcon />
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>{({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                <Box sx={{ border: 2, p: 1, bgcolor: 'background.paper', borderRadius: '16px', borderColor: 'orange' }}>
                                      {/* 타이머 설정 */}
                                      {this.state.timerRunning ? (
                    <div>
                      <h2>타이머 실행 중</h2>
                      <p>남은 시간: {this.state.timerValue}초</p>
                    </div>
                  ) : (
                    <div>
                      <h2>타이머 설정</h2>
                      <TimerWrap>
                        <IconButton aria-label="minus" onClick={this.handleMinusClick}>
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                        <Item>{this.state.minute}</Item>
                        <span>분</span>
                        <IconButton aria-label="plus" onClick={this.handlePlusClick}>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </TimerWrap>
                      <TimerBtnWrap>
                        <Button variant="contained" color="success" onClick={this.handleApplyClick}>
                          적용
                        </Button>
                      </TimerBtnWrap>
                    </div>
                  )}
                  {/* 타이머 설정 끝 */}
                </Box>
                </Fade>
            )}
            </Popper>
            {/* 휴식 버튼 끝 */}

            {/* 스트레칭 버튼 시작 */}
            <Link to="/Stretching" target="_blank" >
                <IconButton>
                    <AccessibilityNewIcon/>
                </IconButton>
            </Link>

            {/* 스트레칭 버튼 끝 */}

            <IconButton
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={this.micStatusChanged}
            >
              {localUser !== undefined && localUser.isAudioActive() ? (
                <Mic />
              ) : (
                <MicOff color="secondary" />
              )}
            </IconButton>

            {/* <IconButton
              color="inherit"
              className="navButton"
              id="navCamButton"
              onClick={this.camStatusChanged}
            >
              {localUser !== undefined && localUser.isVideoActive() ? (
                <Videocam />
              ) : (
                <VideocamOff color="secondary" />
              )}
            </IconButton> */}

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.screenShare}
            >
              {localUser !== undefined && localUser.isScreenShareActive() ? (
                <PictureInPicture />
              ) : (
                <ScreenShare />
              )}
            </IconButton>

            {localUser !== undefined && localUser.isScreenShareActive() && (
              <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                <StopScreenShare color="secondary" />
              </IconButton>
            )}

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.toggleFullscreen}
            >
              {localUser !== undefined && this.state.fullscreen ? (
                <FullscreenExit />
              ) : (
                <Fullscreen />
              )}
            </IconButton>
            <IconButton
              color="secondary"
              className="navButton"
              onClick={this.leaveSession}
              id="navLeaveButton"
            >
              <PowerSettingsNew />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={this.toggleChat}
              id="navChatButton"
            >
              {this.state.messageReceived && <div id="point" className="" />}
              <Tooltip title="Chat">
                <QuestionAnswer />
              </Tooltip>
            </IconButton>
            </div>

            </FooterWrap>
            </div>
        );
    }

    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    async getToken() {
	let result = await this.checkSessionId(this.state.mySessionId);
	if(result) {
		return await this.createToken(this.state.mySessionId);
	}
	else {
		const session = await this.createSession(this.state.mySessionId);
		return await this.createToken(session.id);
	}
 
    }


    async checkSessionId(sessionId){
	const response = await axios.get(APPLICATION_SERVER_URL + 'openvidu/api/sessions', {
		headers: { 'Authorization' : 'Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU', 'Content-Type': 'application/json', },
	});

	let result = false;
	response.data.content.forEach(con => {
		if(con.id === sessionId)
			result = true;
	});

	return result;
    }

    async createSession(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'openvidu/api/sessions', { customSessionId: sessionId }, {
		headers: { 'Authorization' : 'Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU', 'Content-Type': 'application/json', },
        });
        return response.data; // The sessionId
    }

    async createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'openvidu/api/sessions/' + sessionId + '/connection', {}, {
		headers: { 'Authorization' : 'Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU', 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }
}

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: bottom;
  width: 100vw;
  height: 80vh;
`
const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 10vh;
`
// const ContentWrap = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 90%;
//   height: 80vh;
// `
//const ContentLiveView = styled.div`
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  width: 80%;
//  height: 100%;
//  border: 1px solid black;
//`

//const ContentLiveChat = styled.div`
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  width: 20%;
//  height: 100%;
//  border: 1px solid black;
//`
const FooterWrap = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: green;
  color: white;
  gap: 3vw;

`
const TimerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`
const TimerBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default VideoRoomComponent;
