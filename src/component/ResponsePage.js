import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { DebounceInput } from 'react-debounce-input';
import { useHistory } from 'react-router-dom';


const ResponsePage = () => {

    const [formData, setFormData] = useState([])
    const [resFormData, setResFormData] = useState({
        id: "",
        responseData: [],
        formid: ""
    })
    let { id } = useParams();
    let history = useHistory();
    const [optionValue, setOptionValue] = useState('');
    const [mulitChoice, setMulitChoice] = useState([]);

    const handleData = (e, type, ans) => {

        if (type === 'Text') {
            let res = document.getElementById('ans_text').value;
            let temp = resFormData;
            temp.responseData.push(res);
            temp.formid = id;
            setResFormData({ ...temp })

        }
        else if (type === 'Multichoice Checkbox') {
            const checked = mulitChoice.includes(ans);
            setMulitChoice((prev) =>
                checked
                    ? prev.filter((sc) => sc !== ans)
                    : [...prev, ans]
            );
            resFormData.formid = id;
            let data = resFormData.responseData.concat(mulitChoice);
            let union = [...new Set(data)]
            let temp = resFormData;
            temp.responseData = union;
            setResFormData({ ...temp })


        }
        else {
            setOptionValue(e.target.value)
            let temp = resFormData;
            temp.formid = id;
            temp.responseData.push(optionValue);
            setResFormData({ ...temp })

        }
    }

    useEffect(() => {
        loadFormlist()
    }, [])

    const loadFormlist = async () => {
        const result = await axios.get(`http://localhost:3010/forms/${id}`)
        setFormData(result.data);

    }

    const onSubmitResponse = (e) => {
        e.preventDefault();
        let temp = formData;
        temp.numResponse = (parseInt(temp.numResponse) + 1).toString();
        setFormData({ ...temp });
        axios.post('http://localhost:3010/responses/', resFormData).
            then(() => console.log("Data Successfully Sumbitted...")).
            catch((err) => console.log(err))
        alert("Your Response is Successfully Added...");
        history.push('/')
    }

    return (<form onSubmit={(e) => onSubmitResponse(e)} className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: '20px' }}>
        <Card style={{ width: '60rem', padding: '20px', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card.Title><b><h2>{formData.name}</h2></b></Card.Title>
            <br />
            {formData.questions && formData.questions.map((question, index) => {
                return (<><Card style={{ width: '57rem', padding: '20px' }}>
                    <div className="form-group mb-2 " style={{ width: "100%" }}>
                        <Card.Title>{index + 1}. {question.qName}</Card.Title>
                    </div>
                    {
                        (question.qAnsType === 'Text') ?
                            <div className="form-group mb-2 " style={{ width: "100%" }}>
                                <DebounceInput
                                    onChange={(e) => handleData(e, question.qAnsType, '')}
                                    id='ans_text'
                                    name='text'
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter Ans"
                                    required />

                            </div>
                            : (question.qAnsType === 'Multichoice Checkbox') ?
                                question.qAnsValue && question.qAnsValue.map((ans) => (
                                    <div className="form-group mb-2 " style={{ width: "100%" }}>
                                        <input
                                            type="checkbox"
                                            checked={mulitChoice.includes(ans)}
                                            onChange={(e) => {
                                                handleData(e, question.qAnsType, ans)
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
                                            onChange={(e) => handleData(e, question.qAnsType, ans)}
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
            <Button type='submit' variant="primary" style={{ width: '100%' }}  >Submit Response

            </Button>
        </Card>
    </form>)

}
export default ResponsePage;