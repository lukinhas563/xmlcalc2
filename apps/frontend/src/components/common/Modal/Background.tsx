import { ReactNode } from 'react'
import style from './style'

type BackgroundProps = {
    children?: ReactNode
    open: boolean
}

export default function Background({ children, open }: BackgroundProps) {
    const { background, close } = style
    return <div style={open ? background : close}>{children}</div>
}
