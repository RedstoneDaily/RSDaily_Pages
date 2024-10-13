<script setup lang="ts">
import {inject, ref, watch} from 'vue';
import $ from 'jquery';
import coverErrorImage from "@/assets/archive-img-not-found.svg";

enum Source{
	bilibili = "/src/assets/icon/bilibili.svg",
	unknown = "/src/assets/icon/bilibili.svg",
}

interface SearchItem {
	title: string;
	description: string;
	author: string;
	src: Source;
	coverUrl: string;
	url: string;
};
type ResultStatus = {
	status : "initial" | "searching" | "done"
	data : SearchItem[]
};

interface Response {
    data: Datum[];
    /**
     * 用时
     */
    time_used: number;
    [property: string]: any;
}

interface Datum {
    /**
     * 文字描述，搜索到这部分
     */
    content: string;
    id: number;
    imgs: string[];
    /**
     * 源，哪个档案馆来的
     */
    source: string;
    /**
     * 资源地址
     */
    url: string;
    [property: string]: any;
}

// const mockResult1 : SearchItem = {
// 	title: "【新世界记录】高速2x2玻璃门",
// 	description: "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。 ",
// 	author: "your mom  from  bilibili.com ",
// 	src: Source.bilibili,
// 	coverUrl: "/src/assets/3.png",
// 	url: "https://www.bilibili.com/"
// };

// const mockResult2 : SearchItem = {
// 	title: "【新世界记录】高速3x3玻璃门",
// 	description: "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相。 ",
// 	author: "your mom  from  bilibili.com ",
// 	src: Source.bilibili,
// 	coverUrl: "/src/assets/3.png",
// 	url: "https://www.bilibili.com/"
// };

// const mockResults = [
// 	{ ...mockResult1 }, 
// 	{ ...mockResult2 }, 
// 	{ ...mockResult1 }, 
// 	{ ...mockResult2 }, 
// 	{ ...mockResult2 }, 
// 	{ ...mockResult1 },
// 	{ ...mockResult2 }, 
// 	{ ...mockResult1 },
// ];

const redrawVueMasonry = inject("redrawVueMasonry") as (id?: any) => void;
const searchInput = ref("");
const result = ref<ResultStatus>({status: "initial", data: []});
watch(result, () => {$(redrawVueMasonry)});


///
///	Event Callbacks 
///

/**
 * 触发折叠/展开事件时的回调，接管瀑布流布局更新时的 css 工作，通过数步操作实现兼具 line-clamp 的智能行限、高度变化动画、以及 masonry 插件的瀑布流重排动画的过渡动画
 * 
 * @param _this `<template>` context 中获取的，代表全局 App 对象的 this 对象
 * @param i 元素序号，以确定施加动画操作的元素
 */
const handleToggle = (i: number) => {

	// Element references
	const input = $(`#expand-btn-${i}`)[0] as HTMLInputElement;
	const desc = $(input).parent().siblings(".description")[0];
	const finalStateClass = input.checked ? "lc-expanded" : "lc-folded";
	// console.log(desc.style);

	// 1. Get the initial height
	const h_i = window.getComputedStyle(desc).getPropertyValue("height");

	// 2. Clear styles; Set to line-clamp-based final state
	desc.classList.remove("lc-folded", "lc-expanded");
	desc.style.height = "";
	desc.style.transition = "";
	desc.classList.add(finalStateClass);

	// 3. Get the final height via browser's computation
	const h_f = window.getComputedStyle(desc).getPropertyValue("height");
	
	// 4. Launch the masonry rearrangement animations at this moment
	// 	  so that it refers to description's final state instead of initial state
	// console.log("redraw called");
	redrawVueMasonry();

	// 5. Set back to initial state via accurate heights
	desc.classList.remove("lc-folded", "lc-expanded");
	desc.style.height = h_i;

	// 6. Transition ON
	desc.style.transition = "height 0.6s ease";

	// 8. Listen to transition end and reset to line-clamp styles (for its ellipsis support)
	const controller = new AbortController();
	desc.addEventListener(
		"transitionend", 
		function (ev) {
			if (ev.propertyName == "height") {
				// 动态判断
				const input = $(`#expand-btn-${i}`)[0] as HTMLInputElement;
				const finalStateClass = input.checked ? "lc-expanded" : "lc-folded";
				desc.style.height = "";
				desc.style.transition = "";
				desc.classList.add(finalStateClass);
				controller.abort();
			}
		}, 
		{ signal: controller.signal }
	);

	// 7. Wait document ready & set the height to final state so it'll launch a height transition
	$(() => {
		desc.style.height = h_f;
	})

}

