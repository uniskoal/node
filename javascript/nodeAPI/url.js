/** 
 * ? WHATWG URL API 
 * ! (Web Hypertext Application Technology Working Group) 
 * ? HTML �� ���� ��� ������ ���� ���� �׷��̴�.
 * ? ����, ������ ,����� ȸ���� ���ε��� �����߽��ϴ�.
 * 
 * 
 * * Node.js �� ��쿡�� �⺻������ Legacy API �� ���� URL �� �޼ҵ带 �����߽��ϴ�.
 * * ���翡���� �и��� ���� �ֵ���, url ����� �ҷ�����, parse �޼ҵ带 ���� �и�����.
 * TODO ������ ������ deprecated �� ���ϸ鼭 �� �̻� ������� �ʴ� ���� ���������� ��õ
 * TODO �ϰ� �ƽ��ϴ�. �׷��� ������ ������ WHATWG URL API �� ����ϴ� ���� �ùٸ� ����Դϴ�.
 * */

// ! URL Ŭ������ �۷ι� ��ü�̱� ������ ����� ���� �ҷ��� �ʿ䰡 �����ϴ�. 

var request = new URL('https://nodejs.org/dist/latest-v14.x/docs/api/url.html#url_whatwg_api');

// require('url').URL �� �����մϴ�.


/**
 * * new URL(input[,base])
 * 
 * ? �� ���� ���ڸ� ���� �� �ִ� URL �����ڴ� �⺻������ ���,�������� �ּҸ� ���ս�ų �� �ֽ��ϴ�
 * 
 * ! Input �ּҰ� ������� ��� base�� �ݵ�� �������� �ּҿ��� �մϴ�.
 * ! Input �ּҰ� �������̶�� base ��ü�� ���õ˴ϴ�. 
 * 
 * ? �� ù ��° ���ڰ� �����̰�, base�� �μ����� �뵵��� ������ �� �ֽ��ϴ�.
 * ? ������� �ּҸ� ����ϴ� ��쵵 ���� ���̱⿡, ������ �� �����ϴ�.
 * 
 */

const url = new URL('/foo' , 'https://example.org/');

// ! string ������ url�� �߸��� �������� �Ѱ����ٸ� TypeError �� �߻��ϰ� �˴ϴ�.
// ! �� �� ������ �̸��� Invalid URL �Դϴ�. URL �� ��Ȯ���� �ʴٴ� ���Դϴ�.

console.log(url);

// ! ������ Unicode ���ڰ� �� ���, Punycode �˰����� �̿��Ͽ� ASCII �� �ڵ� ��ȯ�˴ϴ�.
// ! �ǵ����̸� ��ü ASCII �ε� ����� URL ȣ��Ʈ ������ ����սô�. (�ɰ��� ����)
// ? �� ����� ICU�� Ȱ��ȭ�� ���¿����� �����ϵ� ��쿡�� ����� �� �ֽ��ϴ�.
// * �� �������� �̰��� �߿��ϰ� �������� ������, ����ξ����ϴ�. �� ������ ª�Ƽ� ���� ���� ���׿�.

// ! Input �� base �� �� �������� �ּҸ� ���� �ִٸ�? ��ü���� ��Ģ���� url�� �����մϴ�.
// ? �� ��Ģ�� ���� �����ϰ� �˾Ƴ��Ⱑ ���� �����Ƿ�, ���� �̷����� �߻����� ���, 
// ? Node �� ���� �������� �̸� Ȯ���ϰų�, ���ʿ� �̷� ���� �߻����� �ʰ� ������ �ϴ� �� ���� �� �����ϴ�.


// * URL Parse �ϱ� 
// ? legacy ������ parse �޼ҵ带 ����߽��ϴ�. �׷��� URL Ŭ������ ������Ÿ�Կ��� getter,setter
// ? �� ����ϴ� ������ �и��� ������ ������ҵ��� �̾ƿ� �� �ֽ��ϴ�.
// TODO ���� query�� ��ü������ ������ �� �ִ� �޼ҵ� ���� �����մϴ�. Class : URLSearchParams

// * URL �� ������ ��������� �̸��� �޼ҵ�� Ȱ���Ͽ� �����ϰ� ���� �� �ֽ��ϴ�.

const google = new URL("http://www.google.com:8080/search?q=terraria&rlz=1C1CAFA_enKR739KR739&oq=terraria&aqs=chrome.0.69i59l2j69i65.4692j0j7&sourceid=chrome&ie=UTF-8");
console.log(google);

// * �������� 

console.log(google.protocol); // https: -> : ���� �߰��ǳ׿�. ���� �����ϰ� ������ :�� ã�Ƽ� �����ؾ� �� �� �մϴ�.

// * host -> �� ���񽺸� �����ϴ� ��ǻ�͸� �ǹ��մϴ�.
// ? ������ �������� �ƴ϶� ��ǻ���� ������ �ּ��� IP�� ã�ư��� ���ε���. �� ���񽺸� �̿��� ��
// ? Ư�� IP�� �˻��ؼ� ���� �ͺ���, �ǹ��ִ� ���������� ���� Domain�� �̿��ϴ� ���� �����ϴٰ� �����մϴ�.

console.log(google.host);

console.log(google.hostname);

// ? hostname�� ��Ʈ�� ������ �������� �̸����� ��ȯ�մϴ�. ���״�� ȣ��Ʈ�̸� �� ������.


// * href 
// ? ��ü �ּҸ� ��ȯ�ϱ� ������ ���� ������ ���������ν�, new URL �� ���� ȿ���� ������,
// ? ���ó� Invalid URL �� �� ������ �߻��մϴ�. (TypeError)

