<script setup lang="ts">
import { onMounted } from 'vue';
import { useLogger } from '../store/logger';

const store = useLogger();

onMounted(() => {
    store.fetchLogs();
});

function loadMore() {
    store.skip = store.logs.length;
    store.fetchLogs();
}

function formatDate(datetime: string) {
    const date = new Date(datetime);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
</script>

<template>
    <div class="container flex flex-col gap-2">
        <section class="text-sm rounded-lg overflow-hidden bg-slate-600 text-white">
            <div class="flex flex-row bg-slate-700 font-bold">
                <span class="w-1/4 border border-slate-500 p-3">ID</span>
                <span class="w-1/4 border border-slate-500 p-3">Event Type</span>
                <span class="w-1/4 border border-slate-500 p-3">Message</span>
                <span class="w-1/4 border border-slate-500 p-3">Created At</span>
            </div>
            <div class="flex flex-col">
                <div class="flex flex-row" v-for="log in store.logs">
                    <span class="w-1/4 border border-slate-500 p-3">{{ log.id }}</span>
                    <span class="w-1/4 border border-slate-500 p-3">{{ log.type }}</span>
                    <span class="w-1/4 border border-slate-500 p-3">{{ log.message }}</span>
                    <span class="w-1/4 border border-slate-500 p-3">{{ formatDate(log.created) }}</span>
                </div>
            </div>
        </section>

        <button class="rounded-lg text-white bg-blue-400 disabled:bg-gray-400 disabled:text-gray-600 p-3" @click="loadMore"
            :disabled="store.count <= store.logs.length">Load More</button>
    </div>
</template>