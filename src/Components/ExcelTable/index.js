import React, { PureComponent } from 'react';
import GetSheetDone from 'get-sheet-done';
import Hammer from 'hammerjs'

import './index.css';

class ExcelTable extends PureComponent {
    constructor() {
        super();
        this.state = {
            firstBuild: true,
            secondBuild: false,
            thirdBuild: false,
            finalBuild: false,
            acivePrevButton: false,
            aciveNextButton: true,
            rows: [],
            rowLabel: [],
            rowSecondLabel: [],
        }
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    }
    handleRowClick(e) {
        console.log(e.target)
    }

    handlePrevClick() {
        if (this.state.finalBuild) {
            this.setState({
                finalBuild: false,
                aciveNextButton: true
            });
        } else if (this.state.thirdBuild) {
            this.setState({ thirdBuild: false });
        } else if (this.state.secondBuild) {
            this.setState({
                secondBuild: false,
                acivePrevButton: false
            });
        }

    }
    handleNextClick() {
        if (this.state.firstBuild) {
            if (this.state.secondBuild) {
                if (this.state.thirdBuild) {
                    if (this.state.finalBuild) {
                    } else {
                        this.setState({
                            finalBuild: true,
                            aciveNextButton: false
                        });
                    }
                } else {
                    this.setState({ thirdBuild: true });
                }
            } else {
                this.setState({
                    secondBuild: true,
                    acivePrevButton: true
                });
            }
        }
    }

    onPinchOut = (e) => {
        console.log('onPinchOut;', e);
        this.setState({ profileImageDroppedScale: this.state.profileImageDroppedScale + 0.1 }) //initial value of 1
    }
    onPinchIn = (e) => {
        this.setState({ profileImageDroppedScale: this.state.profileImageDroppedScale - 0.1 })
    }

    componentDidMount() {
        var el = document.querySelector(".screen");
        var ham = new Hammer(el, {
            domEvents: true
        });
        var width = el.style.width;
        var height = el.style.height;
        var left = el.style.marginLeft;
        var top = el.style.marginTop;

        ham.get('pinch').set({ enable: true });

        ham.on("pinch", function (e) {
            console.log("screen", el);
            console.log("width,height,left,top", width, height, left, top);
            // if (width * e.scale >= 300) {
            //     console.log("el.childNodes[1]", el.childNodes[1]);
            //     var img = el;
            //     img.style.width = (width * e.scale) + 'px';
            //     img.style.marginLeft = (-left * e.scale) + 'px';
            //     img.style.height = (height * e.scale) + 'px';
            //     img.style.marginTop = (-top * e.scale) + 'px';
            // }
            console.log(e.scale);
        });

        // ham.on("pinch", function (e) {
        //     width = width * e.scale;
        //     height = height * e.scale;
        //     left = left * e.scale;
        //     top = top * e.scale;
        //     console.log(width);
        // });

        GetSheetDone.raw("1UONP_r47sQErBRmgTuZj_axW5Q_5pNFu5XZHMOPYzMQ").then(sheet => {
            let rows = sheet.data.filter(x => x)
            for (let i = 2; i < rows.length; i++) {
                for (let j = 0; j < 10; j++) {
                    if (rows[i][j] === undefined) {
                        rows[i][j] = '';
                    }
                }
            }
            this.setState({
                rows: sheet.data.filter(x => x),
                rowLabel: sheet.data.filter(x => x)[0].filter(x => x),
                rowSecondLabel: sheet.data.filter(x => x)[1].filter(x => x)
            })
        })
    }


    render() {
        return (
            <div className="screen">
                <div className="content" onClick={(e) => this.handleNextClick(e)}>
                    <table className="table_col">
                        <thead>
                            <tr>
                                {this.state.firstBuild && <th colSpan="3">{this.state.rowLabel[0]}</th>}
                                {this.state.secondBuild && <th colSpan="3">{this.state.rowLabel[1]}</th>}
                                {this.state.thirdBuild && <th colSpan="2">{this.state.rowLabel[2]}</th>}
                                {this.state.finalBuild && <th colSpan="2">{this.state.rowLabel[3]}</th>}
                            </tr>
                            <tr colSpan="3">
                                {this.state.firstBuild && <th >{this.state.rowSecondLabel[0]}</th>}
                                {this.state.firstBuild && <th >{this.state.rowSecondLabel[1]}</th>}
                                {this.state.firstBuild && <th >{this.state.rowSecondLabel[2]}</th>}
                                {this.state.secondBuild && <th >{this.state.rowSecondLabel[3]}</th>}
                                {this.state.secondBuild && <th >{this.state.rowSecondLabel[4]}</th>}
                                {this.state.secondBuild && <th >{this.state.rowSecondLabel[5]}</th>}
                                {this.state.thirdBuild && <th colSpan="2">{this.state.rowSecondLabel[6]}</th>}
                                {this.state.finalBuild && <th ></th>}
                                {this.state.finalBuild && <th ></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.rows.map((row, index) => {
                                if (index > 1) {
                                    return <tr key={index} onClick={(e) => this.handleRowClick(e)}>
                                        {row.map((cell, ind) => {
                                            if (this.state.firstBuild && ind < 3) {
                                                return <td key={ind} >{cell}</td>
                                            }
                                            if (this.state.secondBuild && ind < 6) {
                                                return <td key={ind} >{cell}</td>
                                            }
                                            if (this.state.thirdBuild && ind < 8) {
                                                return <td key={ind} >{cell}</td>
                                            }
                                            if (this.state.finalBuild && ind < 10) {
                                                return <td key={ind} >{cell}</td>
                                            }
                                        })
                                        }
                                    </tr>
                                }
                            }
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="buttons">
                    <div className='set blue'>
                        <a
                            className={!this.state.acivePrevButton ? ' hide_button' : 'btn sec ico'}
                            onClick={(e) => this.handlePrevClick(e)}
                        >
                            Prev build
                            </a>
                        <a
                            className={!this.state.aciveNextButton ? ' hide_button' : 'btn pri ico'}
                            onClick={(e) => this.handleNextClick(e)}
                        >
                            Next build
                            </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExcelTable;
