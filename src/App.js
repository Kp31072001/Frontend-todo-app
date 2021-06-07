
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import './App.css';
import ArticleList from './components/ArticleList';
import Form from './components/Form';

function App() {

  // fetching from djnago backend

  const [ articles, setArticles ] = useState([])
  const [ editArticles, setEditArticles ] = useState(null)
  const [ token, setToken, removeToken ] = useCookies(['myToken'])

  let history = useHistory()


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method': 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Token ${token['myToken']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
        if(!token['myToken']) {
            // history.push('/')
            window.location.href = '/'
        }
    },[token])


  const editBtn = (article) => {
    setEditArticles(article)
  }

  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id){
        return false;
      }
      return true;
    })
    setArticles(new_articles)
  }

  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle =>{
      if(myarticle.id === article.id){
        return article;
      }else{
        return myarticle
      }
    })

    setArticles(new_article)
  }

  const insertedInformation = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const articleForm = () => {
    setEditArticles({title:'', description:''})
  }

  const logoutBtn = () => {
    removeToken(['myToken'])
  }


  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>
          Django And REact JS blog app
        </h1><br /><br /><br />
        </div>
        <div className="col">
          <button onClick = {articleForm} className="btn btn-primary">Add Article</button>
        </div>

        <div className="col">
          <button onClick = {logoutBtn} className="btn btn-primary">Logout</button>
        </div>
      </div>

        

        <ArticleList articles = {articles} editBtn = {editBtn} deleteBtn = {deleteBtn} />

        {editArticles ? <Form article = {editArticles} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation} /> : null}
        

    </div>
  );
}

export default App;
