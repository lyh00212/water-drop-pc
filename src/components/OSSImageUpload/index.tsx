import React from 'react'
import type { UploadFile, UploadProps } from 'antd'
import { Upload } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_OSS_INFO } from '@/graphql/oss'
import ImgCrop from 'antd-img-crop'

interface OSSDataType {
    dir: string
    expire: string
    host: string
    accessId: string
    policy: string
    signature: string
}

interface OSSUploadProps {
    value?: UploadFile[]
    label: string
    maxCount?: number
    imgCropAspect?: number
    onChange?: (files: UploadFile[]) => void
}
const OSSImageUpload = ({ label, value, maxCount, imgCropAspect, onChange }: OSSUploadProps) => {
    const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO)
    const OSSData = data?.getOSSInfo
    console.log(OSSData, 'ossdata-------')
    const getKey = (file: UploadFile) => {
        const suffix = file.name.slice(file.name.lastIndexOf('.'))
        const key = `${OSSData?.dir}${file.uid}${suffix}`
        const url = `${OSSData?.host}/${key}`
        return { key, url }
    }

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        const files = fileList.map(f => ({
            ...f,
            url: f.url || getKey(f).url,
        }))
        onChange?.(files)
    }

    const getExtraData: UploadProps['data'] = file => {
        return {
            key: getKey(file).key,
            OSSAccessKeyId: OSSData?.accessId,
            policy: OSSData?.policy,
            Signature: OSSData?.signature,
            success_action_status: '200',
        }
    }

    const beforeUpload: UploadProps['beforeUpload'] = async file => {
        if (!OSSData) return false

        const expire = Number(OSSData.expire) * 1000

        if (expire < Date.now()) {
            await refetch()
        }

        return file
    }

    return (
        <ImgCrop rotationSlider aspect={imgCropAspect}>
            <Upload
                name="file"
                maxCount={maxCount}
                listType="picture-card"
                fileList={value}
                action={OSSData?.host}
                onChange={handleChange}
                data={getExtraData}
                beforeUpload={beforeUpload}
            >
                {label}
            </Upload>
        </ImgCrop>
    )
}
OSSImageUpload.defaultProps = {
    values: null,
    label: '上传图片',
    maxCount: 1,
    imgCropAspect: 1 / 1,
    onChange: () => {},
}
export default OSSImageUpload
