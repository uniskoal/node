import http from 'http';
import fs from 'fs';
import { templateHTML } from './template.js';

http.createServer((request,response) => {
    
    const params = new URLSearchParams(request.url.replace('/','')); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.
    console.log(params);
    fs.readFile(`page/document/${(request.url === '/') ? "WELCOME" : params.get('sub')}` , 'utf8' , (err,data) => {
        
        const url = request.url;
        const subject = params.get('sub');

        fs.readdir('page/document' , 'utf8' , (err,file) => {
            if(err) throw err;
            
            let paramSearch = false;

            for(let index of file) {
                if(subject === index || url === '/') { paramSearch = true; }
            }
            
            if(paramSearch) {
                let list = templateHTML.createList_public(file);
            
                let template = templateHTML.createTemplate_public(data,list,url,subject);

                response.writeHead(200);
                response.end(template);
            }
            else {
                let notfound = templateHTML.createNotFound_public();
                
                
                response.writeHead(200);
                response.end(notfound);

                
            }
            
        });
    });
    
}).listen(3000);


