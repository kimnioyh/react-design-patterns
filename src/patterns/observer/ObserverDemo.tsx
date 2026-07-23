import { useSyncExternalStore } from 'react'
import { toastStore } from './toastStore'

// React 내장 옵저버 훅. store.subscribe로 구독하고 getSnapshot으로 현재 값을 읽는다.
// 직접 만든 store가 React의 pub-sub 메커니즘에 그대로 꽂힌다.
function useToasts() {
  return useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot)
}

// 구독자: store만 보고 있으면 누가 발행했는지 알 필요가 없다.
function ToastContainer() {
  const toasts = useToasts()
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast-${t.type}`}
          onClick={() => toastStore.dismiss(t.id)}
          title="클릭하면 닫힘"
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}

// 발행자: 버튼은 ToastContainer의 존재를 모른다. store.show만 부른다.
export default function ObserverDemo() {
  return (
    <section>
      <h2>Observer (pub-sub) → Toast 알림</h2>
      <p>
        버튼은 <code>toastStore.show()</code>만 호출하고, 화면 구석의 컨테이너는{' '}
        <code>subscribe</code>로 구독만 한다. 둘은 서로를 참조하지 않는다.
      </p>

      <div className="row">
        <button onClick={() => toastStore.show('저장됐어요', 'success')}>success</button>
        <button onClick={() => toastStore.show('뭔가 잘못됐어요', 'error')}>error</button>
        <button onClick={() => toastStore.show('참고: 자동 저장 중', 'info')}>info</button>
      </div>

      <p style={{ marginTop: 16, color: 'var(--text)' }}>
        토스트를 클릭하면 바로 닫히고, 3초 뒤엔 자동으로 사라진다.
      </p>

      <ToastContainer />
    </section>
  )
}
