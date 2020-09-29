
// const get= (labelNames: Array<string>): Array<Label> => {
//     return labelNames.map(label => {
//         return {'name': label, 'color': randomHSL()}
//     })
// }


const randomHSL = () => {
    return "hsla(" + ~~(360 * Math.random()) + "," +
        "70%," +
        "80%, 0.5)"
}

export default randomHSL;