/**
 * 输入框回车时触发的回调，也即发起搜索
 */
 interface SearchItem {
	title: string;
	description: string;
	author: string;
	src: Source;
	coverUrl: string;
	url: string;
};
const handleEnter = (payload: KeyboardEvent) => {
	if(payload.key != "Enter") return;
	search();
}
const search = () => {
	const apiUrl = `https://api.rsdaily.com/v2/archive`;
	result.value = { ...result.value, status: "searching" };
	fetch(`${apiUrl}/${searchInput.value}`, { method: 'GET' })
		.then(res => res.json())
		.then(_res => {
			const res = _res as Response;
			const data = res.data;
			result.value = {
				status: "done",
				data: data.map((item): SearchItem => {
					const content = item.content.trim();
					const source = item.source in Source ? Source[item.source as keyof typeof Source] : Source.unknown;
					return {
						title: content.split('\n')[0].trim(),
						description: content.split('\n').slice(1).join('\n').trim(),
						author: "",
						src: source,
						coverUrl: item.imgs[0],
						url: item.url
					};
				})
			}
		})
}

</script>

<template>
    <div class="page">
        <!-- 搜索功能盒子 -->
        <div class="search-box">
            <!-- logo -->
			<RouterLink to="/">
				<img src="/src/assets/icon/icon.svg" alt="Logo" class="logo">
			</RouterLink>
            <!-- 红色搜索盒子 -->
            <div class="red-search-box">
                <!-- 搜索框 -->
                <input id="search-input" type="text" class="search-input" placeholder="搜索红石模块_" @keydown="handleEnter" v-model="searchInput">
                <!-- 分割条 -->
                <div class="divider"></div>
                <!-- 高级选项 -->
                <div class="advanced-options"><div><s style="opacity: 0.7;">严格度:严格 排序:热度 源:所有</s> 功能开发中，敬请期待</div></div>
            </div>
			<input type="checkbox" id="menu-btn" class="menu-btn" />
	        <label for="menu-btn" class="menu-icon"></label>
        </div>

        <div v-if="result.status == 'initial'" class="result-prompt">
			理论上这时候你应该还没开始搜索所以这里要写什么提示词好呢.jpg
		</div>
		<div v-else-if="result.status == 'searching'" class="result-prompt">
			搜索中......
		</div>
		<div v-else-if="result.data.length === 0" class="result-prompt">
			哇袄，搜索了个击败
		</div>
		<div v-else class="results" v-masonry transition-duration="0.6s" item-selector=".item" column-width="429" gutter="23">
		    <div v-masonry-tile class="item" v-for="(item, i) in result.data" @transitionstart="">
				<div style="position: relative;">
					<img class="cover" :src="item.coverUrl" referrerpolicy="no-referrer" @load="redrawVueMasonry()" @error.once="e => (e.target as HTMLImageElement).src = coverErrorImage">
					<a class="block1" :href="item.url">
						<div class="block2"></div>
						<div class="title">{{ item.title }}</div>
					</a>
				</div>
				<div class="description lc-folded">{{ item.description }}</div>
				<div class="footer">
					<img alt="src-logo" class="src-logo" :src="item.src">
					<div class="author">{{ item.author }}</div>
					<input type="checkbox" :id=" `expand-btn-${i}` " class="expand-btn" @change="handleToggle(i)"/>
					<label :for=" `expand-btn-${i}` " class="expand-icon"><img alt="expand" src="/src/assets/icon/arrow-down.svg"></label>
				</div>
		    </div>
		</div>
    </div>
</template>

