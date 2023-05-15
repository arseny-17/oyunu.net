import Button from "../Button";
import ImageWrap from "../ImageWrap";

const ContentSidebar = (props) =>  {

    const brandClick = function(){
        location.href=`${props.mainLink}`
    }

    const ampLink = `tap:AMP.navigateTo(url='${props.mainLink}')`

    return (
        <div className="contentSidebar">
            <p className="appName">Android veya iOS için 1xBet uygulamasını ücretsiz indirin!</p>
            <div className="appImg">
                <ImageWrap 
                    amp={props.amp} 
                    imgsrc="/app.png" 
                    imgalt="İndir 1xBet" 
                    imgwidth="170" 
                    imgheight="200"
                /> 
            </div>
            <div className="appItem">
                <Button 
                    amp={props.amp} 
                    link={props.mainLink}
                    areaLabel="Android'i indir"
                    split='buttonAndroid'
                    buttonStyle="btn-android"/>
                <ImageWrap 
                    amp={props.amp} 
                    imgsrc="/android.png" 
                    imgalt="android'i indir" 
                    imgwidth="25" 
                    imgheight="25"
                /> 
                <div className="appInfo">
                    <span className="appInfoTitle">Android için uygulamayı indirin</span>
                    <span className="appInfoSubtitle">158003 yüklemeler</span>
                </div>
            </div>
            <div className="appItem">
                <Button 
                    amp={props.amp} 
                    link={props.mainLink}
                    areaLabel="Android'i indir"
                    split='buttonAndroid'
                    buttonStyle="btn-ios"/>
                <ImageWrap 
                    amp={props.amp} 
                    imgsrc="/ios.png" 
                    imgalt="ios'u indirin" 
                    imgwidth="25" 
                    imgheight="25"
                /> 
                <div className="appInfo">
                    <span className="appInfoTitle">İOS için uygulamayı indirin</span>
                    <span className="appInfoSubtitle">3560584 yüklemeler</span>
                </div>
            </div>

        
            
        </div>
    )

}

export default ContentSidebar;