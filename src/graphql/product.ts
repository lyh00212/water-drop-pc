import { gql } from '@apollo/client'

// 查询
export const GET_PRODUCTS = gql`
    query getProducts($page: PageInput!, $name: String) {
        getProducts(page: $page, name: $name) {
            code
            message
            data {
                id
                name
                desc
                stock
                limitBuyNumber
                coverUrl
                bannerUrl
                originalPrice
                status
                type
                preferentialPrice
            }
            page {
                pageNum
                pageSize
                total
            }
        }
    }
`
// 详情
export const GET_PRODUCT = gql`
    query getProductInfo($id: String!) {
        getProductInfo(id: $id) {
            code
            message
            data {
                id
                name
                desc
                stock
                limitBuyNumber
                coverUrl
                bannerUrl
                originalPrice
                status
                type
                preferentialPrice
                cards {
                    id
                    name
                    type
                    time
                    validateDay
                    course {
                        name
                        id
                    }
                }
            }
        }
    }
`
// 删除
export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: String!) {
        deleteProduct(id: $id) {
            code
            message
        }
    }
`

// 增/改
export const COMMIT_PRODUCT = gql`
    mutation commitProductInfo($params: PartialProductInput!, $id: String) {
        commitProductInfo(params: $params, id: $id) {
            code
            message
        }
    }
`

// 获取商品类型
export const GET_PRODUCT_TYPES = gql`
    query getProductTypes {
        getProductTypes {
            data {
                key
                title
            }
        }
    }
`
