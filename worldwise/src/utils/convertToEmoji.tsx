// Windows has no flag emoji glyphs, so turn "🇵🇹" into "pt" and show an image instead
export function convertToEmoji(flag: string) {
  const countryCode = Array.from(flag, (char) =>
    String.fromCharCode(char.codePointAt(0)! - 127397).toLowerCase()
  ).join("");

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${countryCode} flag`}
    />
  );
}
