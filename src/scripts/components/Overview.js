import React from 'react';
import { Paper, Avatar, Divider, LinearProgress } from 'material-ui';

import IconJZFH from 'material-ui/svg-icons/action/trending-up';
import IconArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import IconExtension from 'material-ui/svg-icons/action/extension';

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
    black
} from 'material-ui/styles/colors';


const styles = {
    paper: {
        flex: 1,
        height: '100%',
        margin: 15,
        color: '#000000',
        fontSize: '0.80rem',
        padding: 20
    },
    valueDisplay: {
        // fontSize: '1.3rem',
        margin: '1.0rem 0 1.0rem 0',
        lineHeight: '110%',
        fontWeight: 500,
    },

    icon: {
        width: 16,
        height: 16,
        marginRight: 10,
    }
};

class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.refreshData = this.refreshData.bind(this);
        this.gotoAnalyze = this.gotoAnalyze.bind(this);
    }

    gotoAnalyze() {
        console.log('gotoAnalyze');
        this.props.handleChangeDrawerItem('Analyze');
    }

    componentDidMount() {
        // this.refreshTask = setInterval(this.refreshData, 1000);
    }

    componentWillUnmount() { 
        // clearInterval(this.refreshTask);
    }

    refreshData() {

    }

    render() {
        return (
            <div>
                <Paper zDepth={2} style={styles.paper}>
                    <div>
                        <IconJZFH style={styles.icon} color={black} />机组负荷
                    </div>
                    <h2 style={styles.valueDisplay}>MW 990.630</h2>
                    <IconArrowUpward style={styles.icon} color={black} />15.121%
               </Paper >

                <Paper zDepth={2} style={styles.paper}>
                    <div>
                        <IconJZFH style={styles.icon} color={black} />锅炉负荷
                    </div>
                    <h2 style={styles.valueDisplay}>T/H 4.563</h2>
                    <IconArrowUpward style={styles.icon} color={black} />3.321%
                </Paper >

                <Paper zDepth={2} style={styles.paper}>
                    <div>
                        <IconJZFH style={styles.icon} color={black} />主汽压力
                      </div>
                    <h2 style={styles.valueDisplay}>MPa 1.051</h2>
                    <IconArrowUpward style={styles.icon} color={black} />1.764%
                 </Paper >


                <Paper zDepth={2} style={styles.paper} onClick={this.gotoAnalyze}>
                    <div>
                        <Avatar
                            icon={<IconExtension />}
                            backgroundColor={'#880E4F'}
                            size={30}
                            style={{ margin: 8 }}
                        />
                        炉膛四角温度分析
                    </div>
                    <Divider />
                    <div style={{ marginTop: 8 }}>
                        system running
                     </div>

                    <LinearProgress mode="indeterminate" style={{ marginTop: 10 }} />
                </Paper >
            </div>

        );
    }
}

export default Overview;