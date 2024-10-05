<script setup lang="ts">
import {ref} from 'vue';
import $ from 'jquery';

enum Src{
	bilibili = "/src/assets/icon/bilibili.svg",
}

type SearchItem = {
	title: string;
	description: string;
	author: string;
	src: Src;
	coverUrl: string;
	url: string;
};

const exampleResult : SearchItem = {
	title: "【新世界记录】高速2x2玻璃门",
	description: "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。 ",
	author: "your mom  from  bilibili.com ",
	src: Src.bilibili,
	coverUrl: "/src/assets/3.png",
	url: "https://www.bilibili.com/"
};

const exampleResult2 : SearchItem = {
	title: "【新世界记录】高速3x3玻璃门",
	description: "你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相相。 ",
	author: "your mom  from  bilibili.com ",
	src: Src.bilibili,
	coverUrl: "/src/assets/3.png",
	url: "https://www.bilibili.com/"
};

const results = ref<SearchItem[]>([
	{ ...exampleResult }, 
	{ ...exampleResult2 }, 
	{ ...exampleResult }, 
	{ ...exampleResult2 }, 
	{ ...exampleResult2 }, 
	{ ...exampleResult },
	{ ...exampleResult2 }, 
	{ ...exampleResult },
]);

const handleExpand = (_this: any, i: number) => {
	// The description element
	const input = $(`#expand-btn-${i}`)[0] as HTMLInputElement;
	const desc = $(input).parent().siblings(".description")[0];
	const finalStateClass = input.checked ? "lc-expanded" : "lc-folded";
	console.log(desc.style);

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
	_this.$redrawVueMasonry();
	console.log("redraw called");

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

</script>

<template>
    <div class="page">
        <!-- 搜索功能盒子 -->
        <div class="search-box">
            <!-- logo -->
            <img src="/src/assets/icon/icon.svg" alt="Logo" class="logo">
            <!-- 红色搜索盒子 -->
            <div class="red-search-box">
                <!-- 搜索框 -->
                <input type="text" class="search-input" placeholder="搜索红石模块_">
                <!-- <div contenteditable="true" class="search-input">123</div> -->
                <!-- 分割条 -->
                <div class="divider"></div>
                <!-- 高级选项 -->
                <div class="advanced-options"><div>严格度:严格 排序:热度 源:所有 《原神》是由米哈游自主研发的一款全新开放世界冒险游戏游戏游戏游戏游戏游戏游</div></div>
            </div>
			<input type="checkbox" id="menu-btn" class="menu-btn" />
	        <label for="menu-btn" class="menu-icon"></label>
        </div>

		<div class="results" v-masonry transition-duration="0.6s" item-selector=".item" column-width="429" gutter="23">
		    <div v-masonry-tile class="item" v-for="(item, i) in results" @transitionstart="(e)=>{console.log(`${i} - transition start - ${e.propertyName}`)}">
				<div style="position: relative;">
					<img class="cover" :src="item.coverUrl">
					<div class="block1">
						<div class="block2"></div>
						<div class="title">{{ item.title }}</div>
					</div>
				</div>
				<div class="description lc-folded">{{ item.description }}</div>
				<div class="footer">
					<img alt="src-logo" class="src-logo" :src="item.src">
					<div class="author">{{ item.author }}</div>
					<input type="checkbox" :id=" `expand-btn-${i}` " class="expand-btn" @change="handleExpand(this, i)"/>
					<label :for=" `expand-btn-${i}` " class="expand-icon"><img alt="expand" src="/src/assets/icon/arrow-down.svg"></label>
				</div>
		    </div>
		</div>

        <div></div>
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
            height: 50px;
			margin-right: 84px;
			padding-left: 7px;
            background-color: var(--RD-color-red);
			color: white;
            clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
	        /* 过渡 */
			transition: all 0.2s ease;
            
			.search-input {
                font-size: 32px;
				margin-top: -1px;
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