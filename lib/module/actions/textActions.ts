export function capitalizeFirstLetter(string: string | null | undefined): string | undefined {
  if (!string) {
    return;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}
//# sourceMappingURL=textActions.js.map