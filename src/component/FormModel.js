import React, { useContext } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { formDataContext } from './GenerateForm';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Model from './Model';

const FormModel = () => {

    let { formData, setFormData } = useContext(formDataContext)

    let history = useHistory();

    const loadFormlist = async () => {
        const result = await axios.get('http://localhost:3010/forms')
        setFormData(result.data.reverse());

    }

    const onSubmitForm = () => {
        let title = document.getElementById('form_input').value;
        let temp = formData;

        if (title.length === 0) {

        }
        else {
            if (formData.questions.length === 0) {
                alert("Please Add atleast one question in your form")
            }
            else {
                let unique_id = new Date().getTime() & 0xffffffff;
                temp.url = 'forms/' + unique_id;
                temp.createAt = new Date();
                setFormData({ ...temp })
                axios.post('http://localhost:3010/forms', temp).
                    then(() => console.log("Data Successfully Sumbitted...")).
                    catch((err) => console.log(err))
                loadFormlist()
                history.push('/')
            }
        }
    }


    return (<Card style={{ width: '60rem', padding: '20px', display: "flex", justifyContent: "center", alignItems: "center" }}><div className="form-group mb-2">
        <h2 style={{ textAlign: 'center' }}><b>Create Your Form</b></h2>
    </div>
        <br />
        <div className="form-group mb-2 " style={{ width: "100%" }}>
            <label><b>Form Title:</b></label>
            <input id='form_input' type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-control form-control-lg" placeholder="Enter Form Title" required />
            {(formData.name.length <= 0) ? <span style={{ color: 'red' }}>* Please Enter Form Name</span> : null}
        </div>
        <Model formData={formData} setFormData={setFormData} />
        <Button variant="primary" style={{ width: '100%' }} onClick={onSubmitForm}>
            Submit
        </Button>
    </Card>)

}
export default FormModel;