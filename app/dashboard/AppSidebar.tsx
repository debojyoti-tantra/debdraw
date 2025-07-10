import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { useConvex, useMutation } from "convex/react"
import { ChevronDown, Users, Settings, LayoutGrid, FileIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export interface TEAM {
  createdBy: String,
  teamName: String,
  _id: String
}

export function AppSidebar() {
  const { user } = useUser() as any
  const convex = useConvex()
  const [teamList, setTeamList] = useState<TEAM[]>([])
  const [activeTeam, setActiveTeam] = useState<TEAM>()
  const [fileInput, setFileInput] = useState("")

  useEffect(() => {
    if (user) {
      getTeamList()
    }
  }, [user])
  

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {email: user?.primaryEmailAddress?.emailAddress});
    setTeamList(result);
    setActiveTeam(result[0]);
  }
  

  const createFile = useMutation(api.files.createFile)
  const onFileCreate = async (fileName: string) => {
    createFile({
      fileName: fileInput,
      teamId: activeTeam?._id as any,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      archived: false,
      whiteboard: ""
    }).then(res => {
      toast.success("File created successfully")
      setFileInput("")
    }),(e : any) => {
      toast.error("Error creating file")
    }
  }

  const menu = [
    {
      _id: 1,
      name: "Create Team",
      path: "/team/create",
      icon: Users,
    },
    {
      _id: 2,
      name: "Settings",
      path: "/settings",
      icon: Settings,
    }
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-5 pt-5">
          <Popover>
            <PopoverTrigger
              className={`flex justify-center items-center gap-2 border border-gray-500 dark:border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 p-2 cursor-pointer w-full`}
            >
              <p>{activeTeam?.teamName}</p>
              <ChevronDown />
            </PopoverTrigger>
            <PopoverContent className="ml-8 p-4 w-full">
              <div className="flex flex-col gap-4">
                <div>
                  <p>Team Names</p>
                  <div className="flex flex-col gap-2 mt-2 h-60 overflow-auto border border-gray-500 dark:border-gray-400 rounded-md p-2">
                    {
                      teamList.map((team, index) => (
                        <h2
                          key={index}
                          className={`p-2 border border-gray-500 dark:border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${activeTeam?._id === team._id ? "bg-gray-200 dark:bg-gray-800" : ""}`}
                          onClick={() => setActiveTeam(team)}
                        >
                          {team.teamName}
                        </h2>
                      ))
                    }
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-3">
                  {
                    menu.map((item, index) => (
                      <Link href={item.path} key={index} className="flex items-center gap-2 text-sm hover:underline">
                        <item.icon />
                        {item.name}
                      </Link>
                    ))
                  }
                </div>
                <Separator />
                <div className="flex flex-col gap-2">
                  <h2>User Info</h2>
                  <div className="flex items-center gap-2">
                    <Image src={user?.imageUrl} alt="user" width={50} height={50} className="rounded-full" />
                    <div className="flex flex-col">
                      <p>{user?.fullName}</p>
                      <p>{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-5 pt-3">
        <h2 className="flex flex-row gap-2 mx-auto">
          <LayoutGrid />
          <p>All Files</p>
        </h2>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="mb-4">
        <Dialog>
          <DialogTrigger className="flex items-center justify-center gap-2 border border-gray-500 dark:border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 p-2 cursor-pointer w-full">
            <p>New File</p> <FileIcon />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                  Create a new file
              </DialogTitle>
              <DialogDescription>
                  <Input
                    value={fileInput}
                    onChange={(e) => setFileInput(e.target.value)}
                    placeholder="Enter file name"
                  />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive">Close</Button>
              </DialogClose>
              <DialogClose>
                <Button
                  disabled={!fileInput || fileInput.trim() === ""}
                  onClick={() => onFileCreate(fileInput)}
                >Create</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  )
}