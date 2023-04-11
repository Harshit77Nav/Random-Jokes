import React, { useEffect, useState } from 'react'
import "./jokes.css";

function Jokes() {
    const [jokes, setJokes] = useState();
    const [bookmark, setBookmark] = useState();
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState("no rating")
    useEffect(()=>{
        getData();
    },[])

    const getData = async()=>{
        await fetch("https://official-joke-api.appspot.com/random_joke")
        .then((res)=>res.json())
        .then((resdata)=>{
            setJokes(resdata)
            setShow(true)
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    const handleBookmark = ()=>{
        let obj = {
            "Joke":jokes.setup,
            "Punchline":jokes.punchline,
            "rating":rating
        }
        console.log(obj);
        let arr = JSON.parse(localStorage.getItem("jokes"));
        if(arr == null){
            let array = []
            array.push(obj);
            localStorage.setItem("jokes",JSON.stringify(array))
            alert("added")
            window.location.reload();
        } else {
            arr.push(obj)
            localStorage.setItem("jokes",JSON.stringify(arr))
            alert("added")
            window.location.reload();

        }
    }
    const showBookmark = ()=>{
        setShow(false);
        let arr = JSON.parse(localStorage.getItem("jokes"));
        setBookmark(arr);
    }

  return (
    <div className='jokesbox'> 
    <div>
        <h1>Random Jokes</h1>
        <button onClick={showBookmark}>Show Bookmark Jokes</button>
        </div>
            {show && <div className='cardbox'>
                <h2>Joke Type: {jokes.type}</h2>
                <p>Joke: {jokes.setup}</p>
                <h3>PunchLine: {jokes.punchline}</h3>
                <p><b>Rate this joke</b></p>
                <div className="rate">
                    <input type="radio" id="star5" name="rate" value="5" onChange={()=>setRating("5 Stars")}/>
                    <label htmlFor="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" onChange={()=>setRating("4 Stars")}/>
                    <label htmlFor="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" onChange={()=>setRating("3 Stars")}/>
                    <label htmlFor="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" onChange={()=>setRating("2 Stars")}/>
                    <label htmlFor="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" onChange={()=>setRating("1 Stars")}/>
                    <label htmlFor="star1" title="text">1 star</label>
                </div>
                <div className='btnbox'>
                <button onClick={()=>window.location.reload()}>Next Joke</button>
                <button onClick={handleBookmark}>Bookmark</button>
                </div>
            </div> }
            {bookmark &&  bookmark.map((items,index)=>{
                return(
                    <div key={index} className='cardBox'>
                <p>Joke: {items.Joke}</p>
                <h3>PunchLine: {items.Punchline}</h3>
            </div>
                )
            })}
    </div>
  )
}

export default Jokes