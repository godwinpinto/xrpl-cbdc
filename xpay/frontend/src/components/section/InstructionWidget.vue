<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'

const userStore = useUserStore();
const { senderAccountInfo, receiverAccountInfo } = storeToRefs(userStore)

const { sendMessage } = useUserStore();
</script>
<template>
    <div>
        <div class="navbar bg-base-300 justify-center items-center">
            <span class="normal-case text-xl font-bold">Demo Account Details</span>
        </div>
        <div class="col-span-2 divider font-extrabold text-blue-700">Sender Account Details</div>
        <div class="grid grid-cols-3 mx-5 content-center justify-center">
            <article class="prose text-sm pt-4 col-span-1">
                Mobile number
            </article>
            <article class="prose text-sm pt-4 col-span-2">
                {{ senderAccountInfo.mobile_number }}
            </article>
            <div class="col-span-3 divider font-extrabold"></div>
            <article class="prose text-sm pt-4 col-span-1">
                Account number
            </article>
            <article class="prose text-sm pt-4 col-span-2">
                {{ senderAccountInfo.xrpl_acccount_no }}
            </article>
            <div class="col-span-3 divider font-extrabold"></div>
            <article class="prose text-sm pt-4 col-span-1">
                PIX ID
            </article>
            <article class="prose text-sm pt-4 col-span-2">
                {{ senderAccountInfo.pix_id }}
            </article>

            <div class="col-span-3 divider font-extrabold text-blue-700">Receiver Account Details</div>
            <article class="prose text-sm pt-4 col-span-1">
                Mobile number
            </article>
            <article class="prose text-sm pt-4 col-span-2">
                {{ receiverAccountInfo.mobile_number }}
            </article>
            <div class="col-span-3 divider font-extrabold"></div>
            <article class="prose text-sm pt-4 col-span-1">
                Account number
            </article>
            <article class="prose text-sm pt-4 col-span-2">
                {{ receiverAccountInfo.xrpl_acccount_no }}
            </article>
            <div class="col-span-3 divider font-extrabold"></div>
            <article class="prose text-sm pt-4 col-span-1">
                PIX ID
            </article>
            <article class="prose text-sm pt-4 col-span-2">
                {{ receiverAccountInfo.pix_id }}
            </article>
            <div class="col-span-3 divider font-extrabold text-blue-700">Actions (Click on any below button to act)</div>
            <div class="content-center col-span-3">
                <article class="prose text-sm pt-4 col-span-2">
                    Register: REG &lt;4 DIGIT NUMERIC PIN&gt; &lt;AC NO(optional)&gt;
                    <br />Note: If account number is not entered a new account is created and mapped to mobile number as PIX
                </article>
                <button class="btn btn-accent btn-sm justify-center w-full" @click="sendMessage('REG 1234', '9999999999')"
                    disabled>REG 1234</button>
            </div>

            <div class="content-center col-span-3">
                <article class="prose text-sm pt-4 col-span-2">
                    Balance Enguiry: BAL &lt;PIN&gt;
                </article>
                <button class="btn btn-accent btn-sm justify-center w-full"
                    @click="sendMessage('BAL 1234', '9999999999')">BAL 1234</button>
            </div>
            <div class="content-center col-span-3">
                <article class="prose text-sm pt-4 col-span-2">
                    Transaction: SEND &lt;AMOUNT&gt; &lt;PIX_ID / AC_NO&gt; &lt;PIN&gt;
                </article>
                <button class="btn btn-accent btn-sm justify-center w-full"
                    @click="sendMessage('SEND 2 8888888888@yobank.in 1234', '9999999999')">SEND 2 88888888@yobank.in
                    1234</button>
            </div>

        </div>
    </div>
</template>
<style>
.divider {
    height: 0rem
}
</style>