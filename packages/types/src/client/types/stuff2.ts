import { SortDirection } from "./ClientTypes";

export abstract class Stuff2 {

    funSort<T>(list: T[], _func: (s: T) => number | string | boolean) {
        return list.sort((a, b) => {
            const aValue = _func(a);
            const bValue = _func(b);
            return this.genericSort(aValue, bValue, SortDirection.ASCENDING);
        });
    }

    private genericSort(
        aValue: number | string | boolean,
        bValue: number | string | boolean,
        sortDirection: SortDirection
    ): number {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === SortDirection.ASCENDING
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection === SortDirection.ASCENDING
                ? aValue - bValue
                : bValue - aValue;
        }

        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
            return sortDirection === SortDirection.ASCENDING
                ? (aValue === bValue ? 0 : aValue ? -1 : 1)
                : (aValue === bValue ? 0 : aValue ? 1 : -1);
        }

        // For mixed types or unhandled types, treat as equal
        return 0;
    }

}