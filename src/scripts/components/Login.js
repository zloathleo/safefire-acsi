import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';
import URL from 'url';

import { RaisedButton, Paper } from 'material-ui';
import request from 'browser-request';
import Animejs from 'animejs';
import '../css/login.css';
import CommonConst from './common/CommonConst';

import IconJZFH from 'material-ui/svg-icons/action/trending-up';
import IconArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';

import {
    black
} from 'material-ui/styles/colors';

//material-ui bug
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        // primary1Color: '#88014F',
        // textColor: '#ffffff',
    }
});

const styles = {
    button: {
        backgroundColor: '#88014F',
    },
    paper: {
        flex: 1,
        textAlign: 'left',
        height: '100%',
        margin: '0px',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        color: '#424242',
        fontSize: '0.80rem',
        padding: '5%',
    },
}

class Login extends React.Component {

    state = {
        login: true,
    };

    constructor(props) {
        super(props);

        this.doLogin = this.doLogin.bind(this);
        this.doGetValiCode = this.doGetValiCode.bind(this);
        this.dataLoaded = this.dataLoaded.bind(this);
    }

    componentDidMount() {
        let qrCode = global._startParam.qrCode;
        if (qrCode != undefined && qrCode.length > 4) {
            //参数

            let _url = URL.resolve(CommonConst.serverPath, 'getQuestBaseQrInfo?qrCode=' + qrCode);
            // let _url = 'http://localhost:9090/quest/getQuestBaseQrInfo?qrCode=' + qrCode;
            request({ method: 'GET', url: _url, json: true }, this.dataLoaded);
        }
    }

    dataLoaded(er, response, body) {
        if (body != undefined) {
            if ('000000' == body.code) {
                CommonConst.projectInfo = body.info;
                this.projectName.textContent = '项目名称：' + CommonConst.projectInfo.projectName;
            }
        }
        console.log("I dataLoaded: " + body);
    }

    doGetValiCode() {
        console.log('toLogin');
        // this.loginShowAnim.restart();
        // this.registerHiddenAnim.restart();
    }

    doLogin(e) {
        //api 调用 Link
        console.log('doLogin...');
        if (this.customerMobile.value.length > 10) {
            CommonConst.projectInfo.customerMobile = this.customerMobile.value;
            CommonConst.projectInfo.customerName = this.customerName.value; 
            CommonConst.userInput.valiCode = this.valiCode.value; 
            this.loginLink.handleClick(e.nativeEvent);
        }else{
            alert('请输入正确手机号');
        }

        return false;
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className='login-fullcontainer'>
                    <div className='login-page'>
                        <div className="form">
                            <div ref={(ref) => this.loginForm = ref}>

                                <div style={styles.paper}>
                                    感谢您对上海神明控制工程有限公司一直以来的信赖与支持！在此诚邀您就以下项目中您与我公司的合作进行满意度评价，期待您能给予我们客观、真实的评价。您的意见与建议是对上海神明控制工程有限公司技术与服务持续改进最好的鞭策和动力。
                                </div>

                                <div style={styles.paper} ref={(ref) => this.projectName = ref}>
                                    项目名称：
                                </div>

                                <input type="text" placeholder="请输入您的名字" maxLength='6' ref={(ref) => this.customerName = ref} />
                                <input type="text" placeholder="请输入您的手机号码" maxLength='11' ref={(ref) => this.customerMobile = ref} />

                                <div style={{ display: 'inline' }}>
                                    <input type="text" placeholder="输入验证码" style={{ width: '45%' }} maxLength='6' size={6} ref={(ref) => this.valiCode = ref} />
                                    <button style={{ width: '55%', maxHeight: '49px' }} onClick={this.doGetValiCode}  >获取验证码</button>
                                </div>
                                <button onClick={this.doLogin} style={{ maxHeight: '49px' }} >填入验证码进入问卷</button>

                                <Link ref={(ref) => this.loginLink = ref} to={{ pathname: '/main/question/0' }} ></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider >
        )
    }
}

export default Login;