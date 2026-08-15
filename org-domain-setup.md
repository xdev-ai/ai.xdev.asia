# xDev AI organization and domain setup

## Verified organization

The GitHub organization has been created at [github.com/xdev-ai](https://github.com/xdev-ai). Its profile has been updated through the signed-in GitHub settings interface: the new shield-and-trace mark logo is set as the organization avatar, the public email is `hello@xdev.asia`, the description presents xDev AI as the open engineering organization maintaining AI-SDLC, and the profile URL points to `https://ai.xdev.asia`. The integration token can read organization metadata but does not have permission to update organization settings.

## Brand architecture

**xDev AI** is the umbrella brand hosted at `ai.xdev.asia`; **AI-SDLC** is its first product, served under the path `ai.xdev.asia/ai-sdlc`. Future products and showcases will be added as sibling paths under the same umbrella domain (for example, `ai.xdev.asia/<product>`), and the portal's own content is intentionally written so the umbrella can grow without rebranding.

## Intended identity

| Surface | Intended value |
|---|---|
| GitHub organization handle | `xdev-ai` |
| GitHub organization display name | `xDev AI` |
| Umbrella brand domain | `ai.xdev.asia` |
| First product | `AI-SDLC` at path `ai.xdev.asia/ai-sdlc` |
| Initial public repository | `xdev-ai/ai-sdlc` after an explicitly approved repository transfer |
| Logo | Shield-and-trace mark (navy shield, cyan X trace, amber nodes) — see `client/public/brand/` |

## Domain prerequisites

The `ai.xdev.asia` subdomain can be connected only after its DNS zone is available to the domain owner. The eventual target depends on hosting: for the Manus-published AI-SDLC site, configure the custom-domain record requested in the Manus project settings; for GitHub Pages, configure GitHub Pages' requested CNAME/TXT verification records. Do not change DNS until the selected hosting target presents its exact values.
