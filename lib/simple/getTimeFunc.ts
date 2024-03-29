import { differenceInDays } from 'date-fns'

const getDiffDay = (day : string) => {
    const createDate = new Date(day)
    const nowTime = new Date()
    const diffDay = differenceInDays(createDate, nowTime)
    if (Math.abs(diffDay) === 1) return 'yesterday'
    else if (Math.abs(diffDay) < 1) return 'today'
    else return `${Math.abs(diffDay)} days ago`
}
export default getDiffDay