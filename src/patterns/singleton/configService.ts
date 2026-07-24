// export class ConfigService {
//     private static instance : ConfigService;

//     theme : 'light' | 'dark'= 'light';

//     private constructor(){};

//     static getInsatnce(){
//         if(!ConfigService.instance) ConfigService.instance = new ConfigService();
//         return ConfigService.instance;
//     };

//     setTheme(t:'light'|'dark'){
//         this.theme = t;
//     }
// }


// class ConfigService {
//     theme : 'light' | 'dark'= 'light';
//     setTheme(t:'light'|'dark'){
//         this.theme = t;
//     }
// }

type Theme = 'light'|'dark'
type ConfigType = {
    theme : Theme;
    setTheme : (t:Theme)=>void;
}

// --- [이전] 객체 리터럴 + this 방식 ---------------------------------
// theme을 객체 프로퍼티로 두고, 메서드 안에서 this.theme을 바꾼다.
// export const config: ConfigType = {
//     theme : 'light',
//     setTheme(t) { this.theme = t; }   // this = "누가 불렀나"에 의존
// }
// 문제: 호출 방식에 취약하다.
//   config.setTheme('dark')          // ✅ this = config
//   const { setTheme } = config
//   setTheme('dark')                 // 💥 this = undefined → 런타임 에러

// --- [현재] 화살표 클로저 캡처 방식 ----------------------------------
// theme을 this가 아니라 "모듈 스코프 변수"에 담는다.
// 접근자(get/setTheme)는 화살표 함수라 자기 this가 없고, 정의된 위치의
// theme 변수를 렉시컬하게 캡처(closure)해서 직접 읽고 쓴다.
let theme: Theme = 'light'

export const config: ConfigType = {
    get theme() { return theme },        // 읽기: 캡처한 theme 반환
    setTheme: (t) => { theme = t },      // 화살표 → this 없음, theme 변수를 직접 대입
}

// 차이 요약:
//   - this 방식 : config.theme 로 깔끔하게 읽지만, 떼어내 부르면 깨짐(호출자 의존)
//   - 캡처 방식 : 어떻게 부르든 안전(this 자체를 안 씀), 대신 읽기용 게터가 필요
//   - Day 1의 toastStore가 바로 이 캡처 방식이었다(this가 한 번도 안 나옴).