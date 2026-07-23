import type { ComponentType } from 'react'
import ObserverDemo from './observer/ObserverDemo'

// 패턴을 추가할 때 여기 한 줄만 추가하면 라우트와 네비 링크가 자동 생성된다.
export type PatternEntry = {
  path: string
  title: string
  day: number
  Component: ComponentType
}

export const patterns: PatternEntry[] = [
  { path: 'observer', title: 'Observer (pub-sub) → Toast', day: 1, Component: ObserverDemo },
]
