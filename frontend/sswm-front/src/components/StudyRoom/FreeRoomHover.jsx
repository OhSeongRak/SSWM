import { Button, Link } from "@mui/material";
import React from "react";

const evStop = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  ev.nativeEvent.stopImmediatePropagation();
};

class CardHoverMenus extends React.Component {
  state = { hiddenPopupMenu: true };
  toggle = () => {
    this.setState({ hiddenPopupMenu: !this.state.hiddenPopupMenu });
  };
  clkBtn = (ev, msg) => {
    evStop(ev);
    this.props.flashFn(msg);
  };
  render() {
    const p = {
      funcs: {
        viewBoard: (e) => this.clkBtn(e, "viewBoard"),
        notInterested: (e) => this.clkBtn(e, "notInterested"),
      },
    };
    //Above is hardwired for demo. Normally, const p = this.props;
    return (
      <div className="whenhovered" onClick={this.toggle}>
        {this.state.hiddenPopupMenu && (
          <div>
            <Link to="/StudyRoomMember" style={{ textDecoration: "none" }}>
              <Button sx={{ fontFamily: "NanumSquareNeo" }} size="small">
                입장하기
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default CardHoverMenus;
