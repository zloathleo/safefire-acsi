import React from 'react';
import { ToggleStarBorder, ToggleStar } from 'material-ui/svg-icons';
import { colors } from 'material-ui/styles';

const styles = {
    editable: {
        cursor: 'pointer',
        padding: '10px 20px 10px 0px',
    }
};

const defaultValues = [1, 2, 3, 4, 5];

const Ch = (props) => {
    let { checked, readOnly = false, ...p } = props;
    const st = readOnly ? { padding: '10px 20px 10px 0px' } : styles.editable;
    if (checked)
        return <ToggleStar style={st} color='#FF7043' {...p} />;
    else
        return <ToggleStarBorder style={st} color={colors.grey300} {...p} />;
};

class Rating extends React.Component {
  
    static defaultProps = {
        value: 0,
        readOnly: false
    };

    constructor(props) {
        super(props);
        props = {
            value: 0,
            readOnly: false,
        }

        this.state = {
            hoveredIndex: 0,
            checkedIndex: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ checkedIndex: nextProps.value });
    }

    onCheck(i, e) {
        this.setState({ checkedIndex: i });
        if (this.props.onChange)
            this.props.onChange(i);
    }

    render() {
        const { hoveredIndex, checkedIndex } = this.state;
        const { readOnly, values = defaultValues } = this.props;
        return (<div style={{}}>
            {values.map((i) => {
                let
                    onClick = readOnly ? undefined : this.onCheck.bind(this, i),
                    checked = i <= checkedIndex;

                if (hoveredIndex > 0 && checkedIndex > 0 && i > hoveredIndex && i <= checkedIndex) {
                    checked = false;
                }

                return <Ch checked={checked} key={i} readOnly={readOnly}
                    onClick={onClick}
                />
            })}
        </div>)
    }
}

export default Rating