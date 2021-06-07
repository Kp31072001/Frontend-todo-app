import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import APIService from '../APIService'

function Form(props) {

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ token , setToken ] = useCookies(['myToken'])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, description}, token['myToken'])
        .then(resp => props.updatedInformation(resp))
    }

    const insertArticle = () => {
        APIService.InsertArticle({title, description}, token['myToken'])
        .then(resp => props.insertedInformation(resp))
    }

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)
    }, [props.article])

    return (
        <div>
            {props.article ? (
                <div className="mb-3">
                    <label htmlFor="title" className="from-label">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Please enter the title" value = {title} onChange={e => setTitle(e.target.value)}/>
                    <label htmlFor="title" className="from-label">Description</label>
                    <textarea className="form-control" id="description"  rows="5" value = {description} onChange={e => setDescription(e.target.value)}></textarea><br />

                    {props.article.id ? <button onClick = {updateArticle} className="btn btn-success" >Update Article</button> 
                    : <button onClick = {insertArticle} className="btn btn-success" >Add new Article</button>}
                    
                </div>
            ) : null }
        </div>
    )
}

export default Form
