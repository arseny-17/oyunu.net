export default function renderCustomHTML(post, amp) {
    
    let HTML = ''
    const postObject = post ? JSON.parse(post.content) : {}

    for (let block of postObject.blocks) {
        console.log(block)
        switch (block.type) {
            case 'header':
                HTML += `<h${block.data.level} class="general-h">${ block.data.text }</h${block.data.level}>`
                break;
            case 'paragraph':
                HTML += `<p class="general-p">${ block.data.text }</p>`
                break;
            case 'image':
                HTML += amp ? `<amp-img src="${ block.data.file.url }" class="general-image" />` : `<img src="${ block.data.file.url }" class="general-image" />`
                break;
        }
    }

    return HTML
}