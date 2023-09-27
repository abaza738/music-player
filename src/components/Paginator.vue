<script setup lang="ts">
const props = defineProps({
    page: {
        type: Number,
        required: true,
    },
    take: {
        type: Number,
        required: true,
    },
    skip: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});

function next() {
    emit('change', {
        skip: props.skip + props.take,
        page: props.page + 1,
    });
}

function prev() {
    emit('change', {
        skip: props.skip - props.take,
        page: props.page - 1,
    })
}

const emit = defineEmits(['change']);

</script>

<template>
    <div class="paginator flex flex-row items-center self-end gap-2">
        <button
            class="px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white disabled:bg-slate-500 disabled:text-slate-300 disabled:cursor-not-allowed transition"
            @click="prev" :disabled="page == 1">Prev</button>
        <span>Showing {{ (skip * page) + 1 }} to {{ page * take }} out of {{ count }}</span>
        <button
            class="px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white disabled:bg-slate-500 disabled:text-slate-300 disabled:cursor-not-allowed transition"
            @click="next" :disabled="count / take <= page">Next</button>
    </div>
</template>