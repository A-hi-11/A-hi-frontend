/** @format */

function formatDateTime(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;

  return formattedDate;
}

export default formatDateTime;