<style scoped>
.page {
    width: 100%;
    height: 100vh;
    background: url(/background/Fparrot_CPU2_small.png);
    background-size: 100% 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: scroll;

    .search-box {
		position: relative;
		width: 100%;
        max-width: 987px;
        margin: calc(100vh * 62 / 1080) 48px 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		align-items: center;

        img {
			padding-right: 13px;
        }

        span {
            font-size: 30px;
            position: absolute;
            top: 20px;
            right: 0;
        }

        .red-search-box {
			flex: 1;
			display: flex;
			flex-direction: column;
            height: 50px;
			margin-right: 84px;
			padding-left: 7px;
            background-color: var(--RD-color-red);
			color: white;
            clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
	        /* 过渡 */
			transition: all 0.2s ease;
            
			.search-input {
				align-self: stretch;
                font-size: 32px;
				margin: -1px 20px auto 0px;
				padding: 0;
				line-height: 1.5;
				overflow: none;
                color: white;
                background-color: #00000000;
                border: 0;
				font-family: "欣意冠黑体";
            }

			.search-input::placeholder {
				color: white;
				opacity: 0.9;
			}

			.search-input:focus {
				outline: none;
			}

            .divider {
                margin: 3.58px 75px 4.5px 0;
                height: 1px;
                background-color: antiquewhite;
            }

			.advanced-options {
				position: relative;
				font-family: "黑体";
				margin: 0 75px 0 0;
				height: 100%;
			}
			
			.advanced-options > * {
				position: absolute;
				width: 100%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
        }

		.menu-btn {
            display: none;
        }

        .menu-icon::before {
            transition: all 0.2s ease;
            position: absolute;
            right: 0;
            bottom: 0;
			width: 84px;
			font-size: 20px;
			color: white;
			content: "高级选项...";
        }

		input.menu-btn:checked ~ .menu-icon::before {
			width: 96px;
			content: "收起";
		}

        .red-search-box:has(~ input.menu-btn:checked) {
            height: 81px;
			clip-path: polygon(0 0, 100% 0, calc(100% - 30.5px) 100%, 0 100%);
        }
    }

	.result-prompt {
		margin-top: 100px;
		max-width: 900px;
		width: 100%;
		padding: 50px;

		background-color: var(--RD-color-white-50);
		text-align: center;
		font-size: 18px;
		
	}

	/* clearfix */
    .results:after {
        content: '';
        display: block;
        clear: both;
    }

	.results{

		/* width: 429px * 2 + 23px; */
		width: calc(429px * 2 + 23px);
		margin-top: 38px;

		.item {
			width: 429px;
			background-color: var(--RD-color-white-75);
			float: left;
			margin-bottom: 23px;

			img.cover {
				width: 100%;
			}

			.block1 {
    			height: 44px;
    			clip-path: polygon(16.5px 0, 100% 0, 100% 100%, 0 100%);
    			background-color: var(--RD-color-white-50);

    			position: absolute;
    			right: 0;
    			bottom: 2.5px;
				text-decoration: none;

				.block2 {
	    			clip-path: polygon(16.5px 0, 100% 0, 100% 100%, 0 100%);
	    			background-color: var(--RD-color-white-50);

	    			position: absolute;
					margin: 0 0 0 13px;
					width: 100%;
					height: 100%;

				}

				.title {
					position: relative;
					margin: -1.08px 8px -1.92px 33px;
					font-size: 30px;
					color: var(--RD-color-red);
					line-height: 1.5;
				}

			}

			.description {
				margin: 8px 8px 0;
				font-family: "Arial";
				font-size: 14px;
				line-height: 1.5;
				overflow: hidden;
				white-space: break-spaces;
			}

			.description.lc-expanded {
				display: -webkit-box;
				word-break: break-all;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: none;
				line-clamp: none;
			}

			.description.lc-folded {
				display: -webkit-box;
				word-break: break-all;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				line-clamp: 3;
			}

			.footer {
				height: 32px;
				width: 100%;
				display: flex;
				align-items: end;
				
	            /* 过渡 */
				transition: all 0.2s ease;

				.src-logo {
					margin: auto auto 4px 4px;
					height: 24px;
				}

				.author {
					margin: auto auto 4px 3px;
					flex-grow: 1;

					font-size: 14px;
					font-family: "Minecraft AE";
					line-height: 1.5;
				}

				.expand-btn {
					display: none;
				}

				.expand-icon {
					margin: auto 3px 2px auto;
					
					> img {
		    	        /* 过渡 */
						transition: all 0.2s ease;
						transform: scaleY(1);
					}
				}				

				.expand-btn:checked ~ .expand-icon > img {
					transform: scaleY(-1);
				}

			}

		}

	}
}
</style>