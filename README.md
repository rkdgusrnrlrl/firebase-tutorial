# 파이어 베이스 데이터베이스 사용해보기
## 준비할 사항
- [서버에 Firebase Admin SDK 추가 ](https://firebase.google.com/docs/admin/setup?hl=ko) 문서를 보고 진행 한다.
- `serviceAccountKey.json` 는 [파이어베이스 콘솔](https://console.firebase.google.com/u/0/?hl=ko) 프로젝트가 없는 경우 생성하고, 있으면 해당 프로젝트로 들어간다.
- 톱니바퀴 > 프로젝트 설정 > 서비스 계정 > 새 비공개 키 생성 버튼을 누르면 `json` 파일을 받을 수 있다.
 
## 간단히 따라해 보기
- [Admin Database API 소개](https://firebase.google.com/docs/database/admin/start?hl=ko) 부분을 보고 따라 해보면 어떻게 사용 할 수 있는지 파악이 가능하다.

## 알아야 할 기본 사항
- `database.ref()` 함수 에 인자로 특정 데이터 부분 에서 검색 및 등록 이 가능 하다.
    - mysql 의 데이터 베이스와 비슷하다보 생각하면, 편하긴 하지만 실제는 좀 다르다.
    - 사용 방법은 mysql 의 데이터 베이스 형태로 사용 하는 것이 기존 개발자에게는 편할 것 같다.
- 실시간 데이터 베이스 라는 말이 이해가 안갔다. 왜 실시간이라고 붙였을까 봤더니, 기본 사용법은 쿼리를 날라는 형태가 아닌 이벤트를 linsten 해서 처리 하는 방식이다.
    - 아마 내부 데이터가 변경시 싱크를 맞춰 주거나 새로 값이 추가 되는 경우 푸쉬 를 하는 처리에 적합하게 만들어진 것 같다.
    - 기존 쿼리 사용법과 비슷하게 사용하기 위해서는 `ref.once()` 를 사용 해야 한다.
- `ref.once(callback)` 에 `callback` 인자로 `snapshot` 을 받는데, 이것은 순수 json 형태는 아니다.\
    - 해당 값을 json 으로 변경시 `snapshot.toJson()` 을 하면된다. javascript orm 의 경우도 순수 `json` 리턴하지 않아 앞서 이야기 한 함수로 순수 `json` 으로 바꾸곤한다.
- 기본 적인 값을 등록 하는 방법은 `reference.set(jsonData)` 하면 해당 `reference` 값이 들어 간다.
- 기본 적인 검색 방법은 `reference.once('value')` 로 하면 Promise 객체를 반환 한다. callback 인자로 `snapshot` 을 주니 그 값을 가지고 처리하면 된다.
- 다른 것은 몰라도 [snapshot api](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot?hl=ko) 쪽은 한번 살펴 보는 것이 많이 도움이 될 것 같다.