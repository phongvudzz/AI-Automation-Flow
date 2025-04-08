"use client";

import React, { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateWorkflowSchema } from "@/schema/workflow";
import CustomizeDialogHeader from "@/components/global/customize-dialog-header";
import { Layers2Icon, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/create-workflow";
import { toast } from "sonner";

type CreateWorkflowDialogProps = {
  triggerText?: string;
};

function CreateWorkflowDialog({ triggerText }: CreateWorkflowDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateWorkflowSchema>({
    resolver: zodResolver(CreateWorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success("Workflow created successfully.", {
        id: "create-workflow-toast",
      });
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Workflow created failed.", {
        id: "create-workflow-toast",
      });
    },
  });

  const onSubmit = useCallback(
    (values: CreateWorkflowSchema) => {
      mutate(values);
      toast.loading("Creating workflow...", {
        id: "create-workflow-toast",
      });
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText || "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomizeDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subTitle="Start building your workflow"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-destructive">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name" />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name for your workflow.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-primary">(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="resize-none"
                        placeholder="Enter description"
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.
                      <br /> This is optional but can help you remember the
                      workflow&apos;s purpose
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer"
              >
                {!isPending && "Proceed"}{" "}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
