<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import SetPreference from '../components/section/SetPreference.vue'
import ScanQr from '../components/section/ScanQr.vue'
import TheLogin from '../components/section/TheLogin.vue'
import ThankYou from '../components/section/ThankYou.vue'
import TheDashboard from '../components/section/TheDashboard.vue'
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'



const userStore = useUserStore();

const { userInfo, stepIndicator } = storeToRefs(userStore)

const stepIndicatorLocal = ref(0);

watch(stepIndicator, (newVal, oldVal) => {
  console.log("hello")
  stepIndicatorLocal.value = 1;
});
</script>
<template>
  <div class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
    <a class="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
      <img src="@/assets/logo.png" class="mr-4 h-11" alt="FlowBite Logo">
    </a>
    <!-- Card -->
    <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
      <TheLogin v-if="stepIndicator == 0" />
      <ol v-if="stepIndicator > 0 && stepIndicator < 4"
        class="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
        <li class="flex items-center" :class="stepIndicator==1?'text-blue-600 dark:text-blue-500':''">
          <span
            class="flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0" :class="stepIndicator==1?'border-blue-600  dark:border-blue-500':'border-gray-500 dark:border-gray-400'">
            1
          </span>
          Set Preference
          <svg class="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 12 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4" />
          </svg>
        </li>
        <li class="flex items-center" :class="stepIndicator==2?'text-blue-600 dark:text-blue-500':''">
          <span
            class="flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0" :class="stepIndicator==2?'border-blue-600  dark:border-blue-500':'border-gray-500 dark:border-gray-400'">
            2
          </span>
          Make Payment
          <svg class="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 12 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4" />
          </svg>
        </li>
        <li class="flex items-center" :class="stepIndicator==3?'text-blue-600 dark:text-blue-500':''">
          <span
            class="flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0" :class="stepIndicator==3?'border-blue-600  dark:border-blue-500':'border-gray-500 dark:border-gray-400'">
            3
          </span>
          Complete
        </li>
      </ol>
      <SetPreference v-if="stepIndicator == 1" />

      <ScanQr v-if="stepIndicator == 2" />
      <ThankYou v-if="stepIndicator == 3" />
      <TheDashboard v-if="stepIndicator == 4" />

    </div>
  </div>
</template>
