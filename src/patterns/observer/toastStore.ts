// Observer / pub-sub 패턴.
// - 발행자(publisher): 코드 어디서든 toastStore.show() 호출
// - 구독자(observer): ToastContainer가 subscribe 해서 변화 수신
// - 둘은 서로를 모른다. prop 전달 없이 느슨하게 연결된다.
//
// 모듈 스코프 변수(toasts, listeners)라 import 하는 모든 곳이 같은 인스턴스를
// 공유한다 = JS에서 가장 자연스러운 Singleton.

export type ToastType = 'success' | 'error' | 'info'
export type Toast = { id: number; type: ToastType; message: string }

let toasts: Toast[] = []
const listeners = new Set<() => void>()
let nextId = 1

function notify() {
  for (const l of listeners) l()
}

export const toastStore = {
  // useSyncExternalStore가 요구하는 계약: (listener) => unsubscribe
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },

  // 변화가 없으면 반드시 같은 참조를 돌려줘야 한다(안 그러면 무한 렌더).
  // show/dismiss에서만 새 배열로 교체하므로 그 사이엔 참조가 안정적이다.
  getSnapshot() {
    return toasts
  },

  show(message: string, type: ToastType = 'info', ttl = 3000) {
    const id = nextId++
    toasts = [...toasts, { id, type, message }]
    notify()
    if (ttl > 0) setTimeout(() => toastStore.dismiss(id), ttl)
    return id
  },

  dismiss(id: number) {
    const next = toasts.filter((t) => t.id !== id)
    if (next.length === toasts.length) return // 이미 없음 -> 참조 유지
    toasts = next
    notify()
  },
}
