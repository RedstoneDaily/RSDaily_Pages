<script setup>
</script>

<template>
    <div class="button-line">
        <slot></slot>
    </div>
</template>

<style scoped>
.button-line{
    display: inline-block;
    color: white;
    font-size: var(--text-title);
}
.button-line::after{
    content: "";
    display: block;
    width: 0;
    height: 4px;
    background-color: var(--red-color);
    transition: width 0.5s;
}
.button-line:hover::after{
    width: 100%;
}
</style>