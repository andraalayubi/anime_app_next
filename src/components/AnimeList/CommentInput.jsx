"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const CommentInput = ({anime_mal_id, user_email, username, anime_title, user_image}) => {
    const [comment, setComment] = useState("")
    const [isCreated, setIsCreated] = useState(false)
    const [isTrue, setIsTrue] = useState(false)
    const router = useRouter()

    const handleInput = (event) => {
        setComment(event.target.value)
    }
    const handlePosting = async (event) => {
        if(comment.length <= 3) {
            setIsTrue(true)
            setComment("")
            return
        }
        event.preventDefault()

        // console.log(anime_mal_id, user_email, comment, username, anime_title, user_image);
        const data = { anime_mal_id, user_email, comment, username, anime_title, user_image }
        const response = await fetch("/api/v1/comment", {
            method: "POST",
            body: JSON.stringify(data)
        })
        const postComment = await response.json()
        if(postComment.isCreated) {
            setIsCreated(true)
            setComment("")
            router.refresh()
        }
        return
    }
    
    return (
        <div className="flex flex-col gap-2">
            {isCreated && <p className="text-color-primary">postingan terkirim...</p>}
            {isTrue && <p className="text-color-primary">postingan tidak boleh kurang dari tiga kata</p>}
            <textarea id="comment" className="w-full h-12 p-2 outline-none text-xl text-color-primary bg-color-dark border-b-color-primary border-b-2" onChange={handleInput} value={comment}/>
            <button className="w-40 py-2 px-3 rounded bg-color-accent" onClick={handlePosting}>Posting Komentar</button>
        </div>
    )
}

export default CommentInput