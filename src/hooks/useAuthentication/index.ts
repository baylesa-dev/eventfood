import { useEffect } from 'react'

import { useRouter } from 'next/router'

export default function useAuthentication({ redirectTo }: { redirectTo: string }) {
    const router = useRouter()
    useEffect(() => {
        if (!redirectTo)
            return

        if (typeof window !== "undefined") {
            const secret = localStorage.getItem("secret");
            if (!secret) router.replace(redirectTo)
        }
    }, [redirectTo])
}