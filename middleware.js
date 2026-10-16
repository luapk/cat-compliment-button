/* Password gate for the whole site, run by Vercel before any file is served
   (Vercel Routing Middleware). Without the password nothing is sent: not the
   page, not the code, not the recordings. Only the login page's own font, logo
   and stylesheet (fonts/ and assets/) are public.

   The password is checked against a hash, never stored as text. Two sources:
   - SITE_PASSWORD, an environment variable in Vercel (Settings > Environment
     Variables). If set, it wins. Change it and redeploy to change the
     password; everyone then has to enter the new one.
   - Otherwise BUILT_IN_HASH below, the hash of the launch password. To change
     it without the variable, replace it with the output of:
       printf 'cat-compliment-button:NEWPASSWORD' | shasum -a 256 */

export const config = {
  matcher: "/((?!fonts/|assets/).*)"
};

const BUILT_IN_HASH = "a29b8f9f4a387885561f9774d1f24617ce3078036cb47f54413351fe36a95580";

const COOKIE = "cb_pass";
const LOGIN = "/__login";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

// The cookie holds a hash of the password, not the password, and changes
// whenever the password does.
async function tokenFor(password) {
  const data = new TextEncoder().encode(`cat-compliment-button:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function readCookie(request, name) {
  const match = (request.headers.get("cookie") || "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? match[1] : null;
}

// Compares without stopping at the first difference.
function same(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const CSP = "default-src 'none'; style-src 'self'; img-src 'self'; font-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'self'";

function loginPage(wrong) {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="#FFD21F">
  <title>Temptations Cat Compliment Button</title>
  <link rel="icon" href="/assets/icon-32.png" sizes="32x32" type="image/png">
  <link rel="stylesheet" href="/assets/login.css">
</head>
<body>
  <main class="card">
    <img class="logo" src="/assets/temptations-logo.png" alt="Temptations">
    <h1>Password, please</h1>
    <form method="post" action="${LOGIN}">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" autocapitalize="none" autocorrect="off" spellcheck="false" required autofocus${wrong ? ' aria-describedby="wrong" aria-invalid="true"' : ""}>
      ${wrong ? '<p class="wrong" id="wrong" role="alert">That’s not it. Try again.</p>' : ""}
      <button type="submit">Let me in</button>
    </form>
  </main>
</body>
</html>`;
  return new Response(html, {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": CSP,
      "X-Robots-Tag": "noindex"
    }
  });
}

export default async function middleware(request) {
  const secret = process.env.SITE_PASSWORD;
  const expected = secret ? await tokenFor(secret) : BUILT_IN_HASH;
  const url = new URL(request.url);

  if (url.pathname === LOGIN) {
    if (request.method !== "POST") return Response.redirect(new URL("/", url), 303);
    const form = await request.formData().catch(() => null);
    const given = form ? String(form.get("password") || "") : "";
    if (expected && given && same(await tokenFor(given), expected)) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: "/",
          "Cache-Control": "no-store",
          "Set-Cookie": `${COOKIE}=${expected}; Path=/; Max-Age=${THIRTY_DAYS}; HttpOnly; Secure; SameSite=Lax`
        }
      });
    }
    return loginPage(true);
  }

  if (expected && same(readCookie(request, COOKIE), expected)) return; // in: serve the site
  return loginPage(false);
}
