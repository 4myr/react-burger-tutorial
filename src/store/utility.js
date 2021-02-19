export const updateObject = (oldState, newObject) => {
    return {
        ...oldState,
        ...newObject
    }
}