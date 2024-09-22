import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components'
import { Tabs, message, theme } from 'antd'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useTitle } from 'ahooks'
import { SEND_CODE_MSG, LOGIN } from '@/graphql/auth'
import { AUTH_TOKEN } from '@/utils/constants'
import { useGetUser } from '@/hooks/useHooks'
import styles from './index.module.less'

type LoginType = 'phone' | 'account'
interface IValue {
    tel: string
    code: string
    autoLogin: boolean
}

const Login = () => {
    const { token } = theme.useToken()
    const [loginType, setLoginType] = useState<LoginType>('phone')
    const [run] = useMutation(SEND_CODE_MSG)
    const [login] = useMutation(LOGIN)
    const [params] = useSearchParams()
    const nav = useNavigate()
    useTitle('登录')
    const { refetch } = useGetUser()

    const loginHandler = async (values: IValue) => {
        const res = await login({
            variables: values,
        })
        if (res.data.login.code === 200) {
            refetch()
            if (values.autoLogin) {
                sessionStorage.setItem(AUTH_TOKEN, '')
                localStorage.setItem(AUTH_TOKEN, res.data.login.data)
            } else {
                localStorage.setItem(AUTH_TOKEN, '')
                sessionStorage.setItem(AUTH_TOKEN, res.data.login.data)
            }
            message.success(res.data.login.message)
            nav(params.get('orgUrl') || '/')
            return
        }
        message.error(res.data.login.message)
    }

    return (
        <ProConfigProvider hashed={false}>
            <div style={{ backgroundColor: token.colorBgContainer }}>
                <LoginForm
                    logo="https://github.githubassets.com/favicons/favicon.png"
                    title="Github"
                    subTitle="全球最大的代码托管平台"
                    onFinish={loginHandler}
                >
                    <Tabs
                        centered
                        activeKey={loginType}
                        onChange={activeKey => setLoginType(activeKey as LoginType)}
                        items={[{ key: 'phone', label: '手机号登录' }]}
                    />
                    {loginType === 'phone' && (
                        <>
                            <ProFormText
                                initialValue="18715751377"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined className={'prefixIcon'} />,
                                }}
                                name="tel"
                                placeholder={'手机号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={'请输入验证码'}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${'获取验证码'}`
                                    }
                                    return '获取验证码'
                                }}
                                phoneName="tel"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async (tel: string) => {
                                    const res = await run({
                                        variables: {
                                            tel,
                                        },
                                    })
                                    if (res.data.sendCodeMsg) {
                                        message.success('获取验证码成功!')
                                    } else {
                                        message.error('验证码获取失败!')
                                    }
                                }}
                            />
                        </>
                    )}
                    <div className={styles['auto-login']}>
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    )
}

export default Login
