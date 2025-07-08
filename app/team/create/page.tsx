"use client";
import Footrer from "@/components/Footrer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const createTeam = useMutation(api.teams.createTeam);
  const { user } : any = useClerk();
  const router = useRouter();

  const createNewTeam = async () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).then(res => {
      console.log(res);
      if (res) {
        router.push('/dashboard');
        toast.success('Team created Successfully!');
      }
    })
  }

  return (<>
    <Navbar />
    <div className="flex justify-center items-center h-[65vh]">
      <Card className="w-[60vw]">
        <CardHeader>
          <CardTitle>Create a new team</CardTitle>
          <CardDescription>
            Enter a name for your new team. Click create when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Team Name</Label>
                <Input
                  value={teamName}
                  onChange={(e: any) => setTeamName(e.target.value)}
                  id="name"
                  placeholder="Name of your team"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setTeamName('')} variant="outline">Cancel</Button>
          <Button
            onClick={() => createNewTeam()}
            disabled={!(teamName && teamName?.trim?.length == 0)}
          >Create</Button>
        </CardFooter>
      </Card>
    </div>

    <Footrer />
  </>);
};

export default CreateTeam;
