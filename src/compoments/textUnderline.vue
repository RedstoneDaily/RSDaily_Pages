<script setup>
</script>

<template>
    <div class="underline">
        <slot></slot>
    </div>
</template>

<style scoped>
.underline{
    display: inline-block;
    font-size: var(--text-title);
}
.underline::after{
    content: "";
    display: block;
    width: 0;
    height: 4px;
    background-color: var(--red-color);
    transition: width 0.5s;
}
.underline:hover::after{
    width: 100%;
}
</style>