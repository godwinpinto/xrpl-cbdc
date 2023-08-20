<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch, ref, inject, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/userStore';

const scrollChat = ref<HTMLElement | null>(null);
const messages = ref<Array<message>>([]);

/* const pusher: any = inject('pusher');
var channel = pusher.subscribe('grafbase-channel');
 */
interface message {
    text: string,
    userId: string,
    createdAt: string
    msgDateTime: Date
}

const userStore = useUserStore();
const { senderMessage } = storeToRefs(userStore)

watch(senderMessage, (newVal, oldVal) => {
    if (newVal.message != "" && oldVal.message == "") {
        messages.value.push({
            text: newVal.message,
            createdAt: (new Date()).toUTCString(),
            userId: newVal.from,
            msgDateTime: new Date()
        })
        senderMessage.value = {
            from: "",
            message: ""
        }
        scrollChatToBottom();

    }
});

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


const sendMessage = () => {

}

/* channel.bind('new-message', function (data: any) {
    const messageRecord = data.message as Message;
    const val = {
        message: messageRecord.body ?? '',
        user: messageRecord?.user ?? { id: '', username: '' },
        createdAt: messageRecord?.createdAt ?? '',
        msgDateTime: messageRecord.msgDateTime
    }
    messages.value.push(val);
    scrollChatToBottom();
}); */

</script>
<template>
    <div class="navbar bg-base-300 mb-0 pb-0">
        <span class="normal-case text-xl font-bold">Sender (Mob. No.: 9999999999)</span>
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
     <!--            <div class="flex p-2 space-x-2">
 -->
<!--                     <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div class="relative flex grow">
                            <input type="text" placeholder="Try out!"
                                class="w-full flex-1 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3">
                            <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                <button type="button"
                                    class="inline-flex items-center justify-center rounded-lg px-2 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        class="h-6 w-6 ml-2 transform rotate-90">
                                        <path
                                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
 -->                    <!--                     <div class="flex-1">
                        <input type="text" placeholder="Type here" class="input input-bordered input-primary text-xm"
                            v-model="newMessage" v-on:keyup.enter="sendMessage" />
                    </div>


                    <div class="flex-none h-12 w-12">
                        <button class="btn bg-white btn-ghost" @click="sendMessage">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-full h-full">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>

 -->
<!--                 </div> -->
            </div>


        </div>

    </div>
</template>
<style>.chat-bubble {
    min-height: 1.75rem;
}</style>
