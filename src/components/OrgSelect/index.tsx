import useGoTo from '@/hooks/useGoTo'
import { ROUTE_KEY } from '@/router/menu'
import { useOrganizations } from '@/services/org'
import { currentOrg } from '@/utils/index'
import { LOCAL_CURRENT_ORG } from '@/utils/constants'
import { Select, Space } from 'antd'
import _ from 'lodash'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { eidtCurrentOrg } from '@/store/orgReducer'

/**
 *  门店选择器
 */
const OrgSelect = () => {
    const { data, refetch } = useOrganizations(1, 10, true)
    const { go } = useGoTo()
    const dispatch = useDispatch()
    useEffect(() => {
        if (currentOrg()?.value) {
            dispatch(
                eidtCurrentOrg({
                    currentOrg: currentOrg().value,
                })
            )
        } else {
            go(ROUTE_KEY.NO_ORG)
        }
    }, [])

    const onSearchHandler = _.debounce((name: string) => {
        refetch({
            name,
        })
    }, 500)

    const onChangeHandler = (val: { value: string; label: string }) => {
        dispatch(
            eidtCurrentOrg({
                currentOrg: val.value,
            })
        )
        localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(val))
    }

    return (
        <Space>
            选择门店：
            <Select
                style={{ width: 200 }}
                placeholder="请选择门店"
                showSearch
                onSearch={onSearchHandler}
                filterOption={false}
                defaultValue={currentOrg()}
                onChange={onChangeHandler}
                labelInValue
            >
                {data?.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                        {item.name}
                    </Select.Option>
                ))}
            </Select>
        </Space>
    )
}

export default OrgSelect
