"use client";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, PersonStanding } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { useInstructor } from "@/hooks/useInstructor";

interface SelectInstructorProps {
  setInstructor: Dispatch<SetStateAction<string>>;
}

const SelectInstructor: FC<SelectInstructorProps> = ({ setInstructor }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const { instructors, isError, isLoading } = useInstructor();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="text-black mb-3">
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-black"
        >
          {value
            ? instructors &&
              instructors.data.find((ins) => ins.id == value)?.name
            : "Select instructor..."}
          {/* {value} */}
          <PersonStanding />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="select instructor..." className="h-9" />{" "}
          <CommandEmpty>No Instructor found.</CommandEmpty>
          <CommandGroup className="bg-white">
            {instructors &&
              instructors.data.map((ins, i) => {
                return (
                  <CommandItem
                    key={ins.id}
                    onSelect={(currVal) => {
                      console.log(currVal);
                      const id = instructors.data.find(
                        (ins) => ins.name.toLowerCase() == currVal
                      )?.id;
                      setValue(id!);
                      setInstructor(id!);
                      console.log(id);
                      setOpen(false);
                    }}
                  >
                    {ins.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4 bg-slate-700",
                        value === ins.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectInstructor;
