import { getMailTemplate } from "./MailTemplate";

export const getVerificationCodeHTML = (code: string) => {
  const codeHtml = `
  <div
    style="width: 100%; height: 100%; padding: 20px"
  >
    <h4>Your verification code:</h4>
    <h2 style="font-weight: 800;">${code}</h2>
  </div>`;
  return getMailTemplate(codeHtml);
};
