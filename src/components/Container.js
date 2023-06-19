import Heading from "@/components/Heading"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Banner from "@/components/Banner/Banner"
import ContentSidebar from "@/components/ContentSidebar/ContentSidebar"
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import { PageContext } from "@/providers/PageContext"
import formatDate from "../../helpers/dateHelper"

export default function Container({...props}){

    let date = new Date(parseInt(props.post.updated_at))
    let created = props.post.created_at.split('T')[0]

    return(
        <PageContext.Provider value={{...props}}>
            <Heading />
            <div id="scroll"></div>
            <Header/>
            <div className="content wrapper">
                <div className="contentMain" itemid={props.link} itemscope="" itemtype="http://schema.org/Article">
                    <meta itemprop="author" content="admin" />
                    <meta itemprop="datePublished" content={created} />
                    <meta itemprop="dateModified" content={formatDate(date)} />
                    <meta itemprop="image" content="/1x-logo.svg" />
                    { props.breadcrumbs ? <Breadcrumbs /> : ''}
                    <h1 itemprop="headline">{props.post.title}</h1>
                    <Banner/>
                    <div className="content-block" itemprop="articleBody"
                        dangerouslySetInnerHTML={{__html: props.rendered}}>
                    </div>
                    <div itemprop="publisher" itemscope="" itemtype="https://schema.org/Organization">
                        <meta itemprop="name" content={props.sitename} />
                        <meta itemprop="description" content="1xBet" />
                        <div itemprop="logo" itemscope="" itemtype="https://www.schema.org/ImageObject">
                            <link itemprop="url" href="/1x-logo.svg" />
                            <link itemprop="contentUrl" href="/1x-logo.svg" />
                        </div>
                    </div>		
                </div>
                <ContentSidebar />
            </div>
            <Footer/>    
        </PageContext.Provider>  
    )

}