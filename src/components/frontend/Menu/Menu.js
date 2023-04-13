

export default function Menu(props) {
    return (
      <>
      
        <div className="menu">
            <ul>
                { props.list.map(item =>(
                        <li key={item.id}>{ item.title }</li>
                    )) 
                }
            </ul>

        </div>
       
      </>
    )
  } 