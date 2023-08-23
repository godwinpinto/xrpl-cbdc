<script setup lang="ts">
import type { UserInfo } from '@/stores/userStore';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, ref } from "vue";

const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore)
const { signInWithGoogle, asyncSetUser } = useUserStore();

onBeforeMount(() => {
    asyncSetUser();
});

</script>
<template>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Sign in / Register to platform
    </h2>
    <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
        Echo Box is a product by Ripple Echo (Hackathon Submission), that helps users receive notifications to transactions
        taking place on their XRPL accounts
    </div>

    <div class="flex justify-center items-center">
        <button type="button" @click="signInWithGoogle"
            class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
            <img src="@/assets/google_logo.svg" alt="Google Logo" class="w-6 h-6 mr-5" />
            Sign in with Google
        </button>
    </div>
</template>