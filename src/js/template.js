
export const templateHTML = (function() {
    
    const createTemplate_private = (data,list,url,subject) => {
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
                    ${list}
                    </table>
                    <h1>${(url === '/') ? "WELCOME" : subject}</h1>
                    <br><br>
                    <p>
                        ${data}
                    </p>
                </body>
            </html>`;

        return template;
    }

    const createList_private = (file) => {
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

            return list;
    }

    const createNotFound_private = () => {
        let notFound = `
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
                <h1>해당 페이지를 찾을 수 없습니다. </h1>
            </body>
        </html>`;

        return notFound;
    }
        
    return {
        createTemplate_public : (data,list,url,subject) => {
            return createTemplate_private(data,list,url,subject);
        },
        createList_public : (folder) => {
            return createList_private(folder);
        },
        createNotFound_public : () => {
            return createNotFound_private();
        },
    }
})();

