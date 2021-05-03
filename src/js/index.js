import http from 'http';
import fs from 'fs';
import { templateHTML } from './template.js';

http.createServer((request,response) => {
    
    const params = new URLSearchParams(request.url.replace('/','')); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.
    console.log(params);
    fs.readFile(`page/document/${(request.url === '/') ? "WELCOME" : (params.get('sub') === null) ? "NOTFOUND" : params.get('sub')}` , 'utf8' , (err,data) => {
        
        if(err) throw err;

        const url = request.url;
        const subject = params.get('sub');

        fs.readdir('page/document' , 'utf8' , (err,file) => {
            if(err) throw err;

            let list = ``;
            let number = 0;

            for (var index = 0; index < file.length; index += 1) {
                
                if(file[index] === 'NOTFOUND') {
                    continue;
                }

                if(file[index] === 'WELCOME') {
                    list += `<tr><th>${++number}</th><td><a href="/">WELOCME</a></td></tr>`+`\n`;
                    continue;
                }

                list += `<tr><th>${++number}</th><td><a href="/?sub=${file[index]}">${file[index]}</a></td></tr>`+`\n`;
            }
            
            let template = templateHTML.createTemplate_public(data,list,url,subject);

            response.writeHead(200);
            response.end(template);
        });
    });
    
}).listen(3000);


