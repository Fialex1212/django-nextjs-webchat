export const normalizeRoomName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
};
