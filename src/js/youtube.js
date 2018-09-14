import React, {Component} from  'react';
import ReactDOM from 'react-dom';
import '../css/youtube.css';
import { ThumbNail } from './thumbnail';
 

const key ='AIzaSyCkYcigfb2fx-6bfH-LTJyB3oaMeh8LBSQ';
const result=10;
const search='';
var button1 = false;
var button2 = false;
export class Youtube extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            finalYoutube:[],
            finalYoutubeObjectSet : [],
            search:'',
            results : 10
          
        }
        this.clicked=this.clicked.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    
    handleChange(event) {
        this.setState({search: event.target.value});
        
      }

      clicked(e){
        
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${this.state.results}&q=${this.state.search}&key=AIzaSyCkYcigfb2fx-6bfH-LTJyB3oaMeh8LBSQ`)
           .then((response) => response.json())
           .then((responseJson) => {
            console.log(responseJson);
            const resultSet2 =responseJson.items.map(obj => obj);
           const resultSet=responseJson.items.map((obj) =>   ({video : "https://www.youtube.com/embed/"+obj.id.videoId,value : obj.id.videoId}));
           this.setState({
              finalYoutube: resultSet,
              finalYoutubeObjectSet : resultSet2
           });
           
           })
           .catch((error) => {
             console.error(error);
           });

           if(e.target.name=="search"){
               button1 = true;
               button2 = false;
           }

           if(e.target.name=="list"){
            button1 = false;
            button2 = true;
        }

           
      }

     

      
      
      
    
    render() { 
        
        const frame = this.state.finalYoutube.map((obj)=>{
            
            return (<div className="youtube"> 
                    <div className="youtube-video"><iframe  width="200" height="150" src={obj.video} frameBorder="0" allow="autoplay; encrypted-media"></iframe></div>
                </div>);
            });

             
        return (
            <div>
            <h1>Welcome to Youtube</h1>
                <input type="text" size="55" value={this.state.search}  onChange={this.handleChange.bind(this)} name="name" className="space" />
                <button name="search" onClick={(e)=> this.clicked(e)} >Search</button>
                <button name="list" onClick={(e) => this.clicked(e)} >List</button>
                 <div key={this.state.finalYoutube.value}> {button1? frame : null} </div>
                  <div class="row">
                  {button2? <ThumbNail prop1 = {this.state.finalYoutubeObjectSet} /> : null}
             </div> 
            </div> 
          );
          
    }
}
 
