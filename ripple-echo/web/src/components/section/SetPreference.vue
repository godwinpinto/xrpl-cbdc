<script setup lang="ts">
import type { UserInfo } from '@/stores/userStore';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'
import { onBeforeMount,ref } from "vue";

const userStore = useUserStore();

const { signOut } = useUserStore();


const { userInfo,stepIndicator,registrationInput } = storeToRefs(userStore)

const xrpl_ac_no_error =ref(false);

const account_no=ref('dd')

const goToNextPage=()=>{
    if(registrationInput.value.account_no=="" || !registrationInput.value.account_no.startsWith("r") || registrationInput.value.account_no.length<15){
        xrpl_ac_no_error.value=true;
    }else{
        xrpl_ac_no_error.value=false;
        stepIndicator.value++
    }
}

</script>
<template>
    <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" name="origin_id" id="origin_id" disabled :value="registrationInput.origin_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required>
    </div>
    <div>
        <label for="account_no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your XRPL account no</label>
        <input type="text" name="account_no" id="account_no" v-model="registrationInput.account_no" placeholder="Your XRPL account that you want notification for"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required>
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="xrpl_ac_no_error">Enter a valid XRPL account number</p>
    </div>
    <div>
        <h3 class="mb-4 font-medium text-sm text-gray-900 dark:text-white">Notification configuration</h3>
        <ul
            class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-3">
                    <input type="radio" value="true" name="sound" v-model="registrationInput.msg_meta_info.sound"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="horizontal-list-radio-license"
                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Speak Aloud</label>
                </div>
            </li>
            <li class="w-full dark:border-gray-600">
                <div class="flex items-center pl-3">
                    <input type="radio" value="false" name="sound" v-model="registrationInput.msg_meta_info.sound"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="horizontal-list-radio-passport"
                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Silent</label>
                </div>
            </li>
        </ul>
    </div>
    <div>
        <h3 class="mb-4 font-medium text-sm text-gray-900 dark:text-white">Language Preference</h3>
        <ul
            class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-3">
                    <input id="horizontal-list-radio-license" type="radio" value="en" name="lang" v-model="registrationInput.msg_meta_info.lang"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="horizontal-list-radio-license"
                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">English</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center pl-3">
                    <input id="horizontal-list-radio-license" type="radio" value="sp" name="lang"  v-model="registrationInput.msg_meta_info.lang"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="horizontal-list-radio-license"
                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Spanish</label>
                </div>
            </li>
            <li class="w-full dark:border-gray-600">
                <div class="flex items-center pl-3">
                    <input id="horizontal-list-radio-passport" type="radio" value="fr" name="lang" v-model="registrationInput.msg_meta_info.lang"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="horizontal-list-radio-passport"
                        class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">French</label>
                </div>
            </li>
        </ul>
    </div>
    <div class="flex justify-between">
        <button @click="signOut"
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Back
            </span>
        </button>
        <button @click="goToNextPage"
            class="rtext-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
            Continue
        </button>
    </div>

</template>