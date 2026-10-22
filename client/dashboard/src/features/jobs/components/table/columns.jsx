"use client";
import Link from "next/link";
import moment from "moment";
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
import JobActiveSwitch from "../job-active-switch";

export const columns = (openModal, setId) => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue("title")}</p>
        {row.original.department && (
          <p className="text-xs text-muted-foreground">
            {row.original.department}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.getValue("location") || "-",
  },
  {
    accessorKey: "job_type",
    header: "Type",
    cell: ({ row }) => row.getValue("job_type") || "-",
  },
  {
    accessorKey: "applications_count",
    header: "Applications",
    cell: ({ row }) => (
      <Link
        href={`/job-applications?page=1&limit=10&q=${encodeURIComponent(row.original.title)}`}
        className="text-primary hover:underline"
      >
        {row.getValue("applications_count") ?? 0}
      </Link>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => (
      <JobActiveSwitch id={row.original.id} isActive={row.getValue("is_active")} />
    ),
  },
  {
    accessorKey: "created_at",
    header: "Posted on",
    cell: ({ row }) => (
      <div>{moment(row.getValue("created_at")).format("DD/MM/YYYY")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id;
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
              <Link href={`/jobs/${id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setId(id);
                openModal();
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
