import React from 'react';
import { Paper, Avatar, RefreshIndicator, RaisedButton, TextField } from 'material-ui';
import request from 'browser-request';
import Animejs from 'animejs';
import URL from 'url';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import { Link } from 'react-router-dom';

import IconNextPage from 'material-ui/svg-icons/navigation/arrow-forward';
import IconLastPage from 'material-ui/svg-icons/navigation/arrow-back';

import { transparent, black } from 'material-ui/styles/colors';

import Rating from './common/Rating';
import Utils from './common/Utils';
import DataRandom from './common/DataRandom';
import CommonConst from './common/CommonConst';

const styles = {
    paper: {
        flex: 1,
        height: '100%',
        margin: '0px 8% 5px 8%',
        color: '#424242',
        fontSize: '0.80rem',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        padding: '5%'
    },

    loadingContainer: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0px',
    },
    loading: {
        margin: 'auto',
        position: 'relative',
        backgroundColor: 'rgb(0, 0, 0,0)',
    },

    choiceDesc: {
        margin: '0px 8% 5px 8%',
        padding: '1% 5%',
        lineHeight: '40px',
        color: '#616161',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        fontSize: '1rem',
    },

    textarea: {
        resize: 'none',
        width: '90%',
        borderColor: 'rgba(210, 198, 187, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        margin: '10px 0px 10px 0px',
    },

    nextButton: {
        textTransform: 'uppercase',
        outline: 0,
        background: "#0D47A1",
        width: "40%",
        border: 0,
        padding: "15px",
        color: "#FFFFFF",
        fontSize: "14px",
        transition: 'all 0.3 ease',
        cursor: 'pointer',
        margin: '0px 8% 5px auto',
    },

    lastButton: {
        textTransform: 'uppercase',
        outline: 0,
        background: "#0D47A1",
        width: "40%",
        border: 0,
        padding: "15px",
        color: "#FFFFFF",
        fontSize: "14px",
        transition: 'all 0.3 ease',
        cursor: 'pointer',
        margin: '0px auto 5px 8%',
    },

};

class Question extends React.Component {

    state = {
        dataStep: 0,
        questionsJson: undefined,
        pageIndex: -1,//-1 load, 
    };

    constructor(props) {
        super(props);
        this.textarea = [];

        this.startDataLoaded = this.startDataLoaded.bind(this);
        this.dataLoaded = this.dataLoaded.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.endPage = this.endPage.bind(this);
        this.endPageCallback = this.endPageCallback.bind(this);
        this.clickRating = this.clickRating.bind(this);
        this.mapChoiceItems = this.mapChoiceItems.bind(this);
        this.mapTextArea = this.mapTextArea.bind(this);
    }

    nextPage(e) {
        this.state.pageIndex = this.state.pageIndex + 1;
        this.nextPageLink.handleClick(e.nativeEvent);
    }

    lastPage(e) {
        this.state.pageIndex = this.state.pageIndex - 1;
        this.lastPageLink.handleClick(e.nativeEvent);
    }

    endPage(e) {
        console.log(e);
        let answerQuestions = this.state.questionsJson.answerQuestions;
        answerQuestions[0].v = this.textarea[0].value;
        answerQuestions[1].v = this.textarea[1].value;

        e.persist();
        let _nativeEvent = e.nativeEvent;


        let _info = CommonConst.projectInfo;
        let _url = URL.resolve(CommonConst.serverPath, 'finishQuest');
        let _this = this;
        request.post({
            form: {
                projectCode: _info.projectCode,
                customerMobile: _info.customerMobile,
                customerName: _info.customerName,
                questScoreJson: JSON.stringify(this.state.questionsJson),

            }, method: 'POST', url: _url, json: true
        }, function (er, response, body) {
            _this.endPageCallback(er, response, body, _nativeEvent);
        });
    }

    endPageCallback(er, response, body, _nativeEvent) {
        this.state.pageIndex = -2;
        this.finishPageLink.handleClick(_nativeEvent);
    }

    dataLoaded(body) {
        console.log("I dataLoaded: " + body);
        this.setState({ questionsJson: body.questions, pageIndex: 0 });
    }

    startDataLoaded(er, response, body) {
        Animejs({
            targets: this.loadingContainer,
            // opacity: [1, 0],
            duration: 2000,
            loop: false,
            easing: 'easeInOutQuart',
            begin: function (anim) {
            },
            complete: this.dataLoaded(body),
        });
    }

