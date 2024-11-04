export default function validateLink(link: string) {
  const linkRegex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
  return linkRegex.test(link);
}
