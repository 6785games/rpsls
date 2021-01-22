import React from 'react';
import { SvgLoader, SvgProxy } from "react-svgmt";

/**
 * this works with <object>
 * document.querySelector(".svgClass").getSVGDocument().getElementById(
 *    arrowsMap[winnerKey]).style.stroke = winnerColor;
 * document.querySelector(".svgClass").getSVGDocument().getElementById(
 *    arrowsMap[winnerKey]).style.fill = winnerColor;
 */

class Figures extends React.Component {
    render() {
        console.log(this.state.props);
        return(
            <SvgLoader className="svg-wrapper"
                path="https://raw.githubusercontent.com/6785games/rpsls/main/src/512px-rpsls.svg" >
                {
                    (this.props.p1Choice && this.state.p2Choice) && 
                    <SvgProxy selector={this.props.p1Circle} stroke={this.props.p1Color} /> &&
                    <SvgProxy selector={this.props.p2Circle} stroke={this.props.p2Color} /> &&
                    <SvgProxy selector={this.props.wArrow} stroke={this.props.wColor} /> &&
                    <SvgProxy selector={this.props.wKey} fill={this.props.wColor} />
                }
            </SvgLoader>
        );
    }
}

export default Figures;