import { ForbiddenState } from "@/components/states";

export default function ForbiddenPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div className="w-full">
        <ForbiddenState />
      </div>
    </div>
  );
}
