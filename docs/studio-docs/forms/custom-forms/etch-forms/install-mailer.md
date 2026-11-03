---
title: Install the Mailer
sidebar_position: 30
---

# Install the shared mailer

Install one mailer in the agency's Cloudflare account. Every client forms Worker
will use it.

## 1. Verify the sending domain

Cloudflare must verify that your account controls the domain used in the
notification sender.

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Compute**.
3. Select **Email Service**.
4. Select **Email Sending**.
5. Select **Onboard Domain**.
6. Choose the agency's sending domain.
7. Review the DNS records Cloudflare proposes.
8. Select **Done**.

[Screenshot: Email Sending domain onboarding screen]

Cloudflare adds records for SPF, DKIM, DMARC and bounce handling. These records
help receiving mail systems confirm that Cloudflare may send for your domain.
You do not need to write the records yourself when Cloudflare manages the DNS.

1. Return to **Compute > Email Service > Email Sending**.
2. Open **Settings** for the sending domain.
3. Confirm that the sending DNS records show as configured.

[Screenshot: Verified Email Sending DNS records]

Cloudflare says DNS changes usually finish in 5 to 15 minutes, but they can take
up to 24 hours. Both **Locked** and **Unlocked** indicate a correctly configured
record. The label only says whether Email Service manages that record.

See
[Cloudflare's Email Sending setup](https://developers.cloudflare.com/email-service/get-started/send-emails/)
if the domain does not become ready.

## 2. Start the deployment

1. Open the button below in a new tab.

[![Deploy Etch Mailer to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kevingeary/etch-forms/tree/main/mailer)

2. Sign in to Cloudflare if asked.
3. Authorize Cloudflare to use your GitHub or GitLab account if asked.

[Screenshot: First Deploy to Cloudflare setup screen for Etch Mailer]

A **Deploy to Cloudflare button** copies the public template to your Git
account, creates the Worker and connects automatic builds. The copied repository
belongs to your agency.

## 3. Complete the setup prompts

Cloudflare can change the order and wording of its setup page. Keep these values
when their prompts appear:

1. Choose the GitHub or GitLab account that should own the copied repository.
2. Choose a repository name you will recognize, such as `etch-mailer`.
3. Keep the production branch Cloudflare proposes.
4. Set the Worker name to `etch-mailer`.
5. Set `SENDING_DOMAIN` to the verified domain, such as `agency.com`.
6. Keep the Email Sending binding name as `EMAIL`.
7. Keep the detected deploy command as `npm run deploy`.
8. Leave the build command empty if Cloudflare leaves it empty.
9. Review the summary.
10. Start the deployment.

[Screenshot: Etch Mailer prompts completed before deployment]

Here is what each technical value means:

- **Worker name:** The permanent Cloudflare name for this program. It must be
  exactly `etch-mailer` because every client Worker connects to that name.
- **`SENDING_DOMAIN`:** The verified domain used in
  `forms@your-sending-domain`. Enter only the domain. Do not enter `https://`,
  `forms@` or another email address.
- **Email binding `EMAIL`:** The private connection from the mailer code to
  Cloudflare Email Sending. Do not rename it.
- **Deploy command:** The instruction Cloudflare runs to publish the Worker.
- **Build command:** An optional instruction for preparing an app. This Worker
  does not need a separate build step.

:::note
Cloudflare's Deploy to Cloudflare documentation confirms that the setup page
can ask for the repository name, Worker name, resource names and detected
commands. The exact order of these prompts still needs a manual check against a
real deployment.
:::

## 4. Check the deployment

1. Wait for the deployment to finish.
2. Confirm that Cloudflare reports a successful deployment.
3. Open the new Worker's details.
4. Confirm that its name is `etch-mailer`.
5. Open its bindings.
6. Confirm that an Email Sending binding named `EMAIL` exists.
7. Open its variables.
8. Confirm that `SENDING_DOMAIN` contains only the verified domain.

[Screenshot: Successful etch-mailer deployment and bindings]

The mailer intentionally has no public page. A browser request returns
`Not found`, and Cloudflare does not assign it a public `workers.dev` address.
Client Workers call its `send()` method through a private service binding.

Next, [add the first client site](add-client-site.md).
