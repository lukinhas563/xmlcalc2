import { useEffect, useState } from 'react'
import Button from '../Button'
import style from './style'
import { useUploadInvoice } from '../../../hooks/graphql/mutations/useUploadInvoice'
import { UseQueryExecute } from 'urql'

type UploadProps = {
    onCancel?: () => void
    refetchInvoice?: UseQueryExecute
}

export default function Upload({ onCancel, refetchInvoice }: UploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const [disabled, setDisabled] = useState(true)
    const [, uploadInvoice] = useUploadInvoice()

    useEffect(() => {
        setDisabled(!file)
    }, [file])

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!file) {
            return
        }

        setDisabled(true)

        try {
            const result = await uploadInvoice({ file })
            console.log('Upload successful', result)

            if (refetchInvoice) {
                refetchInvoice({ requestPolicy: 'network-only' })
            }

            setDisabled(false)
            setFile(null)
        } catch (error) {
            console.error('Upload failed', error)
            setDisabled(false)
        }
    }

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const fileList = event.currentTarget.files

        if (!fileList || fileList.length === 0) {
            return
        }

        setFile(fileList[0])
    }

    const onReset = () => {
        setFile(null)
        if (onCancel) onCancel()
    }

    return (
        <form onSubmit={onSubmit} style={style.form}>
            <label style={style.label}>
                <input
                    style={style.input}
                    type="file"
                    name="xml"
                    accept="xml/*"
                    onChange={onChange}
                />
            </label>

            <div style={style.content}>
                {file ? (
                    <p key={file.name} style={style.file}>
                        {file.name}
                    </p>
                ) : (
                    <p style={style.file}>Nenhum arquivo selecionado</p>
                )}
            </div>

            <div style={style.footer}>
                <Button
                    styled="uncolor"
                    type="reset"
                    title="Cancel"
                    onClick={onReset}
                />
                <Button disabled={disabled} type="submit" title="Upload" />
            </div>
        </form>
    )
}
