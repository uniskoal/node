import http from 'http';


http.createServer(function(request,response) {
    
    const params = new URLSearchParams(request.url.replace('/','')); // 요청된 값에서 순수하게 파라미터만을 뽑아오는 코드입니다. 기본적으로 ?는 무시하지만 /는 무시하지 못하기 때문에 원활한 값이 나오지 않습니다.

    response.writeHead(200 , {"Content-Type" : "text/plain; charset=utf-8"});
    
    params.forEach((value,name) => {
        response.write(name);
        response.write(value);
        response.write("이야 ㅋㅋ");
    });

    response.end();
}).listen(3000);

