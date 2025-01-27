import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components'
import { useProducts, useDeleteProduct, useEditProductInfo } from '@/services/product'
import { IProduct } from '@/utils/types'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
import { getColumns } from './constants'
import EditCourse from './components/EditProduct'
import ConsumerCard from './components/ConsumerCard'

/**
 * 商品管理页面
 */
const Product = () => {
    const actionRef = useRef<ActionType>()
    const [curId, setCurId] = useState('')
    const { refetch, loading } = useProducts()
    const [showInfo, setShowInfo] = useState(false)
    const onClickAddHandler = (id?: string) => {
        console.log('id', id)
        if (id) {
            setCurId(id)
        } else {
            setCurId('')
        }
        setShowInfo(true)
    }
    const closeAndRefetchHandler = (isReload?: boolean) => {
        setShowInfo(false)
        if (isReload) {
            actionRef.current?.reload()
        }
    }
    // 管理消费卡
    const [showCard, setShowCard] = useState(false)
    const onCardHandler = (id: string) => {
        setCurId(id)
        setShowCard(true)
    }
    // 删除
    const [delHandler, delLoading] = useDeleteProduct()
    const onClickDelHandler = (id: string) => {
        delHandler(id, closeAndRefetchHandler)
    }
    // 修改状态 -上架下架
    const [editHandler, editLoading] = useEditProductInfo()
    const onStatusChangeHandler = (id: string, status: string) => {
        editHandler(id, { status }, () => actionRef.current?.reload())
    }

    return (
        <PageContainer header={{ title: '当前门店下开设的商品' }}>
            {/* IProduct这个类型和columns是相对应的 */}
            <ProTable<IProduct>
                rowKey="id"
                actionRef={actionRef} // 用于去调用当前实例的一些方法，如刷新
                loading={delLoading || loading || editLoading}
                form={{
                    ignoreRules: false,
                }}
                columns={getColumns({
                    onEditHandler: onClickAddHandler,
                    onCardHandler,
                    onDelHandler: onClickDelHandler,
                    onStatusChangeHandler,
                })}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE,
                }}
                // 右上角（添加新建按钮）
                toolBarRender={() => [
                    <Button
                        type="primary"
                        onClick={() => onClickAddHandler()}
                        key="add"
                        icon={<PlusOutlined />}
                    >
                        新建
                    </Button>,
                ]}
                // request用于检索
                request={refetch}
            />
            {/* 编辑课程抽屉 */}
            {showInfo && <EditCourse id={curId} onClose={closeAndRefetchHandler} />}
            {/* 编辑关联消费卡 */}
            {showCard && <ConsumerCard id={curId} onClose={() => setShowCard(false)} />}
        </PageContainer>
    )
}

export default Product
