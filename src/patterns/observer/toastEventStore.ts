// toastStore.ts와 기능은 같지만, 구독자 관리를 손으로 만든 Set 대신
// 브라우저 내장 EventTarget + CustomEvent로 구현한 버전.
//
// 핵심 대응:
//   listeners.add/delete   →  bus.addEventListener / removeEventListener
//   for (l of listeners) l() →  bus.dispatchEvent(new CustomEvent(...))
// 즉 pub-sub 레지스트리를 브라우저가 대신 들고 있어준다.
//
// 써보기: ObserverDemo.tsx의 import를 toastStore → toastEventStore 로만 바꾸면
//        나머지 코드는 그대로 동작한다(공개 형태가 동일하므로).

export type ToastType = 'success' | 'error' | 'info'
export type Toast = { id: number; type: ToastType; message: string }

let toasts: Toast[] = []
let nextId = 1

// 이벤트 허브. 이 객체가 곧 Subject(발행 대상).
const bus = new EventTarget()
const CHANGE = 'change'

const notify = () => {
  // CustomEvent의 detail에 payload를 실을 수도 있지만, 여기선 상태를
  // getSnapshot으로 끌어오므로 "바뀜" 신호만 쏜다.
  bus.dispatchEvent(new CustomEvent(CHANGE))
}

export const toastEventStore = {
  // listener는 EventListener로도 유효한 일반 함수. addEventListener가 곧 구독.
  subscribe(listener: () => void) {
    bus.addEventListener(CHANGE, listener)
    return () => bus.removeEventListener(CHANGE, listener)
  },

  getSnapshot() {
    return toasts
  },

  show(message: string, type: ToastType = 'info', ttl = 3000) {
    const id = nextId++
    toasts = [...toasts, { id, type, message }]
    notify()
    if (ttl > 0) setTimeout(() => toastEventStore.dismiss(id), ttl)
    return id
  },

  dismiss(id: number) {
    const next = toasts.filter((t) => t.id !== id)
    if (next.length === toasts.length) return
    toasts = next
    notify()
  },
}
