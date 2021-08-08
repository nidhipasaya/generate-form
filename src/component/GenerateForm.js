import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import FormModel from './FormModel'
export const formDataContext = React.createContext();

const GenerateForm = () => {

    const [show, setShow] = useState(false);
    const [questionData, setQuestionData] = useState(
        {
            qName: "",
            qAnsType: "Select Answer Type",
            qAnsValue: [],
        });
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        url: "",
        createAt: "",
        numResponse: "NA",
        questions: [],
    })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ansOption, setAnsOption] = useState('')

    const onSubmitQuestion = () => {

        let title = document.getElementById('qName_text').value;
        let title_anstype = document.getElementById('qAnsType_text').value;

        if ((title.length > 0) && (title_anstype !== 'Select Answer Type')) {
            if (title_anstype !== 'Text' && ansOption.length === 0) {
            }
            else {
                setShow(false);
                let temp = formData;
                temp.questions.push(questionData);
                setFormData({ ...temp })
                setQuestionData({
                    qName: "",
                    qAnsType: "Select Answer Type",
                    qAnsValue: []
                })
                setAnsOption('');
            }
        }
        else { }
    }

    const options = [
        {
            label: "Select Answer Type",
            value: "Select Answer Type",
        },
        {
            label: "Text",
            value: "Text",
        },
        {
            label: "Multichoice Checkbox",
            value: "Multichoice Checkbox",
        },
        {
            label: "Single Select Radio",
            value: "Single Select Radio",
        }
    ];

    const { qName, qAnsType } = questionData;
    return (<formDataContext.Provider value={{ formData: formData, setFormData: setFormData }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="py-4">
                <Button variant="primary" onClick={handleShow}>
                    Add Question/Title
                </Button>
                <br />
                <br />
                <FormModel />
                <Modal show={show} onHide={handleClose} >
                    <Modal.Header >
                        <div className="form-group mb-2 " style={{ width: "100%" }}>
                            <input id='qName_text' type="text" value={qName} onChange={(e) => setQuestionData({ ...questionData, qName: e.target.value })} className="form-control form-control-lg" placeholder="Enter Your Question/Title" required />
                            {(qName.length <= 0) ? <span style={{ color: 'red' }}>* Please Enter Your Question</span> : null}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group mb-2 " style={{ width: "100%" }}>

                            <select id='qAnsType_text' className="form-control form-control-mg" value={qAnsType} onChange={(e) => setQuestionData({ ...questionData, qAnsType: e.target.value })}>
                                {options.map((option) => (
                                    <option className="form-control form-control-mg" value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {(qAnsType === 'Select Answer Type') ? <span style={{ color: 'red' }}>* Please Select Answer Type</span> : null}
                        </div>
                        {(qAnsType === 'Multichoice Checkbox') ?
                            <div className="form-group mb-2 " style={{ width: "100%" }}>
                                <textarea id='multicheckbox_text' className="form-control form-control-lg row-3" placeholder="Enter Option Separated By Lines." value={ansOption}
                                    onChange={(e) => {
                                        setAnsOption(e.target.value)
                                        let temp = ansOption;

                                        setQuestionData({ ...questionData, qAnsValue: temp.split('\n') })
                                    }} />
                                {(ansOption.length === 0) ? <span style={{ color: 'red' }}>* Please Enter Your Options</span> : null}
                            </div>
                            : (qAnsType === 'Single Select Radio') ?
                                <div className="form-group mb-2 " style={{ width: "100%" }}>
                                    <textarea id='singleradio_text' className="form-control form-control-lg row-3" placeholder="Enter Option Separated By Lines."
                                        value={ansOption}
                                        onChange={(e) => {
                                            setAnsOption(e.target.value)
                                            let temp = ansOption;

                                            setQuestionData({ ...questionData, qAnsValue: temp.split('\n') })
                                        }} />
                                    {(ansOption.length === 0) ? <span style={{ color: 'red' }}>* Please Enter Your Options</span> : null}
                                </div>
                                : (qAnsType === 'Text') ? <div className="form-group mb-2 " style={{ width: "100%", display: "none" }} >
                                    <textarea className="form-control form-control-lg row-3" placeholder="Enter Option Separated By Lines." />
                                </div>
                                    : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={onSubmitQuestion} >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div></formDataContext.Provider>)
}
export default GenerateForm;