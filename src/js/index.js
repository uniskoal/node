import http from 'http';
import fs from 'fs';
import { templateHTML } from './template.js';
import sanitizehtml from 'sanitize-html';
import express from 'express';
import { URL } from 'url';

const app = express();
const port = 3000;


app.get('/' , (request,response) => {

    const url = new URL(request.url , "http://ci2021soulmate.dongyangmirae.kr:3000/");

    const params = new URLSearchParams(url.search); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.
    fs.readFile(`page/document/${(url.search === '') ? "WELCOME" : params.get('sub')}` , 'utf8' , (err,data)=> {
        
        const subject = params.get('sub');

        fs.readdir('page/document' , 'utf8' , (err,file) => {
            
            let paramSearch = false;

            for(let index of file) {
                if(subject === index || (url.search === '')) { paramSearch = true; }
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
});

app.get('/create' , (request,response) => {

    const url = new URL(request.url , "http://localhost:3000/");
    const params = new URLSearchParams(url.search);

    let success;
    if(params.get('success') === 'false') {
        success = false;
    }
    let document = templateHTML.createDocument_public(success , url.pathname , null);

    response.send(document);
});

app.get('/update' , (request,response) => {
    const url = new URL(request.url , "http://localhost:3000/");
    const params = new URLSearchParams(url.search);
    
    let update_params = params.get('sub');
    let success;
    if(params.get('success') === 'false') {
        success = false;
    }
    let document = templateHTML.createDocument_public(success , url.pathname , update_params);

    response.send(document);
});

app.get('/delete' , (request,response) => {

    const url = new URL(request.url , "http://localhost:3000/");
    const params = new URLSearchParams(url.search);

    fs.unlink(`page/document/${params.get('sub')}` , (err) => {
        if(err) throw err;

        response.writeHead(301 , { Location : '/'});
        response.end();
    });
});

app.post('/process_create' , (request,response) => {
    let body = "";
    
            request.on('data' , (data) => {
                body += data;
            });

            request.on('end' , () => {
                let postQuery = new URLSearchParams(decodeURIComponent(body));
                console.log(postQuery);
                if(postQuery.get('title') === '' || postQuery.get('content') === '' ) {
                    response.writeHead(301 , { Location : "/create?success=false"});
                    response.end();
                }
                else {
                    fs.writeFile(`page/document/${postQuery.get('title')}` , sanitizehtml(postQuery.get('content')), 'utf8' , (err) => {
                        
                        response.writeHead(301 , { Location : "/"});
                        response.end();
                    });
                }
            });
});

app.post('/process_update' , (request,response) => {
    let body = "";

        request.on('data' , (data) => {
            body += data;
        });
        request.on('end' , () => {
            let postQuery = new URLSearchParams(decodeURIComponent(body));
            if(postQuery.get('title') === '' || postQuery.get('content') === '' ) {
                response.writeHead(301 , { Location : "/create?success=false"});
                response.end();
            }
            else {
                fs.rename(`page/document/${postQuery.get("id")}` , `page/document/${postQuery.get("title")}` , (err) => {
                    fs.writeFile(`page/document/${postQuery.get('title')}` , sanitizehtml(postQuery.get('content')), 'utf8' , (err) => {
                        
                        response.writeHead(301 , { Location : "/"});
                        response.end();
                    });
                });
            }
        });
});

app.listen(port , () => {
    console.log("서버가 무사히 구동되었습니다.");
});


