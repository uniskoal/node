import http from 'http';
import fs from 'fs';
import { templateHTML } from './template.js';


http.createServer((request,response) => {
    
    const url = new URL(request.url , "http://localhost:3000");
    const params = new URLSearchParams(url.search); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.
    
    fs.readFile(`page/document/${(url.search === '' && url.pathname == '/') ? "WELCOME" : params.get('sub')}` , 'utf8' , (err,data) => {
        
        const subject = params.get('sub');

        if(url.pathname === '/create') {
            let document = templateHTML.createDocument_public();
                
            response.writeHead(200);
            response.end(document);
        }

        fs.readdir('page/document' , 'utf8' , (err,file) => {
            
            let paramSearch = false;

            for(let index of file) {
                if(subject === index || (url.search === '' && url.pathname == '/')) { paramSearch = true; }
            }
            
            if(paramSearch) {
                let list = templateHTML.createList_public(file);
            
                let template = templateHTML.createTemplate_public(data,list,url.search,subject);

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


