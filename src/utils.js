export const noop = () => {};

export const formatDate = (date: Date) =>
    `${date.getFullYear()}-${leftpad(
        (date.getMonth() + 1).toString(),
        2,
        "0"
    )}-${leftpad(date.getDate().toString(), 2, "0")} ${leftpad(
        date.getHours().toString(),
        2,
        "0"
    )}:${leftpad(date.getMinutes().toString(), 2, "0")}`;

export const leftpad = (text: String, length: Number, char: String) => {
    const fillLength = Math.floor((length - text.length) / char.length);
    for (let i = 0; i < fillLength; i++) {
        text = char + text;
    }
    return text;
};
