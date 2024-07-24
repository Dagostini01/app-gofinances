// icons.ts
export const iconNames = [
    "arrow-up-circle",
    "arrow-down-circle",
    // adicione mais ícones conforme necessário
] as const;

export type IconName = typeof iconNames[number];
