/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import {
    COMMIT_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT,
    GET_PRODUCT_TYPES,
    GET_PRODUCTS,
} from '@/graphql/product'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { TBaseProduct, TProductQuery, TProductsQuery, TProductTypeQuery } from '@/utils/types'
import { useMutation, useQuery } from '@apollo/client'
import { message } from 'antd'
import { useMemo } from 'react'

// 查询
export const useProducts = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    const { data, loading, refetch } = useQuery<TProductsQuery>(GET_PRODUCTS, {
        skip: true, // 跳过第一次请求
        variables: {
            page: {
                pageNum,
                pageSize,
            },
        },
    })
    const refetchHandler = async (params: {
        name?: string
        pageSize?: number
        current?: number
    }) => {
        const { data: res, errors } = await refetch({
            name: params.name,
            page: {
                pageNum: params.current || 1,
                pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
            },
        })
        if (errors) {
            return {
                success: false,
            }
        }
        return {
            total: res?.getProducts.page.total,
            data: res?.getProducts.data,
            success: true,
        }
    }
    return {
        data: data?.getProducts.data,
        page: data?.getProducts.page,
        loading,
        refetch: refetchHandler,
    }
}

// 详情
export const useProductInfo = (id?: string) => {
    console.log('触发', id)
    console.log('验证', !id)
    const { data, loading, refetch } = useQuery<TProductQuery>(GET_PRODUCT, {
        skip: !id,
        variables: {
            id,
        },
    })
    // 图片转换
    const newData = useMemo(
        () => ({
            ...data?.getProductInfo.data,
            coverUrl: [{ url: data?.getProductInfo.data.coverUrl }],
            bannerUrl: [{ url: data?.getProductInfo.data.bannerUrl }],
        }),
        [data]
    )
    return { data: data?.getProductInfo.data ? newData : undefined, loading, refetch }
}

// 删除
export const useDeleteProduct = (): [delHandler: Function, loading: boolean] => {
    const [del, { loading }] = useMutation(DELETE_PRODUCT)
    const delHandler = async (id: string, callback: (isReload?: boolean) => void) => {
        const res = await del({
            variables: {
                id,
            },
        })
        if (res.data.deleteProduct.code === 200) {
            callback(true)
            message.success(res.data.deleteProduct.message)
            return
        }
        message.error(res.data.deleteProduct.message)
    }
    return [delHandler, loading]
}

// 更新
export const useEditProductInfo = (): [editHandler: Function, loading: boolean] => {
    const [edit, { loading }] = useMutation(COMMIT_PRODUCT)
    const editHandler = async (
        id: number,
        params: TBaseProduct,
        callback: (isReload: boolean) => void
    ) => {
        const res = await edit({
            variables: {
                id,
                params,
            },
        })
        if (res.data.commitProductInfo.code === 200) {
            message.success(res.data.commitProductInfo.message)
            callback(true)
            return
        }
        message.error(res.data.commitProductInfo.message)
    }
    return [editHandler, loading]
}

// 获取商品类型
export const useProductTypes = () => {
    const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES)
    return {
        data: data?.getProductTypes.data || [],
        loading,
    }
}
