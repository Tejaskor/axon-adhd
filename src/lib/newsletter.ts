import "server-only";

/**
 * Newsletter provider adapter. Implement `subscribe` for your provider
 * (Mailchimp, SendGrid, ConvertKit, …) and select it with NEWSLETTER_PROVIDER.
 */
export interface NewsletterProvider {
  name: string;
  subscribe(email: string): Promise<void>;
}

const consoleProvider: NewsletterProvider = {
  name: "console",
  async subscribe(email) {
    console.info(`[newsletter] (no provider configured) subscribe: ${email}`);
  },
};

const mailchimpProvider: NewsletterProvider = {
  name: "mailchimp",
  async subscribe(email) {
    const key = process.env.MAILCHIMP_API_KEY;
    const list = process.env.MAILCHIMP_AUDIENCE_ID;
    if (!key || !list) throw new Error("MAILCHIMP_API_KEY / MAILCHIMP_AUDIENCE_ID not set");
    const dc = key.split("-")[1];
    const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${list}/members`, {
      method: "POST",
      headers: { Authorization: `apikey ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email_address: email, status: "subscribed" }),
    });
    // 400 "Member Exists" is treated as success.
    if (!res.ok && res.status !== 400) throw new Error(`Mailchimp error ${res.status}`);
  },
};

const providers: Record<string, NewsletterProvider> = { console: consoleProvider, mailchimp: mailchimpProvider };

export function getNewsletterProvider(): NewsletterProvider {
  return providers[process.env.NEWSLETTER_PROVIDER ?? "console"] ?? consoleProvider;
}
