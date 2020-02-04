function getRandomNumAsString(){
  return Math.floor(Math.random() * 10) + ''
}

function getPhoneToken(iterations, token = ''){
  if(iterations == 0) return token
  return getPhoneToken(iterations - 1, getRandomNumAsString() + token)
}

export { getPhoneToken }
