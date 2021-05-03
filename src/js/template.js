


export const templateHTML = (function() {
    
    let template = ``;
    const createTemplate_private = (data,list,url,subject) => {
        template = `
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
                    ${list}
                    </table>
                    <h1>${(url === '/') ? "WELCOME" : (subject === null) ? "NOTFOUND" : subject}</h1>
                    <br><br>
                    <p>
                        ${data}
                    </p>
                </body>
            </html>`;

        return template;
    }
        
    return {
        createTemplate_public : (data,list,url,subject) => {
            return createTemplate_private(data,list,url,subject);
        }
    }
})();

