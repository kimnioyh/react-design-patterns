// TODO: EXERCISE.md의 스텝을 따라 직접 구현한다.

import { useState } from "react";
import { config } from "./configService"

// import { ConfigService } from "./configService"

// configService.ts 를 만들고, 여기서 import 해서 정체성(===)과 setTheme을 보여준다.

const SingletonDemo = () => {
  const [flag, setflag] = useState<boolean>(true);
  const rerenderHandler = ()=>{setflag((p)=>!p);}

  return (
    <section>
      <h2>Singleton → ConfigService</h2>
      <p style={{color: config.theme==='light'?'red':'black'}}>TODO: EXERCISE.md를 보고 configService.ts와 이 데모를 완성하세요.
        <button onClick={()=>{config.setTheme(config.theme==='light'?'dark':'light');rerenderHandler();}}>toggle theme</button>
      </p>
    </section>
  )
}

export default SingletonDemo
