import React, { useEffect, useState } from 'react'
import CardCallbackModel from '../Models/CardCallbackModel'

function CardComponent(props: { displayEntity: Object, callBackMethods: CardCallbackModel }) {

    const [data, setData] = useState<Object>({});

    useEffect(() => {
        setData(props.displayEntity);
        console.log(data)
    }, [data, props.displayEntity]);


    const updateMethod = () => {
        props.callBackMethods.updateCallbackMethod();
    }

    const deleteMethod = () => {
        props.callBackMethods.removeCallbackMethod();
    }

    return (
        <div className="card">
            <div className="card-body">
                {
                    Object.entries(data).filter(([key, value]) => value != "" || value !=0).map(([key, value]) =>
                        <h4><b>{key.toString().charAt(0).toUpperCase() + key.toString().substring(1, key.toString().length).toLowerCase()}</b>: {value}</h4>
                    )
                }
                <button onClick={updateMethod}>{props.callBackMethods.updateMethodName}</button>
                <button className="mx-2" onClick={deleteMethod}>{props.callBackMethods.removeMethodName}</button>
            </div>
        </div>
    )
}

export default CardComponent