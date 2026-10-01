import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { $ as CalendarCheck, A as PanelLeftClose, B as FilePen, C as Radio, D as PenLine, E as Play, F as ListCheck, G as Clock, H as Download, I as Layers, J as ChevronRight, K as CirclePlus, L as GraduationCap, M as Milestone, N as Maximize2, O as Pause, P as Map, Q as Calendar, R as GitCommitHorizontal, S as RefreshCw, T as Plus, U as Cpu, V as FileBraces, W as Compass, X as Check, Y as ChevronDown, Z as ChartColumn, _ as ShieldHalf, a as TriangleAlert, at as Activity, b as ScanEye, c as Terminal, d as Swords, et as BrainCircuit, f as Square, g as Shield, h as Skull, i as Trophy, it as ArrowRight, j as Minimize2, k as PanelLeftOpen, l as Target, m as Sparkles, n as X, nt as Binary, o as Trash2, p as SquareCheckBig, q as CircleCheck, r as Upload, rt as Award, s as Timer, t as Zap, tt as BookOpen, u as Tag, v as ShieldCheck, w as Quote, x as RotateCcw, y as ShieldAlert, z as Flame } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DlqxJjMY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function RedFoxLogo({ className, size = 32, glow = true }) {
	const pixelSize = typeof size === "number" ? `${size}px` : size;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative inline-flex items-center justify-center shrink-0 select-none", className),
		style: {
			width: pixelSize,
			height: pixelSize
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			className: cn("w-full h-full object-contain transition-all duration-300", glow && "drop-shadow-[0_0_14px_rgba(230,57,70,0.6)]"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "rfFoxEye",
						x1: "0%",
						y1: "0%",
						x2: "0%",
						y2: "100%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#FFA000"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#E65100"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "rfForeheadOrange",
						x1: "0%",
						y1: "0%",
						x2: "0%",
						y2: "100%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#FF7A29"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#E64A19"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "rfCheekOrange",
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "100%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#FF5722"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#D32F2F"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M50 96 C40 91 22 75 16 57 C13 47 21 34 19 14 L36 27 L50 33 L64 27 L81 14 C79 34 87 47 84 57 C78 75 60 91 50 96 Z",
					fill: "#0B0F19",
					stroke: "#E63946",
					strokeWidth: "1.6",
					strokeLinejoin: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "20,16 35,27 23,38",
					fill: "#1A2234"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "23,20 33,28 26,35",
					fill: "#F1F5F9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "25,23 32,28 27,33",
					fill: "#0F172A"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "80,16 65,27 77,38",
					fill: "#1A2234"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "77,20 67,28 74,35",
					fill: "#F1F5F9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "75,23 68,28 73,33",
					fill: "#0F172A"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "50,33 35,27 50,44",
					fill: "#FF7A29"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "50,33 65,27 50,44",
					fill: "#F55A1B"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "35,27 23,38 41,43",
					fill: "#E64A19"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "65,27 77,38 59,43",
					fill: "#C62828"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "50,44 41,43 50,58",
					fill: "#FF6D00"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "50,44 59,43 50,58",
					fill: "#E65100"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "41,43 23,38 31,52",
					fill: "url(#rfCheekOrange)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "59,43 77,38 69,52",
					fill: "#BA1A28"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "23,38 17,56 31,54",
					fill: "#C62828"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "77,38 83,56 69,54",
					fill: "#991B1B"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "17,56 27,70 33,62",
					fill: "#E63946"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "83,56 73,70 67,62",
					fill: "#BA1A28"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "32,49 44,51 35,55",
					fill: "#0B0F19"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "34,50.3 42,51.8 36,54",
					fill: "url(#rfFoxEye)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "38",
					cy: "52",
					r: "1.3",
					fill: "#0B0F19"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "39",
					cy: "51.5",
					r: "0.6",
					fill: "#FFFFFF"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "68,49 56,51 65,55",
					fill: "#0B0F19"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "66,50.3 58,51.8 64,54",
					fill: "url(#rfFoxEye)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "62",
					cy: "52",
					r: "1.3",
					fill: "#0B0F19"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "61",
					cy: "51.5",
					r: "0.6",
					fill: "#FFFFFF"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "50,58 43,54 50,68",
					fill: "#F57C00"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "50,58 57,54 50,68",
					fill: "#E65100"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "43,54 36,63 45,66",
					fill: "#FB8C00"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "57,54 64,63 55,66",
					fill: "#EF6C00"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "31,54 18,60 33,63",
					fill: "#FFFFFF"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "69,54 82,60 67,63",
					fill: "#E2E8F0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "33,63 24,71 37,69",
					fill: "#F8FAFC"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "67,63 76,71 63,69",
					fill: "#CBD5E1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M44 68 C44 72 47 74 50 74 C53 72 56 74 56 68 Z",
					fill: "#FFFFFF"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M44 71 C47 75 50 75 50 75 C50 75 53 75 56 71 C57 76 54 81 50 83 C46 81 43 76 44 71 Z",
					fill: "#F1F5F9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M45.5 66 C47 64.5 53 64.5 54.5 66 C55.5 67.5 50 71 50 71 C50 71 44.5 67.5 45.5 66 Z",
					fill: "#0F172A",
					stroke: "#1E293B",
					strokeWidth: "0.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "50,83 40,78 50,92",
					fill: "#FFFFFF"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "50,83 60,78 50,92",
					fill: "#E2E8F0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "40,78 28,72 38,84 50,92",
					fill: "#1E293B"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "60,78 72,72 62,84 50,92",
					fill: "#0F172A"
				})
			]
		})
	});
}
var NAV_ITEMS = [
	{
		id: "today",
		label: "Today",
		icon: CalendarCheck
	},
	{
		id: "roadmaps",
		label: "Roadmaps",
		icon: Map
	},
	{
		id: "reality",
		label: "Re-Check",
		icon: ScanEye
	},
	{
		id: "stats",
		label: "Stats",
		icon: ChartColumn
	}
];
function DesktopSidebar({ activeTab = "today", setActiveTab, onTabChange, onReplayIntro }) {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const handleTabClick = (tab) => {
		setActiveTab?.(tab);
		onTabChange?.(tab);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("hidden lg:flex shrink-0 flex-col border-r border-border bg-surface/60 transition-[width] duration-200", collapsed ? "w-[68px]" : "w-[232px]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-16 items-center border-b border-border px-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onReplayIntro,
					className: "flex w-full items-center gap-2.5 rounded-md p-1 text-left group cursor-pointer hover:text-primary transition-colors focus:outline-none",
					title: "Replay System Intro",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 shrink-0 place-items-center rounded-md border border-border/80 bg-background/80 group-hover:border-[#E63946]/50 transition-all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedFoxLogo, {
							size: 22,
							glow: false,
							className: "group-hover:scale-110 transition-transform"
						})
					}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-mono text-[11px] font-bold tracking-[0.22em] text-foreground/80 group-hover:text-[#E63946] transition-colors",
						children: "REDFOX"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-1 flex-col gap-1 p-3",
				children: NAV_ITEMS.map((item) => {
					const isActive = activeTab === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleTabClick(item.id),
						className: cn("group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors", isActive ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground", collapsed && "justify-center px-0"),
						children: [
							isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("size-4 shrink-0", isActive && "text-primary") }),
							!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item.label
							})
						]
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setCollapsed((c) => !c),
				className: "flex items-center gap-3 border-t border-border px-4 py-3 text-muted-foreground transition-colors hover:text-foreground",
				children: [collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "size-4" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs",
					children: "Collapse"
				})]
			})
		]
	});
}
function MobileBottomNav({ activeTab = "today", setActiveTab, onTabChange }) {
	const handleTabClick = (tab) => {
		setActiveTab?.(tab);
		onTabChange?.(tab);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur lg:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4",
			children: NAV_ITEMS.map((item) => {
				const isActive = activeTab === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => handleTabClick(item.id),
					className: cn("flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-wide transition-colors", isActive ? "text-primary" : "text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-[18px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: item.label
					})]
				}, item.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[env(safe-area-inset-bottom)]" })]
	});
}
var PRIORITY_LABEL = {
	critical: "CRITICAL",
	normal: "NORMAL",
	low: "LOW PRIORITY"
};
var TAG_OPTIONS = [
	"LAB",
	"EXAM",
	"STUDY",
	"BUILD",
	"ROOM",
	"CLASS",
	"SHIP",
	"READ"
];
var DURATION_PRESETS = [
	{
		label: "25m",
		minutes: 25
	},
	{
		label: "45m",
		minutes: 45
	},
	{
		label: "60m",
		minutes: 60
	},
	{
		label: "90m",
		minutes: 90
	},
	{
		label: "120m",
		minutes: 120
	}
];
function formatDuration(minutes) {
	if (!minutes || minutes <= 0) return "25m";
	if (minutes < 60) return `${minutes}m`;
	const hrs = Math.floor(minutes / 60);
	const rem = minutes % 60;
	return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}
