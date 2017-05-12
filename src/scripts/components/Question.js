import React from 'react';
import { Paper, Avatar, RefreshIndicator, RaisedButton, TextField } from 'material-ui';
import request from 'browser-request';
import Animejs from 'animejs';

import IconNextPage from 'material-ui/svg-icons/navigation/arrow-forward';
import IconLastPage from 'material-ui/svg-icons/navigation/arrow-back';

import { transparent, black } from 'material-ui/styles/colors';

import Rating from './common/Rating';
import Utils from './common/Utils';
import DataRandom from './common/DataRandom';
 
const styles = {
    paper: {
        flex: 1,
        height: '100%',
        margin: '10px 15px 10px 15px',
        color: '#000000',
        fontSize: '0.80rem',
        borderLeft: '7px solid #C2185B',
        padding: '15px 15px 0px 15px'
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
    },

    guideLogo: {
        background: 'url("../assets/image/question_logo1.jpg") no-repeat center',
        backgroundSize: 'cover',
        height: '180px',
    },
    guideContent: {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        margin: '0px 30px 10px 30px',
    },

    choiceDesc: {
        padding: '0 4% 0 4%',
        height: '40px',
        lineHeight: '40px',
        backgroundColor: 'rgb(226, 226, 226)',
        fontSize: '15px',
    },

    textarea: {
        resize: 'none',
        width: '90%',
        borderColor: '#d2c6bb',
        margin: '10px 0px 10px 0px',
    },

    nextButton: {
        position: 'absolute',
        width: '120px',
        right: '15px',
        margin: '0px 0px 15px 0px',
    },
    lastButton: {
        position: 'absolute',
        width: '120px',
        right: '150px',
        margin: '0px 0px 15px 0px',
    },

};

class Question extends React.Component {

    state = {
        dataStep: 0,
        questionsJson: undefined,
        pageIndex: -2,//-2 load, -1 开始页
    };

    constructor(props) {
        super(props);
        this.startDataLoaded = this.startDataLoaded.bind(this);
        this.dataLoaded = this.dataLoaded.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
    }

    nextPage() {
        this.setState({ pageIndex: (this.state.pageIndex + 1) });
    }

    lastPage() {
        this.setState({ pageIndex: (this.state.pageIndex - 1) });
    }

    endPage() {
        alert('end');
    }

    dataLoaded(body) {
        console.log("I dataLoaded: " + body);
        this.setState({ questionsJson: body, pageIndex: -1 });
    }

    startDataLoaded(er, response, body) {
        console.log("I startDataLoaded: " + body);
        // this.setState({ dataStep: 1 });

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
        request({ method: 'GET', url: '../assets/datas/questions.json', json: true }, this.startDataLoaded);
    }

    componentWillUnmount() {
    }


    render() {
        let index = this.state.pageIndex;

        if (index == -2) {//loading
            return (
                <div>
                    <div style={styles.loadingContainer} ref={(ref) => this.loadingContainer = ref}>
                        <RefreshIndicator
                            size={50}
                            left={0}
                            top={0}
                            loadingColor="#C2185B"
                            status="loading"
                            style={styles.loading}
                        />
                    </div>
                </div>
            );
        }

        if (index == -1) {//guide引导页
            return (
                <div>
                    <div style={styles.guideLogo} >
                    </div>
                    <div style={styles.guideContent}>
                        <p><strong>尊敬的 XX 先生/女士:</strong></p>
                        <p>您好！感谢您对上海神明控制工程有限公司一直以来的信赖与支持！在此诚邀您就以下项目中您与我公司的合作进行满意度评价，期待您能给予我们客观、真实的评价。您的意见与建议是对上海神明控制工程有限公司技术与服务持续改进最好的鞭策和动力。</p>
                        <br />
                        <p><strong>项目号:</strong></p>
                        <p><strong>项目名称:</strong></p>
                        <p><strong>项目主要设备:</strong></p>
                        <br />
                        <div style={{ fontSize: '10px' }}>您的意见对SME进一步提高产品/服务质量十分重要，我们非常重视并将及时采取改进措施。为了感谢您百忙中完成我们的客户满意度调查，也为了您方便的联系我们，我们将为您的手机充值10元，请确认您的手机号码。</div>

                    </div>

                    <RaisedButton style={{
                        position: 'absolute',
                        width: '120px',
                        right: '15px',
                        margin: '0px 10px 15px 10px',
                    }}
                        backgroundColor="#C2185B"
                        onClick={this.nextPage}
                        label='开始'
                    />
                </div>
            );
        }

        let choice = this.state.questionsJson.choice;
        if (index <= choice.length - 1) {//选择题 
            let choiceIns = choice[index];
            let items = choiceIns.qs;
            if (index == 0) {
                return (
                    <div>
                        <div style={styles.choiceDesc}>
                            {choiceIns.desc}
                        </div>
                        {items.map(function (item, i) {
                            return <Paper key={i} zDepth={2} style={styles.paper}>
                                <div>
                                    {item.q}
                                </div>
                                <Rating value={0} />
                            </Paper >;
                        })}
                        <RaisedButton style={styles.nextButton}
                            backgroundColor="#C2185B"
                            onClick={this.nextPage}
                            icon={<IconNextPage />}
                        />
                    </div>
                );
            } else {
                return (
                    <div>
                        <div style={styles.choiceDesc}>
                            {choiceIns.desc}
                        </div>
                        {items.map(function (item, i) {
                            return <Paper key={i} zDepth={2} style={styles.paper}>
                                <div>
                                    {item.q}
                                </div>
                                <Rating value={0} />
                            </Paper >;
                        })}
                        <RaisedButton style={styles.lastButton}
                            backgroundColor="#C2185B"
                            onClick={this.lastPage}
                            icon={<IconLastPage />}
                        />
                        <RaisedButton style={styles.nextButton}
                            backgroundColor="#C2185B"
                            onClick={this.nextPage}
                            icon={<IconNextPage />}
                        />
                    </div>
                );
            }
        } else {//问答题
            let answerQuestions = this.state.questionsJson.answerQuestions;
            return (
                <div>
                    {answerQuestions.map(function (item, i) {
                        return <Paper key={i} zDepth={2} style={styles.paper}>
                            <div>{item.q}</div>
                            <textarea style={styles.textarea} rows="4" placeholder='给出您的意见' />

                        </Paper >;
                    })}

                    <RaisedButton style={styles.lastButton}
                        backgroundColor="#C2185B"
                        onClick={this.lastPage}
                        icon={<IconLastPage />}
                    />
                    <RaisedButton style={styles.nextButton}
                        backgroundColor="#C2185B"
                        onClick={this.endPage}
                        icon={<IconNextPage />}
                    />
                </div>
            );
        }



    }
}

export default Question;