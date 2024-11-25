import { useEffect, useState } from "react"

export const InfoChanger = () => {
    const [shown, isShown] = useState(false);
    useEffect(() => {},[shown]);
    return shown;
}