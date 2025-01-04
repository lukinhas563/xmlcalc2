import { ReactNode } from 'react'
import style from './style'

type ContainerProps = {
    children: ReactNode
}

export default function Container({ children }: ContainerProps) {
    return <main style={style.container}>{children}</main>
}
