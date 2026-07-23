# Observer / Pub-Sub

## 한 문장
객체(subject/store)의 상태가 바뀌면, 등록된 구독자들에게 자동으로 알린다. 발행자와 구독자는 서로를 모른다.

## 구조
- **Subject/Store**: 구독자 목록을 들고 있고, 상태 변화 시 `notify()`.
- **subscribe(listener) → unsubscribe**: 구독 등록, 해제 함수 반환.
- **publish/show**: 상태 변경 + 알림.

## 이 데모의 흐름
```
버튼(발행자)  --show()-->  toastStore  --notify()-->  ToastContainer(구독자)
                            (서로 모름, prop 전달 없음)
```

## React에 이미 내장된 대응물
- `useSyncExternalStore(subscribe, getSnapshot)` — React 공식 외부 store 구독 훅. Redux/Zustand도 내부적으로 이걸 쓴다.
- `EventTarget` / `addEventListener` — 브라우저 기본 pub-sub.
- Context 자체도 값 변화를 구독자에게 흘리는 옵저버.
- **주의**: `getSnapshot`은 변화 없을 때 같은 참조를 반환해야 한다. 아니면 무한 렌더.

## 언제 쓰나
- 알림/토스트, 전역 이벤트 버스, 실시간 데이터(웹소켓) 브로드캐스트.
- 여러 컴포넌트가 같은 상태를 봐야 하는데 prop drilling이 싫을 때.

## 안티패턴 / 조심
- 이벤트 남발 → 흐름 추적 불가("누가 이걸 바꿨지?"). 지역 상태면 그냥 useState.
- unsubscribe 안 하면 메모리 누수. cleanup 필수.
- 대부분의 앱 전역 상태는 직접 만들지 말고 Context나 상태 라이브러리로. 직접 구현은 학습/초경량 케이스용.
