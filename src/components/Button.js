const Button = (props) => {

    const brandClick = function(){
        location.href=`${props.link}&split=${props.split}`
    }

    const ampLink = `tap:AMP.navigateTo(url='${props.link}&split=${props.split}')`
    const areaLabel = props.areaLabel ? props.areaLabel : ''
    const btnClass = props.buttonStyle ? props.buttonStyle : ''

    return(

        props.amp ? (
            <button 
                className={btnClass} 
                name={areaLabel}
                on={ampLink}>
                {props.text}
            </button>
        ) : (
            <button className={btnClass} 
                onClick={brandClick} 
                name={areaLabel}
            >
                {props.text}
            </button>
        )

    )

}

export default Button 

