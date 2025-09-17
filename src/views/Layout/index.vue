<script setup>
    import { useUserStore } from '@/stores/userStore';
    const userStore = useUserStore()
    userStore.userRequest()
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="170px">
                <el-menu
                    router
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    :default-active="$route.path"
                    text-color="#fff"
                >
                    <img class="image" src="/src/assets//hya2.jpg"></img>
                    <el-menu-item index="/dashboard">
                        <el-icon><DataBoard /></el-icon>
                        <span>画板</span>
                    </el-menu-item>
                    <el-menu-item index="/article">
                        <el-icon><Files /></el-icon>
                        <span>文章</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="user">
                        <el-avatar
                            :src="userStore.user_info.avatar"
                        />
                        <el-text class="mx-1" size="large">{{ userStore.user_info.name || userStore.user_info.username }}</el-text>
                    </div>
                    <el-icon :size="20"><SwitchButton/></el-icon>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="scss">
    .el-container {
        width: 100vw;
        height: 100vh;

        .el-aside {
            .el-menu {
                height: 100%;
                .image {
                    width: 100%;
                }
            }
        }

        .el-header {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* 水平偏移 垂直偏移 模糊范围 颜色 */
            z-index: 10; /* 确保阴影在上层 */
            display: flex;
            justify-content: end;
            align-items: center;
            padding: 0 20px;
            .user {
                display: flex;
                align-items: center; /* 让头像和文字垂直居中 */
                padding: 20px;
                gap: 15px;
            }
        }
    }
</style>