export const getLogs = async (skip: number) => {
  return fetch(`${import.meta.env.VITE_API_URL}/log?skip=${skip}`, {
    method: "GET",
  }).then((res) => res.json());
};
