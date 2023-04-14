import Jimp from "jimp"

export default async function renderCustomHTML(post, amp) {
    
    let HTML = ''
    const postObject = post ? JSON.parse(post.content) : {}

    for (let block of postObject.blocks) {
        console.log(block)
        switch (block.type) {
            case 'header':
                HTML += `<h${ block.data.level } class="general-h">${ block.data.text }</h${ block.data.level }>`
                break;
            case 'paragraph':
                HTML += `<p class="general-p">${ block.data.text }</p>`
                break;
            case 'image':
                await Jimp.read(block.data.file.url).then((img) => {
                    HTML += amp ? `<amp-img layout="intrinsic" width="${ img.bitmap.width }" height="${ img.bitmap.height }" src="${ block.data.file.url }" class="general-image"></amp-img>` : `<img src="${ block.data.file.url }"  width="${ img.bitmap.width }" height="${ img.bitmap.height }" class="general-image" />`
                }) 
                break;  

            case 'list':
                let listItems = block.data.items
                let listType = (block.data.style === 'unordered') ? 'ul' : 'ol'
  
                HTML += `<${ listType } class="general-${ listType }">`
                for (let item of listItems) {
                    HTML += `<li>${ item }</li>`
                }
                HTML += `</${ listType }>`
                break;
            case 'table':
                let tableItems = block.data.content
                let withHeadings = block.data.withHeadings

                withHeadings ? HTML += '<table class="general-table"><thead><tr>' : HTML += '<table class="general-table">'
                if (withHeadings) {
                    for (let i = 0; i < tableItems.length; i++) {
                        if (i > 0) {
                            break
                        }
                        for (let item of tableItems[i]) {
                            HTML += `<th>${ item }</th>`
                        }
                    }
                }
                withHeadings ? HTML += '</tr></thead>' : ''
                HTML += '<tbody>'
                for (let i = withHeadings ? 1 : 0; i < tableItems.length; i++) {
                    HTML += '<tr>'
                    for (let item of tableItems[i]) {
                        HTML += `<td>${ item }</td>`
                    }
                    HTML += '</tr>'
                }
                HTML += '</tbody></table>'
                break;
            case 'raw':
                break;
            case 'columns':
                break;
        }
    }

    return HTML
}