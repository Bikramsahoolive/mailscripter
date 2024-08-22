
import axios from 'axios';
import {mailobj} from './model/mailobj';




export class mailScripter {
    private script:string='';


    constructor(script:string){
        this.script = script;
    }


    public  sendMail(mailObj:mailobj,mailResponse=(res:any)=>{}){
        
        const data = new URLSearchParams();
        data.append('recipient', mailObj.email);
        data.append('subject', mailObj.subject);
        data.append('body', mailObj.content);
        data.append('isHTML', 'true');
          axios.post(this.script, data)
            .then((response:any) => {
            
                mailResponse(response.data);
                
                
            })
            .catch(error => {
                console.error('Error:', error.message);
                mailResponse({status:'failure',message:'Internal server error!',error});
                
                
            });
        }



        public sendMailAsync(mailObj:mailobj){
    return new Promise((resolve,reject)=>{
        
        const data = new URLSearchParams();
        data.append('recipient', mailObj.email);
        data.append('subject', mailObj.subject);
        data.append('body', mailObj.content);
        data.append('isHTML', 'true');
          axios.post(this.script, data)
            .then(response => {
                if(response.data.status === 'success'){
                resolve(response.data);
                }else{
                    reject(response.data);
                }
                
            })
            .catch(error => {
                reject(error);
                
            });
    })
}

}