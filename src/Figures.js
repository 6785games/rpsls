import React from 'react';
import { SvgLoader, SvgProxy } from "react-svgmt";

class Figures extends React.Component {
    render() {
        return(
            <SvgLoader className="svg-wrapper"
                path="https://raw.githubusercontent.com/6785games/rpsls/pubnub-react/src/512px-rpsls.svg" >
                {
                    (this.props.p1Choice && this.props.p2Choice) && 
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