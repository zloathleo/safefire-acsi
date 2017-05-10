import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

import { RaisedButton } from 'material-ui';

import Animejs from 'animejs';
import '../css/login.css';

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
        backgroundColor: '88014F',
    }
}

class Login extends React.Component {

    state = {
        login: true,
    };

    constructor(props) {
        super(props);
        this.mi
        this.doLogin = this.doLogin.bind(this);
        this.doGetValiCode = this.doGetValiCode.bind(this);

        this.loginHiddenAnim = undefined;
    }

    componentDidMount() {
        let _duration = 800;
        this.loginHiddenAnim = Animejs({
            targets: this.loginForm,
            height: 0,
            opacity: [1, 0],
            duration: _duration,
            loop: false,
            autoplay: false,
            easing: 'easeInOutQuart',
            begin: function (anim) {
                let _div = anim.animatables[0].target;
                _div.style.overflow = 'hidden';
                _div.style.opacity = 1;
            },
            complete: function (anim) {
                let _div = anim.animatables[0].target;
                _div.style.display = 'none';
            },
        });

        this.registerShowAnim = Animejs({
            targets: this.registerForm,
            height: 280,
            opacity: [0, 1],
            duration: _duration,
            loop: false,
            autoplay: false,
            easing: 'easeInOutQuart',
            begin: function (anim) {
                let _div = anim.animatables[0].target;
                _div.style.overflow = 'hidden';
                _div.style.display = 'block';

            },
            complete: function (anim) {
                let _div = anim.animatables[0].target;
                _div.style.overflow = 'auto';
            },
        });

        this.loginShowAnim = Animejs({
            targets: this.loginForm,
            height: [0, 210],
            opacity: [0, 1],
            duration: _duration,
            loop: false,
            autoplay: false,
            easing: 'easeInOutQuart',
            begin: function (anim) {
                let _div = anim.animatables[0].target;
                _div.style.overflow = 'hidden';
                _div.style.opacity = 0;
                _div.style.display = 'block';
            },
            complete: function (anim) {
                let _div = anim.animatables[0].target;
                _div.style.overflow = 'auto';
            },
        });


        this.registerHiddenAnim = Animejs({
            targets: this.registerForm,
            height: [280, 0],
            opacity: [1, 0],
            duration: _duration,
            loop: false,
            autoplay: false,
            easing: 'easeInOutQuart',
            begin: function (anim) {
                let _div = anim.animatables[0].target;
                _div.style.overflow = 'hidden';
                _div.style.opacity = 1;
            },
            complete: function (anim) {
                let _div = anim.animatables[0].target;
                _div.style.display = 'none';
            },
        });
    }

    doGetValiCode() {
        console.log('toLogin');
        // this.loginShowAnim.restart();
        // this.registerHiddenAnim.restart();
    }

    doLogin(e) {
        //api 调用 Link
        console.log('doLogin...');
        this.loginLink.handleClick(e.nativeEvent);
        return false;
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className='login-fullcontainer'>
                    <div className='login-page'>
                        <div className="form">
                            <div ref={(ref) => this.loginForm = ref}>
                                <input type="text" placeholder="您的名字" maxLength='6' ref={(ref) => this.loginName = ref} />
                                <input type="text" placeholder="您的手机号码" maxLength='11' ref={(ref) => this.loginMobileNo = ref} />

                                <div style={{ display: 'inline' }}>
                                    <input type="text" placeholder="输入验证码" style={{ width: '45%' }} maxLength='6' size={6} ref={(ref) => this.loginPassword = ref} />
                                    <button style={{ width: '55%', maxHeight:'49px'}} onClick={this.doGetValiCode}  >获取验证码</button>
                                </div>
                                <button onClick={this.doLogin} style={{ maxHeight:'49px'}} >填入验证码进入问卷</button>

                                <Link ref={(ref) => this.loginLink = ref} to={"main/question"}></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider >
        )
    }
}

export default Login;