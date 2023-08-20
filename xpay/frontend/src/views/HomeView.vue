<script setup lang="ts">
import NavBar from '@/components/global/NavBar.vue';
import SenderWidget from '@/components/section/SenderWidget.vue';
import ReceiverWidget from '@/components/section/ReceiverWidget.vue';
import InstructionWidget from '@/components/section/InstructionWidget.vue';
</script>
<template>
  <div class="h-screen">
    <NavBar class="shadow-lg shadow-indigo-100/1000 mb-6"/>
    <main>
      <div class="flex flex-col bg-base-300">
        <div class="flex-1 flex flex-col sm:flex-row">
          <nav class="order-first sm:w-1/3 ">
            <InstructionWidget />
          </nav>
          <main class="flex-1 border-l-2 border-dotted border-blue-900">
            <SenderWidget />
          </main>
          <aside class="sm:w-1/4 border-l-2 border-dotted border-blue-900">
            <ReceiverWidget />
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>
