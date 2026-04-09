/* ══════════════════════════════════════════════
   Wix Headless SDK — Client singleton
   ══════════════════════════════════════════════ */

import { createClient, OAuthStrategy } from '@wix/sdk'
import { items } from '@wix/data'

const WIX_CLIENT_ID = import.meta.env.VITE_WIX_CLIENT_ID

if (!WIX_CLIENT_ID) {
    console.warn('[Wix] VITE_WIX_CLIENT_ID not set — CMS data will not load.')
}

const wixClient = WIX_CLIENT_ID
    ? createClient({
          modules: { items },
          auth: OAuthStrategy({ clientId: WIX_CLIENT_ID }),
      })
    : null

export default wixClient
