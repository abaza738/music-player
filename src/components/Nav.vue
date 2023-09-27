<template>
    <nav class="flex flex-row p-4 gap-4 items-center justify-center w-full bg-slate-800">
        <router-link class="px-4 py-2 text-white hover:text-slate-300 transition-all" to="/"
            active-class="text-blue-300"><img class="inline" src="@/assets/icons/music.svg" width="12" />
            Player</router-link>

        <router-link class="px-4 py-2 text-white hover:text-slate-300 transition-all" to="/logs"
            active-class="text-blue-300"><img class="inline" src="@/assets/icons/poll.svg" width="12" /> Logs</router-link>
    </nav>
</template>