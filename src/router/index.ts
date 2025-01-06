import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import My from '@/pages/My'
import Org from '@/pages/Org'
import { ROUTE_KEY } from './menu'

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.MY]: My,
    [ROUTE_KEY.ORG]: Org,
    [ROUTE_KEY.NOTFOUND]: NotFound,
}
