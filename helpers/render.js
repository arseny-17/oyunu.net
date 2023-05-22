import Jimp from "jimp"

export default async function renderCustomHTML(post, amp, options, isMobile) {

    

    let HTML = ''
    const postObject = post ? JSON.parse(post.content) : {}
    let mainLink = options.find(x => x.key === 'mainLink').value

    for (let block of postObject.blocks) {
        
        switch (block.type) {
            
            case 'header':
                
                HTML += `<h${block.data.level} id="${block.data.text.replace(/ /g,'-').replace('?','').replace('!','').replace(',','').replace(':','').toLowerCase()}">${block.data.text}</h${block.data.level}>`
                break;
            
            case 'button':
                
                let [text, id, splitBtn] = block.data.button.split('/')
                let ampLink = `tap:AMP.navigateTo(url='${mainLink}&split=${splitBtn}')`
                let brandClick = `"location.href='${mainLink}&split=${splitBtn}'"`
                amp 
                    ? HTML += `<div class="button-block"><button id="${id}" on=${ampLink}>${text}</button></div>`
                    : HTML += `<div class="button-block"><button id="${id}" onClick=${brandClick}>${text}</button></div>`
                break;
            
            case 'paragraph':
                HTML += `<p>${block.data.text}</p>`
                break;
            
            case 'image':

                let jimp_img = block.data.file.url.replace('.webp', '').replace('/webp', '')

                await Jimp.read(`${process.env.NEXT_PUBLIC_HOST}${jimp_img}`).then((img) => {

                    let im_width = isMobile ? parseInt(img.bitmap.width / 2.5) : img.bitmap.width
                    let im_height = isMobile ? parseInt(img.bitmap.height / 2.5) : img.bitmap.height

                    let imageType = (img.bitmap.width >= img.bitmap.height) ? "horizontal" : "vertical";
                    let imageData = (block.data.caption !== undefined)
                    ? block.data.caption.split('|')
                    : []
                    let [caption, alt,  title] = imageData

                    HTML += amp ? `<a href="#${block.id}" class="imgWrap">
                        <figure>
                            <span id="#${block.id}-copy"></span>
                                <amp-img layout="intrinsic" alt="${ alt ? alt.trim() : ''}"width="${im_width}" height="${im_height}" src="${process.env.NEXT_PUBLIC_HOST}${block.data.file.url}" class="general-image ${imageType}"></amp-img>
                                <figcaption>${caption.trim()}</figcaption>
                            </figure>
                        </a>
                        <a href="#${block.id}-copy" id="${block.id}" class="img-overlay">
                            <div class="img-popup">
                                <amp-img layout="intrinsic" alt="${ alt ? alt.trim() : ''}"width="${im_width}" height="${im_height}" src="${process.env.NEXT_PUBLIC_HOST}${block.data.file.url}" class="general-image ${imageType}"></amp-img>
                            </div>
                        </a>`
                    : `<a href="#${block.id}" class="imgWrap">
                           <figure>
                                <span id="${block.id}-copy"></span>
                                <img src="${process.env.NEXT_PUBLIC_HOST}${block.data.file.url}" alt="${ alt ? alt.trim() : ''}" width="${im_width}" height="${im_height}" class="general-image ${imageType}">
                                <figcaption>${caption.trim()}</figcaption>
                           </figure>
                       </a>
                       <a href="#${block.id}-copy" id="${block.id}" class="img-overlay">
                            <div class="img-popup">
                                <img src="${process.env.NEXT_PUBLIC_HOST}${block.data.file.url}" alt="${ alt ? alt.trim() : ''}" width="${im_width}" height="${im_height}" class="general-image ${imageType}">   
                            </div>
                       </a>`
                })
                break;

            case 'list':
                
                let listItems = block.data.items
                let listType = (block.data.style === 'unordered') ? 'ul' : 'ol'

                HTML += `<${listType} class="general-${listType}">`
                for (let item of listItems) {
                    HTML += `<li>${item}</li>`
                }
                HTML += `</${listType}>`
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
                            HTML += `<th>${item}</th>`
                        }
                    }
                }
                withHeadings ? HTML += '</tr></thead>' : ''
                HTML += '<tbody class="general-tbody">'
                for (let i = withHeadings ? 1 : 0; i < tableItems.length; i++) {
                    HTML += '<tr class="general-tr">'
                    for (let item of tableItems[i]) {
                        HTML += `<td class="general-td">${item}</td>`
                    }
                    HTML += '</tr>'
                }
                HTML += '</tbody></table>'
                break;
            
            case 'faq':
                let faqList = block.data
                if (Array.isArray(faqList)) {
                    HTML += '<div class="faq-container">'
                    for (let item of faqList) {
                        HTML += `<div class="faq-item"><input type="checkbox" class="toggle" aria-label="question"><p class="faq-question">${item.question}</p><div class="icon"></div><p class="faq-answer">${item.answer}</p></div>`
                    }
                    HTML += '</div>'
                }
            
            case 'raw':
                break;
           
            case 'columns':
                HTML += '<div class="columns">'
                for (let items of block.data.cols) {
                    HTML += '<div class="column">'
                    for (let item of items.blocks) {
                        if (item.type == 'header') {
                            HTML += `<h${item.data.level} class="column-header">${item.data.text}</h${item.data.level}>`
                        }
                        else if (item.type == 'paragraph') {
                            HTML += `<p class="column-p">${item.data.text}</p>`
                        }
                        else if (item.type == 'image') {

                            let jimp_img = item.data.file.url.replace('.webp', '').replace('/webp', '')

                            await Jimp.read(`${process.env.NEXT_PUBLIC_HOST}${jimp_img}`).then((img) => {

                                let imageType = (img.bitmap.width >= img.bitmap.height) ? "horizontal" : "vertical"; 

                                let imageData = (block.data.caption !== undefined)
                                ? block.data.caption.split('|')
                                : []
                                let [caption, alt,  title] = imageData

                                HTML += amp ? `
                                    <a href="#${block.id}" class="imgWrap">
                                        <amp-img layout="intrinsic" width="${img.bitmap.width}" height="${img.bitmap.height}" src="${process.env.NEXT_PUBLIC_HOST}${item.data.file.url}" class="general-image ${imageType}"></amp-img>
                                    </a>
                                    <a href="#${block.id}-copy" id="${block.id}" class="img-overlay">
                                        <span id="${block.id}-copy"></span>
                                        <div class="img-popup">
                                            <amp-img layout="intrinsic" width="${img.bitmap.width}" height="${img.bitmap.height}" src="${process.env.NEXT_PUBLIC_HOST}${item.data.file.url}" class="general-image ${imageType}"></amp-img>
                                        </div>
                                    </a>` : `
                                <a href="#${block.id}" class="imgWrap">
                                    <img src="${process.env.NEXT_PUBLIC_HOST}${block.data.file.url}" alt="${ alt ? alt.trim() : ''}" width="${img.bitmap.width}" height="${img.bitmap.height}" class="general-image ${imageType}">
                                </a>
                                <a href="#${block.id}-copy" id="${block.id}" class="img-overlay">
                                    <span id="${block.id}-copy"></span>
                                    <div class="img-popup">
                                        <img src="${process.env.NEXT_PUBLIC_HOST}${block.data.file.url}" alt="${ alt ? alt.trim() : ''}" width="${img.bitmap.width}" height="${img.bitmap.height}" class="general-image ${imageType}">   
                                    </div>
                                </a>
                                <div id="${block.id}-copy"></div>
                                `
                            })
                        }
                    }
                    HTML += '</div>'
                }
                HTML += '</div>'
                break;
            
            case 'toc':
                HTML += '<div class="table_of_contents"><input id="collapsible" class="toggle" type="checkbox"><label for="collapsible" class="lbl-toggle">İçindekiler:</label><div class="table_box">'
                for (let item of block.data) {
                    HTML += `<a class="table_link" href="#${item.heading.replace(/ /g,'-').replace('?','').replace('!','').replace(',','').replace(':','').toLowerCase()}">${item.heading}</a>`
                }
                HTML += '</div></div>'
                break;
        }

    }

    return HTML
}