    componentDidMount() {
        let index = this.props.match.params.index;
        let _info = CommonConst.projectInfo;
        console.log(_info);
        // request({ method: 'GET', url: '../assets/datas/questions.json', json: true }, this.startDataLoaded);
        let _url = URL.resolve(CommonConst.serverPath, 'startQuest');
        request.post({
            form: {
                valiCode: CommonConst.userInput.valiCode,
                projectCode: _info.projectCode,
                customerMobile: _info.customerMobile,
                customerName: _info.customerName,
            }, method: 'POST', url: _url, json: true
        }, this.startDataLoaded);
    }

    componentWillUnmount() {
    }

    clickRating(value, item) {
        item.v = value;
        console.info(item);
    }

    mapChoiceItems(item, i) {
        console.info('this:' + this);
        let rv = item.v;
        console.info('rv:' + rv);
        return <div key={i} style={styles.paper}>
            <div>
                {item.q}
            </div>
            <Rating value={rv} onChange={this.clickRating} changeParam={item} />
        </div>;
    }

    mapTextArea(item, i) {
        return <div key={i} style={styles.paper}>
            <div>{item.q}</div>
            <textarea ref={(ref) => this.textarea[i] = ref} style={styles.textarea} rows="4" placeholder='请给出您的意见' defaultValue={item.v} />
        </div>;
    }

    render() {
        let index = this.state.pageIndex;

        if (index == -2) {//finish
            return (
                <div>
                    <div style={styles.paper}>
                        您的意见对SME进一步提高产品/服务质量十分重要，我们非常重视并将及时采取改进措施。为了感谢您百忙中完成我们的客户满意度调查，也为了您方便的联系我们，我们将为您的手机充值10元。
                    </div>
                </div>
            );
        }

        if (index == -1) {//loading
            return (
                <div>
                    <div style={styles.loadingContainer} ref={(ref) => this.loadingContainer = ref}>
                        <RefreshIndicator
                            size={50}
                            left={0}
                            top={0}
                            loadingColor="#0d47a1"
                            status="loading"
                            style={styles.loading}
                        />
                    </div>
                </div>
            );
        }

        let choice = this.state.questionsJson.choice;
        if (index <= choice.length - 1) {//选择题 
            let choiceIns = choice[index];
            let items = choiceIns.qs;
            if (index == 0) {//第一页
                return (
                    <div>
                        <Link ref={(ref) => this.lastPageLink = ref} to={{ pathname: '/main/question/' + (this.state.pageIndex - 1) }} />
                        <Link ref={(ref) => this.nextPageLink = ref} to={{ pathname: '/main/question/' + (this.state.pageIndex + 1) }} />

                        <div style={styles.choiceDesc}>
                            {choiceIns.desc}
                        </div>
                        {
                            items.map(this.mapChoiceItems)
                        }
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={this.nextPage} style={styles.nextButton} >下一页</button>
                        </div>
                    </div>
                );
            } else {//第N页 
                return (
                    <div>
                        <Link ref={(ref) => this.lastPageLink = ref} to={{ pathname: '/main/question/' + (this.state.pageIndex - 1) }} />
                        <Link ref={(ref) => this.nextPageLink = ref} to={{ pathname: '/main/question/' + (this.state.pageIndex + 1) }} />

                        <div style={styles.choiceDesc}>
                            {choiceIns.desc}
                        </div>
                        {
                            items.map(this.mapChoiceItems)
                        }
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={this.lastPage} style={styles.lastButton} >上一页</button>
                            <button onClick={this.nextPage} style={styles.nextButton} >下一页</button>
                        </div>

                    </div>
                );
            }
        } else {//问答题
            let answerQuestions = this.state.questionsJson.answerQuestions;
            return (
                <div>

                    <Link ref={(ref) => this.lastPageLink = ref} to={{ pathname: '/main/question/' + (this.state.pageIndex - 1) }} />
                    <Link ref={(ref) => this.finishPageLink = ref} to={{ pathname: '/main/question/finish' }} />

                    {
                        answerQuestions.map(this.mapTextArea)
                    }

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={this.lastPage} style={styles.lastButton} >上一页</button>
                        <button onClick={this.endPage} style={styles.nextButton} >提交您的意见</button>
                    </div>

                </div>
            );
        }



    }
}

export default Question;