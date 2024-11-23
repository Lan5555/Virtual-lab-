import { useEffect, useState } from "react"

export const infoChanger = () => {
const [shown, isShown] = useState(false);
useEffect(() => {},[shown]);
return shown;
}