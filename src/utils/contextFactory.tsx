/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useMemo, useState } from 'react'
import { IPropChild } from '@/utils/types'

interface IStore {
    key: string
    store: Record<string, any>
    setStore: (payload: Record<string, any>) => void
}
// getCxtProvier 创建context的Provider（返回值是一个函数）
const getCxtProvider =
    (key: string, defaultValue: Record<string, any>, AppContext: React.Context<IStore>) =>
    ({ children }: IPropChild) => {
        const [store, setStore] = useState(defaultValue)
        const value = useMemo(() => ({ key, store, setStore }), [store])

        return <AppContext.Provider value={value}>{children}</AppContext.Provider>
    }

const cxtCache: Record<string, Cxt> = {}

class Cxt {
    defaultStore: IStore
    AppContext: React.Context<IStore>
    Provider: ({ children }: IPropChild) => JSX.Element
    constructor(key: string, defaultValue: Record<string, any>) {
        this.defaultStore = {
            key,
            store: defaultValue,
            setStore: () => {},
        }
        // 创建context上下文
        this.AppContext = createContext(this.defaultStore)
        this.Provider = getCxtProvider(key, defaultValue, this.AppContext)
        cxtCache[key] = this
    }
}

export const useAppContext = (key: string) => {
    const cxt = cxtCache[key]
    const app = useContext(cxt.AppContext)
    return {
        store: app.store,
        setStore: app.setStore,
    }
}

export const connectFactory = (key: string, defaultValue: Record<string, any>) => {
    const cxt = cxtCache[key]
    let CurCxt: Cxt
    if (cxt) {
        CurCxt = cxt
    } else {
        CurCxt = new Cxt(key, defaultValue)
    }

    return (Child: React.FunctionComponent<any>) => (props: any) => (
        <CurCxt.Provider>
            <Child {...props} />
        </CurCxt.Provider>
    )
}
