import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from './constants'

const httpLink = createHttpLink({
    uri: '//localhost:3000/graphql',
})
// 获取token并添加到请求头中
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    }
})

// 初始化 Apollo 客户端
export const client = new ApolloClient({
    // uri: 'http://localhost:3000/graphql',
    link: authLink.concat(httpLink),
    // 加cache缓存
    cache: new InMemoryCache(),
})
