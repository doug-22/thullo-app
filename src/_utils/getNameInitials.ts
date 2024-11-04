export default function getNameInitials(name: string) {
  const nameArray = name.split(' ');
  const nameInitials = nameArray?.map((name) => name[0]).join('');
  return nameInitials;
}
