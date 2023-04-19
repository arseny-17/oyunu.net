const fs = require('fs')
const sass = require('sass')

export default function getCssFile(){

    let stylesheet = ''

    let global = fs.readFileSync('./src/styles/globals.scss').toString()
    let header = sass.compileString(fs.readFileSync('./src/components/Header/Header.scss').toString()).css
    let footer = sass.compileString(fs.readFileSync('./src/components/Footer/Footer.scss').toString()).css

    stylesheet = global + header + footer

    return stylesheet

}
