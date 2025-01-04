import { ReactNode } from 'react'
import style from './style'

type BoxProps = {
    children?: ReactNode
}

export default function Box({ children }: BoxProps) {
    return <div style={style.box}>{children}</div>
}
