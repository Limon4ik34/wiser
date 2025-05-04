export function dateFormat (dateString: number) {
  const date = new Date(+dateString);
  console.log(dateString);
  console.log(date);
  return date.toLocaleDateString('ru-RU',{
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}