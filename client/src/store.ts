import { writable } from "svelte/store";
import type {Message,  User } from "./types";

export const selecteduser = writable<number | null>(null);
export const iconSize =writable<number>(45);
export const friends = writable<User[]>([]);
export const highlight = writable<number>(0);
export const parentMessage = writable<Message |  null>(null);