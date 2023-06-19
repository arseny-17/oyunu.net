import { useContext } from 'react'
import { PageContext } from "@/providers/PageContext"
import formatDate from '../../helpers/dateHelper'

const ArticleSchema = () => {

    const context = useContext({...PageContext})
    const {post, sitename, link} = context
    let date = new Date(parseInt(post.updated_at))
    let created = post.created_at.split('T')[0]

    return(

        <div itemscope itemtype="https://schema.org/Article">
            <link itemprop="mainEntityOfPage" href={`${link}/`} />
            <link itemprop="image" href="image" />
            <meta itemprop="headline name" content={post.seo_title} />
            <meta itemprop="description" content={post.seo_description} />
            <meta itemprop="author" content="admin" />
            <meta itemprop="datePublished" datetime={created} content={created} />
            <meta itemprop="dateModified" datetime={formatDate(date)} content={formatDate(date)} />
            <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
                <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
                    <img itemprop="url image" src="/1x-logo.svg" alt="logo" className="d-none"/>
                </div>
                <meta itemprop="name" content={sitename} />
            </div>
            <div itemprop="articleBody" dangerouslySetInnerHTML={{__html: post.seo_description}}></div>
        </div>
    )
}

export default ArticleSchema