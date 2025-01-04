type Styles = 'default' | 'uncolor' | 'disabled'

const style: Record<Styles, React.CSSProperties> = {
    default: {
        backgroundColor: '#7F57D2',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        color: 'white',
        fontWeight: 'bold',
        margin: '0 5px',
    },
    uncolor: {
        backgroundColor: 'white',
        border: '1px solid #E0DFE2',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        margin: '0 5px',
    },
    disabled: {
        backgroundColor: '#E0DFE2',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'not-allowed',
        fontWeight: 'bold',
        color: 'white',
        margin: '0 5px',
    },
}

export default style
