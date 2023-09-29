import { ref } from "vue";
import { defineStore } from "pinia";
import { Log } from "./types";
import { socket } from "../core/websocket";
import { getLogs } from "../api/logs";

export const useLogger = defineStore("logger", () => {
  const logs = ref<Log[]>([]);
  const count = ref(0);
  const skip = ref(0);
  const cachedSkip = ref<number | undefined>(undefined);

  const fetchLogs = async () => {
    if (cachedSkip.value == skip.value) return;
    cachedSkip.value = skip.value;

    return getLogs(skip.value).then((res) => {
      const [data, countLogs] = res;
      setLogs(data);
      count.value = countLogs;
    });
  };

  const log = (event: string) => {
    socket.emit("log", { type: "log", message: event });
  };

  const push = (event: Log) => {
    logs.value.unshift(event);
  };

  const setLogs = (newLogs: Log[]) => {
    logs.value.push(...newLogs);
  };

  return {
    count,
    fetchLogs,
    log,
    logs,
    push,
    setLogs,
    skip,
  };
});
