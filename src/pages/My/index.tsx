import { useEffect, useRef } from 'react'
import { ProForm, ProFormText, ProFormTextArea, PageContainer } from '@ant-design/pro-components'
import type { ProFormInstance } from '@ant-design/pro-components'
import { Row, Col, message, Form } from 'antd'
import { useDispatch } from 'react-redux'
import useGetUserInfo from '@/hooks/useGetUserInfo'
import OSSImageUpload from '@/components/OSSImageUpload'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '@/graphql/user'
import { editUserInfo } from '@/store/userReducer'

const My = () => {
    const formRef = useRef<ProFormInstance>()
    const userInfo = useGetUserInfo()
    const dispatch = useDispatch()

    const [updateUserInfo] = useMutation(UPDATE_USER)
    useEffect(() => {
        if (!userInfo.tel) return
        formRef.current?.setFieldsValue({
            tel: userInfo.tel,
            name: userInfo.name,
            desc: userInfo.desc,
            avatar: {
                url: userInfo.avatar,
            },
        })
    }, [userInfo])
    return (
        <PageContainer>
            <ProForm
                formRef={formRef}
                layout="horizontal"
                submitter={{
                    resetButtonProps: {
                        style: {
                            display: 'none',
                        },
                    },
                }}
                onFinish={async values => {
                    console.log(values, 'values')
                    const res = await updateUserInfo({
                        variables: {
                            id: userInfo.id,
                            params: {
                                name: values.name,
                                desc: values.desc,
                                avatar: values.avatar?.url || '',
                            },
                        },
                    })
                    if (res.data.updateUserInfo.code === 200) {
                        dispatch(
                            editUserInfo({
                                id: userInfo.id,
                                name: values.name,
                                desc: values.desc,
                                avatar: values.avatar?.url || '',
                            })
                        )
                        message.success(res.data.updateUserInfo.message)
                        return
                    }
                    message.error(res.data.updateUserInfo.message)
                }}
            >
                <Row gutter={20}>
                    <Col>
                        <ProFormText name="tel" label="手机号" tooltip="不能修改" disabled />
                        <ProFormText name="name" label="昵称" placeholder="请输入昵称" />
                        <ProFormTextArea name="desc" label="简介" placeholder="请输入简介信息" />
                    </Col>
                    <Col>
                        <Form.Item name="avatar">
                            <OSSImageUpload />
                        </Form.Item>
                    </Col>
                </Row>
            </ProForm>
        </PageContainer>
    )
}

export default My
