import { useState } from "react"

export const useDelay = () => {
    const [isShow, setShow] = useState(false);

    const showDelay = () => {
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 2000);
    }
    return { isShow, showDelay };
}