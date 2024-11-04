export default function randomColor() {
  const tailwindColors = [
    'bg-gray-600',
    'bg-red-600',
    'bg-yellow-600',
    'bg-green-600',
    'bg-blue-600',
    'bg-indigo-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-teal-600',
    'bg-orange-600',
  ];

  const randomColor =
    tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
  return randomColor;
}
