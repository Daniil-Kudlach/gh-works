import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        vacancy:[],
        inpLang:'',
        inpCity:'',
        headers:[],
        reg:/[а-я]/i,
      }
    }
    render() {
      return ( < div className = "App" >
        <span>LANGUAGE:</span>
        <input type="text" onChange={this.changeInputLanguage.bind(this)} className='input-language' value={this.state.inpLang}/>
        <span>CITY:</span>
        <input type="text" onChange={this.changeInputCity.bind(this)} className='input-city' value={this.state.inpCity}/>
        <button onClick={this.clickHandler.bind(this)}>Get Vacancy</button>
        <table><thead><tr>{this.state.headers.map((el, i)=>{
          return <td key={el+i}>{el}</td>
        })}</tr></thead><tbody>{this.state.vacancy.map(el=>{
            return (<tr key={el.id}>
            <td>{el.title}</td>  
            <td>{el.created_at}</td>
            <td>{el.type}</td>
            <td><a href={el.company_url}>{el.company}</a></td>
            <td>{el.location}</td>
            <td><a href={el.url}>MORE...</a></td></tr>)
        })}</tbody></table>
        </div>);
      }
      changeInputCity(ev){
        this.setState({...this.state, inpCity:ev.target.value});
      }
      changeInputLanguage(ev){
          this.setState({...this.state, inpLang:ev.target.value});
      }
     async clickHandler() {
      if(this.state.reg.test(this.state.inpLang)||this.state.reg.test(this.state.inpCity)){
        this.setState({...this.state,inpLang:'', inpCity:''});
        return;
      }
       if(this.state.inpLang.trim().length >0 && this.state.inpCity.trim().length>0){
        const data = await fetch(`https://github-jobs-proxy.appspot.com/positions?description=${this.state.inpLang}&location=${this.state.inpCity}`)
        .then(response=>response.json())
        .then(data=>{
          return data;
        });
        this.setState({...this.state, vacancy:[...data]});
        if(this.state.vacancy.length >0){
          this.setState({...this.state, headers:['title', 'date', 'type' , 'company', 'location', 'link']})
        }else{
          this.setState({...this.state, headers:[]})
        };
        this.setState({...this.state, inpCity:''});
        this.setState({...this.state, inpLang:''});
      }
      }
    }



    export default App;