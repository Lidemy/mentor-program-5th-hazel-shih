export function getPreText(body) {
  if (body.length <= 300) return body;
  return body.slice(0, 300);
}
