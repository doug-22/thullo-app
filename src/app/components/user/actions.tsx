// "use server"

export async function getUser() {
  // const response = await fetch('https://api.github.com/users/doug-22')
  // const data = await response.json()
  // return data
  await new Promise(resolve => setTimeout(resolve, 3000))
  return {
    name: "Douglas"
  }
}