import { Select } from 'antd'
import { useCourseForSample } from '@/services/course'
import _ from 'lodash'
import { useEffect } from 'react'
import style from './index.module.less'

/**
 * 课程选择搜索器
 */
interface IProps {
    onSelected: (val: string) => void
}
const CourseSearch = ({ onSelected }: IProps) => {
    // 获取课程
    const { search, data, loading } = useCourseForSample()
    // 输入检索 + 防抖
    const onSearchHandler = _.debounce((name: string) => {
        search(name)
    }, 1000)
    const onChangeHandler = (val: string) => {
        onSelected(val)
    }
    // 初始化调用下拉数据
    useEffect(() => {
        onSearchHandler('')
    }, [])
    return (
        <Select
            showSearch
            allowClear
            placeholder="请搜索课程"
            onSearch={onSearchHandler}
            onChange={onChangeHandler}
            filterOption={false} // 不让其自己过滤而是根据我们的接口过滤
            className={style.select}
            loading={loading}
        >
            {data?.map(item => (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    )
}

export default CourseSearch
