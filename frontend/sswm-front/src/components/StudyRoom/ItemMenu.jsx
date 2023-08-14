  import React from "react";
  import CardHoverButton from "./ItemButton";
  import "./Style.css";

  const evStop = (ev) => {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
  };
  //----==============-----------------------------------
  class CardHoverMenus extends React.Component {
    clkBtn = (ev) => {
      evStop(ev);
    };
    render() {
      const p = {
        funcs: {
          viewBoard: (e) => this.clkBtn(e, "viewBoard"),
        },
      };

      const {studyroom} = this.props;

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
              studyroom = {studyroom}
            />
          </div>
        </div>
      );
    }
  }

  export default CardHoverMenus;
