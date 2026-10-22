"use client";

import { useCallback } from "react";
import { useQueryState } from "nuqs";
import { searchParams } from "@/lib/searchparams";
import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Search + status dropdown, shared by the jobs and job-applications tables.
export default function StatusFilterActions({ statusOptions }) {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(""),
  );
  const [status, setStatus] = useQueryState(
    "status",
    searchParams.status.withOptions({ shallow: false }).withDefault(""),
  );
  const [, setPage] = useQueryState("page", searchParams.page.withDefault(1));

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setStatus(null);
    setPage(1);
  }, [setSearchQuery, setStatus, setPage]);

  return (
    <div className="my-3 flex flex-wrap items-center gap-2">
      <DataTableSearch
        searchKey=""
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />

      <Select
        value={status || "all"}
        onValueChange={(value) => {
          setStatus(value === "all" ? null : value);
          setPage(1);
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {statusOptions.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DataTableResetFilter
        isFilterActive={!!searchQuery || !!status}
        onReset={resetFilters}
      />
    </div>
  );
}
