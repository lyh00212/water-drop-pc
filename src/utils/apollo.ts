import { currentOrg } from '@/utils'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from './constants'

const httpLink = createHttpLink({
    uri: '//localhost:3000/graphql',
})
// 获取token并添加到请求头中
const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
            orgId: currentOrg()?.value,
        },
    }
})

// 初始化 Apollo 客户端
export const client = new ApolloClient({
    // uri: 'http://localhost:3000/graphql',
    link: authLink.concat(httpLink),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
    },
    // 加cache缓存
    cache: new InMemoryCache({
        addTypename: false,
    }),
})
