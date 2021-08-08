import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { DebounceInput } from 'react-debounce-input';

const Model = (props) => {
    const { formData, setFormData } = props;
    const [optionValue, setOptionValue] = useState('');
    const [mulitChoice, setMulitChoice] = useState([]);
    const [resData, setResData] = useState({
        name: '',
        value: '',
    });

    let resObject = [];
    
    const handleData = (e, type) => {
        setResData({
            name: '',
            value: '',
        })
        if (type === 'Text') {
            let res = document.getElementById('ans_text').value;
            resObject.push(res);
        }
        else if (type === 'Multichoice Checkbox') {
            let res = document.getElementById('ans_text').value;
            resObject.push(res);
        }
        else {
            resObject.push(optionValue);
        }
    }
    return (<form >
        {formData.questions && formData.questions.map((question, index) => {
            return (<><Card style={{ width: '57rem', padding: '20px' }}>
                <div className="form-group mb-2 " style={{ width: "100%" }}>
                    <Card.Title>{index + 1}. {question.qName}</Card.Title>
                </div>
                {
                    (question.qAnsType === 'Text') ?
                        <div className="form-group mb-2 " style={{ width: "100%" }}>
                            <DebounceInput
                                onChange={(e) => handleData(e, index, question.qAnsType)}
                                id='ans_text'
                                name='text'
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Ans"
                                required />
                            {/* {(resData.value.length <= 0) ? <span style={{ color: 'red' }}>* Please Enter your Response</span> : null} */}

                        </div>
                        : (question.qAnsType === 'Multichoice Checkbox') ?
                            question.qAnsValue && question.qAnsValue.map((ans) => (
                                <div className="form-group mb-2 " style={{ width: "100%" }}>
                                    <input
                                        type="checkbox"
                                        checked={mulitChoice.includes(ans)}
                                        onChange={() => {
                                            const checked = mulitChoice.includes(ans);
                                            setMulitChoice((prev) =>
                                                checked
                                                    ? prev.filter((sc) => sc !== ans)
                                                    : [...prev, ans]
                                            );
                                        }}
                                    ></input><label>{ans}</label>
                                </div>

                            ))
                            : question.qAnsValue && question.qAnsValue.map((ans) => (
                                <div className="form-group mb-2 " style={{ width: "100%" }}>
                                    <input
                                        type="radio"
                                        value={ans}
                                        checked={optionValue === ans}
                                        onChange={(e) => setOptionValue(e.target.value)}
                                        required
                                    />
                                    <label>{ans}</label>
                                </div>))
                }
            </Card>
                <br />
            </>)
        })
        }
    </form>)
}
export default Model;