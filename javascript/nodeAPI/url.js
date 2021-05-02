/** 
 * ? WHATWG URL API 
 * ! (Web Hypertext Application Technology Working Group) 
 * ? HTML 및 관련 기술 발전을 위해 모인 그룹이다.
 * ? 애플, 모질라 ,오페라 회사의 개인들이 설립했습니다.
 * 
 * 
 * * Node.js 의 경우에는 기본적으로 Legacy API 를 통해 URL 의 메소드를 제공했습니다.
 * * 교재에서도 분명히 나와 있듯이, url 모듈을 불러오고, parse 메소드를 통해 분리했죠.
 * TODO 하지만 이제는 deprecated 를 당하면서 더 이상 사용하지 않는 것을 공식적으로 추천
 * TODO 하게 됐습니다. 그렇기 때문에 이제는 WHATWG URL API 를 사용하는 것이 올바른 방식입니다.
 * */

// ! URL 클래스는 글로벌 객체이기 때문에 모듈을 따로 불러올 필요가 없습니다. 

var request = new URL('https://nodejs.org/dist/latest-v14.x/docs/api/url.html#url_whatwg_api');

// require('url').URL 과 동일합니다.


/**
 * * new URL(input[,base])
 * 
 * ? 두 개의 인자를 받을 수 있는 URL 생성자는 기본적으로 상대,절대적인 주소를 결합시킬 수 있습니다
 * 
 * ! Input 주소가 상대적일 경우 base는 반드시 절대적인 주소여야 합니다.
 * ! Input 주소가 절대적이라면 base 자체가 무시됩니다. 
 * 
 * ? 즉 첫 번째 인자가 메인이고, base는 부수적인 용도라고 생각할 수 있습니다.
 * ? 상대적인 주소를 사용하는 경우도 많을 것이기에, 유용할 거 같습니다.
 * 
 */

const url = new URL('/foo' , 'https://example.org/');

// ! string 형식의 url이 잘못된 형식으로 넘겨졌다면 TypeError 가 발생하게 됩니다.
// ! 이 때 오류의 이름은 Invalid URL 입니다. URL 이 정확하지 않다는 뜻입니다.

console.log(url);

// ! 인자의 Unicode 문자가 들어갈 경우, Punycode 알고리즘을 이용하여 ASCII 로 자동 변환됩니다.
// ! 되도록이면 자체 ASCII 로도 충분한 URL 호스트 네임을 사용합시다. (심각성 낮음)
// ? 이 기능은 ICU가 활성화된 상태에서의 컴파일된 경우에만 사용할 수 있습니다.
// * 제 지식으론 이것이 중요하게 느껴지진 않으나, 적어두었습니다. 제 지식이 짧아서 가릴 수가 없네요.

// ! Input 과 base 둘 다 절대적인 주소를 갖고 있다면? 자체적인 규칙으로 url을 결합합니다.
// ? 이 규칙은 워낙 복잡하고 알아내기가 쉽지 않으므로, 실제 이런일이 발생했을 경우, 
// ? Node 의 공식 문서에서 이를 확인하거나, 애초에 이런 일이 발생하지 않게 막도록 하는 게 좋을 거 같습니다.


// * URL Parse 하기 
// ? legacy 에서는 parse 메소드를 사용했습니다. 그러나 URL 클래스는 프로토타입에서 getter,setter
// ? 를 사용하는 것으로 분리된 각각의 구성요소들을 뽑아올 수 있습니다.
// TODO 또한 query를 자체적으로 조작할 수 있는 메소드 또한 제공합니다. Class : URLSearchParams

// * URL 의 각각의 구성요소의 이름을 메소드로 활용하여 간단하게 뽑을 수 있습니다.

const google = new URL("http://www.google.com:8080/search?q=terraria&rlz=1C1CAFA_enKR739KR739&oq=terraria&aqs=chrome.0.69i59l2j69i65.4692j0j7&sourceid=chrome&ie=UTF-8");
console.log(google);

// * 프로토콜 

console.log(google.protocol); // https: -> : 까지 추가되네요. 정말 순수하게 뺄려면 :를 찾아서 제거해야 할 듯 합니다.

// * host -> 이 서비스를 제공하는 컴퓨터를 의미합니다.
// ? 원래는 도메인이 아니라 컴퓨터의 고유한 주소인 IP를 찾아가는 것인데요. 웹 서비스를 이용할 때
// ? 특정 IP를 검색해서 들어가는 것보단, 의미있는 정보전달을 위해 Domain을 이용하는 것이 용이하다고 생각합니다.

console.log(google.host);

console.log(google.hostname);

// ? hostname은 포트를 제외한 도메인의 이름만을 반환합니다. 말그대로 호스트이름 인 것이죠.


