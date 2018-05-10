import React, { PureComponent } from 'react';
import GetSheetDone from 'get-sheet-done';
import Hammer from'react-hammerjs';
import propagating from 'propagating-hammerjs'
import injectTapEventPlugin from "react-tap-event-plugin";
import isDblTouchTap from "./isDblTouchTap"
import './index.css';
injectTapEventPlugin()


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
            activeRow:false,
            toggleClickTable:false,
            rows: [],
            rowLabel: [],
            rowSecondLabel: [],
        }
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    }

    handleRowClick(e) {
      if(!this.state.toggleClickTable) {
        if (document.getElementsByClassName("active")[0]) {
          let active = document.getElementsByClassName("active")[0]
          console.log("className", active);
          active.classList.remove('active');
          console.log("className", active);
          e.target.closest('tr').className = 'active';
        } else {
          e.target.closest('tr').className = 'active';
        }
        console.log(e.target.closest('tr'))
        this.setState({toggleClickTable: false})
      } else {
        this.setState({toggleClickTable: false})
      }

    }

    handlePrevClick() {
        console.log("handlePrevClick")
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

    handleNextClick(e) {
        console.log("handleNextClick")
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
      this.setState({toggleClickTable: true})
    }

    componentDidMount() {
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
        // var el = document.querySelectorAll('tr');
        // console.log(el);
        // var list = []
        // el.forEach(function (tr) {
        //     console.log(tr)
        //     list.push(new Hammer(tr, {
        //         domEvents: true
        //     }));
        // })
        // list.map(x => x.on("press", function (event) {
        //   console.log(event + " gesture detected.");
        //   // event.stopPropagation();
        //   // event.preventDefault();
        //   // event.gesture.stopPropagation();
        //   // event.gesture.preventDefault();
        //   // event.gesture.srcEvent.stopPropagation();
        //   // event.gesture.srcEvent.preventDefault();
        //   // event.gesture.startEvent.stopPropagation();
        //   // event.gesture.startEvent.preventDefault();
        //
        // }))
    }


    render() {
        return (
            <div className="content" >
                <Hammer onTap={(e) => this.handleNextClick(e)} >
                <table className="table_col table" >
                    <thead>
                        <tr onTouchTap={(e) => this.handleRowClick(e) }>
                            {this.state.firstBuild && <th colSpan="3">{this.state.rowLabel[0]}</th>}
                            {this.state.secondBuild && <th colSpan="3">{this.state.rowLabel[1]}</th>}
                            {this.state.thirdBuild && <th colSpan="2">{this.state.rowLabel[2]}</th>}
                            {this.state.finalBuild && <th colSpan="2">{this.state.rowLabel[3]}</th>}
                        </tr>
                        <tr colSpan="3" onTouchTap={(e) => this.handleRowClick(e)}>
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
                                return <tr key={index} value={row} onTouchTap={(e) => this.handleRowClick(e)} >
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
                </Hammer>
                <div className="buttons">
                    <div className='set blue'>
                        <a
                            className={!this.state.acivePrevButton ? ' hide_button' : 'btn sec ico'}
                            onTouchTap={(e) => this.handlePrevClick(e)}
                        >
                            Prev build
                            </a>
                        <a
                            className={!this.state.aciveNextButton ? ' hide_button' : 'btn pri ico'}
                            onTouchTap={(e) => this.handleNextClick(e)}
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
