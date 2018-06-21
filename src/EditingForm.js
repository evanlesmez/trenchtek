import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const EditingForm = props => {

    return (
        <TextArea rows={4} defaultValue={props.defaultValue} enterButton={props.enterButton} onPressEnter={props.onPressEnter} />
    );
}


export default EditingForm;
