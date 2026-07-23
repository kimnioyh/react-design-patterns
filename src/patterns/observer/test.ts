type ToastType =  'success' | 'error' | 'info';
type Toast = { id : number;
    type : ToastType;
    message : string;
}

// 모듈 스코프로 싱글턴 패턴
let toasts:Toast[] = []
const listeners = new Set<()=>void>()
let nextId = 1

function notify() {
  for (const l of listeners) l()
}

export const testToastStore = {
    subscribe(listner: ()=>void){
        listeners.add(listner)
        // 해제함수 반환
        return () => {listeners.delete(listner)}
    },
    getSnapshot(){
        return toasts
    },
    dismiss(id: number){
        const next = toasts.filter((t)=> t.id !== id)
        if (next.length === toasts.length) return
        toasts = next
        notify()
    },
    show(message: string, type:ToastType, ttl=3000){
        const id = nextId++
        toasts = [...toasts, {id, type, message}] 
        notify()
        if (ttl > 0 ) setTimeout(()=>testToastStore.dismiss(id), ttl)
        return id
    }
}