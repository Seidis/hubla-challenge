export function formatName(name: string) {
  const formattedName = name.toLowerCase().split(" ");
  for (let i = 0; i < formattedName.length; i++) {
    if (formattedName[i] !== "de" && formattedName[i].length > 1) {
      formattedName[i] =
        formattedName[i].charAt(0).toUpperCase() +
        formattedName[i].substring(1);
    } else if (formattedName[i] === "de") {
      formattedName[i] = formattedName[i].toLowerCase();
    }
  }
  return formattedName.join(" ");
}
