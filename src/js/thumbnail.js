import React, {Component} from  'react';
import ReactDOM from 'react-dom';

export class ThumbNail extends React.Component  {
    constructor(props){
        super(props);
    }


    render(){
    const url = "https://www.youtube.com/embed/";

  return  this.props.prop1.map((obj)=>{
        return(
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className="thumbnail">
                 <a href={url + obj.id.videoId}>
                    <img src={obj.snippet.thumbnails.medium.url} />
                    <div className="caption">
                         <p>{obj.snippet.title}</p>
                    </div>
                </a>
                </div>
            </div>  
        );
    });

}
}
