<script setup>
</script>

<template>
    <div class="page">
        <!-- 搜索功能盒子 -->
        <div class="search-box">
            <!-- logo -->
            <img src="/src/assets/icon/icon.svg" alt="Logo" class="logo">
            <!-- 红色搜索盒子 -->
            <input type="checkbox" id="menu-btn" class="menu-btn" />
            <label for="menu-btn" class="menu-icon"></label>
            <div class="red-search-box">
                <!-- 搜索框 -->
                <input type="text" class="search-input" placeholder="你想查询什么_">
                <!-- <div contenteditable="true" class="search-input">123</div> -->
                <!-- 分割条 -->
                <div class="divider"></div>
                <!-- 高级选项 -->
                <div class="advanced-options">123123123</div>
            </div>

        </div>

        <div></div>
    </div>
</template>

<style scoped>
.page {
    width: 100%;
    height: 100vh;
    padding-top: 40px;
    background: url(/background/Fparrot_CPU2_small.png);
    background-size: 100% 100%;

    .search-box {
        max-width: 1280px;
        margin: 0 auto;
        position: relative;

        img {
            position: absolute;
            top: 20px;
            left: -54px;
        }

        span {
            font-size: 30px;
            position: absolute;
            top: 20px;
            right: 0;
        }

        .red-search-box {
            width: 1180px;
            height: 45px;
            padding: 10px;
            padding-right: 30px;
            background-color: var(--RD-color-red);
            clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
            /* 过度 */
            transition: all 0.2s ease;

            .search-input {
                font-size: 40px;
                width: 100%;
                color: white;
                background-color: #00000000;
                border: 0;
            }

            .divider {
                margin: 10px 0;
                width: 100%;
                height: 1px;
                background-color: antiquewhite;
            }

            .search-input::placeholder {
                color: rgba(255, 255, 255, 0.644);
            }

            .search-input:focus {
                outline: none;
            }
        }

        .menu-btn {
            display: none;
        }

        .menu-icon::before {
            content: "\2630";
            position: absolute;
            right: 0;
            top: 20px;

        }

        input.menu-btn:checked~.red-search-box {
            height: 90px;
        }


    }
}
</style>