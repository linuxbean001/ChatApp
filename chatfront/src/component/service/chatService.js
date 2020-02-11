import axios from 'axios';
export default class chatService {

    constructor() {
        this.domain = 'http://localhost:3001';
    }

    getChatService(){
        return axios.get(this.domain+'/comments')
            .then((result) => {
                return (result);
            }).catch(err => {
            });
    }

    postChatService(InfoVo) {
        return axios.post(this.domain+'/comments', InfoVo) 
         .then((result) => {
             return (result);
         }).catch(err => {
             return (err);
         });
    }

    ChatDeleteService(id) {
        return axios.delete(this.domain+'/comment/'+id)
            .then((result) => {
                return (result);
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
    }


}  