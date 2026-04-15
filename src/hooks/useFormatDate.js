export default function useFormatDate(input) {
  let date;

  if (
    typeof input === "string" &&
    input.includes("T") &&
    !input.includes("-")
  ) {
    const packed = input.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?/);
    if (packed) {
      const [_, year, month, day, hour, min, sec = "00"] = packed;
      input = `${year}-${month}-${day}T${hour}:${min}:${sec}`;
    }
  }

  const timestamp =
    typeof input === "string" && !isNaN(input) && input.trim() !== ""
      ? Number(input)
      : input;

  date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return input;
  }

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    hour12: true,
  };

  try {
    let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    formattedDate = formattedDate.replace(/,([^,]*)$/, ",$1");
    return formattedDate;
  } catch (e) {
    console.error(e);
    return input;
  }
}
