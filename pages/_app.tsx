import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import "../styles/main.css";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider
			theme={{ colorScheme: "dark" }}
			withGlobalStyles
			withNormalizeCSS
		>
			<Component {...pageProps} />
		</MantineProvider>
	);
}

export default MyApp;
