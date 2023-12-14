import { site } from "../config/site.ts";


export async function GET({params, request}) {
	return new Response(
		JSON.stringify({
			name: site.name,
			short_name: site.name,
			theme_color: "#ffffff",
			background_color: "#ffffff",
			display: "standalone",
			scope: "/",
			start_url: "/"
		})
	)
}