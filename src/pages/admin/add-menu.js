import { useState } from "react"
import Layout from "../../components/admin/Layout"
import { withSessionSsr } from '@/lib/config/withSession'

export default function addMenu(props){

    const [cardList, setCardList]  = useState([
        {id: 1, order: 3, text: 'MainPage', anchor: 'MainPage', link: '/'},
        {id: 2, order: 1, text: 'Slots', anchor: 'Slots', link: '/slots'},
        {id: 3, order: 2, text: 'Register', anchor: 'Register', link: '/register'},
        {id: 4, order: 4, text: 'Mobile', anchor: 'Mobile', link: '/mobile'}
    ])

    const [currentCard, setCurrentCard] = useState(null)
    const [val, setVal] = useState('')
    const [link, setLink] = useState('')

    function setValInList(e, card, index){
        let { name, value } = e.target
        let rows = [...cardList]
        rows[index][name] =  value
        setCardList(rows)
        console.log('new list from setVal', cardList)
    }

    function dragStartHandler(e, card){
        console.log('drag', card)
        setCurrentCard(card)
    }

    function dragLeaveHandler(e){
      
    }

    function dragEndHandler(e){
        console.log('new list', cardList)
    }

    function dragOverHandler(e){
        e.preventDefault()
    }

    function dropHandler(e, card){
        e.preventDefault()
        console.log('drop', card)
        setCardList(cardList.map( c => {
            if( c.id === card.id ) {
                return{...c, order:currentCard.order}
            }
            if( c.id === currentCard.id ) {
                return{...c, order:card.order}
            }
            return c
        }))
    }

    function deleteCardItem(e, index){
        let rows = [...cardList]
        rows.splice(index, 1)
        setCardList(rows)
    }

    function addCardItem(){
        setCardList([...cardList, {
            id: cardList.length + 1,
            order: cardList.length + 1,
            text: 'Custom',
            anchor: '',
            link: ''
        }])
        console.log('cardList from add', cardList)
    }

    const sortCards = (a,b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return(
        <Layout title="Создание меню" user={props.user}>
            <h2>Menu creation</h2>
            <div className="cardList">
                {cardList.sort(sortCards).map((card, index) => 
                    <div 
                        className="cardItem"
                        key={card.id}
                        draggable={true}
                        onDragStart={(e) => dragStartHandler(e, card)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, card)}  
                    >
                        <div 
                            className="remove"
                            onClick={ e => deleteCardItem(e, index)} 
                        >
                            <span>x</span>
                        </div>
                        <h3>{card.text}</h3>
                        <div className="input">
                            <span>Текст ссылки: </span> 
                            <input type="text" name="anchor"
                                defaultValue={card.anchor} 
                                onChange={ e => {
                                    setVal(e.target.value)
                                    setValInList(e, card, index)
                                }} 
                            />
                        </div>
                        <div className="input">
                            <span>URL ссылки: </span> 
                            <input type="text" name="link"
                                defaultValue={card.link} 
                                onChange={ e => {
                                    setVal(e.target.value)
                                    setValInList(e, card, index)
                                }}  
                            />
                        </div>
                    </div>
                )}
            <button 
                className="addItem"
                onClick={addCardItem}
            >
                <span>+</span>
            </button>
            </div>
        </Layout>
        
    )

}

export const getServerSideProps = withSessionSsr(
        
    async ({req, res}) => {
    
        let user = req.session.user || null

        return {
            props: { 
                user: user
            }
        }
    }
)