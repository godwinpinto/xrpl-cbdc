<script setup lang="ts">
import type { UserInfo } from '@/stores/userStore';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'
import { onMount, ref } from "vue";
import { fetchTransactions } from '@/service/appServices.ts';

const userStore = useUserStore();

const { signOut } = useUserStore();

const { userInfo, stepIndicator, registrationInput } = storeToRefs(userStore)

interface ITransactions {
    from: string
    date: string
    amount: string
}
const transactionsArray = ref<Array<ITransactions>>([]);

    const balance=ref("");
    const account=ref("");

const fetchBalanceAndTransactions = async () => {
    const response = await fetchTransactions(userInfo.value.email);
    if(response.status==200 && response.data.response.data && response.data.response.data.result){
        balance.value=response.data.response.data.result.balance;
        account.value=response.data.response.data.result.account;
        transactionsArray.value=response.data.response.data.result.txn as Array<ITransactions>;
    }
}

fetchBalanceAndTransactions();
</script>
<template>
    <div class="w-full mt-4 xl:grid-cols-2 2xl:grid-cols-3">
        <div
            class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div class="w-full flex justify-between">
                <div>
                    <h3 class="text-base font-normal text-gray-500 dark:text-gray-400">Your account balance</h3>
                    <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">XRP {{ balance }}</span>
                    <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
            <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
              {{ account }}
            </span>
          </p>
                </div>
                <div><button @click="signOut"
                        class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                        <span
                            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Logout
                        </span>
                    </button></div>
            </div>
        </div>
    </div>
    <div class="pt-4 min-h-96" id="about" role="tabpanel" aria-labelledby="about-tab">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700" v-for="(txn, index) in transactionsArray">
            <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div
                        class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span class="font-medium text-gray-600 dark:text-gray-300">{{ index }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 truncate dark:text-white">
                            {{ txn.date }}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {{ txn.from }}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        XRP {{ txn.amount }}
                    </div>
                </div>
            </li>
    </ul>
    </div></template>
    