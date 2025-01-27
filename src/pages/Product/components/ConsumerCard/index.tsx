/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Result, Row, Space, Typography } from 'antd'
import { CheckCard } from '@ant-design/pro-components'
import { useLazyCards } from '@/services/card'
import { useEffect, useMemo, useState } from 'react'
import { useEditProductInfo, useProductInfo } from '@/services/product'
import CourseSearch from '@/components/CourseSearch'
import _ from 'lodash'
import { getCardName } from '@/utils/constants'
import { CreditCardOutlined } from '@ant-design/icons'
import style from './index.module.less'

/**
 * 消费卡
 */
interface IProps {
    id: string
    onClose: () => void
}
const ConsumerCard = ({ id, onClose }: IProps) => {
    // 获取消费卡数据
    const [selectedCards, setSelectedCards] = useState<string[]>([])
    const { data: product, loading: getProductLoading, refetch } = useProductInfo(id)
    console.log('product', product)
    const { getCards, loading: getCardsLoading, data: cards } = useLazyCards()
    const [edit, editLoading] = useEditProductInfo()

    useEffect(() => {
        refetch()
    }, [])

    // 组合一下数组(这里使用了lodash的unionBy，两个数组组合，并依据id去重)
    const newCards = useMemo(
        () => _.unionBy(product?.cards || [], cards, 'id'),
        [cards, product?.cards]
    )
    console.log(JSON.stringify(newCards), 'newCards')

    useEffect(() => {
        setSelectedCards(product?.cards?.map((item: any) => item.id) || [])
    }, [product?.cards])

    // 编辑修改
    const onOkHandler = () => {
        edit(
            id,
            {
                cards: selectedCards,
            },
            () => onClose()
        )
    }
    // 选择器
    const onSelectedHandler = (courseId: string) => {
        getCards(courseId)
    }

    return (
        <Modal title="绑定消费卡" width="60vw" open onOk={onOkHandler} onCancel={() => onClose()}>
            <Row justify="end">
                {/* 选择器 */}
                <CourseSearch onSelected={onSelectedHandler} />
            </Row>
            <Row justify="center" className={style.content}>
                {/* 空白页面 */}
                {newCards.length === 0 && (
                    <Result status="warning" title="请搜索课程并选择对应的消费卡" />
                )}
                {/* 使用多选卡片的组件 checkCard */}
                <CheckCard.Group
                    multiple
                    loading={getProductLoading || editLoading || getCardsLoading}
                    onChange={value => {
                        setSelectedCards(value as string[])
                    }}
                    value={selectedCards}
                >
                    {newCards.map((item: any) => (
                        <CheckCard
                            key={item.id}
                            value={item.id}
                            size="small"
                            avatar={<CreditCardOutlined />}
                            title={
                                <div className={style.title}>
                                    <Space>
                                        {/* 文字过长显示... */}
                                        <Typography.Text ellipsis className={style.name}>
                                            {item.course?.name}
                                        </Typography.Text>
                                        {getCardName(item.type)}
                                    </Space>
                                    <div>{item.name}</div>
                                </div>
                            }
                            description={
                                <Space>
                                    <span>次数：{item.time}</span>
                                    <span>有效期：{item.validateDay}</span>
                                </Space>
                            }
                        />
                    ))}
                </CheckCard.Group>
            </Row>

            <div />
        </Modal>
    )
}

export default ConsumerCard
