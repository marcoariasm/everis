export const obfuscateData = (data) => {
  if (data) {
    const aux = data ? data : "-";
    const inEmail = aux.search("@") >= 0;
    const positionAt = aux.search("@");
    const obfuscated = inEmail
      ? aux !== "-" ? aux.replace(
          aux.substr(positionAt / 2, positionAt / 2),
          "*".repeat(positionAt / 2)
        ) : "-"
      : aux !== "-" ? aux.replace(aux.substr(2, 5), "* *** *") : "-";
    return obfuscated;
  } else return "-";
};