var BOARD_META = {
	cyber: {
		title: "Cybersecurity Track",
		subtitle: "Offensive ops · labs · certs"
	},
	gold: {
		title: "Academics & Labs",
		subtitle: "Coursework · deadlines · attendance"
	},
	emerald: {
		title: "AIML & Extra",
		subtitle: "Builds · research · side quests"
	}
};
var QUOTES = [
	{
		text: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
		author: "Dr. A.P.J. Abdul Kalam"
	},
	{
		text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
		author: "Marcus Aurelius"
	},
	{
		text: "Excellence is a continuous process and not an accident.",
		author: "Dr. A.P.J. Abdul Kalam"
	}
];
var BOARDS = [
	{
		id: "cyber",
		...BOARD_META.cyber,
		tasks: []
	},
	{
		id: "gold",
		...BOARD_META.gold,
		tasks: []
	},
	{
		id: "emerald",
		...BOARD_META.emerald,
		tasks: []
	}
];
var DEFAULT_ROADMAPS = {
	cyber: {
		trackId: "cyber",
		title: "Cybersecurity Path",
		code: "CYSEC-01",
		subtitle: "Offensive Ops, Active Directory & Enterprise Hardening",
		accentColor: "cyber",
		hexColor: "#00E5FF",
		nodes: []
	},
	academics: {
		trackId: "academics",
		title: "Academics & Core CS",
		code: "ACAD-01",
		subtitle: "Operating Systems, Algorithms & Engineering Theory",
		accentColor: "gold",
		hexColor: "#FFB300",
		nodes: []
	},
	aiml: {
		trackId: "aiml",
		title: "AI / Machine Learning",
		code: "AIML-01",
		subtitle: "Deep Learning, PyTorch & LLM Systems",
		accentColor: "emerald",
		hexColor: "#10B981",
		nodes: []
	}
};
var ROADMAPS_KEY = "pcc_roadmaps";
function loadRoadmaps() {
	try {
		const raw = window.localStorage.getItem(ROADMAPS_KEY);
		if (!raw) return DEFAULT_ROADMAPS;
		const parsed = JSON.parse(raw);
		if (parsed && parsed.cyber && parsed.academics && parsed.aiml) {
			if (parsed.cyber?.nodes?.length > 0 && parsed.cyber.nodes[0]?.id === "cy-01" && parsed.academics?.nodes?.[0]?.id === "acad-01") {
				saveRoadmaps(DEFAULT_ROADMAPS);
				return DEFAULT_ROADMAPS;
			}
			return parsed;
		}
		return DEFAULT_ROADMAPS;
	} catch {
		return DEFAULT_ROADMAPS;
	}
}
function saveRoadmaps(roadmaps) {
	try {
		window.localStorage.setItem(ROADMAPS_KEY, JSON.stringify(roadmaps));
	} catch {}
}
function calculateNodeProgress(node) {
	if (!node.subTasks || node.subTasks.length === 0) return node.status === "completed" ? 100 : 0;
	const completed = node.subTasks.filter((st) => st.completed).length;
	return Math.round(completed / node.subTasks.length * 100);
}
function calculateTrackProgress(nodes) {
	if (nodes.length === 0) return 0;
	const totalSubTasks = nodes.reduce((sum, n) => sum + (n.subTasks.length || 1), 0);
	const completedSubTasks = nodes.reduce((sum, n) => {
		if (n.subTasks.length === 0) return sum + (n.status === "completed" ? 1 : 0);
		return sum + n.subTasks.filter((st) => st.completed).length;
	}, 0);
	return totalSubTasks > 0 ? Math.round(completedSubTasks / totalSubTasks * 100) : 0;
}
function pillarToTrackId(pillar) {
	if (pillar === "cyber") return "cyber";
	if (pillar === "gold") return "academics";
	return "aiml";
}
/**
* Updates a roadmap checklist item's completion status, recalculates the parent node's
* status and progress, persists to localStorage, and dispatches the update event for live UI sync.
*/
function setRoadmapChecklistItemCompletion(nodeId, checklistItemId, completed) {
	const roadmaps = loadRoadmaps();
	let affectedTrackId = null;
	let affectedNodes = null;
	for (const tid of [
		"cyber",
		"academics",
		"aiml"
	]) {
		const track = roadmaps[tid];
		if (!track) continue;
		const nodeIndex = track.nodes.findIndex((n) => n.id === nodeId);
		if (nodeIndex !== -1) {
			affectedTrackId = tid;
			const targetNode = track.nodes[nodeIndex];
			const subTasks = (targetNode.subTasks || []).map((st) => st.id === checklistItemId ? {
				...st,
				completed
			} : st);
			const allCompleted = subTasks.length > 0 && subTasks.every((st) => st.completed);
			let newStatus = targetNode.status;
			if (allCompleted) newStatus = "completed";
			else if (targetNode.status === "completed" && !allCompleted) newStatus = "active";
			const updatedNode = {
				...targetNode,
				subTasks,
				status: newStatus
			};
			affectedNodes = track.nodes.map((n, idx) => idx === nodeIndex ? updatedNode : n);
			roadmaps[tid] = {
				...track,
				nodes: affectedNodes
			};
			break;
		}
	}
	if (affectedTrackId && affectedNodes) {
		saveRoadmaps(roadmaps);
		if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("pcc-roadmaps-updated", { detail: {
			trackId: affectedTrackId,
			nodes: affectedNodes
		} }));
		return {
			updatedTrackId: affectedTrackId,
			updatedNodes: affectedNodes
		};
	}
	return null;
}
var HARD_TRUTHS = [
	{
		id: "truth-1",
		theme: "discipline",
		quote: "Every hour lost to cheap algorithms delays your independence and security.",
		subtext: "You are trading permanent mastery for 15-second synthetic dopamine loops."
	},
	{
		id: "truth-2",
		theme: "family",
		quote: "Comfort now is debt paid with interest tomorrow by you and the people who depend on you.",
		subtext: "Your family's future stability is purchased with the uncomfortable hours you put in right now."
	},
	{
		id: "truth-3",
		theme: "mastery",
		quote: "The top 1% in Cyber, Systems, and AI do not doomscroll. They build when they are tired.",
		subtext: "While you scroll, someone else is dissecting the kernel, breaking the AD domain, and training the model."
	},
	{
		id: "truth-4",
		theme: "future",
		quote: "In 3 years, you will either celebrate relentless consistency or mourn wasted potential.",
		subtext: "There is no middle ground. The algorithm was designed by PhDs to steal your ambition."
	}
];
var WASTE_COSTS = [
	{
		durationMinutes: 15,
		label: "15 Minutes",
		costDescription: "45-60 micro-reels consumed with zero retained knowledge or synaptic value.",
		alternateGain: "1 TryHackMe room breakdown OR reading 2 technical RFC pages."
	},
	{
		durationMinutes: 30,
		label: "30 Minutes",
		costDescription: "Elevated brain fog, shattered baseline attention span, and 30m delayed bedtime.",
		alternateGain: "1 complete LeetCode Medium derivation OR 5 CTF challenge recon sweeps."
	},
	{
		durationMinutes: 60,
		label: "1 Hour",
		costDescription: "Severe dopamine depletion, heightened anxiety, and complete momentum collapse.",
		alternateGain: "Writing an entire custom Python exploit script OR studying 1 full OS textbook chapter."
	},
	{
		durationMinutes: 120,
		label: "2 Hours",
		costDescription: "Loss of an entire operational evening. Regret, guilt, and reduced sleep quality.",
		alternateGain: "Full end-to-end Active Directory lab setup OR training a baseline transformer model."
	}
];
var DEFAULT_MICRO_ACTIONS = [
	{
		id: "act-1",
		title: "Read 3 pages of technical documentation / notes",
		category: "acad",
		estimatedMinutes: 5,
		directive: "Open your active OS/DSA notes or RFC docs. Read 3 pages with laser focus."
	},
	{
		id: "act-2",
		title: "Solve 1 basic bug or write 1 script snippet",
		category: "cyber",
		estimatedMinutes: 5,
		directive: "Write a 15-line Bash/Python automation or analyze 1 Wireshark filter syntax."
	},
	{
		id: "act-3",
		title: "Review 1 CySec tool syntax / CVE exploit writeup",
		category: "cyber",
		estimatedMinutes: 5,
		directive: "Analyze 1 recent NVD CVE entry or review Mimikatz / BloodHound flags."
	},
	{
		id: "act-4",
		title: "Derive 1 mathematical or tensor equation step",
		category: "aiml",
		estimatedMinutes: 5,
		directive: "Write down the self-attention formula or autograd chain-rule step on paper."
	}
];
var INTERCEPTS_KEY = "pcc_intercepts";
function loadInterceptsCount() {
	try {
		const raw = window.localStorage.getItem(INTERCEPTS_KEY);
		if (!raw || raw === "12") return 0;
		const parsed = parseInt(raw, 10);
		return isNaN(parsed) ? 0 : parsed;
	} catch {
		return 0;
	}
}
function saveInterceptsCount(count) {
	try {
		window.localStorage.setItem(INTERCEPTS_KEY, String(count));
	} catch {}
}
var supabaseUrl = "https://ojlgqwtwbapjrmmijuev.supabase.co";
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qbGdxd3R3YmFwanJtbWlqdWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNzU1NzMsImV4cCI6MjEwNDk1MTU3M30.Lbi04zyXRu0J5v-7h_NAQ4BBu-ShPV65Ck_4nwkiG2A";
var isSupabaseConfigured = Boolean(supabaseUrl.startsWith("http") && !supabaseUrl.includes("placeholder"));
var globalAny = globalThis;
var supabase = globalAny.__supabaseInstance || (globalAny.__supabaseInstance = createClient(isSupabaseConfigured ? supabaseUrl : "https://placeholder.supabase.co", isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key", {
	auth: {
		persistSession: false,
		autoRefreshToken: false,
		detectSessionInUrl: false
	},
	realtime: { params: { eventsPerSecond: 10 } }
}));
var TASKS_KEY = "pcc_tasks";
var HISTORY_KEY$1 = "pcc_history";
var syncListeners = /* @__PURE__ */ new Set();
var currentSyncStatus = isSupabaseConfigured ? "syncing" : "offline";
var pulseTimeout = null;
function getSyncStatus() {
	return currentSyncStatus;
}
function setSyncStatus(status) {
	currentSyncStatus = status;
	syncListeners.forEach((fn) => fn(status));
}
/** Brief 400ms pulse to indicate an inbound realtime sync event before reverting to steady state */
function triggerSyncPulse(durationMs = 400) {
	if (pulseTimeout) clearTimeout(pulseTimeout);
	setSyncStatus("syncing");
	pulseTimeout = setTimeout(() => {
		setSyncStatus(isSupabaseConfigured ? "synced" : "offline");
		pulseTimeout = null;
	}, durationMs);
}
function subscribeSyncStatus(listener) {
	syncListeners.add(listener);
	listener(currentSyncStatus);
	return () => {
		syncListeners.delete(listener);
	};
}
if (typeof window !== "undefined") {
	window.addEventListener("online", () => {
		if (isSupabaseConfigured) {
			setSyncStatus("syncing");
			syncAllFromSupabase().catch(() => setSyncStatus("offline"));
		}
	});
	window.addEventListener("offline", () => {
		setSyncStatus("offline");
	});
}
function normalizeTask(rawTask) {
	const id = typeof rawTask.id === "string" ? rawTask.id : `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
	const tag = typeof rawTask.tag === "string" ? rawTask.tag : "STUDY";
	const title = typeof rawTask.title === "string" ? rawTask.title : "Untitled Objective";
	const description = typeof rawTask.description === "string" ? rawTask.description : void 0;
	const priority = rawTask.priority === "critical" || rawTask.priority === "normal" || rawTask.priority === "low" ? rawTask.priority : "normal";
	const durationMinutes = typeof rawTask.durationMinutes === "number" && rawTask.durationMinutes > 0 ? rawTask.durationMinutes : 45;
	const done = Boolean(rawTask.done || rawTask.completed);
	return {
		id,
		tag,
		title,
		description,
		priority,
		durationMinutes,
		actualFocusMinutes: typeof rawTask.actualFocusMinutes === "number" ? rawTask.actualFocusMinutes : typeof rawTask.actual_focus_minutes === "number" ? rawTask.actual_focus_minutes : done ? durationMinutes : 0,
		slot: typeof rawTask.slot === "string" ? rawTask.slot : void 0,
		date: typeof rawTask.date === "string" ? rawTask.date : void 0,
		done,
		node_id: typeof rawTask.node_id === "string" ? rawTask.node_id : typeof rawTask.nodeId === "string" ? rawTask.nodeId : void 0,
		checklist_item_id: typeof rawTask.checklist_item_id === "string" ? rawTask.checklist_item_id : typeof rawTask.checklistItemId === "string" ? rawTask.checklistItemId : void 0
	};
}
function isBoardArray(value) {
	return Array.isArray(value) && value.every((b) => b && typeof b === "object" && typeof b.id === "string" && Array.isArray(b.tasks));
}
/** Read persisted boards from localStorage; falls back to default boards. */
function loadBoards() {
	try {
		const raw = window.localStorage.getItem(TASKS_KEY);
		if (!raw) return BOARDS;
		const parsed = JSON.parse(raw);
		if (isBoardArray(parsed)) {
			const allTaskIds = parsed.flatMap((b) => b.tasks.map((t) => t.id));
			const legacyMockIds = /* @__PURE__ */ new Set([
				"c1",
				"c2",
				"c3",
				"c4",
				"c5",
				"a1",
				"a2",
				"a3",
				"a4",
				"m1",
				"m2",
				"m3"
			]);
			if (allTaskIds.length > 0 && allTaskIds.every((id) => legacyMockIds.has(id))) {
				saveBoards(BOARDS);
				return BOARDS;
			}
			return parsed.map((board) => ({
				...board,
				tasks: board.tasks.map(normalizeTask)
			}));
		}
		return BOARDS;
	} catch {
		return BOARDS;
	}
}
/** Persist the full boards/tasks array to localStorage. */
function saveBoards(boards) {
	try {
		window.localStorage.setItem(TASKS_KEY, JSON.stringify(boards));
	} catch {}
}
function todayKey(offsetDays = 0) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() - offsetDays);
	return d.toISOString().slice(0, 10);
}
function recordCompletion(completion) {
	let history = {};
	try {
		const raw = window.localStorage.getItem(HISTORY_KEY$1);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) history = parsed;
		}
	} catch {
		history = {};
	}
	history[todayKey()] = completion;
	try {
		window.localStorage.setItem(HISTORY_KEY$1, JSON.stringify(history));
	} catch {}
	let streak = 0;
	let offset = (history[todayKey()] ?? 0) > 0 ? 0 : 1;
	while ((history[todayKey(offset)] ?? 0) > 0) {
		streak += 1;
		offset += 1;
	}
	if (isSupabaseConfigured) persistUserStatsToSupabase(streak, loadInterceptsCount(), history).catch(() => {});
	return streak;
}
function readStreak() {
	try {
		const raw = window.localStorage.getItem(HISTORY_KEY$1);
		if (!raw) return 0;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return 0;
		const history = parsed;
		let streak = 0;
		let offset = (history[todayKey()] ?? 0) > 0 ? 0 : 1;
		while ((history[todayKey(offset)] ?? 0) > 0) {
			streak += 1;
			offset += 1;
		}
		return streak;
	} catch {
		return 0;
	}
}
function toSupabaseTaskPayload(task, pillar) {
	const payload = {
		id: task.id,
		title: task.title,
		tag: task.tag,
		description: task.description || null,
		priority: task.priority,
		completed: task.done,
		duration_minutes: task.durationMinutes ?? 45,
		actual_focus_minutes: task.actualFocusMinutes ?? 0,
		pillar,
		slot: task.slot || null,
		date: task.date || null
	};
	if (task.node_id) payload.node_id = task.node_id;
	if (task.checklist_item_id) payload.checklist_item_id = task.checklist_item_id;
	return payload;
}
function getTaskPillar(row, fallback = "cyber") {
	const val = String(row.pillar || row.board_id || row.pillar_id || "").toLowerCase();
	if (val === "cyber" || val === "academics" || val === "aiml") return val;
	return fallback;
}
function fromSupabaseTaskPayload(row) {
	const isDone = row.completed !== void 0 ? Boolean(row.completed) : row.done !== void 0 ? Boolean(row.done) : row.status === "completed" || row.status === "done";
	const durationMinutes = typeof row.duration_minutes === "number" && row.duration_minutes > 0 ? row.duration_minutes : typeof row.durationMinutes === "number" && row.durationMinutes > 0 ? row.durationMinutes : 45;
	const actualFocusMinutes = typeof row.actual_focus_minutes === "number" ? row.actual_focus_minutes : typeof row.actualFocusMinutes === "number" ? row.actualFocusMinutes : isDone ? durationMinutes : 0;
	const node_id = typeof row.node_id === "string" ? row.node_id : typeof row.nodeId === "string" ? row.nodeId : void 0;
	const checklist_item_id = typeof row.checklist_item_id === "string" ? row.checklist_item_id : typeof row.checklistItemId === "string" ? row.checklistItemId : void 0;
	return {
		id: String(row.id),
		title: String(row.title || "Untitled Objective"),
		tag: String(row.tag || "STUDY"),
		description: typeof row.description === "string" ? row.description : void 0,
		priority: row.priority === "critical" || row.priority === "low" || row.priority === "normal" ? row.priority : "normal",
		done: isDone,
		durationMinutes,
		actualFocusMinutes,
		slot: typeof row.slot === "string" ? row.slot : void 0,
		date: typeof row.date === "string" ? row.date : void 0,
		node_id,
		checklist_item_id
	};
}
/**
* Sync all active tasks, roadmap nodes, and user stats from Supabase.
* - If Supabase returns empty rows (first launch), seeds with default state / localStorage.
* - Gracefully falls back to localStorage if offline or network fails.
*/
async function syncAllFromSupabase() {
	if (!isSupabaseConfigured || typeof navigator !== "undefined" && !navigator.onLine) {
		setSyncStatus("offline");
		return {
			boards: loadBoards(),
			roadmaps: loadRoadmaps(),
			streak: readStreak(),
			intercepts: loadInterceptsCount(),
			isCloud: false
		};
	}
	setSyncStatus("syncing");
	try {
		let finalBoards = loadBoards();
		try {
			const { data: taskRows, error: taskErr } = await supabase.from("tasks").select("*");
			if (taskErr) throw taskErr;
			if (!taskRows || taskRows.length === 0) {
				const seedRows = finalBoards.flatMap((board) => board.tasks.map((task) => toSupabaseTaskPayload(task, board.id)));
				if (seedRows.length > 0) await supabase.from("tasks").insert(seedRows);
			} else {
				finalBoards = BOARDS.map((board) => {
					const matchingTasks = taskRows.filter((row) => (row.pillar || row.board_id) === board.id).map(fromSupabaseTaskPayload);
					return {
						...board,
						tasks: matchingTasks.length > 0 ? matchingTasks : []
					};
				});
				saveBoards(finalBoards);
			}
		} catch (taskError) {
			console.warn("[REDFOX Supabase] Tasks sync error, falling back to local:", taskError);
		}
		let finalRoadmaps = loadRoadmaps();
		try {
			const { data: roadmapRows, error: roadErr } = await supabase.from("roadmaps").select("*");
			if (roadErr) throw roadErr;
			if (!roadmapRows || roadmapRows.length === 0) {
				const seedRoadmapRows = [
					"cyber",
					"academics",
					"aiml"
				].map((trackId) => ({
					id: trackId,
					track: trackId,
					track_id: trackId,
					nodes: finalRoadmaps[trackId]?.nodes || DEFAULT_ROADMAPS[trackId].nodes,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}));
				await supabase.from("roadmaps").upsert(seedRoadmapRows, { onConflict: "id" });
			} else {
				const nextRoadmaps = { ...finalRoadmaps };
				roadmapRows.forEach((row) => {
					const trackKey = row.track_id || row.track || row.id;
					if (trackKey && nextRoadmaps[trackKey] && Array.isArray(row.nodes)) nextRoadmaps[trackKey] = {
						...nextRoadmaps[trackKey],
						nodes: row.nodes
					};
				});
				finalRoadmaps = nextRoadmaps;
				saveRoadmaps(finalRoadmaps);
			}
		} catch (roadmapError) {
			console.warn("[REDFOX Supabase] Roadmaps sync error, falling back to local:", roadmapError);
		}
		let finalStreak = readStreak();
		let finalIntercepts = loadInterceptsCount();
		try {
			const { data: statsRows, error: statsErr } = await supabase.from("user_stats").select("*").limit(1);
			if (statsErr) throw statsErr;
			if (!statsRows || statsRows.length === 0) await supabase.from("user_stats").upsert({
				id: "default",
				streak: finalStreak,
				intercepts: finalIntercepts,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			else {
				const row = statsRows[0];
				if (typeof row.streak === "number") finalStreak = row.streak;
				if (typeof row.intercepts === "number") {
					finalIntercepts = row.intercepts;
					saveInterceptsCount(finalIntercepts);
				}
			}
		} catch (statsError) {
			console.warn("[REDFOX Supabase] User stats sync error, falling back to local:", statsError);
		}
		setSyncStatus("synced");
		return {
			boards: finalBoards,
			roadmaps: finalRoadmaps,
			streak: finalStreak,
			intercepts: finalIntercepts,
			isCloud: true
		};
	} catch (err) {
		console.warn("[REDFOX Supabase] Cloud sync error, graceful fallback to local storage:", err);
		setSyncStatus("offline");
		return {
			boards: loadBoards(),
			roadmaps: loadRoadmaps(),
			streak: readStreak(),
			intercepts: loadInterceptsCount(),
			isCloud: false
		};
	}
}
/** Insert a newly created task into Supabase tasks table */
async function insertTaskToSupabase(task, pillar) {
	if (!isSupabaseConfigured) return;
	try {
		const payload = toSupabaseTaskPayload(task, pillar);
		const { error } = await supabase.from("tasks").insert(payload);
		if (error) {
			console.warn("[REDFOX Supabase] Failed to insert task row:", error);
			setSyncStatus("offline");
		} else setSyncStatus("synced");
	} catch (err) {
		console.warn("[REDFOX Supabase] Exception inserting task:", err);
		setSyncStatus("offline");
	}
}
/** Update an existing task row in Supabase (`completed`, `duration_minutes`, etc.) */
async function updateTaskInSupabase(task, pillar) {
	if (!isSupabaseConfigured) return;
	try {
		const updatePayload = {
			title: task.title,
			tag: task.tag,
			description: task.description || null,
			priority: task.priority,
			completed: task.done,
			duration_minutes: task.durationMinutes ?? 45,
			actual_focus_minutes: task.actualFocusMinutes ?? 0,
			slot: task.slot || null,
			date: task.date || null
		};
		if (pillar) updatePayload.pillar = pillar;
		const { error } = await supabase.from("tasks").update(updatePayload).eq("id", task.id);
		if (error) {
			console.warn("[REDFOX Supabase] Failed to update task row:", error);
			setSyncStatus("offline");
		} else setSyncStatus("synced");
	} catch (err) {
		console.warn("[REDFOX Supabase] Exception updating task row:", err);
		setSyncStatus("offline");
	}
}
/** Delete a task row by ID in Supabase */
async function deleteTaskFromSupabase(taskId) {
	if (!isSupabaseConfigured) return;
	try {
		const { error } = await supabase.from("tasks").delete().eq("id", taskId);
		if (error) {
			console.warn("[REDFOX Supabase] Failed to delete task row:", error);
			setSyncStatus("offline");
		} else setSyncStatus("synced");
	} catch (err) {
		console.warn("[REDFOX Supabase] Exception deleting task row:", err);
		setSyncStatus("offline");
	}
}
/** Upsert modified roadmap nodes for a track to the Supabase roadmaps table */
async function upsertRoadmapTrackToSupabase(trackId, nodes) {
	if (!isSupabaseConfigured) return;
	try {
		const payload = {
			id: trackId,
			track: trackId,
			track_id: trackId,
			nodes,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		const { error } = await supabase.from("roadmaps").upsert(payload, { onConflict: "id" });
		if (error) await supabase.from("roadmaps").upsert({
			track_id: trackId,
			nodes,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		setSyncStatus("synced");
	} catch (err) {
		console.warn("[REDFOX Supabase] Exception upserting roadmap track:", err);
		setSyncStatus("offline");
	}
}
/** Persist streak and dopamine intercept counters to user_stats table */
var lastPersistedStats = null;
async function persistUserStatsToSupabase(streak, intercepts, history) {
	if (!isSupabaseConfigured) return;
	if (lastPersistedStats && lastPersistedStats.streak === streak && lastPersistedStats.intercepts === intercepts && !history) return;
	lastPersistedStats = {
		streak,
		intercepts
	};
	try {
		const payload = {
			id: "default",
			streak,
			intercepts,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (history) payload.history = history;
		const { error } = await supabase.from("user_stats").upsert(payload, { onConflict: "id" });
		if (error) {
			console.warn("[REDFOX Supabase] Failed to persist user stats:", error);
			setSyncStatus("offline");
		} else setSyncStatus("synced");
	} catch (err) {
		console.warn("[REDFOX Supabase] Exception persisting user stats:", err);
		setSyncStatus("offline");
	}
}
/**
* Core React Hook for zero-refresh instant synchronization of Dashboard Boards & User Stats.
* Handles task inserts, task updates, task deletions, roadmap track updates, and streak/intercepts.
* Ensures clean channel teardown on component unmount.
*/
function usePccRealtime({ setBoards, setStreak }) {
	(0, import_react.useEffect)(() => {
		if (!isSupabaseConfigured) return;
		let isMounted = true;
		const channel = supabase.channel(`pcc-tasks-sync-${Date.now()}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "tasks"
		}, (payload) => {
			if (!isMounted) return;
			triggerSyncPulse(400);
			if (payload.eventType === "INSERT") {
				const raw = payload.new;
				const newTask = fromSupabaseTaskPayload(raw);
				const pillar = getTaskPillar(raw);
				setBoards((prevBoards) => {
					if (prevBoards.some((b) => b.tasks.some((t) => t.id === newTask.id))) return prevBoards;
					const nextBoards = prevBoards.map((b) => b.id === pillar ? {
						...b,
						tasks: [...b.tasks, newTask]
					} : b);
					saveBoards(nextBoards);
					return nextBoards;
				});
			} else if (payload.eventType === "UPDATE") {
				const raw = payload.new;
				const updatedTask = fromSupabaseTaskPayload(raw);
				const pillar = getTaskPillar(raw);
				setBoards((prevBoards) => {
					let originPillar = null;
					for (const b of prevBoards) if (b.tasks.some((t) => t.id === updatedTask.id)) {
						originPillar = b.id;
						break;
					}
					const targetPillar = pillar || originPillar || "cyber";
					let nextBoards;
					if (originPillar && originPillar !== targetPillar) nextBoards = prevBoards.map((b) => {
						if (b.id === originPillar) return {
							...b,
							tasks: b.tasks.filter((t) => t.id !== updatedTask.id)
						};
						if (b.id === targetPillar) return {
							...b,
							tasks: [...b.tasks, updatedTask]
						};
						return b;
					});
					else nextBoards = prevBoards.map((b) => {
						if (b.id === targetPillar) if (b.tasks.some((t) => t.id === updatedTask.id)) return {
							...b,
							tasks: b.tasks.map((t) => t.id === updatedTask.id ? {
								...t,
								...updatedTask,
								...payload.new,
								title: updatedTask.title || t.title,
								tag: updatedTask.tag || t.tag,
								description: updatedTask.description !== void 0 ? updatedTask.description : t.description,
								priority: updatedTask.priority || t.priority,
								done: updatedTask.done,
								durationMinutes: updatedTask.durationMinutes || t.durationMinutes,
								actualFocusMinutes: updatedTask.actualFocusMinutes !== void 0 ? updatedTask.actualFocusMinutes : t.actualFocusMinutes,
								slot: updatedTask.slot !== void 0 ? updatedTask.slot : t.slot,
								date: updatedTask.date !== void 0 ? updatedTask.date : t.date
							} : t)
						};
						else return {
							...b,
							tasks: [...b.tasks, updatedTask]
						};
						return b;
					});
					saveBoards(nextBoards);
					return nextBoards;
				});
			} else if (payload.eventType === "DELETE") {
				const raw = payload.old || payload.new;
				const deletedTaskId = String(raw?.id || payload.old?.id || "");
				if (deletedTaskId) setBoards((prevBoards) => {
					const nextBoards = prevBoards.map((b) => ({
						...b,
						tasks: b.tasks.filter((t) => t.id !== deletedTaskId)
					}));
					saveBoards(nextBoards);
					return nextBoards;
				});
			}
		}).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "roadmaps"
		}, (payload) => {
			if (!isMounted) return;
			triggerSyncPulse(400);
			if (payload.new) {
				const row = payload.new;
				const trackId = row.track_id || row.track || row.id;
				if ((trackId === "cyber" || trackId === "academics" || trackId === "aiml") && Array.isArray(row.nodes)) {
					const currentRoadmaps = loadRoadmaps();
					if (currentRoadmaps[trackId]) {
						saveRoadmaps({
							...currentRoadmaps,
							[trackId]: {
								...currentRoadmaps[trackId],
								nodes: row.nodes
							}
						});
						window.dispatchEvent(new CustomEvent("pcc-roadmaps-updated", { detail: {
							trackId,
							nodes: row.nodes
						} }));
					}
				}
			}
		}).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "user_stats"
		}, (payload) => {
			if (!isMounted) return;
			triggerSyncPulse(400);
			if (payload.new) {
				const row = payload.new;
				if (typeof row.streak === "number" && setStreak) setStreak(row.streak);
				if (typeof row.intercepts === "number") {
					saveInterceptsCount(row.intercepts);
					window.dispatchEvent(new CustomEvent("pcc-intercepts-updated", { detail: row.intercepts }));
				}
			}
		}).subscribe((status) => {
			if (status === "SUBSCRIBED") setSyncStatus("synced");
			else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") setSyncStatus("offline");
		});
		return () => {
			isMounted = false;
			supabase.removeChannel(channel);
		};
	}, [setBoards, setStreak]);
}
/**
* Permanently purges all user tasks, roadmaps, and telemetry records from Supabase cloud.
*/
async function purgeSupabaseCloudData() {
	if (!isSupabaseConfigured) return;
	try {
		await supabase.from("tasks").delete().neq("id", "___never_match___");
		for (const trackId of [
			"cyber",
			"academics",
			"aiml"
		]) await supabase.from("roadmaps").upsert({
			id: trackId,
			track: trackId,
			track_id: trackId,
			nodes: [],
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		await supabase.from("user_stats").upsert({
			id: "default",
			streak: 0,
			intercepts: 0,
			history: {},
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
	} catch (err) {
		console.warn("[REDFOX Supabase] Cloud purge error:", err);
	}
}
function DashHeader({ onReplayIntro, syncStatus: propSyncStatus }) {
	const [now, setNow] = (0, import_react.useState)(null);
	const [quoteIndex, setQuoteIndex] = (0, import_react.useState)(0);
	const [internalSyncStatus, setInternalSyncStatus] = (0, import_react.useState)(() => getSyncStatus());
	(0, import_react.useEffect)(() => {
		return subscribeSyncStatus((s) => setInternalSyncStatus(s));
	}, []);
	const syncStatus = propSyncStatus || internalSyncStatus;
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
		setQuoteIndex(Math.floor(Math.random() * QUOTES.length));
		const tick = setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
		const rotate = setInterval(() => setQuoteIndex((i) => (i + 1) % QUOTES.length), 12e3);
		return () => {
			clearInterval(tick);
			clearInterval(rotate);
		};
	}, []);
	const quote = QUOTES[quoteIndex] ?? QUOTES[0];
	const dateLabel = now ? now.toLocaleDateString("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
		year: "numeric"
	}) : "—";
	const timeLabel = now ? now.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit"
	}) : "--:--";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:grid-cols-3 lg:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex items-center gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onReplayIntro,
						className: "min-w-0 text-left group cursor-pointer hover:opacity-90 transition-opacity focus:outline-none",
						title: "Replay System Intro",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedFoxLogo, {
								size: 30,
								className: "shrink-0 group-hover:scale-105 transition-transform"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate font-display text-[15px] font-black tracking-[0.28em] text-[#E63946] drop-shadow-[0_0_12px_rgba(230,57,70,0.55)] group-hover:text-[#FF4D5E] transition-colors lg:text-base",
								children: "REDFOX"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mt-0.5 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "label-mono truncate text-muted-foreground group-hover:text-foreground transition-colors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground/40 text-[10px]",
									children: "·"
								}),
								syncStatus === "synced" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 font-mono text-[9.5px] text-emerald-400 font-semibold tracking-wider",
									title: "Connected & synced with Supabase cloud",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" }), "STATUS: OPERATIONAL"]
								}) : syncStatus === "syncing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 font-mono text-[9.5px] text-cyan-400 font-semibold tracking-wider",
									title: "Realtime sync in-flight...",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-ping" }), "SYNC IN-FLIGHT"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 font-mono text-[9.5px] text-amber-400/90 tracking-wider",
									title: "Local storage fallback (offline / local only)",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" }), "LOCAL ONLY"]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden justify-self-center text-center lg:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm text-foreground",
						children: dateLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "label-mono mt-1",
						children: ["local time ", timeLabel]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-w-0 items-start justify-end gap-2 lg:max-w-sm lg:justify-self-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-start gap-2 rounded-md border border-border/60 bg-surface/60 py-2 pr-3 pl-3 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full w-px self-stretch bg-primary/40",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "mt-[3px] size-3 shrink-0 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "line-clamp-2 text-right text-[11px] leading-snug text-secondary-foreground italic",
									children: [
										"“",
										quote.text,
										"”"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "label-mono mt-1 text-right",
									children: ["— ", quote.author]
								})]
							})
						]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-4 py-2 flex items-center justify-between lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs text-foreground",
				children: [
					dateLabel,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: ["· ", timeLabel]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] text-primary/80 tracking-widest uppercase",
				children: "OPERATOR // ENGAGED"
			})]
		})]
	});
}
function Panel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel p-4",
		children
	});
}
function StatsRow({ completion, streak = 0, focusedHours = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 sm:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-mono",
						children: "% Completed today"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-3.5 shrink-0 text-cyber" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-3xl font-semibold tabular-nums text-foreground",
					children: [completion, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-0.5 text-base text-muted-foreground",
						children: "%"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-cyber transition-[width] duration-500",
						style: { width: `${completion}%` }
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-mono",
						children: "Focused hours"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-3.5 shrink-0 text-gold" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-3xl font-semibold tabular-nums text-foreground",
					children: [focusedHours.toFixed(1), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-0.5 text-base text-muted-foreground",
						children: "h"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[11px] text-muted-foreground",
					children: "Calculated from live stopwatch logs & completed objectives"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-mono",
						children: "Daily streak"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5 shrink-0 text-emerald" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-3xl font-semibold tabular-nums text-foreground",
					children: [streak, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-base text-muted-foreground",
						children: "days"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex gap-1",
					children: Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: i >= 14 - Math.min(streak, 14) ? "h-4 flex-1 rounded-[2px] bg-emerald/70" : "h-4 flex-1 rounded-[2px] bg-muted" }, i))
				})
			] })
		]
	});
}
var THEME = {
	cyber: {
		text: "text-cyber",
		border: "border-cyber/40",
		bg: "bg-cyber",
		ring: "focus-visible:border-cyber focus-visible:ring-cyber/20",
		glow: "hover:shadow-[0_0_18px_-4px_rgba(0,229,255,0.35)] hover:border-cyber/60",
		icon: ShieldHalf
	},
	gold: {
		text: "text-gold",
		border: "border-gold/40",
		bg: "bg-gold",
		ring: "focus-visible:border-gold focus-visible:ring-gold/20",
		glow: "hover:shadow-[0_0_18px_-4px_rgba(255,179,0,0.35)] hover:border-gold/60",
		icon: GraduationCap
	},
	emerald: {
		text: "text-emerald",
		border: "border-emerald/40",
		bg: "bg-emerald",
		ring: "focus-visible:border-emerald focus-visible:ring-emerald/20",
		glow: "hover:shadow-[0_0_18px_-4px_rgba(16,185,129,0.35)] hover:border-emerald/60",
		icon: BrainCircuit
	}
};
function PillarBoard({ board, onToggle, onNew, onOpenTask, onStartTimer }) {
	const theme = THEME[board.id];
	const Icon = theme.icon;
	const done = board.tasks.filter((t) => t.done).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel flex min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 border-b border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid size-9 shrink-0 place-items-center rounded-md border bg-background", theme.border, theme.text),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate font-display text-sm font-semibold tracking-wide text-foreground",
							children: board.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "label-mono mt-0.5 truncate normal-case tracking-normal",
							children: board.subtitle
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground tabular-nums",
						children: [
							done,
							"/",
							board.tasks.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onNew(board.id),
					className: cn("flex w-full items-center justify-center gap-2 rounded-md border bg-background px-3 py-2 font-mono text-[11px] tracking-[0.12em] transition-all hover:bg-accent cursor-pointer", theme.border, theme.text, theme.glow),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "NEW OBJECTIVE"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "scroll-thin max-h-[360px] flex-1 space-y-2 overflow-y-auto p-3 lg:max-h-[460px]",
				children: board.tasks.map((task) => {
					const critical = task.priority === "critical";
					const durationStr = formatDuration(task.durationMinutes || 45);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "button",
						tabIndex: 0,
						onClick: () => onOpenTask(board.id, task),
						onKeyDown: (e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								onOpenTask(board.id, task);
							}
						},
						className: cn("group flex w-full cursor-pointer items-start gap-3 rounded-md border bg-background/40 p-3 text-left transition-all", critical ? "border-red-500/30 hover:border-red-500/60 hover:shadow-[0_0_18px_-6px_rgba(239,68,68,0.55)]" : cn(theme.border, theme.glow), task.done && "opacity-50"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: (e) => {
								e.stopPropagation();
								onToggle(board.id, task.id);
							},
							"aria-label": task.done ? "Mark incomplete" : "Mark complete",
							className: cn("mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition-colors cursor-pointer", task.done ? cn(theme.bg, theme.border) : critical ? "border-red-500/50 bg-background" : "border-border bg-background"),
							children: task.done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-3 text-background",
								strokeWidth: 3
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("min-w-0 flex-1 truncate text-sm font-semibold text-foreground", task.done && "line-through"),
										children: task.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("inline-flex items-center gap-1 rounded border border-white/10 bg-[#0B0F17] px-1.5 py-0.5 font-mono text-[10px] text-cyan-400 font-semibold tabular-nums", task.done && "line-through opacity-70"),
											title: "Allocated duration",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-2.5" }), durationStr]
										}), !task.done && onStartTimer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: (e) => {
												e.stopPropagation();
												onStartTimer(board.id, task);
											},
											className: "grid size-6 place-items-center rounded border border-cyan-400/40 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_12px_rgba(0,229,255,0.6)] transition-all cursor-pointer",
											title: "Start Focus Stopwatch",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3 fill-current ml-0.5" })
										})]
									})]
								}),
								task.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("mt-1 line-clamp-2 text-xs leading-snug text-slate-400", task.done && "line-through"),
									children: task.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap items-center gap-2",
									children: [
										task.checklist_item_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-[3px] border border-cyan-400/40 bg-cyan-950/40 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-cyan-300",
											title: "Linked to Roadmap Checklist",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCommitHorizontal, { className: "size-2.5 text-cyan-400" }), "ROADMAP"]
										}),
										critical && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-[3px] border border-red-500/40 bg-red-500/10 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-red-400",
											children: "CRITICAL"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded-[3px] border bg-accent/40 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] brightness-125", theme.border, theme.text),
											children: task.tag
										}),
										task.priority === "low" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-[3px] border border-border bg-accent/40 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-muted-foreground",
											children: "LOW"
										})
									]
								})
							]
						})]
					}) }, task.id);
				})
			})
		]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var PILLARS = [
	"cyber",
	"gold",
	"emerald"
];
var PRIORITIES = [
	"critical",
	"normal",
	"low"
];
var PILLAR_PICK = {
	cyber: "border-cyber/60 bg-cyber/10 text-cyber",
	gold: "border-gold/60 bg-gold/10 text-gold",
	emerald: "border-emerald/60 bg-emerald/10 text-emerald"
};
var PRIORITY_PICK = {
	critical: "border-red-500/60 bg-red-500/10 text-red-400",
	normal: "border-primary/60 bg-primary/10 text-primary",
	low: "border-border bg-accent text-secondary-foreground"
};
var field = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20";
function ObjectiveDialog({ open, mode, initialPillar, initialTask, allActiveTasks = [], onOpenChange, onSubmit, onDelete }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [pillar, setPillar] = (0, import_react.useState)(initialPillar);
	const [priority, setPriority] = (0, import_react.useState)("normal");
	const [durationMinutes, setDurationMinutes] = (0, import_react.useState)(45);
	const [isCustomDuration, setIsCustomDuration] = (0, import_react.useState)(false);
	const [customMinutesInput, setCustomMinutesInput] = (0, import_react.useState)("45");
	const [date, setDate] = (0, import_react.useState)("");
	const [tag, setTag] = (0, import_react.useState)("STUDY");
	const [selectedNodeId, setSelectedNodeId] = (0, import_react.useState)("");
	const [selectedChecklistItemId, setSelectedChecklistItemId] = (0, import_react.useState)("");
	const [roadmapsState, setRoadmapsState] = (0, import_react.useState)(() => loadRoadmaps());
	(0, import_react.useEffect)(() => {
		if (open) setRoadmapsState(loadRoadmaps());
	}, [open]);
	const currentTrack = roadmapsState[pillarToTrackId(pillar)];
	const activeMilestoneNodes = (0, import_react.useMemo)(() => {
		if (!currentTrack?.nodes) return [];
		return currentTrack.nodes.filter((n) => n.status !== "locked" || n.subTasks && n.subTasks.length > 0);
	}, [currentTrack]);
	const selectedNode = (0, import_react.useMemo)(() => {
		if (!selectedNodeId) return null;
		return activeMilestoneNodes.find((n) => n.id === selectedNodeId) || null;
	}, [selectedNodeId, activeMilestoneNodes]);
	const activeTaskChecklistIds = (0, import_react.useMemo)(() => {
		const ids = /* @__PURE__ */ new Set();
		allActiveTasks.forEach((t) => {
			if (t.checklist_item_id && t.id !== initialTask?.id) ids.add(t.checklist_item_id);
		});
		return ids;
	}, [allActiveTasks, initialTask]);
	const availableChecklistItems = (0, import_react.useMemo)(() => {
		if (!selectedNode?.subTasks) return [];
		return selectedNode.subTasks.filter((item) => {
			if (initialTask && item.id === initialTask.checklist_item_id) return true;
			if (item.completed) return false;
			if (activeTaskChecklistIds.has(item.id)) return false;
			return true;
		});
	}, [
		selectedNode,
		initialTask,
		activeTaskChecklistIds
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setPillar(initialPillar);
		setTitle(initialTask?.title ?? "");
		setDescription(initialTask?.description ?? "");
		setPriority(initialTask?.priority ?? "normal");
		const initialDur = initialTask?.durationMinutes ?? 45;
		setDurationMinutes(initialDur);
		const isPreset = DURATION_PRESETS.some((p) => p.minutes === initialDur);
		setIsCustomDuration(!isPreset);
		setCustomMinutesInput(String(initialDur));
		setDate(initialTask?.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
		setTag(initialTask?.tag ?? "STUDY");
		setSelectedNodeId(initialTask?.node_id ?? "");
		setSelectedChecklistItemId(initialTask?.checklist_item_id ?? "");
	}, [
		open,
		initialPillar,
		initialTask
	]);
	const handlePillarChange = (newPillar) => {
		setPillar(newPillar);
		setSelectedNodeId("");
		setSelectedChecklistItemId("");
	};
	const handleNodeSelect = (nodeId) => {
		setSelectedNodeId(nodeId);
		setSelectedChecklistItemId("");
	};
	const handleChecklistItemSelect = (itemId) => {
		setSelectedChecklistItemId(itemId);
		if (!itemId) return;
		const item = selectedNode?.subTasks?.find((st) => st.id === itemId);
		if (item) {
			setTitle(item.title);
			if (tag === "STUDY") if (pillar === "cyber") setTag("LAB");
			else if (pillar === "gold") setTag("CLASS");
			else setTag("BUILD");
		}
	};
	const handleSelectPreset = (minutes) => {
		setIsCustomDuration(false);
		setDurationMinutes(minutes);
		setCustomMinutesInput(String(minutes));
	};
	const handleCustomChange = (val) => {
		setCustomMinutesInput(val);
		const parsed = parseInt(val, 10);
		if (!isNaN(parsed) && parsed > 0) setDurationMinutes(parsed);
	};
	function submit(e) {
		e.preventDefault();
		const value = title.trim();
		if (!value) return;
		const finalDuration = durationMinutes > 0 ? durationMinutes : 45;
		onSubmit({
			pillar,
			task: {
				id: initialTask?.id ?? `${pillar}-${Date.now()}`,
				title: value,
				description: description.trim() || void 0,
				priority,
				durationMinutes: finalDuration,
				actualFocusMinutes: initialTask?.actualFocusMinutes ?? (initialTask?.done ? finalDuration : 0),
				slot: formatDuration(finalDuration),
				date: date || void 0,
				tag,
				done: initialTask?.done ?? false,
				node_id: selectedNodeId || void 0,
				checklist_item_id: selectedChecklistItemId || void 0
			}
		}, initialPillar);
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto border-border bg-surface/95 backdrop-blur sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-sm tracking-[0.18em] text-foreground",
				children: mode === "create" ? "NEW OBJECTIVE" : "EDIT OBJECTIVE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				className: "label-mono normal-case tracking-normal",
				children: "Log mission parameters and allocated duration."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-mono block",
							children: "Track"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: PILLARS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handlePillarChange(p),
								className: cn("rounded-md border px-2 py-2 font-mono text-[10px] tracking-wide transition-colors", pillar === p ? PILLAR_PICK[p] : "border-border bg-background text-muted-foreground hover:bg-accent"),
								children: BOARD_META[p].title
							}, p))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/80 bg-[#070B12] p-3 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "label-mono flex items-center gap-1.5 text-foreground font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCommitHorizontal, { className: "size-3.5 text-primary" }), "LINK TO ROADMAP MILESTONE / CHECKLIST"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground tracking-wider uppercase",
									children: "(Optional)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "roadmap-node-select",
									className: "font-mono text-[10px] text-muted-foreground tracking-wider block",
									children: "1. SELECT MILESTONE NODE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "roadmap-node-select",
										value: selectedNodeId,
										onChange: (e) => handleNodeSelect(e.target.value),
										className: cn(field, "font-mono text-xs pr-8 bg-[#0D131F] border-border/70 text-foreground cursor-pointer appearance-none"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "-- No Roadmap Milestone Linked --"
										}), activeMilestoneNodes.map((node) => {
											const uncompletedCount = (node.subTasks || []).filter((st) => !st.completed && !activeTaskChecklistIds.has(st.id)).length;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: node.id,
												children: [
													"[",
													node.sequence,
													"] ",
													node.title,
													" (",
													uncompletedCount,
													" available)"
												]
											}, node.id);
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" })]
								})]
							}),
							selectedNodeId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 pt-1 border-t border-white/5 animate-in fade-in-50 duration-200",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										htmlFor: "roadmap-item-select",
										className: "font-mono text-[10px] text-muted-foreground tracking-wider flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCheck, { className: "size-3 text-cyan-400" }), "2. SELECT UNCOMPLETED CHECKLIST ITEM"]
										}), availableChecklistItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-amber-400 text-[10px]",
											children: "All items completed or in queue"
										})]
									}),
									availableChecklistItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "roadmap-item-select",
											value: selectedChecklistItemId,
											onChange: (e) => handleChecklistItemSelect(e.target.value),
											className: cn(field, "font-mono text-xs pr-8 bg-[#0D131F] border-border/70 text-foreground cursor-pointer appearance-none"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "-- Select an item to autofill title --"
											}), availableChecklistItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: item.id,
												children: item.title
											}, item.id))]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded border border-amber-500/20 bg-amber-950/20 px-3 py-2 font-mono text-xs text-amber-300/90 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No uncompleted checklist items available for this milestone." })]
									}),
									selectedChecklistItemId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between pt-1 text-[11px] font-mono text-emerald-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "Linked to roadmap checklist"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setSelectedChecklistItemId("");
											},
											className: "text-muted-foreground hover:text-foreground text-[10px] underline cursor-pointer",
											children: "Unlink"
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "label-mono block",
							htmlFor: "obj-title",
							children: "Objective title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "obj-title",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							required: true,
							autoFocus: true,
							placeholder: "e.g. Finish TryHackMe AD room",
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "label-mono block",
							htmlFor: "obj-desc",
							children: "Description / notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "obj-desc",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							rows: 2,
							placeholder: "Lab room, CVE references, chapter numbers…",
							className: cn(field, "resize-none")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-mono block",
							children: "Priority"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: PRIORITIES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPriority(p),
								className: cn("rounded-md border px-2 py-2 font-mono text-[10px] tracking-[0.12em] transition-colors", priority === p ? PRIORITY_PICK[p] : "border-border bg-background text-muted-foreground hover:bg-accent"),
								children: PRIORITY_LABEL[p]
							}, p))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-white/5 bg-[#0B0F17] p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "label-mono flex items-center gap-1.5 text-foreground font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3 text-cyan-400" }), "Allocated Focus Duration"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-bold text-cyan-400",
									children: formatDuration(durationMinutes)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-5 gap-1.5",
								children: DURATION_PRESETS.map((preset) => {
									const isSelected = !isCustomDuration && durationMinutes === preset.minutes;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleSelectPreset(preset.minutes),
										className: cn("rounded-md border py-1.5 font-mono text-xs font-semibold transition-all", isSelected ? "border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.3)]" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"),
										children: preset.label
									}, preset.label);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setIsCustomDuration(true),
									className: cn("rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors", isCustomDuration ? "border-gold/60 bg-gold/10 text-gold" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"),
									children: "Custom Mins"
								}), isCustomDuration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: "5",
										max: "480",
										step: "5",
										value: customMinutesInput,
										onChange: (e) => handleCustomChange(e.target.value),
										placeholder: "e.g. 75",
										className: cn(field, "font-mono text-xs py-1 h-8")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: "minutes"
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "label-mono block",
								htmlFor: "obj-date",
								children: "Target Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "obj-date",
								type: "date",
								value: date,
								onChange: (e) => setDate(e.target.value),
								className: cn(field, "font-mono")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-mono block",
								children: "Tag / type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: TAG_OPTIONS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTag(t),
									className: cn("rounded-md border px-2 py-1 font-mono text-[10px] tracking-[0.08em] transition-colors", tag === t ? "border-primary/60 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-accent"),
									children: t
								}, t))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "flex items-center justify-between sm:justify-between gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: mode === "edit" && initialTask && onDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								onDelete(initialPillar, initialTask.id);
								onOpenChange(false);
							},
							className: "rounded-md border border-red-500/30 bg-red-950/40 px-3 py-2 font-mono text-[11px] font-semibold tracking-wide text-red-400 transition-colors hover:bg-red-900/50",
							children: "DELETE"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onOpenChange(false),
								className: "rounded-md border border-border bg-background px-4 py-2 font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:bg-accent",
								children: "CANCEL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-md border border-primary/60 bg-primary/10 px-4 py-2 font-mono text-[11px] tracking-wide text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_18px_-4px_rgba(0,229,255,0.45)]",
								children: mode === "create" ? "DEPLOY OBJECTIVE" : "SAVE CHANGES"
							})]
						})]
					})
				]
			})]
		})
	});
}
function MilestoneNodeCard({ node, index, isFirst, isLast, isPathGlowTop, isPathGlowBottom, onSelectNode }) {
	const progress = calculateNodeProgress(node);
	const isCompleted = node.status === "completed" || progress === 100;
	const isActive = node.status === "active" && !isCompleted;
	const isUpcoming = !isCompleted && !isActive;
	const getTrackTheme = () => {
		switch (node.trackId) {
			case "cyber": return {
				glow: "shadow-[0_0_20px_rgba(0,229,255,0.22)]",
				border: "border-cyber",
				text: "text-cyber",
				bgBadge: "bg-cyber/15 text-cyber border-cyber/50",
				pathColor: "bg-cyber shadow-[0_0_8px_rgba(0,229,255,0.6)]",
				pingColor: "bg-cyber",
				iconColor: "text-cyber"
			};
			case "academics": return {
				glow: "shadow-[0_0_20px_rgba(255,179,0,0.22)]",
				border: "border-gold",
				text: "text-gold",
				bgBadge: "bg-gold/15 text-gold border-gold/50",
				pathColor: "bg-gold shadow-[0_0_8px_rgba(255,179,0,0.6)]",
				pingColor: "bg-gold",
				iconColor: "text-gold"
			};
			case "aiml": return {
				glow: "shadow-[0_0_20px_rgba(16,185,129,0.22)]",
				border: "border-emerald",
				text: "text-emerald",
				bgBadge: "bg-emerald/15 text-emerald border-emerald/50",
				pathColor: "bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)]",
				pingColor: "bg-emerald",
				iconColor: "text-emerald"
			};
		}
	};
	const theme = getTrackTheme();
	const getNodeIcon = () => {
		if (isCompleted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald stroke-[2.4]" });
		if (node.trackId === "cyber") {
			if (index === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4" });
			if (index === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" });
			if (index === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" });
		} else if (node.trackId === "academics") {
			if (index === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Binary, { className: "size-4" });
			if (index === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-4" });
			if (index === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" });
		} else {
			if (index === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Binary, { className: "size-4" });
			if (index === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-4" });
			if (index === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" });
		}
	};
	const completedSubTasks = node.subTasks ? node.subTasks.filter((s) => s.completed).length : 0;
	const totalSubTasks = node.subTasks ? node.subTasks.length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex items-stretch gap-3 sm:gap-5 group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-col items-center flex-shrink-0 w-10 sm:w-12",
			children: [
				!isFirst && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("w-0.5 h-4 sm:h-5 transition-all duration-500", isPathGlowTop ? theme.pathColor : "border-l-2 border-dashed border-slate-700/80 bg-transparent") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelectNode(node),
					className: cn("relative grid size-10 sm:size-11 place-items-center rounded-xl border transition-all duration-300 cursor-pointer select-none", isCompleted && "border-emerald/80 bg-emerald/15 text-emerald shadow-[0_0_15px_rgba(16,185,129,0.35)] hover:scale-105 hover:bg-emerald/25", isActive && cn("border-2 bg-[#131B2A] text-foreground hover:scale-105", theme.border, theme.glow), isUpcoming && "border-white/15 bg-[#0B0F17] text-muted-foreground/70 hover:border-white/40 hover:text-foreground hover:scale-105"),
					children: [
						isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -inset-1 rounded-xl animate-ping opacity-30 pointer-events-none", theme.pingColor) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("relative z-10 flex items-center justify-center", isActive && theme.iconColor),
							children: getNodeIcon()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("absolute -bottom-1.5 font-mono text-[9px] font-bold px-1 rounded bg-[#0B0F17] border leading-tight", isCompleted ? "border-emerald/60 text-emerald" : isActive ? cn(theme.border, theme.text) : "border-white/10 text-muted-foreground"),
							children: node.sequence
						})
					]
				}),
				!isLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("w-0.5 flex-1 min-h-[48px] my-1 transition-all duration-500", isPathGlowBottom ? theme.pathColor : "border-l-2 border-dashed border-slate-700/80 bg-transparent") })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: () => onSelectNode(node),
			className: cn("panel flex-1 mb-4 p-3.5 sm:p-4 transition-all duration-200 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between gap-2.5", isCompleted && "border-emerald/30 bg-[#131B2A]/90 hover:border-emerald/60 shadow-[0_4px_16px_-6px_rgba(16,185,129,0.12)] hover:bg-[#131B2A]", isActive && cn("border-2 bg-[#131B2A] hover:bg-[#151F30]", theme.border, theme.glow), isUpcoming && "border-white/10 bg-[#131B2A]/60 hover:border-white/25 hover:bg-[#131B2A]/90"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[11px] font-extrabold text-muted-foreground",
							children: [node.sequence, "."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: cn("font-mono text-sm sm:text-base font-bold tracking-tight transition-colors", isCompleted ? "text-foreground group-hover:text-emerald" : isActive ? "text-foreground group-hover:text-cyber" : "text-foreground/90 group-hover:text-foreground"),
							children: node.title
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-shrink-0",
						children: [
							isCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full border border-emerald/50 bg-emerald/10 px-2 py-0.5 font-mono text-[10px] text-emerald font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "DONE"]
							}),
							isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold", theme.bgBadge),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3 animate-pulse" }), "ACTIVE"]
							}),
							isUpcoming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-muted-foreground font-semibold",
								children: "UPCOMING"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: (e) => {
									e.stopPropagation();
									onSelectNode(node);
								},
								className: "hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors py-0.5 px-1.5 rounded hover:bg-white/5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DETAILS" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3" })
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground line-clamp-1 leading-relaxed",
					children: node.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 flex-1 max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 flex-1 overflow-hidden rounded-full bg-white/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-full transition-all duration-300", isCompleted ? "bg-emerald" : theme.pathColor),
								style: { width: `${progress}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-muted-foreground font-semibold flex-shrink-0",
							children: totalSubTasks > 0 ? `${completedSubTasks}/${totalSubTasks} subtasks` : `${progress}%`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 flex-wrap",
						children: [node.tags.slice(0, 3).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded bg-[#0B0F17] px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground border border-white/10",
							children: ["#", tag]
						}, tag)), node.tags.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[9px] text-muted-foreground/60",
							children: ["+", node.tags.length - 3]
						})]
					})]
				})
			]
		})]
	});
}
function MilestoneDetailModal({ node, open, onOpenChange, onUpdateNode, onDeleteNode }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [sequence, setSequence] = (0, import_react.useState)("");
	const [tagsInput, setTagsInput] = (0, import_react.useState)("");
	const [estimatedHours, setEstimatedHours] = (0, import_react.useState)(40);
	const [status, setStatus] = (0, import_react.useState)("active");
	const [subTasks, setSubTasks] = (0, import_react.useState)([]);
	const [newSubTaskTitle, setNewSubTaskTitle] = (0, import_react.useState)("");
	const [isEditingMeta, setIsEditingMeta] = (0, import_react.useState)(false);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (node) {
			setTitle(node.title);
			setDescription(node.description);
			setSequence(node.sequence);
			setTagsInput(node.tags.join(", "));
			setEstimatedHours(node.estimatedHours || 40);
			setStatus(node.status);
			setSubTasks(node.subTasks || []);
			setIsEditingMeta(false);
			setConfirmDelete(false);
		}
	}, [node, open]);
	if (!node) return null;
	const getAccentStyles = () => {
		switch (node.trackId) {
			case "cyber": return {
				badge: "border-cyber/50 bg-cyber/10 text-cyber",
				bar: "bg-cyber",
				text: "text-cyber",
				border: "border-cyber"
			};
			case "academics": return {
				badge: "border-gold/50 bg-gold/10 text-gold",
				bar: "bg-gold",
				text: "text-gold",
				border: "border-gold"
			};
			case "aiml": return {
				badge: "border-emerald/50 bg-emerald/10 text-emerald",
				bar: "bg-emerald",
				text: "text-emerald",
				border: "border-emerald"
			};
			default: return {
				badge: "border-cyber/50 bg-cyber/10 text-cyber",
				bar: "bg-cyber",
				text: "text-cyber",
				border: "border-cyber"
			};
		}
	};
	const styles = getAccentStyles();
	const completedSubTasksCount = subTasks.filter((st) => st.completed).length;
	const progress = subTasks.length > 0 ? Math.round(completedSubTasksCount / subTasks.length * 100) : status === "completed" ? 100 : 0;
	const handleToggleSubTask = (subTaskId) => {
		const updatedSubTasks = subTasks.map((st) => st.id === subTaskId ? {
			...st,
			completed: !st.completed
		} : st);
		setSubTasks(updatedSubTasks);
		const allDone = updatedSubTasks.length > 0 && updatedSubTasks.every((st) => st.completed);
		let newStatus = status;
		if (allDone) {
			newStatus = "completed";
			setStatus("completed");
		} else if (status === "completed" && !allDone) {
			newStatus = "active";
			setStatus("active");
		}
		onUpdateNode({
			...node,
			title,
			description,
			sequence,
			estimatedHours,
			subTasks: updatedSubTasks,
			status: newStatus
		});
	};
	const handleAddSubTask = (e) => {
		e.preventDefault();
		if (!newSubTaskTitle.trim()) return;
		const newSub = {
			id: `st-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			title: newSubTaskTitle.trim(),
			completed: false
		};
		const updatedSubTasks = [...subTasks, newSub];
		setSubTasks(updatedSubTasks);
		setNewSubTaskTitle("");
		onUpdateNode({
			...node,
			title,
			description,
			sequence,
			estimatedHours,
			subTasks: updatedSubTasks,
			status: status === "completed" ? "active" : status
		});
	};
	const handleDeleteSubTask = (subTaskId) => {
		const updatedSubTasks = subTasks.filter((st) => st.id !== subTaskId);
		setSubTasks(updatedSubTasks);
		const newStatus = updatedSubTasks.length > 0 && updatedSubTasks.every((st) => st.completed) ? "completed" : status;
		onUpdateNode({
			...node,
			title,
			description,
			sequence,
			estimatedHours,
			subTasks: updatedSubTasks,
			status: newStatus
		});
	};
	const handleSetStatus = (newStatus) => {
		setStatus(newStatus);
		let updatedSubTasks = [...subTasks];
		if (newStatus === "completed") {
			updatedSubTasks = updatedSubTasks.map((st) => ({
				...st,
				completed: true
			}));
			setSubTasks(updatedSubTasks);
		}
		onUpdateNode({
			...node,
			title,
			description,
			sequence,
			estimatedHours,
			status: newStatus,
			subTasks: updatedSubTasks
		});
	};
	const handleSaveMetadata = () => {
		const parsedTags = tagsInput.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
		onUpdateNode({
			...node,
			title: title.trim() || node.title,
			description: description.trim() || node.description,
			sequence: sequence.trim() || node.sequence,
			estimatedHours: Number(estimatedHours) || 40,
			tags: parsedTags.length > 0 ? parsedTags : node.tags,
			status,
			subTasks
		});
		setIsEditingMeta(false);
	};
	const handleExecuteDelete = () => {
		onDeleteNode(node.id, node.trackId);
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto border-white/10 bg-[#131B2A] p-6 sm:max-w-2xl text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "space-y-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs font-bold text-muted-foreground",
								children: ["NODE // ", sequence]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider", styles.badge),
								children: [node.trackId.toUpperCase(), " PATH"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 rounded-lg border border-white/10 bg-[#0B0F17] p-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleSetStatus("completed"),
									className: cn("flex items-center gap-1 rounded px-2.5 py-1 font-mono text-[10px] font-bold transition-all", status === "completed" ? "bg-emerald/20 text-emerald border border-emerald/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]" : "text-muted-foreground hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "COMPLETED"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleSetStatus("active"),
									className: cn("flex items-center gap-1 rounded px-2.5 py-1 font-mono text-[10px] font-bold transition-all", status === "active" ? "bg-cyber/20 text-cyber border border-cyber/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]" : "text-muted-foreground hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3 animate-pulse" }), "IN PROGRESS"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleSetStatus("locked"),
									className: cn("flex items-center gap-1 rounded px-2.5 py-1 font-mono text-[10px] font-bold transition-all", status === "locked" ? "bg-white/10 text-muted-foreground border border-white/20" : "text-muted-foreground hover:text-foreground"),
									children: "UPCOMING"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: !isEditingMeta ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-mono text-lg sm:text-xl font-bold tracking-wide text-foreground",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-1 text-xs text-muted-foreground",
							children: "TryHackMe skill-tree node parameters and operational checklist."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setIsEditingMeta(true),
							className: "flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, { className: "size-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "EDIT DETAILS" })]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-lg border border-primary/40 bg-[#0B0F17] p-3.5 mt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs font-bold text-primary flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, { className: "size-3.5" }), "EDIT MILESTONE SPECIFICATION"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: "CUSTOM PARAMETERS"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-4 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-1 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: "SEQ"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: sequence,
										onChange: (e) => setSequence(e.target.value),
										className: "w-full rounded border border-white/15 bg-[#131B2A] px-2 py-1 font-mono text-xs text-foreground focus:outline-none focus:border-primary"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-3 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: "TITLE"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: title,
										onChange: (e) => setTitle(e.target.value),
										className: "w-full rounded border border-white/15 bg-[#131B2A] px-2.5 py-1 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: "DESCRIPTION"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 2,
									value: description,
									onChange: (e) => setDescription(e.target.value),
									className: "w-full rounded border border-white/15 bg-[#131B2A] px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: "TAGS (COMMA SEPARATED)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: tagsInput,
										onChange: (e) => setTagsInput(e.target.value),
										className: "w-full rounded border border-white/15 bg-[#131B2A] px-2.5 py-1 font-mono text-xs text-foreground focus:outline-none focus:border-primary"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: "ESTIMATED HOURS"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: estimatedHours,
										onChange: (e) => setEstimatedHours(Number(e.target.value)),
										className: "w-full rounded border border-white/15 bg-[#131B2A] px-2.5 py-1 font-mono text-xs text-foreground focus:outline-none focus:border-primary"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setIsEditingMeta(false),
									className: "rounded border border-white/10 px-3 py-1 font-mono text-[11px] text-muted-foreground hover:text-foreground",
									children: "CANCEL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleSaveMetadata,
									className: "rounded bg-primary px-3.5 py-1 font-mono text-[11px] font-bold text-primary-foreground hover:bg-primary/90",
									children: "APPLY CHANGES"
								})]
							})
						]
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5 pt-2",
					children: [!isEditingMeta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-white/10 bg-[#0B0F17]/80 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-primary" }), "Strategic Objective"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-foreground/90 leading-relaxed",
								children: description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-2 pt-3 border-t border-white/10",
								children: [tagsInput.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-foreground/80 border border-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-2.5 text-muted-foreground" }), tag]
								}, tag)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
										"EST. ",
										estimatedHours,
										"H"
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-white/10 bg-[#0B0F17]/80 p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-bold uppercase tracking-wider text-foreground",
										children: "Operational Checklist"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground",
										children: [
											completedSubTasksCount,
											" / ",
											subTasks.length,
											" COMPLETED"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("font-mono text-xs font-bold", styles.text),
									children: [progress, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 w-full overflow-hidden rounded-full bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full transition-all duration-300", styles.bar),
									style: { width: `${progress}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 pt-1",
								children: subTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "py-4 text-center font-mono text-xs text-muted-foreground",
									children: "No sub-tasks logged yet. Add checklist items below to track progress."
								}) : subTasks.map((subTask) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("group flex items-start gap-3 rounded-lg border p-2.5 transition-all", subTask.completed ? "border-white/5 bg-white/5 text-muted-foreground" : "border-white/10 bg-[#131B2A] hover:border-white/20 text-foreground"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleToggleSubTask(subTask.id),
											className: "mt-0.5 flex-shrink-0 cursor-pointer text-primary transition-transform active:scale-95",
											children: subTask.completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "size-4 text-emerald" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4 text-muted-foreground group-hover:text-primary" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											onClick: () => handleToggleSubTask(subTask.id),
											className: cn("flex-1 text-xs cursor-pointer select-none leading-relaxed", subTask.completed && "line-through text-muted-foreground"),
											children: subTask.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleDeleteSubTask(subTask.id),
											className: "text-muted-foreground/60 hover:text-red-400 p-1 transition-colors",
											title: "Remove checklist item",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
										})
									]
								}, subTask.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleAddSubTask,
								className: "flex gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: newSubTaskTitle,
									onChange: (e) => setNewSubTaskTitle(e.target.value),
									placeholder: "Add sub-task objective or laboratory challenge...",
									className: "flex-1 rounded-md border border-white/15 bg-[#131B2A] px-3 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: !newSubTaskTitle.trim(),
									className: "flex items-center gap-1.5 rounded-md border border-white/10 bg-white/10 px-3.5 py-1.5 font-mono text-xs font-bold text-foreground transition-colors hover:bg-white/20 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "ADD"]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4 mt-2",
					children: [!confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setConfirmDelete(true),
						className: "flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:underline font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "DELETE NODE"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-mono text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-red-400 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }), "Confirm delete?"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleExecuteDelete,
								className: "rounded bg-red-500/20 border border-red-500/50 px-2 py-1 text-red-300 font-bold hover:bg-red-500/30",
								children: "YES, DELETE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setConfirmDelete(false),
								className: "rounded border border-white/10 px-2 py-1 text-muted-foreground hover:text-foreground",
								children: "CANCEL"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onOpenChange(false),
						className: "w-full sm:w-auto rounded-md border border-white/10 bg-primary px-5 py-2 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm",
						children: "SAVE & CLOSE"
					})]
				})
			]
		})
	});
}
function AddMilestoneModal({ open, activeTrackId, existingNodesCount, onOpenChange, onAddNode }) {
	const nextSeq = String(existingNodesCount + 1).padStart(2, "0");
	const [sequence, setSequence] = (0, import_react.useState)(nextSeq);
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [trackId, setTrackId] = (0, import_react.useState)(activeTrackId);
	const [status, setStatus] = (0, import_react.useState)("active");
	const [tagInput, setTagInput] = (0, import_react.useState)("");
	const [estimatedHours, setEstimatedHours] = (0, import_react.useState)(40);
	const [subTasks, setSubTasks] = (0, import_react.useState)(["", ""]);
	const handleSubTaskChange = (index, value) => {
		const next = [...subTasks];
		next[index] = value;
		setSubTasks(next);
	};
	const handleAddSubTaskField = () => {
		setSubTasks([...subTasks, ""]);
	};
	const handleRemoveSubTaskField = (index) => {
		if (subTasks.length === 1) {
			setSubTasks([""]);
			return;
		}
		setSubTasks(subTasks.filter((_, i) => i !== index));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return;
		const parsedSubTasks = subTasks.filter((st) => st.trim().length > 0).map((st, i) => ({
			id: `st-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
			title: st.trim(),
			completed: status === "completed"
		}));
		const parsedTags = tagInput.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
		onAddNode({
			id: `node-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			sequence: sequence.trim() || nextSeq,
			title: title.trim(),
			description: description.trim() || "Tactical milestone objective parameters pending...",
			trackId,
			status,
			tags: parsedTags.length > 0 ? parsedTags : ["TACTICAL", "PATH"],
			estimatedHours: Number(estimatedHours) || 40,
			subTasks: parsedSubTasks
		});
		onOpenChange(false);
		setTitle("");
		setDescription("");
		setTagInput("");
		setSubTasks(["", ""]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto border-white/10 bg-[#131B2A] p-6 sm:max-w-lg text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "space-y-2 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-7 place-items-center rounded bg-primary/15 text-primary border border-primary/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Milestone, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-mono text-base font-bold tracking-wide text-foreground",
						children: "INITIALIZE NEW MILESTONE NODE"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-xs text-muted-foreground",
					children: "Add a progressive skill-tree waypoint with custom objectives."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Target Track Vector"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setTrackId("cyber"),
									className: cn("flex items-center justify-center gap-1.5 rounded-lg border p-2 font-mono text-[11px] transition-all", trackId === "cyber" ? "border-cyber bg-cyber/15 text-cyber font-bold shadow-[0_0_10px_rgba(0,229,255,0.15)]" : "border-white/10 bg-[#0B0F17] text-muted-foreground hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3" }), "CYBER"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setTrackId("academics"),
									className: cn("flex items-center justify-center gap-1.5 rounded-lg border p-2 font-mono text-[11px] transition-all", trackId === "academics" ? "border-gold bg-gold/15 text-gold font-bold shadow-[0_0_10px_rgba(255,179,0,0.15)]" : "border-white/10 bg-[#0B0F17] text-muted-foreground hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3" }), "ACADEMICS"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setTrackId("aiml"),
									className: cn("flex items-center justify-center gap-1.5 rounded-lg border p-2 font-mono text-[11px] transition-all", trackId === "aiml" ? "border-emerald bg-emerald/15 text-emerald font-bold shadow-[0_0_10px_rgba(16,185,129,0.15)]" : "border-white/10 bg-[#0B0F17] text-muted-foreground hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3" }), "AIML"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-4 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-1 space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Sequence"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: sequence,
								onChange: (e) => setSequence(e.target.value),
								placeholder: "05",
								className: "w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-3 space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Milestone Title *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: title,
								onChange: (e) => setTitle(e.target.value),
								placeholder: "e.g. Reverse Engineering & Binary Exploitation",
								className: "w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Strategic Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 2,
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Key concepts, laboratory challenges, or core systems...",
							className: "w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Initial Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: status,
								onChange: (e) => setStatus(e.target.value),
								className: "w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 font-mono text-xs text-foreground focus:border-primary focus:outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "active",
										children: "Active / In-Progress"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "locked",
										children: "Upcoming"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "completed",
										children: "Completed"
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Tags (comma separated)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: tagInput,
								onChange: (e) => setTagInput(e.target.value),
								placeholder: "Ghidra, Assembly, GDB",
								className: "w-full rounded-md border border-white/15 bg-[#0B0F17] px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-white/10 bg-[#0B0F17] p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Direct Action Items / Checklist"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleAddSubTaskField,
								className: "flex items-center gap-1 font-mono text-[10px] text-primary hover:underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), "ADD ITEM"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 max-h-36 overflow-y-auto pr-1",
							children: subTasks.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-[10px] text-muted-foreground w-4 text-right",
										children: [i + 1, "."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: st,
										onChange: (e) => handleSubTaskChange(i, e.target.value),
										placeholder: `Checklist item #${i + 1}`,
										className: "flex-1 rounded border border-white/10 bg-[#131B2A] px-2.5 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleRemoveSubTaskField(i),
										className: "text-muted-foreground hover:text-red-400 p-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
									})
								]
							}, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onOpenChange(false),
							className: "rounded-md border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground",
							children: "CANCEL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "flex items-center justify-center gap-1.5 rounded-md border border-white/10 bg-primary px-5 py-2 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "CREATE NODE"]
						})]
					})
				]
			})]
		})
	});
}
function RoadmapsView() {
	const [roadmaps, setRoadmaps] = (0, import_react.useState)(() => loadRoadmaps());
	const [activeTrackId, setActiveTrackId] = (0, import_react.useState)("cyber");
	const [selectedNode, setSelectedNode] = (0, import_react.useState)(null);
	const [detailModalOpen, setDetailModalOpen] = (0, import_react.useState)(false);
	const [addModalOpen, setAddModalOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		saveRoadmaps(roadmaps);
	}, [roadmaps]);
	(0, import_react.useEffect)(() => {
		const handleRemoteRoadmap = (e) => {
			const custom = e;
			if (custom.detail?.trackId && custom.detail?.nodes) setRoadmaps((prev) => ({
				...prev,
				[custom.detail.trackId]: {
					...prev[custom.detail.trackId],
					nodes: custom.detail.nodes
				}
			}));
		};
		window.addEventListener("pcc-roadmaps-updated", handleRemoteRoadmap);
		return () => window.removeEventListener("pcc-roadmaps-updated", handleRemoteRoadmap);
	}, []);
	const activeTrack = roadmaps[activeTrackId] || roadmaps.cyber || {
		trackId: activeTrackId,
		title: "Path",
		code: "PATH",
		subtitle: "",
		accentColor: "cyber",
		hexColor: "#00E5FF",
		nodes: []
	};
	const trackProgress = calculateTrackProgress(activeTrack.nodes);
	const completedCount = activeTrack.nodes.filter((n) => n.status === "completed" || n.subTasks && n.subTasks.length > 0 && n.subTasks.every((s) => s.completed)).length;
	const activeCount = activeTrack.nodes.filter((n) => n.status === "active").length;
	const upcomingCount = activeTrack.nodes.length - completedCount - activeCount;
	const handleSelectNode = (node) => {
		setSelectedNode(node);
		setDetailModalOpen(true);
	};
	const handleUpdateNode = (updatedNode) => {
		setRoadmaps((prev) => {
			const track = prev[updatedNode.trackId];
			if (!track) return prev;
			const updatedNodes = track.nodes.map((n) => n.id === updatedNode.id ? updatedNode : n);
			const nextRoadmaps = {
				...prev,
				[updatedNode.trackId]: {
					...track,
					nodes: updatedNodes
				}
			};
			saveRoadmaps(nextRoadmaps);
			upsertRoadmapTrackToSupabase(updatedNode.trackId, updatedNodes);
			return nextRoadmaps;
		});
		setSelectedNode(updatedNode);
	};
	const handleDeleteNode = (nodeId, trackId) => {
		setRoadmaps((prev) => {
			const track = prev[trackId];
			if (!track) return prev;
			const updatedNodes = track.nodes.filter((n) => n.id !== nodeId);
			const nextRoadmaps = {
				...prev,
				[trackId]: {
					...track,
					nodes: updatedNodes
				}
			};
			saveRoadmaps(nextRoadmaps);
			upsertRoadmapTrackToSupabase(trackId, updatedNodes);
			return nextRoadmaps;
		});
		setSelectedNode(null);
		setDetailModalOpen(false);
	};
	const handleAddNode = (newNode) => {
		setRoadmaps((prev) => {
			const track = prev[newNode.trackId];
			if (!track) return prev;
			const updatedNodes = [...track.nodes, newNode];
			const nextRoadmaps = {
				...prev,
				[newNode.trackId]: {
					...track,
					nodes: updatedNodes
				}
			};
			saveRoadmaps(nextRoadmaps);
			upsertRoadmapTrackToSupabase(newNode.trackId, updatedNodes);
			return nextRoadmaps;
		});
		setActiveTrackId(newNode.trackId);
	};
	const getTrackTheme = (trackId) => {
		switch (trackId) {
			case "cyber": return {
				tabActive: "border-cyber ring-1 ring-cyber/30 bg-[#131B2A] shadow-[0_0_20px_rgba(0,229,255,0.14)]",
				barColor: "bg-cyber",
				text: "text-cyber",
				border: "border-cyber",
				badge: "border-cyber/50 bg-cyber/10 text-cyber",
				glowLine: "bg-cyber shadow-[0_0_8px_rgba(0,229,255,0.6)]"
			};
			case "academics": return {
				tabActive: "border-gold ring-1 ring-gold/30 bg-[#131B2A] shadow-[0_0_20px_rgba(255,179,0,0.14)]",
				barColor: "bg-gold",
				text: "text-gold",
				border: "border-gold",
				badge: "border-gold/50 bg-gold/10 text-gold",
				glowLine: "bg-gold shadow-[0_0_8px_rgba(255,179,0,0.6)]"
			};
			case "aiml": return {
				tabActive: "border-emerald ring-1 ring-emerald/30 bg-[#131B2A] shadow-[0_0_20px_rgba(16,185,129,0.14)]",
				barColor: "bg-emerald",
				text: "text-emerald",
				border: "border-emerald",
				badge: "border-emerald/50 bg-emerald/10 text-emerald",
				glowLine: "bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.6)]"
			};
		}
	};
	const currentTheme = getTrackTheme(activeTrackId);
	let lastCompletedOrActiveIndex = -1;
	activeTrack.nodes.forEach((n, idx) => {
		if (n.status === "completed" || n.subTasks && n.subTasks.length > 0 && n.subTasks.every((s) => s.completed) || n.status === "active") lastCompletedOrActiveIndex = idx;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-5xl mx-auto pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-cyber animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-base sm:text-lg font-bold uppercase tracking-wider text-foreground",
						children: "Skill Paths & Progression Tree"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted-foreground mt-0.5",
						children: "TryHackMe-inspired sequential skill vectors, checkpoints, and tactical milestones."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAddModalOpen(true),
						className: "inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary px-3.5 py-1.5 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ADD MILESTONE" })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTrackId("cyber"),
						className: cn("panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex flex-col justify-between gap-3 rounded-xl border", activeTrackId === "cyber" ? getTrackTheme("cyber").tabActive : "border-white/10 bg-[#131B2A]/60 opacity-75 hover:opacity-100 hover:border-white/20"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-8 place-items-center rounded-lg border", activeTrackId === "cyber" ? "border-cyber/60 bg-cyber/15 text-cyber" : "border-white/10 bg-[#0B0F17] text-muted-foreground"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] text-muted-foreground font-semibold",
									children: "CYSEC-01"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("font-mono text-sm font-bold", activeTrackId === "cyber" ? "text-cyber" : "text-foreground"),
									children: "Cybersecurity Path"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs font-bold text-cyber",
								children: [calculateTrackProgress(roadmaps.cyber?.nodes || []), "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1 w-full overflow-hidden rounded-full bg-[#0B0F17]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-cyber transition-all duration-300",
									style: { width: `${calculateTrackProgress(roadmaps.cyber?.nodes || [])}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between font-mono text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [roadmaps.cyber?.nodes?.length || 0, " NODES"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [roadmaps.cyber?.nodes?.filter((n) => n.status === "completed").length || 0, " DONE"] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTrackId("academics"),
						className: cn("panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex flex-col justify-between gap-3 rounded-xl border", activeTrackId === "academics" ? getTrackTheme("academics").tabActive : "border-white/10 bg-[#131B2A]/60 opacity-75 hover:opacity-100 hover:border-white/20"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-8 place-items-center rounded-lg border", activeTrackId === "academics" ? "border-gold/60 bg-gold/15 text-gold" : "border-white/10 bg-[#0B0F17] text-muted-foreground"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] text-muted-foreground font-semibold",
									children: "ACAD-02"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("font-mono text-sm font-bold", activeTrackId === "academics" ? "text-gold" : "text-foreground"),
									children: "Academics & Semesters"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs font-bold text-gold",
								children: [calculateTrackProgress(roadmaps.academics?.nodes || []), "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1 w-full overflow-hidden rounded-full bg-[#0B0F17]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-gold transition-all duration-300",
									style: { width: `${calculateTrackProgress(roadmaps.academics?.nodes || [])}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between font-mono text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [roadmaps.academics?.nodes?.length || 0, " NODES"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									roadmaps.academics?.nodes?.filter((n) => n.status === "completed").length || 0,
									" ",
									"DONE"
								] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveTrackId("aiml"),
						className: cn("panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex flex-col justify-between gap-3 rounded-xl border", activeTrackId === "aiml" ? getTrackTheme("aiml").tabActive : "border-white/10 bg-[#131B2A]/60 opacity-75 hover:opacity-100 hover:border-white/20"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-8 place-items-center rounded-lg border", activeTrackId === "aiml" ? "border-emerald/60 bg-emerald/15 text-emerald" : "border-white/10 bg-[#0B0F17] text-muted-foreground"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] text-muted-foreground font-semibold",
									children: "AIML-03"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("font-mono text-sm font-bold", activeTrackId === "aiml" ? "text-emerald" : "text-foreground"),
									children: "AIML & Systems"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs font-bold text-emerald",
								children: [calculateTrackProgress(roadmaps.aiml?.nodes || []), "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1 w-full overflow-hidden rounded-full bg-[#0B0F17]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-emerald transition-all duration-300",
									style: { width: `${calculateTrackProgress(roadmaps.aiml?.nodes || [])}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between font-mono text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [roadmaps.aiml?.nodes?.length || 0, " NODES"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [roadmaps.aiml?.nodes?.filter((n) => n.status === "completed").length || 0, " DONE"] })]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-5 sm:p-6 rounded-xl border border-white/10 bg-[#131B2A]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
									children: ["MISSION VECTOR // ", activeTrack.code]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase", currentTheme.badge),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3 animate-pulse" }), "ACTIVE PATH"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-mono text-xl sm:text-2xl font-bold tracking-tight text-foreground",
								children: activeTrack.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed",
								children: activeTrack.subtitle || "Curated operational checkpoints and hands-on skill objectives."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 sm:gap-3 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-white/10 bg-[#0B0F17] p-2.5 sm:p-3 min-w-[80px] text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[9px] sm:text-[10px] text-muted-foreground",
									children: "PROGRESS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("font-mono text-base sm:text-lg font-bold", currentTheme.text),
									children: [trackProgress, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-white/10 bg-[#0B0F17] p-2.5 sm:p-3 min-w-[80px] text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[9px] sm:text-[10px] text-emerald",
									children: "COMPLETED"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-base sm:text-lg font-bold text-foreground",
									children: completedCount
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-white/10 bg-[#0B0F17] p-2.5 sm:p-3 min-w-[80px] text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[9px] sm:text-[10px] text-cyber",
									children: "IN FLIGHT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-base sm:text-lg font-bold text-foreground",
									children: activeCount
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-white/10 bg-[#0B0F17] p-2.5 sm:p-3 min-w-[80px] text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[9px] sm:text-[10px] text-muted-foreground",
									children: "UPCOMING"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-base sm:text-lg font-bold text-muted-foreground",
									children: upcomingCount
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 pt-4 border-t border-white/10 space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between font-mono text-[10px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TACTICAL PATH COMPLETION" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("font-bold", currentTheme.text),
							children: [trackProgress, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-full overflow-hidden rounded-full bg-[#0B0F17]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full transition-all duration-500", currentTheme.barColor),
							style: { width: `${trackProgress}%` }
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-mono text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"PROGRESSION PIPELINE (",
							activeTrack.nodes.length,
							" WAYPOINTS)"
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-muted-foreground",
						children: "CLICK ANY NODE TO INSPECT / EDIT SUB-TASKS"
					})]
				}), activeTrack.nodes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-8 sm:p-12 text-center rounded-xl border border-dashed border-white/15 bg-[#131B2A]/40 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid size-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-6 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-mono text-sm font-bold uppercase text-foreground",
								children: "NO ACTIVE MILESTONES // INITIALIZE NEW PATH (+)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted-foreground max-w-md mx-auto",
								children: "All milestones in this track vector have been cleared. Build your custom progression roadmap from scratch."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center gap-3 pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setAddModalOpen(true),
								className: "inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+ ADD FIRST MILESTONE" })]
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative pl-1 sm:pl-2",
					children: [activeTrack.nodes.map((node, index) => {
						const isGlowTop = index <= lastCompletedOrActiveIndex;
						const isGlowBottom = index < lastCompletedOrActiveIndex;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MilestoneNodeCard, {
							node,
							index,
							isFirst: index === 0,
							isLast: index === activeTrack.nodes.length - 1,
							isPathGlowTop: isGlowTop,
							isPathGlowBottom: isGlowBottom,
							onSelectNode: handleSelectNode
						}, node.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 sm:gap-5 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center flex-shrink-0 w-10 sm:w-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-0.5 h-6 border-l-2 border-dashed border-slate-700/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAddModalOpen(true),
								className: "grid size-9 place-items-center rounded-xl border border-dashed border-white/20 bg-[#0B0F17] text-muted-foreground hover:border-primary hover:text-primary transition-all hover:scale-105",
								title: "Add Next Milestone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setAddModalOpen(true),
							className: "flex-1 py-3 px-4 rounded-xl border border-dashed border-white/15 bg-[#131B2A]/40 hover:border-primary/50 hover:bg-[#131B2A]/80 font-mono text-xs text-muted-foreground hover:text-foreground transition-all flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+ ADD NEW STRATEGIC MILESTONE TO THIS PATH" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] text-primary/80 font-bold uppercase",
								children: ["INITIALIZE // NODE ", String(activeTrack.nodes.length + 1).padStart(2, "0")]
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MilestoneDetailModal, {
				node: selectedNode,
				open: detailModalOpen,
				onOpenChange: setDetailModalOpen,
				onUpdateNode: handleUpdateNode,
				onDeleteNode: handleDeleteNode
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMilestoneModal, {
				open: addModalOpen,
				activeTrackId,
				existingNodesCount: activeTrack.nodes.length,
				onOpenChange: setAddModalOpen,
				onAddNode: handleAddNode
			})
		]
	});
}
function RealityCheckView({ onNavigateToToday }) {
	const [activeMode, setActiveMode] = (0, import_react.useState)("emergency");
	const [intercepts, setIntercepts] = (0, import_react.useState)(() => loadInterceptsCount());
	const [interceptLogged, setInterceptLogged] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIntercepts(loadInterceptsCount());
		const handleRemoteIntercepts = (e) => {
			const custom = e;
			if (typeof custom.detail === "number") setIntercepts(custom.detail);
		};
		window.addEventListener("pcc-intercepts-updated", handleRemoteIntercepts);
		return () => window.removeEventListener("pcc-intercepts-updated", handleRemoteIntercepts);
	}, []);
	const [emergencyStep, setEmergencyStep] = (0, import_react.useState)(1);
	const [currentQuoteIndex, setCurrentQuoteIndex] = (0, import_react.useState)(0);
	const [selectedCostIndex, setSelectedCostIndex] = (0, import_react.useState)(1);
	const [selectedMicroAction, setSelectedMicroAction] = (0, import_react.useState)(DEFAULT_MICRO_ACTIONS[0]);
	const INITIAL_SECONDS = 300;
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(INITIAL_SECONDS);
	const [isTimerRunning, setIsTimerRunning] = (0, import_react.useState)(false);
	const [isTimerCompleted, setIsTimerCompleted] = (0, import_react.useState)(false);
	const timerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		saveInterceptsCount(intercepts);
		persistUserStatsToSupabase(readStreak(), intercepts).catch(() => {});
	}, [intercepts]);
	(0, import_react.useEffect)(() => {
		if (isTimerRunning && timeLeft > 0) timerRef.current = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timerRef.current);
					setIsTimerRunning(false);
					setIsTimerCompleted(true);
					playCompletionAlert();
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		else if (timerRef.current) clearInterval(timerRef.current);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isTimerRunning, timeLeft]);
	const playCompletionAlert = () => {
		try {
			const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
			const osc = audioCtx.createOscillator();
			const gain = audioCtx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
			osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + .3);
			gain.gain.setValueAtTime(.2, audioCtx.currentTime);
			gain.gain.exponentialRampToValueAtTime(.01, audioCtx.currentTime + .5);
			osc.connect(gain);
			gain.connect(audioCtx.destination);
			osc.start();
			osc.stop(audioCtx.currentTime + .5);
		} catch {}
	};
	const handleLogManualIntercept = () => {
		setIntercepts((prev) => prev + 1);
		setInterceptLogged(true);
		setTimeout(() => setInterceptLogged(false), 2e3);
	};
	const handleNextQuote = () => {
		setCurrentQuoteIndex((prev) => (prev + 1) % HARD_TRUTHS.length);
	};
	const handleAcknowledgeReckoning = () => {
		setEmergencyStep(2);
	};
	const handleSelectCostAndProceed = () => {
		setEmergencyStep(3);
	};
	const handleSelectMicroActionAndLaunch = (action) => {
		setSelectedMicroAction(action);
		setIntercepts((prev) => prev + 1);
		setActiveMode("micro");
		setTimeLeft(INITIAL_SECONDS);
		setIsTimerRunning(true);
		setIsTimerCompleted(false);
	};
	const toggleTimer = () => {
		if (timeLeft === 0) {
			setTimeLeft(INITIAL_SECONDS);
			setIsTimerCompleted(false);
			setIsTimerRunning(true);
			return;
		}
		setIsTimerRunning(!isTimerRunning);
	};
	const resetTimer = () => {
		setIsTimerRunning(false);
		setTimeLeft(INITIAL_SECONDS);
		setIsTimerCompleted(false);
	};
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};
	const timerProgress = (INITIAL_SECONDS - timeLeft) / INITIAL_SECONDS * 100;
	const currentQuote = HARD_TRUTHS[currentQuoteIndex];
	const currentCost = WASTE_COSTS[selectedCostIndex];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-5xl mx-auto pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline/60 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-crimson animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "label-mono text-foreground font-bold tracking-wider",
							children: "Anti-Doomscroll // Reality Check Protocol"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded border border-crimson/50 bg-crimson/10 px-1.5 py-0.5 font-mono text-[9px] text-crimson font-bold",
							children: "DEFCON 1 INTERRUPT"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted-foreground mt-0.5",
						children: "Cognitive pattern interruption & instant dopamine vector redirection."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-lg border border-hairline bg-surface/80 px-3 py-1.5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[9px] text-muted-foreground uppercase leading-none",
							children: "Distractions Intercepted"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-base font-bold text-foreground leading-tight",
							children: [
								intercepts,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-emerald font-normal",
									children: "SAVES"
								})
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleLogManualIntercept,
						className: cn("inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-xs font-bold transition-all select-none", interceptLogged ? "border-emerald bg-emerald/20 text-emerald" : "border-hairline bg-background/60 text-muted-foreground hover:text-foreground hover:bg-surface"),
						children: interceptLogged ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), "LOGGED (+1)"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5 text-gold" }), "+1 INTERCEPT"] })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActiveMode("emergency"),
					className: cn("panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex items-center justify-between", activeMode === "emergency" ? "border-crimson ring-1 ring-crimson/40 bg-surface shadow-[0_0_20px_rgba(255,23,68,0.12)]" : "border-hairline/60 bg-surface/50 opacity-75 hover:opacity-100"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("grid size-9 place-items-center rounded-lg border", activeMode === "emergency" ? "border-crimson/60 bg-crimson/15 text-crimson" : "border-hairline bg-background text-muted-foreground"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] text-muted-foreground font-semibold",
							children: "MODE A"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("font-mono text-xs sm:text-sm font-bold", activeMode === "emergency" ? "text-crimson" : "text-foreground"),
							children: "Emergency Reality Check"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-muted-foreground hidden sm:inline",
						children: "3-STEP FLOW"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActiveMode("micro"),
					className: cn("panel text-left p-3.5 sm:p-4 transition-all relative overflow-hidden flex items-center justify-between", activeMode === "micro" ? "border-cyber ring-1 ring-cyber/40 bg-surface shadow-[0_0_20px_rgba(0,229,255,0.12)]" : "border-hairline/60 bg-surface/50 opacity-75 hover:opacity-100"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("grid size-9 place-items-center rounded-lg border", activeMode === "micro" ? "border-cyber/60 bg-cyber/15 text-cyber" : "border-hairline bg-background text-muted-foreground"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] text-muted-foreground font-semibold",
							children: "MODE B"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("font-mono text-xs sm:text-sm font-bold", activeMode === "micro" ? "text-cyber" : "text-foreground"),
							children: "5-Minute Micro-Kickstart"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-muted-foreground hidden sm:inline",
						children: "FOCUS LAUNCHER"
					})]
				})]
			}),
			activeMode === "emergency" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 border-b border-hairline/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-4 font-mono text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setEmergencyStep(1),
									className: cn("flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors", emergencyStep === 1 ? "bg-crimson/15 text-crimson border border-crimson/40 font-bold" : "text-muted-foreground hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-4 place-items-center rounded-full bg-crimson/20 text-[10px]",
										children: "1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE ANCHOR" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 text-muted-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setEmergencyStep(2),
									className: cn("flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors", emergencyStep === 2 ? "bg-gold/15 text-gold border border-gold/40 font-bold" : "text-muted-foreground hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-4 place-items-center rounded-full bg-gold/20 text-[10px]",
										children: "2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "COST ANALYSIS" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 text-muted-foreground/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setEmergencyStep(3),
									className: cn("flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors", emergencyStep === 3 ? "bg-cyber/15 text-cyber border border-cyber/40 font-bold" : "text-muted-foreground hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-4 place-items-center rounded-full bg-cyber/20 text-[10px]",
										children: "3"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "REDIRECTION" })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] text-muted-foreground hidden md:inline",
							children: [
								"STEP ",
								emergencyStep,
								" OF 3"
							]
						})]
					}),
					emergencyStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel border-crimson/40 bg-surface/95 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(255,23,68,0.08)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 border-b border-hairline/60 pb-3 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skull, { className: "size-4 text-crimson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-bold uppercase text-crimson tracking-wider",
										children: "STEP 1 // HARD-TRUTH ANCHOR"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleNextQuote,
									className: "inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" }),
										"CYCLE TRUTH (",
										currentQuoteIndex + 1,
										"/",
										HARD_TRUTHS.length,
										")"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-6 space-y-4 text-center max-w-2xl mx-auto py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-block rounded border border-crimson/30 bg-crimson/10 px-3 py-1 font-mono text-[10px] uppercase font-bold text-crimson tracking-widest",
										children: ["THEMATIC CLASSIFICATION // ", currentQuote.theme.toUpperCase()]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
										className: "font-mono text-xl sm:text-2xl font-bold leading-snug tracking-tight text-foreground",
										children: [
											"“",
											currentQuote.quote,
											"”"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto font-sans",
										children: currentQuote.subtext
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-6 border-t border-hairline/60 flex flex-col sm:flex-row items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground font-mono text-center sm:text-left",
									children: "Do not flinch or click away. Read it twice before advancing."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 w-full sm:w-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleNextQuote,
										className: "flex-1 sm:flex-initial rounded border border-hairline bg-background/60 px-4 py-2.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors",
										children: "ANOTHER TRUTH"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleAcknowledgeReckoning,
										className: "flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded bg-crimson px-5 py-2.5 font-mono text-xs font-bold text-white shadow-lg shadow-crimson/25 hover:bg-crimson/90 transition-all cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RECKONING ACKNOWLEDGED" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})]
								})]
							})
						]
					}),
					emergencyStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel border-gold/40 bg-surface/95 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(255,179,0,0.08)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 border-b border-hairline/60 pb-3 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-bold uppercase text-gold tracking-wider",
										children: "STEP 2 // FRICTION & COST ANALYSIS"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: "SELECT INTENDED DURATION"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-mono text-xs font-bold text-foreground mb-3 uppercase tracking-wider",
									children: "How long were you about to waste in the scroll vortex?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
									children: WASTE_COSTS.map((opt, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setSelectedCostIndex(idx),
										className: cn("panel p-3.5 text-center transition-all cursor-pointer font-mono flex flex-col items-center justify-center gap-1", selectedCostIndex === idx ? "border-gold bg-gold/15 text-gold shadow-[0_0_15px_rgba(255,179,0,0.2)] font-bold ring-1 ring-gold/40" : "border-hairline bg-background/60 text-muted-foreground hover:text-foreground hover:bg-surface"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm sm:text-base font-bold",
											children: opt.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] opacity-75",
											children: [opt.durationMinutes, " MINS"]
										})]
									}, opt.durationMinutes))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-4 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-crimson/30 bg-crimson/5 p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 font-mono text-[11px] text-crimson font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }), "SYNAPTIC & TIME DEFICIT"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-sans leading-relaxed",
											children: currentCost.costDescription
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-emerald/30 bg-emerald/5 p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 font-mono text-[11px] text-emerald font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), "WHAT YOU ARE TRADING AWAY"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-foreground font-mono leading-relaxed font-semibold",
											children: currentCost.alternateGain
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-6 mt-6 border-t border-hairline/60 flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEmergencyStep(1),
									className: "rounded border border-hairline bg-background/60 px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors",
									children: "BACK TO ANCHOR"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleSelectCostAndProceed,
									className: "inline-flex items-center gap-2 rounded bg-gold px-5 py-2.5 font-mono text-xs font-bold text-background shadow-lg shadow-gold/25 hover:bg-gold/90 transition-all cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PROCEED TO REDIRECTION" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})]
							})
						]
					}),
					emergencyStep === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel border-cyber/40 bg-surface/95 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.08)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 border-b border-hairline/60 pb-3 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4 text-cyber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-bold uppercase text-cyber tracking-wider",
										children: "STEP 3 // IMMEDIATE MICRO-REDIRECTION"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: "LAUNCH 5-MIN KICKSTART"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-muted-foreground font-mono",
									children: "Select ONE immediate low-friction micro-action below. Completing this 5-minute protocol breaks the dopamine trance and restores executive control."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-3 pt-2",
									children: DEFAULT_MICRO_ACTIONS.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										onClick: () => handleSelectMicroActionAndLaunch(action),
										className: "panel group flex items-start justify-between gap-4 p-4 border-hairline/80 bg-background/70 hover:border-cyber hover:bg-surface transition-all cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase", action.category === "cyber" && "bg-cyber/15 text-cyber border border-cyber/30", action.category === "acad" && "bg-gold/15 text-gold border border-gold/30", action.category === "aiml" && "bg-emerald/15 text-emerald border border-emerald/30", action.category === "general" && "bg-secondary text-foreground"),
														children: action.category
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-mono text-xs text-muted-foreground",
														children: [action.estimatedMinutes, " MIN RUN"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-mono text-sm font-bold text-foreground group-hover:text-cyber transition-colors",
													children: action.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground font-sans",
													children: action.directive
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "flex-shrink-0 mt-2 inline-flex items-center gap-1 rounded bg-cyber/10 border border-cyber/40 px-3 py-1.5 font-mono text-xs font-bold text-cyber group-hover:bg-cyber group-hover:text-background transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3" }), "LAUNCH"]
										})]
									}, action.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-6 mt-6 border-t border-hairline/60 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEmergencyStep(2),
									className: "rounded border border-hairline bg-background/60 px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors",
									children: "BACK TO COST"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: "SELECTING AN ACTION STARTS THE 5:00 PROTOCOL"
								})]
							})
						]
					})
				]
			}),
			activeMode === "micro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel border-cyber/50 bg-surface/95 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.12)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline/60 pb-4 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-cyber animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs font-bold uppercase text-cyber tracking-wider",
										children: "OPERATIONAL PROTOCOL // 5-MINUTE KICKSTART"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-mono text-lg font-bold text-foreground",
									children: ["Active Mission: ", selectedMicroAction.title]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setActiveMode("emergency"),
									className: "rounded border border-hairline bg-background/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors",
									children: "SWITCH TO REALITY FLOW"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center py-6 sm:py-8 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative grid size-52 sm:size-60 place-items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "size-full -rotate-90",
										viewBox: "0 0 100 100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "50",
											cy: "50",
											r: "42",
											className: "stroke-background/80",
											strokeWidth: "6",
											fill: "transparent"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "50",
											cy: "50",
											r: "42",
											className: cn("transition-all duration-1000", isTimerCompleted ? "stroke-emerald" : "stroke-cyber"),
											strokeWidth: "6",
											strokeDasharray: 264,
											strokeDashoffset: 264 - 264 * timerProgress / 100,
											strokeLinecap: "round",
											fill: "transparent"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute flex flex-col items-center justify-center text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("font-mono text-4xl sm:text-5xl font-extrabold tracking-tighter", isTimerCompleted ? "text-emerald animate-bounce" : isTimerRunning ? "text-cyber" : "text-foreground"),
											children: formatTime(timeLeft)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] uppercase text-muted-foreground mt-1 tracking-widest",
											children: isTimerCompleted ? "MISSION ACCOMPLISHED" : isTimerRunning ? "ENGAGED // ACTIVE" : "PAUSED // STANDBY"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-md text-center space-y-1.5 px-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs font-semibold text-foreground",
										children: "“Do not plan the whole day. Just focus for these 5 minutes. Momentum will take care of the rest.”"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted-foreground",
										children: ["Target: ", selectedMicroAction.directive]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: toggleTimer,
										className: cn("inline-flex items-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-bold shadow-lg transition-all cursor-pointer", isTimerRunning ? "border border-hairline bg-surface text-foreground hover:bg-secondary" : "bg-cyber text-background hover:bg-cyber/90 shadow-cyber/20"),
										children: isTimerRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }), "PAUSE RUN"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), timeLeft === 0 ? "RESTART 5:00" : "ENGAGE FOCUS (05:00)"] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: resetTimer,
										className: "rounded-lg border border-hairline bg-background/60 p-3 text-muted-foreground hover:text-foreground hover:bg-surface transition-colors",
										title: "Reset Timer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
									})]
								})
							]
						}),
						isTimerCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-lg border border-emerald/50 bg-emerald/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-6 text-emerald flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-mono text-sm font-bold text-emerald",
									children: "Dopamine Loop Broken // Momentum Restored!"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "You successfully survived the friction hurdle. Transition to full tactical command."
								})] })]
							}), onNavigateToToday && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onNavigateToToday,
								className: "inline-flex items-center gap-2 rounded bg-emerald px-4 py-2 font-mono text-xs font-bold text-background hover:bg-emerald/90 transition-all flex-shrink-0 cursor-pointer shadow-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TRANSITION TO FULL COMMAND" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-4 sm:p-5 border-hairline/60 bg-surface/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4 text-cyber animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TACTICAL DOCTRINE: Discipline is choosing what you want MOST over what you want NOW." })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-[11px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground font-semibold",
						children: "RULE OF 5 MINS:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Action precedes motivation." })]
				})]
			})
		]
	});
}
var HISTORY_KEY = "pcc_history";
var LONGEST_STREAK_KEY = "pcc_longest_streak";
function formatDateKey(date) {
	return date.toISOString().slice(0, 10);
}
function loadRawHistory() {
	try {
		const raw = window.localStorage.getItem(HISTORY_KEY);
		if (!raw) return {};
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
		return {};
	} catch {
		return {};
	}
}
function saveRawHistory(history) {
	try {
		window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
	} catch {}
}
function calculateLongestStreak(history, currentStreak) {
	let longest = 0;
	try {
		const raw = window.localStorage.getItem(LONGEST_STREAK_KEY);
		if (raw) {
			const parsed = parseInt(raw, 10);
			if (!isNaN(parsed) && parsed > longest) longest = parsed;
		}
	} catch {}
	if (currentStreak > longest) {
		longest = currentStreak;
		try {
			window.localStorage.setItem(LONGEST_STREAK_KEY, String(longest));
		} catch {}
	}
	return longest;
}
function generate30DayMatrix(history) {
	const result = [];
	const today = /* @__PURE__ */ new Date();
	for (let i = 29; i >= 0; i--) {
		const d = new Date(today);
		d.setDate(d.getDate() - i);
		const key = formatDateKey(d);
		let count = 0;
		if (key in history) {
			const val = history[key];
			count = typeof val === "number" && val > 0 ? val > 10 ? Math.round(val / 20) : val : 0;
		}
		let level = 0;
		if (count === 0) level = 0;
		else if (count <= 1) level = 1;
		else if (count <= 2) level = 2;
		else if (count <= 4) level = 3;
		else level = 4;
		result.push({
			date: key,
			dayLabel: d.toLocaleDateString("en-US", { weekday: "short" }),
			dayNumber: d.getDate(),
			count,
			level
		});
	}
	return result;
}
function computeFocusHoursFromBoards(boards) {
	let totalMinutes = 0;
	boards.forEach((b) => {
		b.tasks.forEach((t) => {
			if (t.done) {
				const taskMins = typeof t.actualFocusMinutes === "number" && t.actualFocusMinutes > 0 ? t.actualFocusMinutes : t.durationMinutes || 0;
				totalMinutes += taskMins;
			} else if (typeof t.actualFocusMinutes === "number" && t.actualFocusMinutes > 0) totalMinutes += t.actualFocusMinutes;
		});
	});
	return Number((totalMinutes / 60).toFixed(1));
}
function computeStatsOverview() {
	const boards = loadBoards();
	const roadmaps = loadRoadmaps();
	const rawHistory = loadRawHistory();
	const intercepts = loadInterceptsCount();
	let totalTasks = 0;
	let completedTasks = 0;
	let accumulatedFocusMinutes = 0;
	const pillarStats = {
		cyber: {
			total: 0,
			completed: 0,
			rate: 0
		},
		gold: {
			total: 0,
			completed: 0,
			rate: 0
		},
		emerald: {
			total: 0,
			completed: 0,
			rate: 0
		}
	};
	const priorityStats = {
		critical: {
			total: 0,
			completed: 0
		},
		normal: {
			total: 0,
			completed: 0
		},
		low: {
			total: 0,
			completed: 0
		}
	};
	const tagStats = {};
	boards.forEach((board) => {
		const pillarKey = board.id;
		board.tasks.forEach((task) => {
			totalTasks += 1;
			if (task.done) {
				completedTasks += 1;
				const mins = typeof task.actualFocusMinutes === "number" && task.actualFocusMinutes > 0 ? task.actualFocusMinutes : task.durationMinutes || 0;
				accumulatedFocusMinutes += mins;
			} else if (typeof task.actualFocusMinutes === "number" && task.actualFocusMinutes > 0) accumulatedFocusMinutes += task.actualFocusMinutes;
			if (pillarStats[pillarKey]) {
				pillarStats[pillarKey].total += 1;
				if (task.done) pillarStats[pillarKey].completed += 1;
			}
			const prio = task.priority || "normal";
			if (priorityStats[prio]) {
				priorityStats[prio].total += 1;
				if (task.done) priorityStats[prio].completed += 1;
			}
			if (task.tag) {
				const tag = task.tag.toUpperCase();
				if (!tagStats[tag]) tagStats[tag] = {
					total: 0,
					completed: 0
				};
				tagStats[tag].total += 1;
				if (task.done) tagStats[tag].completed += 1;
			}
		});
	});
	Object.values(roadmaps).forEach((track) => {
		const pillarKey = track.trackId === "cyber" ? "cyber" : track.trackId === "academics" ? "gold" : "emerald";
		track.nodes.forEach((node) => {
			totalTasks += 1;
			const isDone = node.status === "completed" || node.subTasks && node.subTasks.length > 0 && node.subTasks.every((st) => st.completed);
			if (isDone) completedTasks += 1;
			if (pillarStats[pillarKey]) {
				pillarStats[pillarKey].total += 1;
				if (isDone) pillarStats[pillarKey].completed += 1;
			}
			if (node.tags && node.tags.length > 0) node.tags.forEach((t) => {
				const tag = t.toUpperCase();
				if (!tagStats[tag]) tagStats[tag] = {
					total: 0,
					completed: 0
				};
				tagStats[tag].total += 1;
				if (isDone) tagStats[tag].completed += 1;
			});
		});
	});
	[
		"cyber",
		"gold",
		"emerald"
	].forEach((p) => {
		const stat = pillarStats[p];
		stat.rate = stat.total > 0 ? Math.round(stat.completed / stat.total * 100) : 0;
	});
	const completionRate = totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0;
	const today = /* @__PURE__ */ new Date();
	let currentStreak = 0;
	let offset = 0;
	while (offset < 30) {
		const d = new Date(today);
		d.setDate(d.getDate() - offset);
		if ((rawHistory[formatDateKey(d)] ?? 0) > 0) {
			currentStreak += 1;
			offset += 1;
		} else if (offset === 0) offset += 1;
		else break;
	}
	const longestStreak = calculateLongestStreak(rawHistory, currentStreak);
	const totalFocusHours = Number((accumulatedFocusMinutes / 60).toFixed(1));
	const activityMatrix = generate30DayMatrix(rawHistory);
	return {
		totalTasks,
		completedTasks,
		pendingTasks: totalTasks - completedTasks,
		completionRate,
		currentStreak,
		longestStreak,
		totalFocusHours,
		interceptsCount: intercepts,
		pillarStats,
		priorityStats,
		tagStats,
		activityMatrix
	};
}
function exportBackupData() {
	const exportPayload = {
		version: "2.0.0",
		exportDate: (/* @__PURE__ */ new Date()).toISOString(),
		tasks: loadBoards(),
		roadmaps: loadRoadmaps(),
		intercepts: loadInterceptsCount(),
		history: loadRawHistory()
	};
	const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportPayload, null, 2))}`;
	const downloadAnchor = document.createElement("a");
	downloadAnchor.setAttribute("href", jsonString);
	downloadAnchor.setAttribute("download", `pcc-tactical-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`);
	document.body.appendChild(downloadAnchor);
	downloadAnchor.click();
	downloadAnchor.remove();
}
function importBackupData(jsonText) {
	try {
		const data = JSON.parse(jsonText);
		if (!data || typeof data !== "object") return false;
		if (Array.isArray(data.tasks)) saveBoards(data.tasks);
		if (data.roadmaps && typeof data.roadmaps === "object") saveRoadmaps(data.roadmaps);
		if (typeof data.intercepts === "number") saveInterceptsCount(data.intercepts);
		if (data.history && typeof data.history === "object") saveRawHistory(data.history);
		return true;
	} catch {
		return false;
	}
}
function purgeAllDataToZero() {
	try {
		window.localStorage.removeItem("pcc_tasks");
		window.localStorage.removeItem("pcc_history");
		window.localStorage.removeItem("pcc_roadmaps");
		window.localStorage.removeItem("pcc_intercepts");
		window.localStorage.removeItem("pcc_longest_streak");
		saveBoards(BOARDS);
		saveRoadmaps(DEFAULT_ROADMAPS);
		saveInterceptsCount(0);
		saveRawHistory({});
		purgeSupabaseCloudData().catch(() => {});
		if (typeof window !== "undefined") {
			window.dispatchEvent(new CustomEvent("pcc-intercepts-updated", { detail: 0 }));
			[
				"cyber",
				"academics",
				"aiml"
			].forEach((trackId) => {
				window.dispatchEvent(new CustomEvent("pcc-roadmaps-updated", { detail: {
					trackId,
					nodes: []
				} }));
			});
		}
	} catch {}
}
function StatsView() {
	const [stats, setStats] = (0, import_react.useState)(() => computeStatsOverview());
	const [hoveredDay, setHoveredDay] = (0, import_react.useState)(null);
	const [resetModalOpen, setResetModalOpen] = (0, import_react.useState)(false);
	const [importStatus, setImportStatus] = (0, import_react.useState)("idle");
	const fileInputRef = (0, import_react.useRef)(null);
	const refreshStats = () => {
		setStats(computeStatsOverview());
	};
	(0, import_react.useEffect)(() => {
		refreshStats();
	}, []);
	const handleExport = () => {
		exportBackupData();
	};
	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			const content = event.target?.result;
			if (content) if (importBackupData(content)) {
				setImportStatus("success");
				refreshStats();
				setTimeout(() => setImportStatus("idle"), 3e3);
			} else {
				setImportStatus("error");
				setTimeout(() => setImportStatus("idle"), 3e3);
			}
		};
		reader.readAsText(file);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const handleConfirmPurge = () => {
		purgeAllDataToZero();
		setResetModalOpen(false);
		refreshStats();
	};
	const getActivityColor = (level) => {
		switch (level) {
			case 0: return "bg-[#0B0F17] border-white/5 text-muted-foreground/30 hover:border-white/20";
			case 1: return "bg-cyan-950/50 border-cyan-800/50 text-cyan-400/90 hover:border-cyan-600";
			case 2: return "bg-cyan-900/60 border-cyan-600/70 text-cyan-300 shadow-[0_0_8px_rgba(0,229,255,0.2)] hover:border-cyan-400";
			case 3: return "bg-cyan-500/80 border-cyan-400 text-black font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)] hover:scale-105";
			case 4: return "bg-[#00E5FF] border-white text-black font-extrabold shadow-[0_0_16px_rgba(0,229,255,0.6)] hover:scale-105";
			default: return "bg-[#0B0F17] border-white/5";
		}
	};
	const totalPillarCount = stats.pillarStats.cyber.total + stats.pillarStats.gold.total + stats.pillarStats.emerald.total;
	const cyberPct = totalPillarCount > 0 ? stats.pillarStats.cyber.total / totalPillarCount * 100 : 0;
	const goldPct = totalPillarCount > 0 ? stats.pillarStats.gold.total / totalPillarCount * 100 : 0;
	const emeraldPct = totalPillarCount > 0 ? stats.pillarStats.emerald.total / totalPillarCount * 100 : 0;
	const avgFocusYield = stats.completedTasks > 0 ? (stats.totalFocusHours / stats.completedTasks).toFixed(1) : "0.0";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-5xl mx-auto pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-[#00E5FF] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-mono text-base sm:text-lg font-bold uppercase tracking-wider text-foreground",
							children: "Performance Telemetry & Analytics"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[9px] text-primary font-bold",
							children: "LIVE"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted-foreground mt-0.5",
						children: "Historical velocity, consistency matrix, and cross-pillar tactical yield."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: refreshStats,
					className: "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SYNC TELEMETRY" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 rounded-xl border border-white/10 bg-[#131B2A] hover:-translate-y-1 hover:border-emerald/50 hover:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.2)] transition-all duration-300 group flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
									children: "Missions Completed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-2xl font-extrabold text-foreground tracking-tight group-hover:text-emerald transition-colors",
									children: [stats.completedTasks, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-normal text-muted-foreground ml-1.5 font-mono",
										children: ["/ ", stats.totalTasks]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-9 place-items-center rounded-lg border border-emerald/40 bg-emerald/10 text-emerald group-hover:scale-105 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 pt-2 border-t border-white/5 space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[10px] font-mono text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "COMPLETION RATE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-emerald font-bold",
									children: [stats.completionRate, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1 w-full overflow-hidden rounded-full bg-[#0B0F17]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-emerald transition-all duration-500",
									style: { width: `${stats.completionRate}%` }
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 rounded-xl border border-white/10 bg-[#131B2A] hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_8px_24px_-8px_rgba(255,179,0,0.2)] transition-all duration-300 group flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
									children: "Operational Streak"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-2xl font-extrabold text-gold tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(255,179,0,0.4)] transition-all",
									children: [stats.currentStreak, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-normal text-muted-foreground ml-1.5 font-mono",
										children: "DAYS"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-9 place-items-center rounded-lg border border-gold/40 bg-gold/10 text-gold group-hover:scale-105 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ALL-TIME RECORD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground font-bold",
								children: [stats.longestStreak, " CONSECUTIVE"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 rounded-xl border border-white/10 bg-[#131B2A] hover:-translate-y-1 hover:border-cyber/50 hover:shadow-[0_8px_24px_-8px_rgba(0,229,255,0.2)] transition-all duration-300 group flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
									children: "Estimated Focus Yield"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-2xl font-extrabold text-cyber tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] transition-all",
									children: [stats.totalFocusHours, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-normal text-muted-foreground ml-1.5 font-mono",
										children: "HOURS"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-9 place-items-center rounded-lg border border-cyber/40 bg-cyber/10 text-cyber group-hover:scale-105 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "HIGH-COGNITIVE YIELD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-cyber font-bold",
								children: [
									"~",
									avgFocusYield,
									"H / MISSION"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4 rounded-xl border border-white/10 bg-[#131B2A] hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_24px_-8px_rgba(0,229,255,0.2)] transition-all duration-300 group flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold",
									children: "Distractions Intercepted"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-2xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors",
									children: [stats.interceptsCount, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-normal text-muted-foreground ml-1.5 font-mono",
										children: "SAVES"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-9 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary group-hover:scale-105 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SAVED COGNITIVE TIME" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-emerald font-bold",
								children: [
									"~",
									(stats.interceptsCount * .5).toFixed(1),
									"H PRESERVED"
								]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-4 sm:p-5 rounded-xl border border-white/10 bg-[#131B2A] space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4 text-cyber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground",
							children: "30-Day Activity Matrix"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LESS" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-sm bg-[#0B0F17] border border-white/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-sm bg-cyan-950/60 border border-cyan-800/50" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-sm bg-cyan-900/60 border border-cyan-600/70" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-sm bg-cyan-500/80 border border-cyan-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-sm bg-[#00E5FF] border border-white" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MORE" })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5 sm:gap-2",
						children: stats.activityMatrix.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onMouseEnter: () => setHoveredDay(day),
							onMouseLeave: () => setHoveredDay(null),
							className: cn("relative flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-lg border transition-all duration-200 cursor-pointer select-none", getActivityColor(day.level), hoveredDay?.date === day.date && "ring-2 ring-cyber scale-105 z-10"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[9px] opacity-75 leading-none",
									children: day.dayLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-bold mt-0.5 leading-none",
									children: day.dayNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[8px] mt-0.5 opacity-80 leading-none",
									children: day.count
								})
							]
						}, day.date))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2.5 min-h-[28px] flex items-center justify-between px-3 py-1 rounded-md border border-white/10 bg-[#0B0F17] font-mono text-[11px]",
						children: hoveredDay ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3 text-cyber" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: hoveredDay.date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										"(",
										hoveredDay.dayLabel,
										")"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground",
							children: [
								"Logged:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-cyber font-bold",
									children: [hoveredDay.count, " operations"]
								}),
								" (Level",
								" ",
								hoveredDay.level,
								"/4)"
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground/60 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3 text-muted-foreground/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hover over any day node to inspect tactical telemetry..." })]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-4 sm:p-5 rounded-xl border border-white/10 bg-[#131B2A] space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-foreground font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CROSS-PILLAR ALLOCATION RATIO" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-[11px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-cyber font-semibold",
									children: [
										"● CYBER (",
										Math.round(cyberPct),
										"%)"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-gold font-semibold",
									children: [
										"● ACADEMICS (",
										Math.round(goldPct),
										"%)"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-emerald font-semibold",
									children: [
										"● AIML (",
										Math.round(emeraldPct),
										"%)"
									]
								})
							]
						})]
					}), totalPillarCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-full overflow-hidden rounded-full bg-[#0B0F17] border border-white/5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-mono text-muted-foreground/50 text-center pt-0.5",
							children: "No active tasks logged across pillars yet (0 active objectives)."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-2 w-full overflow-hidden rounded-full flex bg-[#0B0F17]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-cyber transition-all duration-500",
								style: { width: `${cyberPct}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-gold transition-all duration-500",
								style: { width: `${goldPct}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-emerald transition-all duration-500",
								style: { width: `${emeraldPct}%` }
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-3 border-t border-white/5 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between font-mono text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-muted-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-3 text-muted-foreground" }), "ACTIVE DOMAIN TAGS"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] text-muted-foreground",
							children: [Object.keys(stats.tagStats).length, " ACTIVE TAGS"]
						})]
					}), Object.keys(stats.tagStats).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-mono text-muted-foreground/50 py-1.5",
						children: "No active domain tags recorded yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5 pt-0.5",
						children: Object.entries(stats.tagStats).map(([tag, data]) => {
							const rate = data.total > 0 ? Math.round(data.completed / data.total * 100) : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-[#0B0F17] px-2.5 py-1 font-mono text-[11px] hover:border-white/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-foreground",
										children: ["#", tag]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-emerald font-semibold",
										children: [rate, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-muted-foreground/70",
										children: [
											"(",
											data.completed,
											"/",
											data.total,
											")"
										]
									})
								]
							}, tag);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-4 rounded-xl border border-white/10 bg-[#131B2A] space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBraces, { className: "size-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-mono text-xs font-bold uppercase tracking-wider text-foreground",
								children: "Data Vault & Backups"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-muted-foreground",
							children: "LOCAL PERSISTENCE ENCRYPTED"
						})]
					}),
					importStatus === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2.5 rounded-lg border border-emerald/50 bg-emerald/10 font-mono text-xs text-emerald flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tactical backup successfully imported and synchronized!" })]
					}),
					importStatus === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2.5 rounded-lg border border-red-500/50 bg-red-500/10 font-mono text-xs text-red-400 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Failed to parse JSON backup file. Please verify file integrity." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2.5 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleExport,
								className: "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0B0F17] px-3.5 py-2 font-mono text-xs font-bold text-foreground hover:bg-white/5 hover:border-emerald/40 hover:text-emerald transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "EXPORT JSON" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								ref: fileInputRef,
								onChange: handleFileChange,
								accept: ".json",
								className: "hidden"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileInputRef.current?.click(),
								className: "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#0B0F17] px-3.5 py-2 font-mono text-xs font-bold text-foreground hover:bg-white/5 hover:border-cyber/40 hover:text-cyber transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5 text-cyber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IMPORT JSON" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setResetModalOpen(true),
								className: "inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-3.5 py-2 font-mono text-xs font-bold text-red-400 hover:bg-red-500/15 hover:border-red-500/40 transition-all sm:ml-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PURGE ALL LOCAL DATA" })]
							})
						]
					})
				]
			}),
			resetModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel max-w-md w-full p-6 border-red-500/40 bg-[#131B2A] shadow-2xl space-y-4 rounded-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-red-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-mono text-sm font-bold uppercase tracking-wider",
								children: "CONFIRM PURGE PROTOCOL (ZERO STATE)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted-foreground leading-relaxed",
							children: "This action will permanently wipe all local task boards, roadmap milestones, activity logs, streak counters, and session telemetry back to a clean zero state."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 flex items-center justify-end gap-2.5 font-mono text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setResetModalOpen(false),
								className: "rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-muted-foreground hover:text-foreground",
								children: "CANCEL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleConfirmPurge,
								className: "rounded-lg bg-red-500/20 border border-red-500/50 px-4 py-2 font-bold text-red-300 hover:bg-red-500/30 transition-colors",
								children: "CONFIRM PURGE (ZERO STATE)"
							})]
						})
					]
				})
			})
		]
	});
}
function IntroScreen({ onComplete }) {
	const [stage, setStage] = (0, import_react.useState)(1);
	const [patchProgress, setPatchProgress] = (0, import_react.useState)(0);
	const [roleCheck, setRoleCheck] = (0, import_react.useState)(false);
	const [goalCheck, setGoalCheck] = (0, import_react.useState)(false);
	const [levelCheck, setLevelCheck] = (0, import_react.useState)(false);
	const [glitchActive, setGlitchActive] = (0, import_react.useState)(false);
	const [lightningFlash, setLightningFlash] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (stage !== 1) return;
		const tRole = setTimeout(() => setRoleCheck(true), 400);
		const tGoal = setTimeout(() => setGoalCheck(true), 800);
		const tLevel = setTimeout(() => setLevelCheck(true), 1200);
		const tGlitch = setTimeout(() => {
			setGlitchActive(true);
		}, 1500);
		const tNext = setTimeout(() => {
			setStage(2);
		}, 3e3);
		return () => {
			clearTimeout(tRole);
			clearTimeout(tGoal);
			clearTimeout(tLevel);
			clearTimeout(tGlitch);
			clearTimeout(tNext);
		};
	}, [stage]);
	(0, import_react.useEffect)(() => {
		if (stage !== 2) return;
		setPatchProgress(0);
		let current = 0;
		const interval = setInterval(() => {
			current += 2;
			if (current >= 100) {
				setPatchProgress(100);
				clearInterval(interval);
				setTimeout(() => {
					setStage(3);
				}, 150);
			} else setPatchProgress(current);
		}, 50);
		return () => clearInterval(interval);
	}, [stage]);
	(0, import_react.useEffect)(() => {
		if (stage !== 3) return;
		setLightningFlash(true);
		const tFlashEnd = setTimeout(() => {
			setLightningFlash(false);
		}, 500);
		const tToStage4 = setTimeout(() => {
			setStage(4);
		}, 1800);
		return () => {
			clearTimeout(tFlashEnd);
			clearTimeout(tToStage4);
		};
	}, [stage]);
	const handleSkip = () => {
		if (stage < 4) setStage(4);
		else onComplete();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-0 z-50 flex flex-col items-center justify-center p-4 select-none overflow-hidden transition-colors duration-1000", stage <= 2 ? "bg-[#06080E]" : "bg-[#040810]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 pointer-events-none transition-all duration-1000", stage <= 2 ? glitchActive ? "bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(239,68,68,0.22),transparent_70%)]" : "bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(220,38,38,0.12),transparent_70%)]" : "bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(0,229,255,0.18),transparent_70%)]") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 pointer-events-none opacity-20",
				style: {
					backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
					backgroundSize: "32px 32px"
				}
			}),
			lightningFlash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-cyan-200/30 backdrop-blur-[1px] animate-pulse z-40 pointer-events-none transition-opacity duration-300" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-5 right-5 z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleSkip,
					className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 font-mono text-[11px] text-muted-foreground hover:text-cyan-300 hover:bg-white/10 hover:border-cyan-500/40 transition-all cursor-pointer shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stage < 4 ? "SKIP SEQUENCE >" : "INITIALIZE >" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full max-w-2xl flex flex-col items-center justify-center text-center",
				children: [
					(stage === 3 || stage === 4) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-24 pointer-events-none opacity-40 animate-pulse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-32 text-cyan-400 blur-sm drop-shadow-[0_0_25px_rgba(0,229,255,0.8)]" })
					}),
					stage <= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("w-full max-w-lg transition-all duration-700 flex flex-col items-center", glitchActive && stage === 1 && "animate-shake", stage === 3 && "scale-105"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("w-full rounded-t-2xl border-t-2 border-x-2 p-3 sm:p-4 bg-[#0A0E17] shadow-2xl relative overflow-hidden transition-all duration-500", stage <= 2 ? glitchActive ? "border-red-500/80 shadow-[0_0_40px_rgba(239,68,68,0.3)]" : "border-red-900/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]" : "border-cyan-400/80 shadow-[0_0_40px_rgba(0,229,255,0.35)]"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-1.5 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-white/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full transition-colors", stage <= 2 ? glitchActive ? "bg-red-500 animate-ping" : "bg-red-500/60" : "bg-cyan-400 animate-pulse") })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("w-full rounded-lg p-4 sm:p-6 text-left font-mono relative overflow-hidden min-h-[220px] flex flex-col justify-between transition-colors duration-500", stage <= 2 ? "bg-[#05070D] border border-red-950/60" : "bg-[#030712] border border-cyan-900/60"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 pointer-events-none opacity-25",
										style: {
											backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
											backgroundSize: "100% 4px"
										}
									}),
									stage === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 relative z-10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-3 text-red-400" }), "TERMINAL_ROOT // OPERATOR_SYNC"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-red-400 font-bold",
													children: "PORT_443 // ACTIVE"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2 text-xs sm:text-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: cn("flex items-center justify-between transition-opacity duration-300", roleCheck ? "opacity-100 text-slate-200" : "opacity-0"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Role — Student"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-emerald-400 font-bold flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " VERIFIED"]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: cn("flex items-center justify-between transition-opacity duration-300", goalCheck ? "opacity-100 text-slate-200" : "opacity-0"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Goal — Elite Mastery"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-emerald-400 font-bold flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " VERIFIED"]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: cn("flex items-center justify-between transition-opacity duration-300", levelCheck ? "opacity-100 text-slate-200" : "opacity-0"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: "Level — Operator"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-emerald-400 font-bold flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " VERIFIED"]
														})]
													})
												]
											}),
											glitchActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "pt-2 border-t border-red-500/30 animate-in fade-in duration-200",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 text-red-400 font-bold text-xs sm:text-sm animate-pulse",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 shrink-0 text-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "tracking-wider",
														children: "/// SYSTEM OVERRIDE / BREACH DETECTED"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-red-300/80 mt-1 font-mono",
													children: "Unauthorized cognitive distraction intercepted. Triggering patch protocol..."
												})]
											})
										]
									}),
									stage === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 relative z-10 my-auto",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-xs font-mono",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-amber-400 flex items-center gap-1.5 font-bold",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-3.5 animate-spin" }), "LOADING PATCH // OVERCLOCKING PROTOCOL"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-amber-400 font-extrabold",
													children: [patchProgress, "%"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-3 w-full rounded-full bg-black/60 border border-amber-400/40 p-0.5 overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-cyan-400 transition-all duration-75 shadow-[0_0_10px_rgba(245,158,11,0.6)]",
													style: { width: `${patchProgress}%` }
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-3 gap-2 text-[10px] font-mono text-muted-foreground pt-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate text-emerald-400",
														children: "KERNEL: ARMORED"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate text-center text-amber-400",
														children: "DOPAMINE: GATED"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate text-right text-cyan-400",
														children: "RAM: MAX_HZ"
													})
												]
											})
										]
									}),
									stage === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 relative z-10 my-auto text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/50 bg-cyan-950/40 text-cyan-300 text-xs font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-cyan-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OVERCLOCK COMPLETED // 100% EFFICIENCY" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-base sm:text-lg font-black text-cyan-400 tracking-wider drop-shadow-[0_0_10px_rgba(0,229,255,0.7)]",
												children: "// SYSTEM READY // REDFOX DECK ONLINE"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground font-mono",
												children: "Tactical execution matrix synchronized. Deploying command deck..."
											})
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-[108%] h-4 bg-gradient-to-b from-[#1C2538] to-[#0D131F] rounded-b-xl border-x-2 border-b-2 border-white/10 shadow-2xl relative flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-16 h-1 rounded-full bg-white/20" })
						})]
					}),
					stage === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-in fade-in zoom-in-95 duration-700 w-full max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E63946]/40 bg-[#E63946]/10 font-mono text-xs text-[#FF6B6B] shadow-[0_0_20px_rgba(230,57,70,0.3)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-[#E63946]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: "VERSION 2.5"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 flex flex-col items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedFoxLogo, {
										size: 76,
										glow: true,
										className: "animate-pulse"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-mono text-3xl sm:text-5xl font-black uppercase tracking-wider text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#E63946] drop-shadow-[0_0_25px_rgba(230,57,70,0.6)]",
											children: "REDFOX"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-sm sm:text-base text-muted-foreground font-medium max-w-lg mx-auto",
										children: "Rapid Engagement & Defense: Field Operations & Cyber System"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-3 pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "panel p-3 rounded-xl border border-white/10 bg-[#0E1524]/80 text-left",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-cyan-400 mb-1.5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-xs font-bold text-foreground",
												children: "Cyber Pillar"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-[10px] text-muted-foreground",
												children: "THM / HTB / Labs"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "panel p-3 rounded-xl border border-white/10 bg-[#0E1524]/80 text-left",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-amber-400 mb-1.5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-xs font-bold text-foreground",
												children: "Academics"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-[10px] text-muted-foreground",
												children: "OS / Math / Exams"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "panel p-3 rounded-xl border border-white/10 bg-[#0E1524]/80 text-left",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4 text-emerald-400 mb-1.5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-xs font-bold text-foreground",
												children: "AIML Builds"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono text-[10px] text-muted-foreground",
												children: "Models / Papers"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-4 flex flex-col sm:flex-row items-center justify-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: onComplete,
									className: "w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl border-2 border-[#E63946] bg-[#E63946]/20 text-[#FF8585] font-mono text-sm font-extrabold tracking-wider hover:bg-[#E63946] hover:text-white hover:shadow-[0_0_30px_rgba(230,57,70,0.8)] transition-all duration-300 group cursor-pointer animate-pulse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "[ INITIALIZE REDFOX ]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 group-hover:translate-x-1 transition-transform" })]
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-6 flex items-center gap-2 z-10",
				children: [
					1,
					2,
					3,
					4
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setStage(s),
					"aria-label": `Jump to stage ${s}`,
					className: cn("h-1.5 rounded-full transition-all duration-300 cursor-pointer", stage === s ? "w-8 bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]" : "w-2 bg-white/20 hover:bg-white/40")
				}, s))
			})
		]
	});
}
function TaskStopwatchModal({ task, pillar, onClose, onFinishTask, onUpdateFocusMinutes }) {
	const targetSeconds = (task.durationMinutes || 45) * 60;
	const [secondsElapsed, setSecondsElapsed] = (0, import_react.useState)(0);
	const [isRunning, setIsRunning] = (0, import_react.useState)(true);
	const [mode, setMode] = (0, import_react.useState)("countdown");
	const [isMinimized, setIsMinimized] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let interval = null;
		if (isRunning) interval = setInterval(() => {
			setSecondsElapsed((prev) => prev + 1);
		}, 1e3);
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning]);
	const formatTimeDisplay = (totalSecs) => {
		const hrs = Math.floor(totalSecs / 3600);
		const mins = Math.floor(totalSecs % 3600 / 60);
		const secs = totalSecs % 60;
		if (hrs > 0) return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};
	const remainingSeconds = Math.max(0, targetSeconds - secondsElapsed);
	const progressPercent = Math.min(100, secondsElapsed / targetSeconds * 100);
	const handleFinish = () => {
		const elapsedMinutes = Math.max(1, Math.round(secondsElapsed / 60));
		onFinishTask(pillar, task.id, elapsedMinutes);
		onClose();
	};
	const handleSaveProgressAndClose = () => {
		const elapsedMinutes = Math.round(secondsElapsed / 60);
		if (elapsedMinutes > 0) onUpdateFocusMinutes(pillar, task.id, elapsedMinutes);
		onClose();
	};
	if (isMinimized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-20 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 rounded-xl border border-cyan-400/50 bg-[#0A0E17]/95 p-3 shadow-[0_0_25px_rgba(0,229,255,0.35)] backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-cyan-400 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 max-w-[140px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate font-mono text-[11px] font-bold text-foreground",
						children: task.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xs font-black text-cyan-400",
						children: mode === "countdown" ? formatTimeDisplay(remainingSeconds) : formatTimeDisplay(secondsElapsed)
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 border-l border-white/10 pl-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIsRunning(!isRunning),
						className: "grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-foreground transition-colors",
						children: isRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5 text-amber-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 text-cyan-400" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleFinish,
						className: "grid size-7 place-items-center rounded-lg border border-emerald-500/50 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors",
						title: "Complete Task",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIsMinimized(false),
						className: "grid size-7 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-muted-foreground transition-colors",
						title: "Maximize",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-3.5" })
					})
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel max-w-md w-full p-6 border-cyan-400/50 bg-[#0C121E] shadow-[0_0_50px_rgba(0,229,255,0.25)] rounded-2xl relative overflow-hidden space-y-5 animate-in zoom-in-95 duration-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-white/10 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4 text-cyan-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-bold uppercase tracking-wider text-foreground",
							children: "TACTICAL FOCUS STOPWATCH"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsMinimized(true),
							className: "grid size-7 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors",
							title: "Minimize to Floating Bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { className: "size-3.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleSaveProgressAndClose,
							className: "grid size-7 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors",
							title: "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-cyan-400 uppercase font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3 text-cyan-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								task.tag,
								" · ",
								formatDuration(task.durationMinutes || 45),
								" TARGET"
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mono text-base font-extrabold text-foreground tracking-tight line-clamp-2 pt-1",
							children: task.title
						}),
						task.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted-foreground line-clamp-2",
							children: task.description
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-[#060A12] relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-4xl sm:text-5xl font-black text-cyan-400 tracking-wider tabular-nums drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]",
							children: mode === "countdown" ? formatTimeDisplay(remainingSeconds) : formatTimeDisplay(secondsElapsed)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[11px] text-muted-foreground mt-2 uppercase tracking-widest",
							children: mode === "countdown" ? remainingSeconds === 0 ? "TARGET REACHED // OVERTIME" : "TIME REMAINING" : "TOTAL TIME ELAPSED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full h-2 rounded-full bg-white/5 border border-white/10 mt-4 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 shadow-[0_0_10px_rgba(0,229,255,0.5)]",
								style: { width: `${progressPercent}%` }
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("countdown"),
						className: cn("py-1.5 rounded-lg border font-mono text-xs transition-colors", mode === "countdown" ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300 font-bold" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"),
						children: "Countdown Mode"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("stopwatch"),
						className: cn("py-1.5 rounded-lg border font-mono text-xs transition-colors", mode === "stopwatch" ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300 font-bold" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"),
						children: "Elapsed Stopwatch"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 pt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSecondsElapsed(0),
							className: "grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
							title: "Reset Timer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsRunning(!isRunning),
							className: cn("flex-1 py-3 rounded-xl border font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer", isRunning ? "border-amber-400/60 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 shadow-[0_0_20px_rgba(245,158,11,0.2)]" : "border-cyan-400/80 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-400 hover:text-black shadow-[0_0_25px_rgba(0,229,255,0.4)]"),
							children: isRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PAUSE FOCUS" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RESUME FOCUS" })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleFinish,
							className: "px-4 py-3 rounded-xl border border-emerald-500/60 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-1.5 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FINISH TASK" })]
						})
					]
				})
			]
		})
	});
}
function computeCompletion(boards) {
	const all = boards.flatMap((b) => b.tasks);
	return all.length ? Math.round(all.filter((t) => t.done).length / all.length * 100) : 0;
}
function Index() {
	const [showIntro, setShowIntro] = (0, import_react.useState)(true);
	const [activeTab, setActiveTab] = (0, import_react.useState)("today");
	const [boards, setBoards] = (0, import_react.useState)(BOARDS);
	const [streak, setStreak] = (0, import_react.useState)(0);
	const [syncStatus, setSyncStatusState] = (0, import_react.useState)(() => getSyncStatus());
	const hydrated = (0, import_react.useRef)(false);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("create");
	const [activePillar, setActivePillar] = (0, import_react.useState)("cyber");
	const [activeTask, setActiveTask] = (0, import_react.useState)(null);
	const [activeStopwatch, setActiveStopwatch] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		return subscribeSyncStatus(setSyncStatusState);
	}, []);
	usePccRealtime({
		setBoards,
		setStreak
	});
	(0, import_react.useEffect)(() => {
		setBoards(loadBoards());
		setStreak(readStreak());
		hydrated.current = true;
		syncAllFromSupabase().then((synced) => {
			setBoards(synced.boards);
			setStreak(synced.streak);
		}).catch((err) => {
			console.warn("[REDFOX Supabase] Initial mount sync failed:", err);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated.current) return;
		saveBoards(boards);
		setStreak(recordCompletion(computeCompletion(boards)));
	}, [boards]);
	const completion = computeCompletion(boards);
	const focusedHours = computeFocusHoursFromBoards(boards);
	const handleIntroComplete = () => {
		setShowIntro(false);
	};
	const handleReplayIntro = () => {
		setShowIntro(true);
	};
	function toggle(boardId, taskId) {
		let updatedTaskForCloud = null;
		setBoards((prev) => prev.map((b) => b.id === boardId ? {
			...b,
			tasks: b.tasks.map((t) => {
				if (t.id === taskId) {
					const nextDone = !t.done;
					const updated = {
						...t,
						done: nextDone,
						actualFocusMinutes: nextDone && (!t.actualFocusMinutes || t.actualFocusMinutes === 0) ? t.durationMinutes || 45 : t.actualFocusMinutes
					};
					updatedTaskForCloud = updated;
					return updated;
				}
				return t;
			})
		} : b));
		if (updatedTaskForCloud) {
			updateTaskInSupabase(updatedTaskForCloud, boardId);
			const taskObj = updatedTaskForCloud;
			if (taskObj.node_id && taskObj.checklist_item_id) setRoadmapChecklistItemCompletion(pillarToTrackId(boardId), taskObj.node_id, taskObj.checklist_item_id, taskObj.done);
		}
	}
	function openNew(boardId) {
		setMode("create");
		setActivePillar(boardId);
		setActiveTask(null);
		setDialogOpen(true);
	}
	function openTask(boardId, task) {
		setMode("edit");
		setActivePillar(boardId);
		setActiveTask(task);
		setDialogOpen(true);
	}
	function handleStartTimer(boardId, task) {
		setActiveStopwatch({
			task,
			pillar: boardId
		});
	}
	function handleFinishTimerTask(pillar, taskId, elapsedMinutes) {
		let updatedTaskForCloud = null;
		setBoards((prev) => prev.map((b) => b.id === pillar ? {
			...b,
			tasks: b.tasks.map((t) => {
				if (t.id === taskId) {
					const updated = {
						...t,
						done: true,
						actualFocusMinutes: (t.actualFocusMinutes || 0) + elapsedMinutes
					};
					updatedTaskForCloud = updated;
					return updated;
				}
				return t;
			})
		} : b));
		if (updatedTaskForCloud) {
			updateTaskInSupabase(updatedTaskForCloud, pillar);
			const taskObj = updatedTaskForCloud;
			if (taskObj.node_id && taskObj.checklist_item_id) setRoadmapChecklistItemCompletion(pillarToTrackId(pillar), taskObj.node_id, taskObj.checklist_item_id, true);
		}
	}
	function handleUpdateFocusMinutes(pillar, taskId, elapsedMinutes) {
		let updatedTaskForCloud = null;
		setBoards((prev) => prev.map((b) => b.id === pillar ? {
			...b,
			tasks: b.tasks.map((t) => {
				if (t.id === taskId) {
					const updated = {
						...t,
						actualFocusMinutes: (t.actualFocusMinutes || 0) + elapsedMinutes
					};
					updatedTaskForCloud = updated;
					return updated;
				}
				return t;
			})
		} : b));
		if (updatedTaskForCloud) updateTaskInSupabase(updatedTaskForCloud, pillar);
	}
	function submit(draft, originPillar) {
		setBoards((prev) => prev.map((b) => {
			let tasks = b.tasks;
			if (b.id === originPillar) tasks = tasks.filter((t) => t.id !== draft.task.id);
			if (b.id === draft.pillar) tasks = tasks.findIndex((t) => t.id === draft.task.id) >= 0 ? tasks.map((t) => t.id === draft.task.id ? draft.task : t) : [...tasks, draft.task];
			return tasks === b.tasks ? b : {
				...b,
				tasks
			};
		}));
		if (mode === "create") insertTaskToSupabase(draft.task, draft.pillar);
		else updateTaskInSupabase(draft.task, draft.pillar);
		if (draft.task.node_id && draft.task.checklist_item_id) setRoadmapChecklistItemCompletion(pillarToTrackId(draft.pillar), draft.task.node_id, draft.task.checklist_item_id, draft.task.done);
	}
	function remove(boardId, taskId) {
		let taskToRemove = null;
		setBoards((prev) => prev.map((b) => {
			if (b.id === boardId) {
				taskToRemove = b.tasks.find((t) => t.id === taskId) || null;
				return {
					...b,
					tasks: b.tasks.filter((t) => t.id !== taskId)
				};
			}
			return b;
		}));
		deleteTaskFromSupabase(taskId);
		const linkedTask = taskToRemove;
		if (linkedTask && linkedTask.node_id && linkedTask.checklist_item_id) setRoadmapChecklistItemCompletion(pillarToTrackId(boardId), linkedTask.node_id, linkedTask.checklist_item_id, false);
		setDialogOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			showIntro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroScreen, { onComplete: handleIntroComplete }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopSidebar, {
				activeTab,
				setActiveTab,
				onReplayIntro: handleReplayIntro
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-backdrop flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashHeader, {
					onReplayIntro: handleReplayIntro,
					syncStatus
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex-1 space-y-4 px-4 pt-4 pb-24 lg:px-6 lg:pb-8",
					children: [
						activeTab === "today" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-cyber" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "label-mono text-foreground",
										children: "Daily Dash"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsRow, {
								completion,
								streak,
								focusedHours
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 lg:grid-cols-3",
								children: boards.map((board) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillarBoard, {
									board,
									onToggle: toggle,
									onNew: openNew,
									onOpenTask: openTask,
									onStartTimer: handleStartTimer
								}, board.id))
							})
						] }),
						activeTab === "roadmaps" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoadmapsView, {}),
						activeTab === "reality" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealityCheckView, { onNavigateToToday: () => setActiveTab("today") }),
						activeTab === "stats" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsView, {})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileBottomNav, {
				activeTab,
				setActiveTab
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectiveDialog, {
				open: dialogOpen,
				mode,
				initialPillar: activePillar,
				initialTask: activeTask,
				allActiveTasks: boards.flatMap((b) => b.tasks),
				onOpenChange: setDialogOpen,
				onSubmit: submit,
				onDelete: remove
			}),
			activeStopwatch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskStopwatchModal, {
				task: activeStopwatch.task,
				pillar: activeStopwatch.pillar,
				onClose: () => setActiveStopwatch(null),
				onFinishTask: handleFinishTimerTask,
				onUpdateFocusMinutes: handleUpdateFocusMinutes
			})
		]
	});
}
//#endregion
export { Index as component };
