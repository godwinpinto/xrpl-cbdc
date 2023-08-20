<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch, ref, inject, onBeforeMount } from 'vue';

const scrollChat = ref<HTMLElement | null>(null);
const messages = ref<Array<message>>([]);

/* const pusher: any = inject('pusher');
var channel = pusher.subscribe('grafbase-channel');
 */
interface message {
    message: string,
    userId: string,
    createdAt: string
    msgDateTime: Date
}


const newMessage=ref('');
const systemUserId=""

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


const sendMessage=()=>{

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
        <span class="normal-case text-xl font-bold">Sender</span>
    </div>
    <div class="divider my-0"></div>

    <div class=" flex flex-col">
        <div class="flex-col overflow-y-scroll flex mb-7" style="height:70vh; max-height: 70vh;" ref="scrollChat">
            <div v-for="message in messages" class="chat"
                :class="systemUserId != message.userId ? 'chat-end' : 'chat-start'">
                <div class="chat-header">
                    {{ message.userId }}
                </div>
                <div class="chat-bubble">{{ message.message }}</div>
            </div>
        </div>
        <div class="flex p-2 space-x-2" v-if="systemUserId != ''">
            <div class="flex-1">
                <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full"
                    v-model="newMessage" v-on:keyup.enter="sendMessage" />
            </div>
            <div class="flex-none h-14 w-14">
                <button class="btn bg-white btn-ghost" @click="sendMessage">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>

                </button>
            </div>

        </div>
    </div>
</template>

