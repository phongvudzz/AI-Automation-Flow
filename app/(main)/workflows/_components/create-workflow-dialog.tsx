"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateWorkflowSchema } from "@/schema/workflow";

type CreateWorkflowDialogProps = {
  triggerText?: string;
};

function CreateWorkflowDialog(props: CreateWorkflowDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateWorkflowSchema>({
    resolver: zodResolver(CreateWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return <></>;
}

export default CreateWorkflowDialog;
