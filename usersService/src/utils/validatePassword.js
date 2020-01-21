function checkPass(password) {
    return /[A-Z]/.test(password) ?
        /[0-9]/.test(password) ? true : false : false
}

export { checkPass }
