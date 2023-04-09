const Button = (props) => {

    const brandClick = function(){
        location.href=`${props.link}&split=${props.split}`
    }

    const ampLink = `tap:AMP.navigateTo(url='${props.link}&split=${props.split}')`

    return(

        props.amp ? (
            <button className={props.buttonStyle} 
            on={ampLink}>
                {props.text}
            </button>
        ) : (
            <button className={props.buttonStyle} 
            onClick={brandClick} >
                {props.text}
            </button>
        )

       

    )

}

export default Button 

