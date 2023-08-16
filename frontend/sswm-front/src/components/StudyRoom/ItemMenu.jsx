import React, { Component } from "react";
import CardHoverButton from "./ItemButton";
import axios from "axios";
import "./Style.css";

class CardHoverMenus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHost: false,
    };
  }

  evStop = (ev) => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
  };

  componentDidMount() {
    this.checkIsHost();
  }

  checkIsHost = async () => {
    try {
      const { studyroom } = this.props;
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studyrooms/${studyroom.id}/isHost`, {
        headers: {
          Authorization: accessToken,
        },
      });
      this.setState({ isHost: response.data });
    } catch (error) {
      console.log(error);
      console.log("dailylog 에러", error);
    }
  };

  clkBtn = (ev) => {
    this.evStop(ev);
  };

  render() {
    const { isHost } = this.state;
    const p = {
      funcs: {
        viewBoard: (e) => this.clkBtn(e, "viewBoard"),
      },
    };

    const { studyroom } = this.props;
    const { isMyPage } = this.props;

    return (
      <div className="whenhovered" onClick={this.toggle}>
        <div className="setting">
          <div className="mt-5 pt-5" />
          <div className="mt-5" />

          <CardHoverButton
            txt="입장하기"
            clicked={p.funcs.viewBoard}
            sx={{
              verticalAlign: "center",
              justifyItems: "center",
              alignItems: "center",
            }}
            studyroom={studyroom}
            isHost={isHost}
            isMyPage={isMyPage}
          />
        </div>
      </div>
    );
  }
}

export default CardHoverMenus;
