
export const templateHTML = (function() {
    
    const createTemplate_private = (data,list,url,subject) => {
        let update = `
        <a href="/update?sub=${subject}"><h3>update</h3></a>
        `;
        let remove = `
        <a href="/delete?sub=${subject}"><h3>delete</h3></a>
        `;
        let template = `
            <!doctype html>
            <html>
                <head>
                    <link rel="icon" href="data:,">
                    <meta charset="utf-8">
                    <meta name="description" content="김준서의 개인 자기개발 사이트">
                    <meta name="keywords" content="html,css,javascript,node.js">
                    <title>김준서</title>
                </head>
                <body>
                    <table border="1" cellspacing="0">
                    ${list}
                    </table>
                    <h1>${(url === '') ? "WELCOME" : subject}</h1>
                    <br>
                    <a href="/create"><h3>create</h3></a>
                    ${(url) !== '' ? update : ''}
                    ${(url) !== '' ? remove : ''}
                    <br>
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
                <link rel="icon" href="data:,">
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

    const createDocument_private = (success,pathname,update_params) => {
        let warning = `
            <p style="color:red">빈 곳이 없게 작성 해 주세요!</p>
        `
        let select_url = ``;
        
        if (pathname === '/create') {
            select_url = `create`;
        }
        else if (pathname === '/update') {
            select_url = `update`;
        }

        let update_form = `<p><input type="hidden" name="id" value="${update_params}"></p>`;

        let document = `<!doctype html>
        <html>
            <head>
                <link rel="icon" href="data:,">
                <meta charset="utf-8">
                <meta name="description" content="김준서의 개인 자기개발 사이트">
                <meta name="keywords" content="html,css,javascript,node.js">
                <title>김준서</title>
            </head>
            <body>
                <form action="/process_${select_url}" method="post">
                    ${(update_form != null ? update_form : '')}
                    <p><input type="text" name="title" placeholder="제목"></p>
                    <p>
                        <textarea name="content" cols="80" rows="20" maxlength="200"></textarea>
                    </p>
                    ${(success == false) ? warning : ''}
                    <p>
                        <input type="submit" value="전송">
                    </p> 
                </form>
                <h1></h1>
            </body>
        </html>`;

        return document;
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
        createDocument_public : (success,pathname,update_params) => {
            return createDocument_private(success,pathname,update_params);
        }
    }
})();

