<template>
    <div class="logo-container">
        <a href="/">
            <img
                class="logo"
                src="https://www.antdv.com/assets/logo.1ef800a8.svg"
                alt="Antd vue Logo"
            />
            Ant-Design-Vue
        </a>
    </div>
</template>
<style scoped lang="less">
.logo-container {
    display: flex;
    align-items: center;
    height: var(--header-height);
    a {
        height: 28px;
        width: 138px;
    }
    .logo {
        height: 100%;
        max-width: 100%;
    }
}
</style>