import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/utils/apollo'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from '@/store'
import { ROUTE_COMPONENT } from '@/router'
import { routes } from '@/router/menu'
import UserInfo from '@/components/UserInfo'
import Layout from '@/components/Layout'
import Login from '@/pages/Login'
// import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <BrowserRouter>
                    <UserInfo>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Layout />}>
                                {routes.map(item => {
                                    const Component = ROUTE_COMPONENT[item.key]
                                    return (
                                        <Route
                                            path={item.path}
                                            key={item.key}
                                            element={<Component />}
                                        />
                                    )
                                })}
                            </Route>
                        </Routes>
                    </UserInfo>
                </BrowserRouter>
            </Provider>
        </ApolloProvider>
    </StrictMode>
)
