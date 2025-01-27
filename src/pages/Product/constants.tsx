/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from '@/utils/types'
import { Popconfirm, Space, Image } from 'antd'

interface IProps {
    onEditHandler: (id: string) => void
    onCardHandler: (id: string) => void
    onDelHandler: (id: string) => void
    onStatusChangeHandler: (id: string, status: string) => void
}
const PRODUCT_STATUS = {
    LIST: 'LIST',
    UN_LIST: 'UN_LIST',
}

export const getColumns = ({
    onEditHandler,
    onCardHandler,
    onDelHandler,
    onStatusChangeHandler,
}: IProps): any => [
    {
        dataIndex: 'id',
        title: '#',
        valueType: 'indexBorder',
        search: false,
        align: 'center',
        width: 80,
    },
    {
        title: '封面',
        dataIndex: 'coverUrl',
        search: false,
        align: 'center',
        width: 120,
        render: (_: any, record: IProduct) => <Image src={record.coverUrl} />,
    },
    {
        title: '商品名',
        dataIndex: 'name',
        align: 'center',
        width: 200,
        copyable: true,
        ellipsis: true,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项必填',
                },
            ],
        },
    },
    {
        title: '原价',
        search: false,
        align: 'center',
        dataIndex: 'originalPrice',
        width: 100,
    },
    {
        title: '优惠价',
        search: false,
        align: 'center',
        dataIndex: 'preferentialPrice',
        width: 100,
    },
    {
        title: '库存总额',
        search: false,
        width: 100,
        align: 'center',
        dataIndex: 'stock',
    },
    {
        title: '当前库存',
        search: false,
        width: 100,
        align: 'center',
        dataIndex: 'curStock',
    },
    {
        title: '每人限购',
        search: false,
        width: 100,
        align: 'center',
        dataIndex: 'limitBuyNumber',
    },
    {
        title: '销量',
        search: false,
        width: 100,
        align: 'center',
        dataIndex: 'buyNumber',
    },
    {
        title: '操作',
        align: 'center',
        valueType: 'option', // 会将其转变为操作栏
        dataIndex: 'id', // 这个dataIndex设置啥，render的第一个参数的text获取的就是啥
        render: (text: any, entity: any) => (
            // space可以进行间隔调整
            <Space>
                {entity.status === PRODUCT_STATUS.UN_LIST ? (
                    <a
                        type="link"
                        key="list"
                        style={{ color: 'blue' }}
                        onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.LIST)}
                    >
                        上架
                    </a>
                ) : (
                    <a
                        type="link"
                        key="unList"
                        style={{ color: 'green' }}
                        onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.UN_LIST)}
                    >
                        下架
                    </a>
                )}

                <a type="link" key="edit" onClick={() => onEditHandler(entity.id)}>
                    编辑
                </a>
                <a type="link" key="card" onClick={() => onCardHandler(entity.id)}>
                    绑定消费卡
                </a>
                <Popconfirm
                    title="提醒"
                    description={`确定要删除 ${entity.name} 吗？`}
                    onConfirm={() => onDelHandler(entity.id)}
                >
                    <a type="link" style={{ color: 'red' }}>
                        删除
                    </a>
                </Popconfirm>
            </Space>
        ),
    },
]
