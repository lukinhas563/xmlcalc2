import { ReactNode } from 'react'
import style from './style'

type TableProps = {
    children: ReactNode
}

export default function Table({ children }: TableProps) {
    return <table style={style.table}>{children}</table>
}
