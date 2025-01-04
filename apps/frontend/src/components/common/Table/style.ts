type Styles = 'table'

const style: Record<Styles, React.CSSProperties> = {
    table: {
        backgroundColor: 'white',
        border: '1px solid #F3F3F3',
        boxShadow: '-2px 2px 5px #F3F3F3',
        tableLayout: 'auto',
        borderCollapse: 'collapse',
        width: '100%',
    },
}

export default style
