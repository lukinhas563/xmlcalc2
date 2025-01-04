type Styles = 'form' | 'label' | 'input' | 'footer' | 'file' | 'content'

const style: Record<Styles, React.CSSProperties> = {
    form: {
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        backgroundColor: '#F0EBFF',
        display: 'flex',
        height: '300px',
        width: '600px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: '2px dotted grey',
        marginTop: '20px',
        marginBottom: '20px',
    },
    input: {
        display: 'none',
    },
    footer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    file: {
        padding: '5px',
        width: '100%',
        height: '35px',
    },
    content: {
        width: '100%',
        marginBottom: '20px',
    },
}

export default style
