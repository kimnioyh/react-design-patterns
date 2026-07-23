# react-design-patterns

디자인 패턴을 React + TypeScript로 직접 만들어보면서 정리하는 저장소.
"이 패턴이 실제 프론트엔드 코드 어디에 쓰이나"에 초점을 맞췄다.
예를 들면 pub-sub 패턴으로 토스트 알림을 만드는 식.

## 구성

패턴마다 폴더 하나. 각 폴더에 데모 컴포넌트와 메모(`NOTES.md`)를 둔다.

```
src/patterns/
  observer/    # pub-sub -> 토스트 알림
  strategy/    # 교체 가능한 정렬/검증 로직
  ...
```

앱 하나에 라우터로 패턴별 페이지를 붙여서 브라우저로 돌려본다.

## 실행

```
npm install
npm run dev
```

## 진행

7일 동안 하루에 몇 개씩. Observer/Singleton/Factory 같은 GoF 패턴부터
Compound Component, Custom Hook 같은 React 특화 패턴까지 섞어서 본다.
