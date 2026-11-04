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

Use the following exact settings in **Set up your application**:

1. Set **Git account** to the agency's GitHub or GitLab account.
2. Turn on **Create private Git repository**.
3. Set **Project name** to `etch-mailer`.
4. Replace `example.com` under **SENDING_DOMAIN** with the verified sending
   domain.
5. Leave **Build command** completely empty.
6. Keep **Deploy command** as `npm run deploy`.
7. Keep **Preview command** as `npx wrangler preview`.
8. Turn off **Enable Preview builds**.
9. Leave **Protect with Cloudflare Access** off.
10. Select **Deploy**.

[Screenshot: Etch Mailer prompts completed before deployment]

### Why to use these settings

- **Git account** controls who owns the copied source repository. Use an agency
  account rather than a client's personal account.
- **Create private Git repository** keeps the agency's deployment copy out of
  public search and prevents other people from browsing its configuration. The
  original Etch Forms template remains public.
- **Project name** becomes the repository and Worker project name. It must be
  exactly `etch-mailer` because every client forms Worker connects to that
  fixed name.
- **`SENDING_DOMAIN`** becomes the domain in
  `forms@your-sending-domain`. Enter only the domain, such as `agency.com`. Do
  not enter `https://`, `forms@` or a complete email address.
- **Build command** is blank because the mailer has no separate compilation
  step.
- **Deploy command** publishes the Worker by running the template's deployment
  script. Do not replace it with the Cloudflare default.
- **Preview command** is Cloudflare's standard command for temporary branch
  previews. Leave the text unchanged even though preview builds are off.
- **Enable Preview builds** is off because this shared mailer does not need a
  temporary public version for every Git branch.
- **Protect with Cloudflare Access** is off because the mailer already has no
  public endpoint. Cloudflare Access is a login barrier for public Worker URLs,
  so it adds nothing to this private service.

The Email Sending binding named `EMAIL` comes from the template and is created
automatically. It is not an editable field on this panel. Do not look for a
separate Worker-name or binding prompt.

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
