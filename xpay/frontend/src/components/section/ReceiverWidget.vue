<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch, ref, inject, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/userStore';

const scrollChat = ref<HTMLElement | null>(null);
const messages = ref<Array<message>>([]);

const pusher: any = inject('pusher');
var channel = pusher.subscribe(import.meta.env.VITE_PUSHER_APP_CHANNEL);

interface message {
    text: string,
    userId: string,
    createdAt: string
    msgDateTime: Date
}

const userStore = useUserStore();
const { receiverAccountInfo } = storeToRefs(userStore)



const newMessage = ref('');
const systemUserId = ""

const scrollChatToBottom = () => {
    setTimeout(() => {
        if (scrollChat.value) {
            const element = scrollChat.value.lastElementChild;
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'end' })

            } else {
            }
        }
    }, 500);
}



channel.bind(receiverAccountInfo.value.xrpl_acccount_no, function (data: any) {
    console.log("data", data);
    const dataMessage = data.message;
    messages.value.push({
        text: dataMessage,
        createdAt: (new Date()).toUTCString(),
        userId: "S",
        msgDateTime: new Date()
    })

});

</script>
<template>
    <div class="navbar bg-base-300 mb-0 pb-0">
        <span class="normal-case text-xl font-bold">Receiver (Mob. No.: 8888888888)</span>
    </div>
    <div class="divider my-0"></div>

    <div class=" flex flex-col">
        <div
            class="relative mx-auto border-white-800 dark:border-white-800 bg-white-800 dark:bg-white-800 border-[14px] rounded-[2.5rem] h-[700px] w-[300px] shadow-xl">
            <div class="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div class="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div class="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div class="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
            <div class="rounded-[23px] overflow-hidden w-[272px] h-[672px] bg-white dark:bg-white-800">
                <div class="navbar bg-white-800 dark:bg-white-800  mb-0 pb-0 pt-4">
                    <span class="normal-case text-xl font-bold text-slate-500">Message</span>
                </div>
                <div class="divider my-0"></div>
                <div class="flex-col overflow-y-scroll flex mb-2" style="min-height:85%; height:85%" ref="scrollChat">
                    <div v-for="message in messages" class="chat"
                        :class="'S' != message.userId ? 'chat-end' : 'chat-start'">
                        <div class="chat-header text-xs">
                            {{ message.userId == 'S' ? "Ripple Pay" : "You" }}
                        </div>
                        <div class="chat-bubble text-xs">{{ message.text }}</div>
                    </div>
                </div>
            </div>


        </div>

    </div>
    <div class="justify-center items-center">
            <article class="prose dark:prose-invert pl-7">
                Notifications. Powered by Ripple Echo.
            </article>
        </div>
</template>
<style>
.chat-bubble {
    min-height: 1.75rem;
}
</style>
