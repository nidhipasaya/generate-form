import React, { useState, useEffect } from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom'

const Home = () => {
    const [formlist, setFormlist] = useState([])
    const [resData, setResData] = useState([])
    useEffect(() => {
        loadFormlist()
    }, [])

    const loadFormlist = async () => {
        const result = await axios.get('http://localhost:3010/forms')
        setFormlist(result.data.reverse());
       
    }
    return (<div><Link className="btn btn-primary" to='/GenerateForm'>Create Form</Link>
        <br />
        <br />
        <div className="container">
            <div className="py-4">
                <table className="table border shadow" >
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Form Name</th>
                            <th scope="col">Form URL</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Total Responses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formlist.map((data, index) => (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {data.name}
                                    </td>
                                    <td>
                                        <Link to={`/ResponsePage/${data.id}`}>{data.url}</Link>
                                    </td>
                                    <td>
                                        {data.createAt}
                                    </td>
                                    <td>
                                        { 
                                        data.numResponse
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div></div>)
}
export default Home;