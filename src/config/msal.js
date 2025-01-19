import { LogLevel } from '@/lib/logger';
import { PublicClientApplication } from "@azure/msal-browser";

export const b2cPolicies = {
	names: {
		signUpSignIn: 'B2C_1_signupsignin1',
		forgotPassword: 'B2C_1_reset_password',
		editProfile: 'B2C_1_edit_profile',
	},
	authorities: {
		signUpSignIn: {
			authority: 'https://myyorkorg.b2clogin.com/myyorkorg.onmicrosoft.com/B2C_1_signupsignin1',
		},
		forgotPassword: {
			authority: 'https://myyorkorg.b2clogin.com/myyorkorg.onmicrosoft.com/B2C_1_reset_password',
		},
		editProfile: {
			authority: 'https://myyorkorg.b2clogin.com/myyorkorg.onmicrosoft.com/B2C_1_edit_profile',
		},
	},
	authorityDomain: 'myyorkorg.b2clogin.com',
};

const config = {
	msal: {
		auth: {
			clientId: process.env.NEXT_PUBLIC_MSAL_AUTH_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
			authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
			knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
			redirectUri: process.env.NEXT_PUBLIC_MSAL_AUTH_REDIRECT_URI, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
			postLogoutRedirectUri: process.env.NEXT_PUBLIC_MSAL_AUTH_POST_LOGOUT_REDIRECT_URI, // Indicates the page to navigate after logout.
			navigateToLoginRequestUrl: Boolean(process.env.MSAL_AUTH_NAVIGATE_TO_LOGIN_REQUEST_URI), // If "true", will navigate back to the original request location before processing the auth code response.
		},
		cache: {
			cacheLocation: process.env.NEXT_PUBLIC_MSAL_AUTH_CACHE_LOCATION, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
			storeAuthStateInCookie: Boolean(process.env.NEXT_PUBLIC_MSAL_AUTH_CACHE_STORE_AUTH_STATE_IN_COOKIE), // Set this to "true" if you are having issues on IE11 or Edge
			// storeAuthStateInCookie: isIE || isEdge || isFirefox
		},
		system: {
			loggerOptions: {
				loggerCallback: (level, message, containsPii) => {
					if (containsPii) {
						return;
					}
					switch (level) {
						case LogLevel.ERROR: {
							console.error(message);
							return;
						}
						case LogLevel.Info: {
							console.info(message);
							return;
						}
						case LogLevel.ALL: {
							console.debug(message);
							return;
						}
						case LogLevel.WARN: {
							console.warn(message);
							return;
						}
						default: {
							return;
						}
					}
				},
			},
		},
	},
};

export const msalInstance = new PublicClientApplication(config.msal);

export const LOGIN_SCOPE = {
	scopes: ["email", "openid", "profile", "offline_access", "https://myyorkorg.onmicrosoft.com/cupe-api/cupejobs.read", "https://myyorkorg.onmicrosoft.com/cupe-api/cupejobs.write"],
	authority: b2cPolicies.authorities.signUpSignIn.authority,
};