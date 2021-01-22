import React from 'react';
import { SvgLoader, SvgProxy } from "react-svgmt";


class Figures extends React.Component {

    addColor(props) {
        document.querySelector(props.p1Circle).style.stroke = props.p1Color;
        //document.querySelector(props.p1Circle).style.fill = props.p1Color;
        document.querySelector(props.p2Circle).style.stroke = props.p2Color;
        //document.querySelector(props.p2Circle).style.fill = props.p2Color;
        document.querySelector(props.wArrow).style.stroke = props.wColor;
        document.querySelector(props.wArrow).style.fill = props.wColor;
    }

    render() {
        console.log(this.props);
        return(
            <div>
            {
                (!this.props.p1Choice || !this.props.p2Choice) &&
                <SvgLoader className="svg-wrapper"
                    path="https://raw.githubusercontent.com/6785games/rpsls/main/src/512px-rpsls.svg" >
                </SvgLoader>
            }
            {
                (this.props.p1Choice && this.props.p2Choice) &&
                <SvgLoader className="svg-wrapper"
                    path="https://raw.githubusercontent.com/6785games/rpsls/main/src/512px-rpsls.svg" 
                    callback={this.addColor(this.props)}>
                </SvgLoader>
            }
            </div>
        );
    }
}

export default Figures;