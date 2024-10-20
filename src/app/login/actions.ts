'use server';

export async function login(_: unknown, data: FormData) {
  console.log(Object.fromEntries(data));
  return 'a';
}
