import { transparent, white } from 'material-ui/styles/colors';

import Utils from './Utils';
import Moment from 'moment';

class DataRandom {

    static requestTempHistoryDatasets() {
        let count = 12;//12个数字
        let gap = 5;//5s
        let _label = [];
        let _datas = {
            no1: [],
            no2: [],
            no3: [],
            no4: [],
        };
        for (let i = 0; i < count; i++) {
            _label[i] = Moment().subtract((count - i) * gap, 'seconds').format("HH:mm:ss");
            _datas.no1[i] = Utils.randomFloatRange(1200, 1400);
            _datas.no2[i] = Utils.randomFloatRange(1300, 1400);
            _datas.no3[i] = Utils.randomFloatRange(1300, 1400);
            _datas.no4[i] = Utils.randomFloatRange(1200, 1400);
        }
        return {
            labels: _label,
            datasets: [
                {
                    label: "no1", 
                    borderColor: "rgba(228,228,228,0.4)",
                    backgroundColor: "rgba(228,228,228,0.4)",
                    data: _datas.no1,
                },
                {
                    label: "no2", 
                    borderColor: "rgba(255,197,179,0.5)",
                    backgroundColor: "rgba(255,197,179,0.5)",
                    data: _datas.no2,
                },
                {
                    label: "no3", 
                    borderColor: "rgba(255,69,105,0.8)",
                    backgroundColor: "rgba(255,69,105,0.8)",
                    data: _datas.no3,
                },
                {
                    label: "no4", 
                    backgroundColor: "rgba(213,0,0 ,1)",
                    borderColor: "rgba(213,0,0 ,1)",
                    data: _datas.no4,
                },

            ]
        };
    }

    static randomInitRadarDatasets(count, newLineColor, fillColor) {
        let datasets = [];
        for (let i = 0; i < count; i++) {
            datasets.unshift({
                borderWidth: 0.3,
                pointRadius: 0,
                backgroundColor: fillColor,//无填充
                borderColor: newLineColor,//线
                pointBackgroundColor: transparent,
                pointBorderColor: transparent,

                data: [
                    Utils.randomFloatRange(1200, 1400),
                    Utils.randomFloatRange(1300, 1400),
                    Utils.randomFloatRange(1300, 1400),
                    Utils.randomFloatRange(1200, 1400)
                ]
            });
        }
        return datasets;
    }

    static updateHistoryRadarData(dataItem, lineColor, fillColor) {
        dataItem.borderWidth = 0.3;
        dataItem.pointRadius = 0;

        dataItem.backgroundColor = fillColor;//填充
        dataItem.borderColor = lineColor;//线
        dataItem.pointBackgroundColor = transparent;
        dataItem.pointBorderColor = transparent;
    }


    static randomNewRadarData(newLineColor) {
        //radarDatasets.unshift(
        return {
            borderWidth: 1.2,
            pointRadius: 2,
            backgroundColor: transparent,//无填充
            borderColor: newLineColor,//线
            pointBackgroundColor: newLineColor,
            pointBorderColor: white,
            data: [
                Utils.randomFloatRange(1200, 1400),
                Utils.randomFloatRange(1300, 1400),
                Utils.randomFloatRange(1300, 1400),
                Utils.randomFloatRange(1200, 1400)
            ]
        }
    }



}

module.exports = DataRandom;