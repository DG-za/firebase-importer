
export async function jsonFromFile(jsonFile: File): Promise<any> {
  const data = await (jsonFile).text();
  return JSON.parse(data);
}
