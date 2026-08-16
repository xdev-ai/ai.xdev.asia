/* Firebase Web SDK (Firestore) — ready for future features such as newsletter signup.
   GitHub Pages is static-only, so Firebase Web SDK runs entirely in the browser (no server needed).

   SETUP (when you create the Firebase project):
   1. Go to https://console.firebase.google.com and create project (e.g. "xdev-ai-blog").
   2. Enable Firestore Database (test mode initially).
   3. Register a Web App and copy its config below into FIREBASE_CONFIG_OVERRIDE via env or edit here.
   4. Create Firestore security rules so anyone can create (subscribe) but only you can read/delete.

   Until the project is configured, getFirestore() throws a clear placeholder error and no code path crashes.
*/
export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const placeholderConfig: FirebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

let config: FirebaseConfig = placeholderConfig;
if (import.meta.env.VITE_FIREBASE_API_KEY) {
  config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
  };
}

export function isFirebaseConfigured(): boolean {
  return Boolean(config.apiKey && config.projectId);
}

export function getConfig(): FirebaseConfig {
  return config;
}

export type NewsletterDoc = { email: string; subscribedAt: string };

/* Subscribe an email address for the future newsletter feature.
   Returns { ok: true } immediately on static hosting and stores locally until Firebase is configured,
   so the UI never crashes. When Firebase is enabled, writes go to the `newsletter` collection. */
import { getStorage, setItem } from "@/lib/local";

export async function subscribeNewsletter(email: string): Promise<{ ok: boolean; stored: "firebase" | "local" | "error" }> {
  if (!isFirebaseConfigured()) {
    const list: NewsletterDoc[] = JSON.parse(getStorage("xdev-ai:newsletter", "[]"));
    if (list.some((d) => d.email.toLowerCase() === email.toLowerCase())) {
      return { ok: true, stored: "local" };
    }
    list.push({ email, subscribedAt: new Date().toISOString() });
    setItem("xdev-ai:newsletter", JSON.stringify(list));
    return { ok: true, stored: "local" };
  }
  try {
    // Dynamic import keeps the app bundle small when Firebase is not configured
    const { initializeApp } = await import("firebase/app");
    const { getFirestore, doc, setDoc, serverTimestamp } = await import("firebase/firestore");
    const app = initializeApp(getConfig(), "xdev-ai-blog");
    const db = getFirestore(app);
    const id = email.toLowerCase().replace(/[^a-z0-9@.]/g, "-");
    await setDoc(doc(db, "newsletter", id), {
      email: email.toLowerCase(),
      subscribedAt: serverTimestamp(),
    });
    return { ok: true, stored: "firebase" };
  } catch {
    // Fallback to local storage if the network call fails (offline, wrong config)
    const list: NewsletterDoc[] = JSON.parse(getStorage("xdev-ai:newsletter", "[]"));
    if (!list.some((d) => d.email.toLowerCase() === email.toLowerCase())) {
      list.push({ email, subscribedAt: new Date().toISOString() });
      setItem("xdev-ai:newsletter", JSON.stringify(list));
    }
    return { ok: true, stored: "local" };
  }
}
