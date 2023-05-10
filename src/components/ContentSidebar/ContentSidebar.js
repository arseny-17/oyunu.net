import Button from "../Button";
import ImageWrap from "../ImageWrap";

const ContentSidebar = (props) =>  {

    const brandClick = function(){
        location.href=`${props.mainLink}`
    }

    const ampLink = `tap:AMP.navigateTo(url='${props.mainLink}')`

    return (
        <div className="contentSidebar">
            <p className="appName">Download the 1xBet app for Android or iOS for free!</p>
            <div className="appImg">
                <ImageWrap 
                    amp={props.amp} 
                    imgsrc="/app.png" 
                    imgalt="Download 1xBet" 
                    imgwidth="170" 
                    imgheight="200"
                /> 
            </div>
            <div className="appItem">
                <Button 
                    amp={props.amp} 
                    link={props.mainLink}
                    areaLabel="Download Android"
                    split='buttonAndroid'
                    buttonStyle="btn-android"/>
                <ImageWrap 
                    amp={props.amp} 
                    imgsrc="/android.png" 
                    imgalt="download android" 
                    imgwidth="25" 
                    imgheight="25"
                /> 
                <div className="appInfo">
                    <span className="appInfoTitle">Download application for Android</span>
                    <span className="appInfoSubtitle">158003 downloads</span>
                </div>
            </div>
            <div className="appItem">
                <Button 
                    amp={props.amp} 
                    link={props.mainLink}
                    areaLabel="Download Android"
                    split='buttonAndroid'
                    buttonStyle="btn-ios"/>
                <ImageWrap 
                    amp={props.amp} 
                    imgsrc="/ios.png" 
                    imgalt="download ios" 
                    imgwidth="25" 
                    imgheight="25"
                /> 
                <div className="appInfo">
                    <span className="appInfoTitle">Download application for IOS</span>
                    <span className="appInfoSubtitle">3560584 downloads</span>
                </div>
            </div>

        
            
        </div>
    )

}

export default ContentSidebar;