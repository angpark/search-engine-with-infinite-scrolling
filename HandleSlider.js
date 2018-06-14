import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Slider from 'rc-slider';
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;
const wrapperStyle = { width: 400, margin: 50 };

class HandleSlider extends React.Component {

    handle = (props) => {
        const { value, dragging, index, ...restProps } = props;
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={value}
                visible={dragging}
                placement="top"
                key={index}
            >
                <Handle value={value} {...restProps} />
            </Tooltip>
        );
    };

    render() {
        return (
            <div>
                <div style={wrapperStyle}>
                    <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
                </div>
            </div>
        );
    }
}

export default HandleSlider;