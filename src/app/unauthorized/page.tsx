import { UnauthorizedState } from "@/components/states";

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div className="w-full">
        <UnauthorizedState />
      </div>
    </div>
  );
}
