import http from 'http';
import fs from 'fs';

http.createServer(function(request,response) {
    
    const params = new URLSearchParams(request.url.replace('/','')); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.
    console.log(params);
    fs.readFile(`page/document/${(request.url === '/') ? "WELCOME" : (params.get('sub') === null) ? "NOTFOUND" : params.get('sub')}` , 'utf8' , (err,data) => {
        
        if(err) throw err;
        
        let template = `
        <!doctype html>
        <html>
            <head>
                <link rel="shortcut icon" href="#">
                <meta charset="utf-8">
                <meta name="description" content="김준서의 개인 자기개발 사이트">
                <meta name="keywords" content="html,css,javascript,node.js">
                <title>김준서</title>
            </head>
            <body>
                <table border="1" cellspacing="0">
                    <tr>
                        <th>1</th>
                        <td><a href="/">WELCOME</a></td>
                    </tr>
                    <tr>
                        <th>1</th>
                        <td><a href="/?sub=HTML">HTML</a></td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td><a href="/?sub=CSS">CSS</a></td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td><a href="/?sub=JAVASCRIPT">JAVASCRIPT</a></td>
                    </tr>
                </table>
                <h1>${(request.url === '/') ? "WELCOME" : (params.get('sub') === null) ? "NOTFOUND" : params.get('sub')}</h1>
                <br><br>
                <p>
                    ${data}
                </p>
            </body>
        </html>`;

        
        response.writeHead(200);
        response.end(template);
    });
    
}).listen(3000);

