type Styles = 'line' | 'column' | 'footer'

const style: Record<Styles, React.CSSProperties> = {
    line: {
        height: '40px',
        border: '1px solid #F3F3F3',
    },
    column: {
        border: '1px solid #F3F3F3',
        textAlign: 'center',
        padding: '0px 20px',
    },
    footer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        marginTop: '20px',
    },
}

export default style
