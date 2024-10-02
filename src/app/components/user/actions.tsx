// "use server"

export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    name: "Douglas Oliveira",
  };
}
