/**
 * @function getMetroColorByLineName
 * @description Функция для получения цвета метро по названию линии.
 * @param {string} lineName - Название линии метро.
 * @returns {*|string} Цвет линии метро в формате HEX или серый цвет по умолчанию.
 */
export default function getMetroColorByLineName(lineName: string) {
    const metroColours: Record<string, string>  = {
        'Арбатско-Покровская': '#0033A0',
        'Большая кольцевая': '#82C0C0',
        'Бутовская': '#A1A2A3',
        'Замоскворецкая': '#007D3C',
        'Калининская': '#FFD702',
        'Калужско-Рижская': '#FFA300',
        'Каховская': '#A1A2A3',
        'Кольцевая': '#894E35',
        'Люблинско-Дмитровская': '#9EC862',
        'МЦД-2': '#0078BE',
        'МЦД-3': '#DEA62C',
        'МЦД-4': '#AD1D33',
        'МЦД-5': '#ADB3B8',
        'МЦК': '#FF8642',
        'Некрасовская': '#DE64A1',
        'Нет': '#999999',
        'Рублёво-Архангельская': '#78C596',
        'Серпуховско-Тимирязевская': '#A1A2A3',
        'Сокольническая': '#EF161E',
        'Таганско-Краснопресненская': '#97005E',
        'Троицкая': '#009A49',
        'Филёвская': '#0078BE',
    };

    return metroColours[lineName] || metroColours['Нет'];
}