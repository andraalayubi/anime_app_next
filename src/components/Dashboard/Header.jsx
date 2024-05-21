"use client"

import { ArrowSquareLeft } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const Header = ({ title, type, userEmail }) => {
    const router = useRouter()

    const handleBack = (event) => {
        event.preventDefault();
        router.back();
    }

    const handleDeleteAll = async () => {
        console.log(type);
        console.log(userEmail);
        if (type === 'collection') {
            await fetch('/api/v1/collection/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: userEmail }),
            });
            router.refresh()
        } else if (type === 'comment') {
            await fetch('/api/v1/comment/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: userEmail }),
            });
            router.refresh()
        }

        // Memperbarui state aplikasi atau melakukan tindakan lain jika diperlukan
    };

    return (
        <div className="flex justify-between items-center my-8 pt-4">
            <button className="text-color-primary" onClick={handleBack}>
                <ArrowSquareLeft size={32} />
            </button>
            <h3 className="text-2xl text-color-primary font-bold">{title}</h3>
            <button className="text-color-primary" onClick={handleDeleteAll}>
                Hapus Semua
            </button>
        </div>
    )
}

export default Header