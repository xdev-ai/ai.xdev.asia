# Setup Guide: Firebase (newsletter) + Plausible (analytics) for ai.xdev.asia

This guide walks you through configuring the two optional integrations already built into the site. Both are **entirely client-side** — nothing changes in your code or deployment, you only add secrets to the GitHub repository.

| Integration | What it needs | What you get | Cost |
|---|---|---|---|
| **Plausible** | 1 secret (`VITE_PLAUSIBLE_DOMAIN`) | Visitor analytics, privacy-first, no cookie banner | Free trial, then ~$9/mo |
| **Firebase Firestore** | 6 secrets (`VITE_FIREBASE_*`) | Real newsletter signups stored in a cloud database | Free Spark plan covers it |

Until any secret is configured, the site works exactly as it does today: the analytics script does not load, and newsletter signups are stored locally in the visitor's own browser.

---

## Part 1 — Plausible Analytics

### Step 1 — Create the account

Go to [plausible.io](https://plausible.io) and create an account. Start a trial (14-day free, card optional on some plans) or go directly to the **Starter** plan (~$9/month per site after the free tier options).

### Step 2 — Add the site

In the Plausible dashboard click **Add new site** and enter:

| Field | Value |
|---|---|
| Website domain | `ai.xdev.asia` |
| Timezone | `Asia/Bangkok` (GMT+7, your timezone) |

Plausible returns a snippet. You don't need to paste it — the site already has the loader. It only activates when the secret is present.

### Step 3 — Add the secret to GitHub

1. Open **Settings → Secrets and variables → Actions** of repo [`xdev-ai/ai.xdev.asia`](https://github.com/xdev-ai/ai.xdev.asia/settings/secrets/actions)
2. Click **New repository secret**
3. Name: `VITE_PLAUSIBLE_DOMAIN`
4. Value: `ai.xdev.asia`
5. Save

> **Important:** secrets are only available to workflows, not the Vite HTML build. That is intentional — the existing inline loader in `client/index.html` reads the variable at runtime from the built asset only when it was baked in at build time.

### Step 4 — Rebuild so the secret is baked into the bundle

The loader in `index.html` reads `import.meta.env.VITE_PLAUSIBLE_DOMAIN`, which is substituted **at build time**. The GitHub Pages workflow rebuilds on every push, so the simplest reliable path is:

1. In repo **Settings → Secrets → Actions**, confirm the secret exists.
2. Go to **Actions → deploy-pages workflow → Run workflow** (manual trigger), or make any small commit to `main`.
3. After the workflow finishes, verify on [ai.xdev.asia](https://ai.xdev.asia): open DevTools → Network, filter by "plausible" — you should see `script.js` loaded from `plausible.io` and events arriving in your Plausible dashboard within a minute.

### Step 5 — (Optional, recommended) Verify domain ownership in Plausible

Plausible will show a verification warning until you prove ownership. Add a TXT record to the DNS of `xdev.asia` (wherever you manage DNS — your registrar or Cloudflare) with the value Plausible gives you, under the host `ai`. This is the same DNS zone where your domain is already configured, so no new infrastructure is needed.

---

## Part 2 — Firebase Firestore (newsletter)

### Step 1 — Create the Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. **Add project** → name it (e.g. `xdev-ai-blog`) → you can **disable Google Analytics for this project** (you are using Plausible) → Create

### Step 2 — Register a Web App

1. In the project overview click the **web icon** (</>) → **Register app**
2. App nickname: `ai-xdev-website`
3. **Uncheck** "Also set up Firebase Hosting" (you host on GitHub Pages)
4. Register → you'll see a config object:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "xdev-ai-blog.firebaseapp.com",
  projectId: "xdev-ai-blog",
  storageBucket: "xdev-ai-blog.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

Copy the six values — you'll paste them as secrets next.

### Step 3 — Enable Firestore

1. Left menu → **Firestore Database** → **Create database**
2. Location: `asia-southeast1` (closest to you; choose your preferred region)
3. Mode: start with **test mode** (opens access for 30 days) — we'll lock it down in Step 4

### Step 4 — Set secure Firestore rules

Go to **Firestore → Rules** and replace the content with:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone may INSERT a document into `newsletter` (signup form)
    match /newsletter/{docId} {
      allow create: if request.resource.data.keys().hasAll(['email', 'subscribedAt'])
        && request.resource.data.email is string
        && request.resource.data.email.matches('.*@.*\\..*')
        && request.resource.data.email.size() < 255;
      // No one (not even unauthenticated visitors) can read or delete
      allow read, update, delete: if false;
    }
    // Deny everything else by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

This guarantees visitors can only append their own signup, never read anyone else's.

### Step 5 — Add the 6 secrets to GitHub

In **Settings → Secrets and variables → Actions** of repo `xdev-ai/ai.xdev.asia`, add:

| Secret name | Value (from Step 2 config) |
|---|---|
| `VITE_FIREBASE_API_KEY` | `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | `appId` |

(Six values total; the code reads all of them, the last one's name follows the same `VITE_FIREBASE_` prefix pattern already in `client/src/lib/firebase.ts`.)

### Step 6 — Rebuild

Same as Plausible Step 4: trigger the deploy workflow manually (Actions → Run workflow) or push a commit. The Firestore SDK is already code-splitted — it downloads (~150 KB) only when someone actually clicks Subscribe, so visitors who never sign up never pay the cost.

### Step 7 — Verify

1. Open [ai.xdev.asia/blog](https://ai.xdev.asia/blog) → any article → fill the Subscribe form
2. The confirmation toast should now say the signup was stored in the database (previously it said "no database configured yet")
3. Check **Firestore → Data → `newsletter` collection** in the Firebase console — the document appears there

### Step 8 — (Optional) View your subscribers

Since the rules block reading from the browser, you view signups through: **Firebase Console → Firestore → newsletter collection**. If you want email notifications for new signups, add a **Firebase Cloud Function** trigger on `newsletter.onCreate` (this needs the Blaze pay-as-you-go plan, ~$0 only at low volume) or export via the console CSV export.

---

## Security notes

**Plausible** never sees cookies or personal data; it only counts anonymized page views. Your Privacy Policy already discloses that analytics loads only when configured — no policy change needed.

**Firebase** API keys for Web apps are meant to be public — they identify the project, they do not authenticate it. Security is enforced by the **Firestore rules** in Step 4, not by keeping the key secret. The rules above are the whole defense: create-only access to one collection.

**Neither integration affects the GitHub Pages build** — the site stays a static bundle; both features load their SDKs lazily from the browser.

## Rollback

To disable either feature, delete the secrets from Settings → Secrets and re-trigger the deploy workflow. No code change is needed.
