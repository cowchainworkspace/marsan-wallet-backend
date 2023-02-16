export const kmsScriptCreator = (data: string) => {
  const scriptStartStr = "npx tatum-kms";

  return `${scriptStartStr} ${data}`;
};