console.log(google.href);

// * origin 
// ? getter �����̶� setter �� ����� �� ���� Ư¡�� �ֽ��ϴ�.
// ? protocol �� host �� ������ ��¡���� �ּҰ� ��ȯ�˴ϴ�.

console.log(google.origin);

// * port 
// ? ����ϱ� ���� �Ա��� �����մϴ�. ��ǻ�ʹ� ���� ���� ������ ������ �� �ֱ� ������, 
// ? Ŭ���̾�Ʈ�� �� ������ ��� �κп� ��û�� �ؾ��ϴ��� �����ϱ� ���� ����ϰ�, �� ������ �⺻������ 80���� ��� �Ǿ��ֱ� ������, ǥ������ �ʽ��ϴ�.

google.port = 3000;

console.log(google.port);



// ! �⺻ ��Ʈ�� 80�� ��쿡��, �ּҿ��� �巯���� �ʾ� ������� �ʽ��ϴ�.
// ! ���� ���� ���õǴ� ��Ұ� �ֽ��ϴ�.

// TODO �Ǽ��� ��� �Ǽ��� ���õ˴ϴ�.
// TODO ������ ��� ���õ˴ϴ�.
// TODO ��Ʈ�� ������ 65535�� ����� ���õ˴ϴ�.
// TODO ���ڿ� ���ڿ��� �����ִٸ� ���ڿ��� ���õ˴ϴ�.

// * pathname 
// ? ��û�� �ڷ��� ��ġ�� ��ȯ�մϴ�. query�� ������ ? �� ���� ��ȯ�մϴ�.

console.log(google.pathname);

// * URL �� �������� ���� ��Ģ
// ? protocol �Ӽ��� setter �� �����ϱ� ������ ���������� ������ �� �ֽ��ϴ�.
// ? ������ �̸� ���ǵ��ִ� Ư���� ���������� �ƴ� ��� ���õ˴ϴ�.


google.protocol = "ftp";
console.log(google.protocol);

google.protocol = "like";
console.log(google.protocol);

// ! ��ȿ���� ���� �������� �̸��� ���õ˴ϴ�.

// * search 
// ? �ڷ� ��û �н� �޺κο��� query�� ��Ÿ���� ? ���� ���ڿ��� ��ȯ�մϴ�.

console.log(google.search);


// * Class URLSearchParams 
// ? URL ��ü�� ������ �Ӽ��� searchParams �ν�, queryString ���� �ٷ�� ���� 
// ? ��ü�� ������ �ֽ��ϴ�. queryString ����� ����ϴ� ���� �Ϲ����� ���������
// ? ���� query�� �ٷ�� API �ν� ����ϱ⿡�� ����� �Ŷ� �����˴ϴ�.


// * searchParams.get();
// ? �⺻������ �Ķ���� ���� �����ϱ� ���� �޼ҵ� �Դϴ�. 

console.log(google.searchParams.get('rlz')); // �� ���� ���ڷ� �޴´�.

// * searchParams.getAll();
// ! ���� Ű�� ������ �Ķ���Ͱ� �ֱ� ������ �迭���·� �׿� �ش��ϴ� ��� ���� ��ȯ
// ? �Ķ���� �̸��� �����ϴ� ��� ���� �迭���·� ��ȯ�մϴ�.

console.log(google.searchParams.getAll("rlz"));


// * searchParams.append(String name,String value)
// ? �Ķ���͸� �߰��ϴ� ���� �����ϰ�, �� �� Ű�� ���� ������ ������� �մϴ�.

google.searchParams.append("key","value");

console.log(google.search); // �Ķ���Ͱ� �߰� �Ǿ� �ִ�.

// * searchParams.delete(String name)
// ? �߰��ϴ� �� �ִٸ� �翬�� ������ �ִ¹�. 

google.searchParams.delete("key");

console.log(google.search);

// * searchParams.set(String name,String value)
// ? �߰�,����,��ȸ �������� ����? �����̴�.

google.searchParams.set("q","terraria Calamity mod");
// ! ������ ����Ѵٸ� �����δ� +�� �߰��� ������ �˴ϴ�. 

console.log(google.search);

// * searchParams.has(String name)
// ? �ش� ������ key �� �ִٸ� true, �ƴϸ� false �� ��ȯ�ϰ� �˴ϴ�.

console.log(google.searchParams.has("q"));

// * searchParams.key()
// ? �̳ʷ����� �������� Ű ���� ��ȯ�ϰ� �˴ϴ�.

console.log(google.searchParams.keys());


//! �̳ʷ����� ���� �޼ҵ���� �����ϸ鼭 ���߿� �߰��ϰڽ��ϴ�.


// * URLSearchParams ��ü�� �̿��ؼ� �Ķ���� ���� �� url�� �ֱ�
// ? URLSearchParams �� ��ü�̹Ƿ� new �� ���� ������ �� �ֽ��ϴ�.
// ? ������ �Ķ���ʹ� �� url.search �� �־��ֱ⸸ �ϸ� ������ �˴ϴ�.
// ! ?�� �Ű澲�� �ʾƵ� �˾Ƽ� �� ������ݴϴ�. 

const params = new URLSearchParams("foo=bar&foo=baz");

params.append("key","value");

google.search = params;

console.log(google);

// * �������� Ű�� �޾ƿͼ� ����ϴ� ����

google.searchParams.forEach((name,value) => {
    console.log(name,value);
});










