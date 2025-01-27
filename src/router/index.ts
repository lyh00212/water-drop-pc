import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import My from '@/pages/My'
import Org from '@/pages/Org'
import Course from '@/pages/Course'
import Student from '@/pages/Student'
import NoOrg from '@/pages/NoOrg'
import Product from '@/pages/Product'
import { ROUTE_KEY } from './menu'

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.MY]: My,
    [ROUTE_KEY.ORG]: Org,
    [ROUTE_KEY.COURSE]: Course,
    [ROUTE_KEY.STUDENT]: Student,
    [ROUTE_KEY.NO_ORG]: NoOrg,
    [ROUTE_KEY.PRODUCT]: Product,
    [ROUTE_KEY.NOTFOUND]: NotFound,
}