// * href 
// ? 전체 주소를 반환하기 때문에 값을 새로이 지정함으로써, new URL 과 같은 효과를 가지고,
// ? 역시나 Invalid URL 일 시 오류가 발생합니다. (TypeError)

console.log(google.href);

// * origin 
// ? getter 전용이라 setter 를 사용할 수 없는 특징이 있습니다.
// ? protocol 과 host 를 가지는 상징적은 주소가 반환됩니다.

console.log(google.origin);

// * port 
// ? 통신하기 위한 입구를 설정합니다. 컴퓨터는 여러 개의 서버를 구성할 수 있기 때문에, 
// ? 클라이언트가 이 서버에 어느 부분에 요청을 해야하는지 구분하기 위해 사용하고, 웹 서버는 기본적으로 80으로 약속 되어있기 때문에, 표현되지 않습니다.

google.port = 3000;

console.log(google.port);



// ! 기본 포트인 80일 경우에는, 주소에도 드러나지 않아 추출되지 않습니다.
// ! 값에 따라 무시되는 요소가 있습니다.

// TODO 실수의 경우 실수가 무시됩니다.
// TODO 문자일 경우 무시됩니다.
// TODO 포트의 범위인 65535을 벗어나면 무시됩니다.
// TODO 숫자와 문자열이 섞여있다면 문자열만 무시됩니다.

// * pathname 
// ? 요청한 자료의 위치를 반환합니다. query의 시작인 ? 전 까지 반환합니다.

console.log(google.pathname);

// * URL 의 프로토콜 변경 규칙
// ? protocol 속성은 setter 가 가능하기 때문에 프로토콜을 변경할 수 있습니다.
// ? 하지만 미리 정의돼있는 특별한 프로토콜이 아닐 경우 무시됩니다.


google.protocol = "ftp";
console.log(google.protocol);

google.protocol = "like";
console.log(google.protocol);

// ! 유효하지 않은 프로토콜 이름은 무시됩니다.

// * search 
// ? 자료 요청 패스 뒷부부에서 query를 나타내는 ? 이후 문자열을 반환합니다.

console.log(google.search);


// * Class URLSearchParams 
// ? URL 객체에 마지막 속성은 searchParams 로써, queryString 만을 다루기 위한 
// ? 객체를 가지고 있습니다. queryString 모듈을 사용하는 것이 일반적인 방식이지만
// ? 오직 query만 다루는 API 로써 사용하기에는 충분할 거라 생각됩니다.


// * searchParams.get();
// ? 기본적으로 파라미터 값을 참조하기 위한 메소드 입니다. 

console.log(google.searchParams.get('rlz')); // 한 개만 인자로 받는다.

// * searchParams.getAll();
// ! 같은 키를 가지는 파라미터가 있기 때문에 배열형태로 그에 해당하는 모든 값을 반환
// ? 파라미터 이름에 대응하는 모든 값을 배열형태로 반환합니다.

console.log(google.searchParams.getAll("rlz"));


// * searchParams.append(String name,String value)
// ? 파라미터를 추가하는 것이 가능하고, 이 때 키와 값의 쌍으로 전해줘야 합니다.

google.searchParams.append("key","value");

console.log(google.search); // 파라미터가 추가 되어 있다.

// * searchParams.delete(String name)
// ? 추가하는 게 있다면 당연히 삭제도 있는법. 

google.searchParams.delete("key");

console.log(google.search);

// * searchParams.set(String name,String value)
// ? 추가,삭제,조회 다음에는 뭐다? 수정이다.

google.searchParams.set("q","terraria Calamity mod");
// ! 공백을 사용한다며 실제로는 +가 중간에 삽입이 됩니다. 

console.log(google.search);

// * searchParams.has(String name)
// ? 해당 쿼리에 key 가 있다면 true, 아니면 false 를 반환하게 됩니다.

console.log(google.searchParams.has("q"));

// * searchParams.key()
// ? 이너레이터 형식으로 키 값을 반환하게 됩니다.

console.log(google.searchParams.keys());


//! 이너레이터 관련 메소드들은 공부하면서 나중에 추가하겠습니다.


// * URLSearchParams 객체를 이용해서 파라미터 값을 원 url에 넣기
// ? URLSearchParams 도 객체이므로 new 를 통해 생성할 수 있습니다.
// ? 생성한 파라미터는 원 url.search 에 넣어주기만 하면 갱신이 됩니다.
// ! ?는 신경쓰지 않아도 알아서 잘 만들어줍니다. 

const params = new URLSearchParams("foo=bar&foo=baz");

params.append("key","value");

google.search = params;

console.log(google);

// * 여러개의 키를 받아와서 출력하는 예제

google.searchParams.forEach((name,value) => {
    console.log(name,value);
});










