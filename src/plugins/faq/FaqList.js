import React, { useState } from "react";

export default function FaqList(props) { 

    const [ values, setValues ] = useState([props.data])

    const addRow = () => {
        setValues([...values, {
            question: '', 
            answer: ''
        }])
        props.setData(values)
    }

    const removeRow = (event, index) => {
        let rows = [...values]
        rows.splice(index, 1)
        setValues(rows)
        props.setData(rows)
    }

    const changeInput = (event, index) => {
        let { name, value } = event.target
        let rows = [...values]
        rows[index][name] = value
        setValues(rows)
        props.setData(rows)
    }

    return(

        <div className={props.css.container}>
            {values.map((item, index) => {
                let { question, answer } = item

                return(
                    <div key={index} className={props.css.item}>
                        <div>
                            <input 
                            type="text"
                            placeholder="Введите вопрос"
                            name="question"
                            value={question}
                            onChange={(event) => {changeInput(event, index)}}/>
                        </div>
                        <div>
                            <input
                            type="text"
                            placeholder="Введите ответ"
                            name="answer"
                            value={answer}
                            onChange={(event) => {changeInput(event, index)}}/>
                        </div>
                        <div>
                            { (values.length > 1) ? 
                                <span
                                onClick={(event) => {removeRow(event, index)}}>
                                Удалить
                                </span>
                            : '' }
                        </div>
                    </div>
                )

            })}
            <span 
                onClick={addRow}>
                Добавить ещё
            </span>
        </div>
        

    )

}