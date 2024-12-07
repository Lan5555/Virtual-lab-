export const shuffle = (list: any[]) => {
    let newList = [...list];
    for (let i = newList.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    return newList;
};