export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","logo.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.d15d4273.mjs","imports":["_app/immutable/entry/start.d15d4273.mjs","_app/immutable/chunks/index.3da1513a.mjs","_app/immutable/chunks/singletons.5ac1ea63.mjs"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.87fe3d3e.mjs","imports":["_app/immutable/entry/app.87fe3d3e.mjs","_app/immutable/chunks/index.3da1513a.mjs"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/roster",
				pattern: /^\/roster\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
