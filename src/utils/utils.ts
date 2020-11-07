
// const get= (labelNames: Array<string>): Array<Label> => {
//     return labelNames.map(label => {
//         return {'name': label, 'color': randomHSL()}
//     })
// }


export const randomHSL = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," +
        "70%," +
        "80%, 0.5)"
}

export const getFromStorage = (key: string, defValue: any) => {
    const valueJs= window.localStorage.getItem(key);
    return valueJs !== null
      ? JSON.parse(valueJs)
      : defValue;
}

export const saveToStorage = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}