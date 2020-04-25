// Апи возвращает случайные данные по заданому временому отрезку
const API = (isin, period) => {
    let data = []
    const generateValue = () => (Math.random() * 100).toFixed(2)
    const generateItem = date => ({date, yield: generateValue(), spread: generateValue(), price: generateValue() })
    // Получить дату n дней назад
    const getDate = daysAgo => {
        const today = new Date().getDate()
        return new Date(new Date().setDate(today - daysAgo))
    }
    const formatDate = number => String(number).padStart(2, "0");
    // Сгенерировать данные 
    // count - количество элементов
    // daysAgo - сколько дней назад первая дата
    const generateItems = (count, daysAgo) => {
        const data = []

        for (let i = 1; i <= count; i++) {
            daysAgo = daysAgo || count
            var date = getDate(daysAgo - Math.floor(i / count * daysAgo))
            var day = date.getDate();
            var month = date.getMonth() + 1;

            data.push(generateItem(`${formatDate(day)}.${formatDate(month)}`));
        }

        return data
    }

    switch (period) {
        case PERIOD.WEEK:
            data = generateItems(7)
            break;
        case PERIOD.MONTH:
            data = generateItems(30)
            break;
        case PERIOD.QUARTER:
            data = generateItems(30, 90)
            break;
        case PERIOD.YEAR:
            data = generateItems(30, 365)
            break;
        case PERIOD.MAX:
            data = generateItems(30, 365 * 2)
            break;
        default:
            data = generateItems(7)
            break;
    }

    return new Promise(resolve => resolve({
        title: 'NII CAPITAL 7.625 21',
        currency: 'USD',
        isin,
        info: 'NII CAPITAL CORP, Telecommunications, NR, till 01.04.2016',
        data
    }))
}

export const PERIOD = {
    WEEK: 0,
    MONTH: 1,
    QUARTER: 2,
    YEAR: 3,
    MAX: 4
}

export default API