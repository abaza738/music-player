<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { formatTime, throttle } from "../utils";
import { useLogger } from "../store/logger";

const store = useLogger();

const isPlaying = ref(false);
const isMuted = ref(false);
const currentTime = ref(0);
const audio = reactive(new Audio("/hymne-fc-barcelona.mp3"));
audio.volume = 0.15;
audio.onended = () => isPlaying.value = !isPlaying.value;

/**
 * Updated every time `audio.currentTime` changes.
 */
watchEffect(() => {
    currentTime.value = audio.currentTime;
});

function togglePlay() {
    if (isPlaying.value) {
        audio.pause();
        store.log('pause');
    } else {
        audio.play();
        updatePlaybackProgress();
        store.log('play');
    }
    isPlaying.value = !isPlaying.value;
}

function forward() {
    if (audio.ended) return;
    audio.currentTime += 5;
    store.log('forward 5s');
}

function backward() {
    audio.currentTime -= 5;
    store.log('backward 5s');
}

function toggleMute() {
    isMuted.value = !isMuted.value;
    audio.muted = isMuted.value;
    store.log(`mute ${isMuted.value ? 'on' : 'off'}`);
}

function onRangeChange() {
    store.log(`slider change`);
}

const updatePlaybackProgress = () => {
    throttle(() => {
        currentTime.value = audio.currentTime;
        if (!audio.paused && currentTime.value < audio.duration) {
            requestAnimationFrame(updatePlaybackProgress);
        }
    }, 250);
};
</script>

<template>
    <img src="/music.svg" alt="music-icon" class="object-contain w-[150px] m-6" :class="{ 'pulse': isPlaying }">

    <div id="player"
        class="flex flex-row items-center justify-center gap-2 px-2 py-3 rounded-2xl bg-[#1a1a1a] max-sm:w-fit">
        <button class="backward p-3 rounded-full max-sm:hidden" @click="backward">
            <img src="@/assets/icons/forward.svg" />
        </button>

        <button class="pause-play p-3 rounded-full" @click="togglePlay">
            <img v-if="isPlaying" src="@/assets/icons/pause.svg" />
            <img v-else src="@/assets/icons/play.svg" />
        </button>

        <button class="forward p-3 rounded-full max-sm:hidden" @click="forward">
            <img src="@/assets/icons/forward.svg" class="rotate-180" />
        </button>

        <span class="duration text-slate-100">
            {{ formatTime(currentTime) }}/{{ formatTime(audio.duration) }}
        </span>

        <input type="range" class="music rounded-lg h-2 max-sm:hidden" v-model="audio.currentTime" @change="onRangeChange"
            min="0" :max="audio.duration ?? 1" step="1" />

        <button class="mute p-3 rounded-full" @click="toggleMute">
            <img v-if="isMuted" src="@/assets/icons/volume-cross.svg" />
            <img v-else src="@/assets/icons/volume-high.svg" />
        </button>
    </div>
</template>

<style scoped>
.pulse {
    animation: pulse 2s linear infinite both;
}

button {
    transition: 150ms;
}

button:hover {
    transform: scale(1.1);
}

button>img {
    object-fit: contain;
    min-width: 1rem;
    max-width: 100%;
    aspect-ratio: 1 / 1;
}

.pause-play {
    background: linear-gradient(#da2a5b, #fc5869);
    box-shadow: 0px 4px 4px #fc586884;
}

input[type="range"] {
    width: 100%;
    accent-color: #da2a5b;
    /* Hides the default input */
    appearance: none;
    cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb,
input[type="range"]::-moz-range-thumb {
    /* Hide the default thumb completely */
    -webkit-appearance: none;
    appearance: none;
    visibility: hidden;
    width: 0;
    height: 0;
}

input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-moz-range-progress {
    box-sizing: border-box;
    background-color: #da2a5b;
    height: 100%;
    border-radius: 0.5rem;
}


@keyframes pulse {
    0% {
        transform: scale(1.05);
        filter: drop-shadow(0 0 0 #568e80);
    }

    70% {
        transform: scale(1);
        filter: drop-shadow(0 0 3rem #76c2af00);
    }

    100% {
        transform: scale(1.05);
        filter: drop-shadow(0 0 0 #76c2af00);
    }
}
</style>
