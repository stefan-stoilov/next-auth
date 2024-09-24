import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

type CredentialsDialogProps = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export function CredentialsDialog({ openDialog, setOpenDialog }: CredentialsDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credentials authentication not enabled in demo mode.</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          In order to test the registration flow using credentials, you need to run the app locally. The email
          confirmation and reset password functionalities are using{" "}
          <Link href="https://resend.com/" target="_blank" className="font-bold underline">
            Resend
          </Link>{" "}
          which is configured to be available only on <b>localhost</b>.
        </DialogDescription>

        <DialogDescription>
          You can still use a <b>socials</b> authentication via GitHub or Google account on this deployment.
        </DialogDescription>

        <DialogDescription>
          To test credentials authentication locally, you have to create and account with Resend and get an API key. See
          their{" "}
          <Link href="https://resend.com/docs/send-with-nextjs" target="_blank" className="font-bold underline">
            documentation
          </Link>{" "}
          for more info.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default CredentialsDialog;
