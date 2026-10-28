---
title: Building Your Own Form
sidebar_position: 20
---

# Building your own form

You write the form yourself, in the **HTML** and **CSS** panels, so the markup,
the classes and every state are yours. What you still need is somewhere for the
submissions to go.

There are two kinds of destination, and choosing one is the first decision:

1. **[A form backend](#form-backends)**: a service made only to receive forms.
   You send the data to it, and it stores it and emails it to you.
2. **[An automation platform](#automation-platforms)**: a service that receives
   the data and runs a workflow you build, sending it on to any app you use.

## How it works

Whichever you choose, the path is the same:

```text
Your form (HTML + CSS)
        ↓  the visitor clicks Send
The browser posts the fields to the endpoint
        ↓
Form backend  or  automation platform
```

1. **You write the form** in Etch. Every field has a `name`, which becomes the
   field's label in the data you receive.
2. **The visitor submits it.** Their browser sends the fields straight to the
   destination's address, called the **endpoint**.
3. **The destination handles it.** A form backend stores and forwards it. An
   automation platform runs your workflow.

Nothing runs on a server of yours. The page stays static, and the endpoint does
the work.

## Which one to choose

|                          | Form backend                                  | Automation platform                                   |
| ------------------------ | --------------------------------------------- | ----------------------------------------------------- |
| **What it does**         | Stores submissions and emails them to you     | Runs a workflow you build with each submission        |
| **Setup**                | Create a form, copy the endpoint. Minutes     | Build a scenario or workflow, step by step            |
| **Where the data goes**  | The backend's inbox, plus email notifications | Anywhere: CRM, Slack, Google Sheets, Airtable, email… |
| **Spam filtering**       | Built in                                      | You add it to the workflow                            |
| **Response to the form** | Fixed: accepted or rejected                   | Yours to design, including per-field error messages   |
| **JavaScript needed**    | None, or a short script to stay on the page   | A script to send the data and show the result         |

**Choose a form backend** when you want submissions in your inbox with the least
setup: a contact form, a quote request, a newsletter sign-up.

**Choose an automation platform** when each submission has to trigger something
else: create a lead in your CRM, post to a Slack channel, add a row to a
spreadsheet, or run your own validation rules.

## Form backends

A form backend gives you an address to post your form to, such as
`https://api.web3forms.com/submit`. The backend takes care of the rest:
emailing you each submission and filtering spam.

**How you connect it:**

1. Get an access key or create a form on the backend's site.
2. Put the backend's address in your form's `action`, with `method="POST"`.
3. Add the key or form ID the backend asks for, usually as a hidden field.

That's enough for a working form. Add a short script if you want the visitor to
stay on the page and see the result in place.

**Well-known form backends:**

| Backend                                | Documentation                                    | Good to know                                            |
| -------------------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| **[Web3Forms](https://web3forms.com)** | [docs.web3forms.com](https://docs.web3forms.com) | 250 free submissions a month; the one used in our guide |
| **[Formspree](https://formspree.io)**  | [help.formspree.io](https://help.formspree.io)   | A dashboard to browse submissions                       |
| **[Basin](https://usebasin.com)**      | [docs.usebasin.com](https://docs.usebasin.com)   | One address per form                                    |
| **[Getform](https://getform.io)**      | [getform.io/docs](https://getform.io/docs)       | One address per form                                    |

**Step-by-step guide:** [Sending your form to a form backend](form-backends.md),
with Web3Forms.

## Automation platforms

An automation platform gives you a **webhook**: an endpoint that starts a
workflow every time it receives data. You build that workflow from ready-made
steps: check the fields, answer the form, then send the data to your CRM, your
inbox, a spreadsheet or any of the thousands of apps the platform connects to.

**How you connect it:**

1. Create a workflow that starts with a **webhook** trigger.
2. Copy the webhook's address.
3. Add the steps that should run for each submission.
4. In the **Javascript** panel, send the form's data to the webhook and show the
   result to the visitor.

**Well-known automation platforms:**

| Platform                               | Webhook documentation                                                                       | Good to know                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **[Make](https://www.make.com)**       | [Webhooks](https://apps.make.com/gateway)                                                   | Can send a custom response back to the form                  |
| **[Zapier](https://zapier.com)**       | [Trigger Zaps from webhooks](https://help.zapier.com/hc/en-us/articles/8496288690317)       | Answers with a fixed response; the form shows sent or failed |
| **[n8n](https://n8n.io)**              | [Webhook node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) | Open source; run it in the cloud or on your own server       |
| **[Pipedream](https://pipedream.com)** | [Triggers](https://pipedream.com/docs/workflows/building-workflows/triggers)                | Workflows can include your own code steps                    |

**Step-by-step guide:** [Sending your form to Make](make.md), the recommended
starting point. For Zapier, Pipedream or n8n, see
[Other automation platforms](other-platforms.md).

## Good to know for both

- **Every field needs a `name`.** Fields without one aren't sent.
- **The endpoint is public.** It's in your page's code, where anyone can read
  it. That's how this pattern works, so never put a secret, such as an API key
  with write access, in a form.
- **The endpoint must accept requests from your site** (CORS). Form backends and
  automation webhooks do this already.
- **Test on the deployed page.** Run **Download Site** or **Deploy** (see
  [Deploying](../../deploying/README.md)), submit the form, and check the data
  arrives.
