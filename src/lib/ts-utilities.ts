/**
 * Create another type from T1 by overwriting using types from T2
 */
export type Overwrite<T1, T2> = Pick<T1, Exclude<keyof T1, keyof T2>> & T2
