import React from 'react';
import ReactDOM from 'react-dom';

import URL from 'url';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { AppBar, Drawer, MenuItem, Paper, IconButton } from 'material-ui';

//icon
import IconArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

import Question from './Question';
import About from './About'
import DrawerContent from './DrawerContent'

//material-ui bug
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#0D47A1',
    textColor: '#ffffff',
  }
});

const styles = {
  paper: {
    flex: 1,
    height: '100%',
    margin: 10,
    textAlign: 'center',
    padding: 10
  }
};

class Main extends React.Component {

  state = {
    open: false,
    title: '问卷调查',
    pageKey: 'Question',
  };

  constructor(props) {
    super(props);

    this.handleCollapse = this.handleCollapse.bind(this);
    // this.doLogout = this.doLogout.bind(this); 


  }

  handleCollapse() {
    this.setState({ open: !this.state.open });
  }

  doLogout(e) {
    let qrCode = global._startParam.qrCode;
    let _url = URL.resolve(global._currentPath, '?qrCode=' + qrCode);
    window.location = _url;
    return false;
  }
 
  render() {
    console.log('main render:' + global._currentPath);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title={this.state.title}
            style={{ background: 'rgba(255,255,255 ,0)', boxShadow: '0px' }}//背景渐变

            iconElementRight={<IconButton onClick={this.doLogout}><IconArrowForward /></IconButton>}
          >
          </AppBar>

          <Router ref={(ref) => this.router = ref} >
            <div>
              <Route path={URL.resolve(global._currentPath, 'main/question/:index')} component={Question} />
              <Route path={URL.resolve(global._currentPath, 'main/about')} component={About} />
            </div>
          </Router >


        </div>
      </MuiThemeProvider >
    );
  }
}

export default Main;
