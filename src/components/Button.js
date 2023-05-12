const Button = (props) => {

    const brandClick = function(){
        location.href=`${props.link}&split=${props.split}`
    }

    const ampLink = `tap:AMP.navigateTo(url='${props.link}&split=${props.split}')`
    const areaLabel = props.areaLabel ? props.areaLabel : ''

    return(

        props.amp ? (
            <button 
                className={props.buttonStyle} 
                name={areaLabel}
                on={ampLink}>
                {props.text}
            </button>
        ) : (
            <button className={props.buttonStyle} 
                onClick={brandClick} 
                name={areaLabel}
            >
                {props.text}
            </button>
        )

    )

}

export default Button 

