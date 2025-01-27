/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProductTypes } from '@/services/product'
import { Select, Spin } from 'antd'

interface IProps {
    value?: string
    onChange?: (val: string) => void
}

/**
 * 商品类型选择器
 */
const TypeSelect = ({ value, onChange }: IProps) => {
    const { data, loading } = useProductTypes()
    const onChangeHandler = (val: string) => {
        onChange?.(val)
    }

    return (
        <Spin spinning={loading}>
            <Select placeholder="请选择类型" value={value} onChange={onChangeHandler}>
                {data?.map((item: any) => (
                    <Select.Option key={item.key} value={item.key}>
                        {item.title}
                    </Select.Option>
                ))}
            </Select>
        </Spin>
    )
}

TypeSelect.defaultProps = {
    value: undefined,
    onChange: () => {},
}

export default TypeSelect
