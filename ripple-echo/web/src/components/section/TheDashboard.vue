<script setup lang="ts">
import type { UserInfo } from '@/stores/userStore';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'
import { ref, inject, computed } from "vue";
import { fetchTransactions } from '@/service/appServices';

const userStore = useUserStore();

const { signOut } = useUserStore();

const { userInfo, stepIndicator, registrationInput } = storeToRefs(userStore)

interface ITransactions {
    from: string
    date: string
    amount: string
}
const transactionsArray = ref<Array<ITransactions>>([]);

const balance = ref("");
const account = ref("");

const pusher: any = inject('pusher');
var channel = pusher.subscribe(import.meta.env.VITE_PUSHER_APP_CHANNEL);


channel.bind(userInfo.value.email, function (data: any) {
    console.log("data", data);
    const parseInfo: any = JSON.parse(data.meta)
    console.log("data", parseInfo.sound, parseInfo.lang);
    fetchBalanceAndTransactions();
    if (parseInfo.sound == false)
        return
    if (parseInfo.lang == "en") {
        speak("You received " + data.message + " XRP on Echo Box", "en-UK");
    } else if (parseInfo.lang == "sp") {
        speak("Recibiste " + data.message + " XRP en Echo Box", "es-ES");
    } else if (parseInfo.lang == "fr") {
        speak("Vous avez reçu " + data.message + " XRP sur  Echo Box", "fr-FR");
    } else if (parseInfo.lang == "hi") {
        speak("Echo Box per, " + data.message + " XRP praapth hue", "hi-IN");
    } else {
        speak("You received " + data.message + " XRP on Echo Box", "en-UK");
    }
});


const fetchBalanceAndTransactions = async () => {
    const response = await fetchTransactions(userInfo.value.email);
    if (response.status == 200 && response.data.response.data && response.data.response.data.result) {
        balance.value = response.data.response.data.result.balance;
        account.value = response.data.response.data.result.account;
        transactionsArray.value = response.data.response.data.result.txn as Array<ITransactions>;
    }
}

const configDateFormat:Intl.DateTimeFormatOptions={
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    weekday:'short',
  };

const formatTransactions = computed(() => {
    return transactionsArray.value.map((val) => {
        var d = new Date(0);
        d.setUTCSeconds(parseInt("" + val.date));
        return {
            from: val.from, amount: val.amount, date: d.toLocaleString('en-US',configDateFormat)
        };

    });
});


const playSoungTest = () => {
    speak("Welcome to Echo Box!", "en-UK");
}

let synth = window.speechSynthesis;
let greetingSpeech = new window.SpeechSynthesisUtterance()

function speak(text: string, lang: String) {

    const voice = synth.getVoices().filter(x => x.lang == lang);
    console.log(text)
    console.log(synth.getVoices())
    greetingSpeech.voice = voice[0]
    greetingSpeech.text = text
    greetingSpeech.pitch = 1
    greetingSpeech.rate = 1
    synth.speak(greetingSpeech)

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
                    <span class="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">XRP {{ balance
                    }}</span>
                    <p class="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                        <span class="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                            {{ account }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
        role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
            You need to manually test sound first to voice notify, on every page reload. Tested on Chrome, Safari and Edge.
        </div>
    </div>

    <div class="flex justify-between">
        <button @click="playSoungTest"
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Sound / Speaker Test
            </span>
        </button>
        <button @click="signOut"
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
            <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Logout
            </span>
        </button>

    </div>
    <div class="pt-4 min-h-96" id="about" role="tabpanel" aria-labelledby="about-tab">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700" v-for="(txn, index) in formatTransactions">
            <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div
                        class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span class="font-medium text-gray-600 dark:text-gray-300">{{ index+1 }}</span>
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
    </div>
</template>
    