
export async function jsonFromFile(jsonFile: File): Promise<any> {
  const data = await (jsonFile).text();
  return JSON.parse(data);
}

export function cleanVariables(text: string): string {
  return text
    .split('\n')
    .map(line => line.replace('" ', '').replace('",', '').replace('"', '').trim())
    .join('\n');
}
