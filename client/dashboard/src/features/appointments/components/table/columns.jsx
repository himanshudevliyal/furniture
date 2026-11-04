"use client";
import Link from "next/link";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APPOINTMENT_STATUSES, formatDate, formatTime, statusStyles } from "../status";

export const columns = ({ onDelete, onStatus }) => [
  {
    accessorKey: "booking_date",
    header: "Date",
    cell: ({ row }) => <span className="whitespace-nowrap">{formatDate(row.original.booking_date)}</span>,
  },
  {
    accessorKey: "booking_time",
    header: "Time",
    cell: ({ row }) => <span className="whitespace-nowrap">{formatTime(row.original.booking_time)}</span>,
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email", cell: ({ row }) => row.original.email || "-" },
  { accessorKey: "company", header: "Company", cell: ({ row }) => row.original.company || "-" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
            statusStyles[status] || "bg-neutral-100 text-neutral-700",
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id, status } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/appointments/${id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {APPOINTMENT_STATUSES.filter((s) => s !== status).map((s) => (
              <DropdownMenuItem key={s} onClick={() => onStatus(id, s)} className="capitalize">
                Mark {s}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
