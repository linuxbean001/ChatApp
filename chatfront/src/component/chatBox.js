import React, { Component } from 'react';
import chatService from './service/chatService'
const ChatAPI = new chatService();
const icon = 'http://placehold.it/50/55C1E7/fff&text=';
class ChatBox extends Component{
    constructor(props){
        super(props);
        this.state ={
            fields: [],
            chatData: [],
            commenttext:'',
            name:'Vivek'    
        }
    }
    
componentDidMount(){
    window.scrollTo(0, 0);
    this.timer = setInterval(()=> this.getChat(), 1000)
}

getChat=()=> {
    ChatAPI.getChatService()
          .then(res => {
             this.setState({chatData:res.data})
          }).catch(err => {
              console.log('Error xxxxxxx xxxx ', err);
          });
  }

SendMe=(e)=>{
        const InfoVo ={
            "name": this.state.name,
            'text': this.state.fields.commenttext
        }
        ChatAPI.postChatService(InfoVo).then((result) => {
            this.resetForm();
            this.getChat();
        }).catch(err => {
            console.log('xxx new:', err);
        }) 
}

ChatDelete(id) { 
    ChatAPI.ChatDeleteService(id)
  .then(res => {
    this.getChat();
  }).catch(err => {
      console.log('xxxxxxxxxx xxxxxxxxx err from com ' + err)
  });
}

resetForm=()=>{
    this.setState({ fields:[] });  
}

handleChange(field, e) { 
    let fields = this.state.fields;
    fields[field] = e.target.value;    
    this.setState({ fields });
}

render(){


const Chatitems = this.state.chatData.map((item, key) =>{
let time=0;
let n = Date.now();
let difference = n- item.dateAdded;
let daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24
let hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60
let minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60
let secondsDifference = Math.floor(difference/1000);
if(daysDifference){
    time = daysDifference + 'day';
}else if(hoursDifference){
    time = hoursDifference + ' h';
}else if(minutesDifference){
    time = minutesDifference+' min'; 
}else if(secondsDifference){
    time = 'Now';
}
        return (<li key={key} className={"chatest " + (item.name=='Vivek' ? 'right clearfix' : 'left clearfix')}>
            <span className={"chat-img  " + (item.name=='Vivek' ? 'pull-right' : 'pull-left')}>
                <span onClick={this.ChatDelete.bind(this, item.id)}className={"delete-img  " + (item.name=='Vivek' ? 'pull-right' : 'pull-left')}>X</span> 
                <img src={icon + item.name.charAt(0) } alt="User Avatar" className="img-circle" />
            </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className={"primary-font " + (item.name=='Vivek' ? 'pull-right' : 'pull-left')} >{item.name} </strong> 
                        <small className={"text-muted  " + (item.name=='Vivek' ? 'pull-left' : 'pull-right')} >
                            <span className="glyphicon glyphicon-time"></span>{time}
                        </small>
                    </div>
                    <div className={"chatText  " + (item.name=='Vivek' ? 'pull-right' : 'pull-left')}>
                        <p>
                        {item.text}
                        </p>
                    </div>
                </div>
        </li>)
    });

         return(
                <div className="contact-section">
                         <div className="container">
        <div className="row">
            <div className="col-md-5">
                <div className="panel panel-primary">
                    <div className="panel-heading" id="accordion">
                        <span className="glyphicon glyphicon-comment"></span> Chat
                        <div className="btn-group pull-right">
                            <a type="button"  className="btn btn-default btn-xs" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                                <span className="glyphicon glyphicon-chevron-down"></span>
                            </a>
                        </div>
                    </div>
                <div className="p" id="collapseOne">
                    <div className="panel-body">
                        <ul className="chat"> 
                            {Chatitems}
                        </ul>
                    </div>
                    <div className="panel-footer">
                        <div className="input-group">
                            <input onChange={this.handleChange.bind(this, "commenttext")}  value={this.state.fields["commenttext"] ? this.state.fields["commenttext"] :'' }  id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." />
                            <span className="input-group-btn">
                                <button onClick={this.SendMe} className="btn btn-warning btn-sm" id="btn-chat">
                                    Send</button>
                            </span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
                </div>
         );
}
}
export default ChatBox;