import React, { Component } from 'react';
import ExcelTable from '../ExcelTable'
import Hammer from 'hammerjs'

import './index.css';

class TablePage extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // var el = document.querySelector(".screen");
        // var ham = new Hammer(el, {
        //     domEvents: true
        // });
        // // el.style.width = "1280px"
        // // el.style.height = "800px"
        // // el.style.marginLeft = "0px"
        // // el.style.marginTop = "0px"
        // console.log("el", el.style)
        // // var width = parseInt(el.style.width, 10);
        // // var height = parseInt(el.style.height, 10);
        // // var left = parseInt(el.style.marginLeft, 10);
        // // var top = parseInt(el.style.marginTop, 10);
        // var width = 1280;
        // var height = 800;
        // // var left = 0;
        // // var top = 0;

        // ham.get('pinch').set({ enable: true });

        // ham.on("pinch", function (e) {
        //     console.log("screen", el);
        //     console.log("width,height,left,top", width, height);
        //     if (width * e.scale >= 300) {
        //         console.log("el.childNodes[1]", el.childNodes[1]);
        //         var screen = el;
        //         screen.style.width = (width * e.scale) + 'px';
        //         // screen.style.marginLeft = (-left * e.scale) + 'px';
        //         screen.style.height = (height * e.scale) + 'px';
        //         // screen.style.marginTop = (-top * e.scale) + 'px';
        //     }
        //     console.log(e.scale);
        // });

        // ham.on("pinch", function (e) {
        //     width = width * e.scale;
        //     height = height * e.scale;
        //     // left = left * e.scale;
        //     // top = top * e.scale;
        //     console.log(width);
        // });
    }


    render() {
        return (
            <div className="screen">
                <ExcelTable></ExcelTable>
            </div>
        );
    }
}

export default TablePage;
