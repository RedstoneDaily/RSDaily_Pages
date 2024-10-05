<script setup>
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
				margin-top: 4.08px;
				padding: 0;
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
                margin: 8.5px 75px 4.5px 0;
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
}
</style>